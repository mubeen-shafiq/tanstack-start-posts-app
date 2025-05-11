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
import { okResponse } from "../../-helpers/responses";

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
        { message: "User not found!" },
        { status: HttpStatus.NotFound },
      );

    const verificationExists = await db.userVerification.findFirst({
      where: {
        AND: [{ userId: userExists.id }, { type: UserVerificationEnum.Email }],
      },
    });

    if (verificationExists && verificationExists.isVerified) {
      return okResponse("Email already verified!");
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

    // delete previous tokens if exists
    if (verificationExists) {
      await db.token.deleteMany({
        where: {
          AND: [
            { userId: userExists.id },
            { purpose: TokenPurpose.VerifyEmail },
          ],
        },
      });
    }

    let coolDownTime = COOL_DOWN_TIME[0];

    if (verificationExists) {
      coolDownTime = getCoolDownTimeForEmailVerification(
        verificationExists.lastAttemptAt,
        verificationExists.attempts,
      );
    }

    // generate token and send verification
    if (coolDownTime === 0) {
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

    if (coolDownTime > 0)
      return okResponse(`Too Many Attempts! Please wait.`, { coolDownTime });

    return okResponse("Email sent successfully!", { coolDownTime });
  },
});
