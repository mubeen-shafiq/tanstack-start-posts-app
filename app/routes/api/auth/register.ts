import { registerSchema } from "@/lib/validation-schemas/auth";
import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { HttpStatus } from "../-helpers/http-status";
import { badRequestResponse, createdResponse } from "../-helpers/responses";
import { createHash } from "@/lib/bcryptjs";

import db from "@/prisma";
import { generateSecretToken } from "@/lib/token";
import { sendEmailVerificationMailer } from "../-helpers/mailer";
import { EmailVerificationMailerPayload } from "@/definitions/types/auth";
import { TokenPurpose } from "@prisma/client";

export const APIRoute = createAPIFileRoute("/api/auth/register")({
  POST: async ({ request }) => {
    const body = (await request.json()) as unknown;

    const validationResults = registerSchema.safeParse(body);

    if (!validationResults.success)
      return json(validationResults.error.flatten().fieldErrors, {
        status: HttpStatus.BadRequest,
      });

    const parsedBody = validationResults.data;

    const isEmailExists = await db.user.findUnique({
      where: {
        email: parsedBody.email,
      },
    });

    if (isEmailExists) return badRequestResponse("Email already exists!");

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

    if (!createdUser) return badRequestResponse("Unable to register user!");

    // send async mail to user for verify email address
    // const generatedToken = generateSecretToken(createdUser.id);
    // await db.token.create({
    //   data: {
    //     token: generatedToken,
    //     purpose: TokenPurpose.VerifyEmail,
    //     userId: createdUser.id,
    //   },
    // });

    // const emailPayload: EmailVerificationMailerPayload = {
    //   redirectUrl: `${process.env.BASE_URL}/auth/verify-email?token=${generatedToken}`,
    //   to: parsedBody.email,
    //   name: `${parsedBody.firstName} ${parsedBody.lastName}`,
    // };

    // sendEmailVerificationMailer(emailPayload);

    return createdResponse("User registered successfully!", createdUser);
  },
});
