import { resetPasswordSchema } from "@/lib/validation-schemas/auth";
import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import {
  badRequestResponse,
  okResponse,
  unprocessableContentResponse,
} from "../-helpers/responses";
import { ErrorCodes } from "@/definitions/enums/common";
import { makeValidationErrors } from "../-helpers/make-validation-errors";
import { validateSecretToken } from "@/lib/token";
import db from "@/prisma";
import { TokenPurpose } from "@prisma/client";
import { createHash } from "@/lib/bcryptjs";

export const APIRoute = createAPIFileRoute("/api/auth/reset-password")({
  POST: async ({ request }) => {
    const body = (await request.json()) as unknown;

    const validationResults = resetPasswordSchema.safeParse(body);
    if (!validationResults.success)
      return unprocessableContentResponse(
        { message: "Invalid request params!", code: ErrorCodes.InvalidParams },
        makeValidationErrors(validationResults.error),
      );

    const parsedBody = validationResults.data;
    const token = parsedBody.token;
    const payload = validateSecretToken(token, 15 * 60); // 15 minutes

    if (!payload)
      return badRequestResponse({
        message: "Token is invalid!",
        code: ErrorCodes.InvalidToken,
      });

    // check if token exists in our db
    const isTokenExists = await db.token.findFirst({
      where: {
        AND: [
          { userId: payload.user },
          { purpose: TokenPurpose.ResetPassword },
        ],
      },
    });

    if (!isTokenExists)
      return badRequestResponse({
        message: "Invalid Token!",
        code: ErrorCodes.InvalidToken,
      });

    const userId = payload.user;

    // check if user exists
    const userExists = await db.user.findUnique({
      where: { id: userId },
    });

    if (!userExists)
      return badRequestResponse({
        message: "User not found!",
        code: ErrorCodes.NotFound,
      });

    // update user password
    const hashedPassword = await createHash(parsedBody.password);

    await db.user.update({
      where: { id: userExists.id },
      data: { password: hashedPassword },
    });

    // delete prev token/s
    await db.token.deleteMany({
      where: {
        AND: [
          { userId: userExists.id },
          { purpose: TokenPurpose.ResetPassword },
        ],
      },
    });
    return okResponse("Password reset successfully!");
  },
});
