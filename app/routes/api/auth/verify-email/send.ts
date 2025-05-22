import { sendVerificationEmailSchema } from "@/lib/validation-schemas/auth";
import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { HttpStatus } from "../../-helpers/http-status";
import db from "@/prisma";
import { TokenPurpose, UserVerificationEnum } from "@prisma/client";
import { generateSecretToken } from "@/lib/token";
import { makeValidationErrors } from "../../-helpers/make-validation-errors";
import { sendEmailVerificationMailer } from "../../-helpers/mailer";
import { COOL_DOWN_TIME, makeFullName } from "@/lib/utils";
import {
  getCoolDownTimeForEmailVerification,
  resolveBaseUrl,
} from "../../-helpers";
import {
  badRequestResponse,
  okResponse,
  tooManyRequestsResponse,
} from "../../-helpers/responses";
import { ErrorCodes } from "@/definitions/enums/common";

export const APIRoute = createAPIFileRoute("/api/auth/verify-email/send")({
  POST: async ({ request }) => {
    const body = await request.json();
    const validationResults = sendVerificationEmailSchema
      .pick({ id: true })
      .safeParse(body);

    if (!validationResults.success)
      return json(makeValidationErrors(validationResults.error), {
        status: HttpStatus.BadRequest,
      });

    const parsedBody = validationResults.data;
    const userExists = await db.user.findFirst({
      where: { id: parsedBody.id },
    });

    if (!userExists)
      return json(
        { message: "User not found!", code: ErrorCodes.NotFound },
        { status: HttpStatus.NotFound },
      );

    const verificationExists = await db.userVerification.findFirst({
      where: {
        AND: [{ userId: userExists.id }, { type: UserVerificationEnum.Email }],
      },
    });

    if (verificationExists && verificationExists.isVerified) {
      return badRequestResponse({
        message: "Email already verified!",
        code: ErrorCodes.AlreadyDone,
      });
    }

    if (!verificationExists) {
      await db.userVerification.create({
        data: {
          userId: userExists.id,
          type: UserVerificationEnum.Email,
          attempts: 1,
          lastAttemptAt: new Date(),
        },
      });
    }

    let coolDownTime = COOL_DOWN_TIME[0];

    // reevaluate coolDownTime based on number of attempts and last attempt time
    if (verificationExists) {
      coolDownTime = getCoolDownTimeForEmailVerification(
        verificationExists.lastAttemptAt,
        verificationExists.attempts,
      );
    }

    // delete previous tokens only when coolDownTime is 0 (new will be generated)
    if (verificationExists && coolDownTime === 0) {
      await db.token.deleteMany({
        where: {
          AND: [
            { userId: userExists.id },
            { purpose: TokenPurpose.VerifyEmail },
          ],
        },
      });
    }

    // generate token and send verification when coolDownTime is 0 or verification doesn't exist before (first time)
    if (coolDownTime === 0 || !verificationExists) {
      const generatedToken = generateSecretToken(userExists.id);
      await db.token.create({
        data: {
          userId: userExists.id,
          purpose: TokenPurpose.VerifyEmail,
          token: generatedToken,
        },
      });
      sendEmailVerificationMailer({
        name: makeFullName(userExists.firstName, userExists.lastName),
        redirectUrl: resolveBaseUrl(
          "/auth/verify-email?token=" + generatedToken,
        ),
        to: userExists.email,
      });
    }

    // update attempts and lastAttemptAt after email sent
    if (verificationExists && coolDownTime === 0) {
      await db.userVerification.update({
        where: {
          id: verificationExists.id,
          AND: [
            { userId: userExists.id },
            { type: UserVerificationEnum.Email },
          ],
        },
        data: {
          attempts: verificationExists.attempts + 1,
          lastAttemptAt: new Date(),
        },
      });
    }

    if (coolDownTime > 0 && verificationExists)
      return tooManyRequestsResponse(
        {
          message: "Already sent! Please wait.",
          code: ErrorCodes.RateLimit,
        },
        {
          coolDownTime,
        },
      );

    return okResponse("Email sent successfully!", {
      coolDownTime: COOL_DOWN_TIME[verificationExists?.attempts || 0],
    });
  },
});
