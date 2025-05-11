import { LoginBody, loginSchema } from "@/lib/validation-schemas/auth";
import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import {
  notFoundResponse,
  okResponse,
  unprocessableEntityResponse,
} from "../-helpers/responses";
import { compareHash } from "@/lib/bcryptjs";
import { AuthPayload } from "@/definitions/types/auth";
import { signToken } from "@/lib/jwt";
import { setCookie } from "@tanstack/react-start/server";

import db from "@/prisma";
import { makeValidationErrors } from "../-helpers/make-validation-errors";

export const APIRoute = createAPIFileRoute("/api/auth/login")({
  POST: async ({ request }) => {
    const body = (await request.json()) as unknown;

    const validationResults = loginSchema.safeParse(body);

    if (!validationResults.success)
      return unprocessableEntityResponse(
        "Invalid Request!",
        makeValidationErrors<LoginBody>(validationResults.error),
      );

    const parsedBody = validationResults.data;

    const isUserExists = await db.user.findUnique({
      where: {
        email: parsedBody.email,
      },
    });

    if (!isUserExists)
      return notFoundResponse("Email or password is incorrect!");

    const isPasswordMatch = await compareHash(
      parsedBody.password,
      isUserExists.password,
    );

    if (!isPasswordMatch)
      return notFoundResponse("Email or password is incorrect!");

    // generate token and save to session db
    const payload: AuthPayload = {
      id: isUserExists.id,
    };

    const tokenAge = 60 * 60 * 24;

    const token = signToken(payload, {
      expiresIn: tokenAge * 1000,
    });

    const user = {
      id: isUserExists.id,
      email: isUserExists.email,
      fullName:
        isUserExists.firstName + isUserExists.lastName
          ? " " + isUserExists.lastName
          : "",
      firstName: isUserExists.firstName,
      lastName: isUserExists.lastName,
    };

    setCookie("auth-token", token, { maxAge: tokenAge });
    setCookie("auth-user", JSON.stringify(user), { maxAge: tokenAge });

    return okResponse("Login successfully!");
  },
});
