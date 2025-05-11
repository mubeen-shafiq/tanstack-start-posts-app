import { verifyEmailSchema } from "@/lib/validation-schemas/auth";
import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { HttpStatus } from "../../-helpers/http-status";
import { validateSecretToken } from "@/lib/token";
import db from "@/prisma";
import {
  badRequestResponse,
  okResponse,
  unprocessableContentResponse,
} from "../../-helpers/responses";
import { TokenPurpose, UserVerificationEnum } from "@prisma/client";
import { ErrorCodes } from "@/definitions/enums/common";
import { makeValidationErrors } from "../../-helpers/make-validation-errors";

export const APIRoute = createAPIFileRoute("/api/auth/verify-email")({
  POST: async ({ request }) => {
    const body = await request.json();

    const validationResults = verifyEmailSchema.safeParse(body);

    if (!validationResults.success)
      return unprocessableContentResponse(
        { message: "Invalid request body!", code: ErrorCodes.InvalidParams },
        makeValidationErrors(validationResults.error),
      );

    const parsedBody = validationResults.data;
    const payload = validateSecretToken(parsedBody.token, 15 * 60); // 15 minutes

    if (!payload)
      return json(
        { message: "Token is invalid!" },
        { status: HttpStatus.BadRequest },
      );

    // check if user is already verified
    const userAlreadyVerified = await db.userVerification.findFirst({
      where: {
        AND: [
          { userId: payload.user },
          { type: UserVerificationEnum.Email },
          { isVerified: true },
        ],
      },
    });

    if (userAlreadyVerified)
      return badRequestResponse({
        message: "User is already verified!",
        code: ErrorCodes.AlreadyDone,
      });

    // check if token exists
    const tokenFound = await db.token.findFirst({
      where: {
        AND: [
          { userId: payload.user },
          { purpose: TokenPurpose.VerifyEmail },
          { token: parsedBody.token },
        ],
      },
    });

    if (!tokenFound)
      return badRequestResponse({
        message: "Token is invalid!",
        code: ErrorCodes.InvalidCredentials,
      });

    const foundUserVerification = await db.userVerification.findFirst({
      where: {
        AND: [{ userId: payload.user }, { type: UserVerificationEnum.Email }],
      },
    });

    if (!foundUserVerification)
      return badRequestResponse({
        message: "User not found!",
        code: ErrorCodes.NotFound,
      });

    await db.userVerification.update({
      where: {
        id: foundUserVerification?.id,
        AND: [{ userId: payload.user }, { type: UserVerificationEnum.Email }],
      },
      data: {
        isVerified: true,
        verifiedAt: new Date(),
      },
    });

    await db.token.deleteMany({
      where: {
        AND: [{ userId: payload.user }, { purpose: TokenPurpose.VerifyEmail }],
      },
    });

    return okResponse("Email verified successfully!");
  },
});
