import { forgetPasswordSchema } from "@/lib/validation-schemas/auth";
import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { makeValidationErrors } from "../-helpers/make-validation-errors";
import {
  notFoundResponse,
  okResponse,
  unprocessableContentResponse,
} from "../-helpers/responses";
import { ErrorCodes } from "@/definitions/enums/common";
import db from "@/prisma";
import { TokenPurpose, UserVerificationEnum } from "@prisma/client";
import { isTimeElapsed } from "@/lib/utils/time-elapsed";
import { generateSecretToken } from "@/lib/token";
import {
  sendEmailVerificationMailer,
  sendResetPasswordMailer,
} from "../-helpers/mailer";
import { makeFullName } from "@/lib/utils";
import { resolveBaseUrl } from "../-helpers";

export const APIRoute = createAPIFileRoute("/api/auth/forget-password")({
  POST: async ({ request }) => {
    const body = (await request.json()) as unknown;

    const validationResults = forgetPasswordSchema.safeParse(body);

    if (!validationResults.success)
      return unprocessableContentResponse(
        { message: "Invalid request body!", code: ErrorCodes.InvalidParams },
        makeValidationErrors(validationResults.error),
      );

    const parsedBody = validationResults.data;


    const userExists = await db.user.findUnique({
      where: { email: parsedBody.email },
    });

    if (!userExists)
      return notFoundResponse({
        message: "User against email not found!",
        code: ErrorCodes.NotFound,
      });

    const isTokenExists = await db.token.findFirst({
      where: {
        AND: [
          { userId: userExists.id },
          { purpose: TokenPurpose.ResetPassword },
        ],
      },
    });

    let shouldCreateToken = true;

    const TOKEN_LIFE = 15 * 60; // 15 minutes

    if (isTokenExists) {
      const tokenExpired = isTimeElapsed(isTokenExists?.createdAt, TOKEN_LIFE);
      if (tokenExpired) shouldCreateToken = false;
    }

    // use previous token sent to the user inbox.
    if (isTokenExists && !shouldCreateToken)
      return okResponse("Reset link has been sent to your inbox!");

    // delete previous tokens
    if (isTokenExists && shouldCreateToken) {
      await db.token.deleteMany({
        where: {
          AND: [
            { userId: userExists.id },
            { purpose: TokenPurpose.ResetPassword },
          ],
        },
      });
    }

    const generatedToken = generateSecretToken(userExists.id);

    await db.token.create({
      data: {
        userId: userExists.id,
        token: generatedToken,
        purpose: TokenPurpose.ResetPassword,
      },
    });

    sendResetPasswordMailer({
      name: makeFullName(userExists.firstName, userExists.lastName),
      redirectUrl: resolveBaseUrl(
        "/auth/reset-password?token=" + generatedToken,
      ),
      to: userExists.email,
    });

    return okResponse("Reset link has been sent to your inbox!");
  },
});
