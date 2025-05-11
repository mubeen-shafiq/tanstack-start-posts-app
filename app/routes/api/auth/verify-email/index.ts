import { verifyEmailSchema } from "@/lib/validation-schemas/auth";
import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { HttpStatus } from "../../-helpers/http-status";
import { validateSecretToken } from "@/lib/token";
import db from "@/prisma";
import { okResponse } from "../../-helpers/responses";
import { UserVerificationEnum } from "@prisma/client";

export const APIRoute = createAPIFileRoute("/api/auth/verify-email")({
  POST: async ({ request }) => {
    const body = await request.json();

    const validationResults = verifyEmailSchema.safeParse(body);

    if (!validationResults.success)
      return json(validationResults.error.flatten().fieldErrors, {
        status: HttpStatus.BadRequest,
      });

    const parsedBody = validationResults.data;
    const payload = validateSecretToken(parsedBody.token, 15 * 60); // 15 minutes

    if (!payload)
      return json(
        { message: "Token is invalid!" },
        { status: HttpStatus.BadRequest },
      );

    await db.userVerification.update({
      where: {
        AND: [{ userId: payload.user }, { type: UserVerificationEnum.Email }],
      },
      data: {
        isVerified: true,
        verifiedAt: new Date(),
      },
    });

    return okResponse("Email verified successfully!");
  },
});
