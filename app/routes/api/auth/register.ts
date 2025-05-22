import { registerSchema } from "@/lib/validation-schemas/auth";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import {
  badRequestResponse,
  createdResponse,
  unprocessableContentResponse,
} from "../-helpers/responses";
import { createHash } from "@/lib/bcryptjs";

import db from "@/prisma";
import { ErrorCodes } from "@/definitions/enums/common";
import { makeValidationErrors } from "../-helpers/make-validation-errors";

export const APIRoute = createAPIFileRoute("/api/auth/register")({
  POST: async ({ request }) => {
    const body = (await request.json()) as unknown;

    const validationResults = registerSchema.safeParse(body);

    if (!validationResults.success)
      return unprocessableContentResponse(
        {
          message: "Invalid request body!",
          code: ErrorCodes.InvalidParams,
        },
        makeValidationErrors(validationResults.error),
      );

    const parsedBody = validationResults.data;

    const isEmailExists = await db.user.findUnique({
      where: {
        email: parsedBody.email,
      },
    });

    if (isEmailExists)
      return badRequestResponse({
        message: "Email already exists!",
        code: ErrorCodes.AlreadyExists,
      });

    const hashedPassword = await createHash(parsedBody.password);

    const createdUser = await db.user.create({
      data: {
        email: parsedBody.email,
        password: hashedPassword,
        firstName: parsedBody.firstName,
        lastName: parsedBody.lastName,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!createdUser)
      return badRequestResponse({
        message: "Unable to register user!",
        code: ErrorCodes.UnknownError,
      });

    return createdResponse("User registered successfully!", createdUser);
  },
});
