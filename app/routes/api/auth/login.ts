import { LoginBody, loginSchema } from "@/lib/validation-schemas/auth";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import {
  notFoundResponse,
  okResponse,
  unprocessableContentResponse,
} from "../-helpers/responses";
import { compareHash } from "@/lib/bcryptjs";
import { AuthPayload } from "@/definitions/types/auth";
import { signToken } from "@/lib/jwt";
import { setCookie } from "@tanstack/react-start/server";

import db from "@/prisma";
import { makeValidationErrors } from "../-helpers/make-validation-errors";
import { ErrorCodes } from "@/definitions/enums/common";
import { makeLoginResponse } from "../-helpers/api/auth";

export const APIRoute = createAPIFileRoute("/api/auth/login")({
  POST: async ({ request }) => {
    const body = (await request.json()) as unknown;

    const validationResults = loginSchema.safeParse(body);

    if (!validationResults.success)
      return unprocessableContentResponse(
        { message: "Invalid request Body!", code: ErrorCodes.InvalidParams },
        makeValidationErrors<LoginBody>(validationResults.error),
      );

    const parsedBody = validationResults.data;

    const isUserExists = await db.user.findUnique({
      where: {
        email: parsedBody.email,
      },
    });

    if (!isUserExists)
      return notFoundResponse({
        message: "Email or password is incorrect!",
        code: ErrorCodes.InvalidCredentials,
      });

    const isPasswordMatch = await compareHash(
      parsedBody.password,
      isUserExists.password,
    );

    if (!isPasswordMatch)
      return notFoundResponse({
        message: "Email or password is incorrect!",
        code: ErrorCodes.InvalidCredentials,
      });

    // generate token and save to session db
    const payload: AuthPayload = {
      id: isUserExists.id,
    };

    const user = makeLoginResponse(isUserExists);

    const tokenAge = 60 * 60 * 24;

    const token = signToken(payload, {
      expiresIn: tokenAge * 1000,
    });

    setCookie("auth-token", token, { maxAge: tokenAge });
    setCookie("auth-user", JSON.stringify(user), { maxAge: tokenAge });

    return okResponse("Login successfully!");
  },
});
