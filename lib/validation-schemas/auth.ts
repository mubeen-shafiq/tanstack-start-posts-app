import * as zod from "zod";
import { checkObjectId } from "../utils/mongodb";

export const loginSchema = zod.strictObject({
  email: zod.string().nonempty().email().toLowerCase(),
  password: zod.string().nonempty(),
});

export const registerSchema = zod.strictObject({
  firstName: zod.string().trim().nonempty().min(3).max(48),
  lastName: zod.string().trim().min(2).max(48).or(zod.literal("")),
  email: zod.string().nonempty().email().toLowerCase(),
  password: zod.string().nonempty().min(8).max(36),
});

export const forgetPasswordSchema = zod.strictObject({
  email: zod.string().nonempty().email().toLowerCase(),
});

export const resetPasswordSchema = zod
  .strictObject({
    token: zod.string().nonempty(),
    password: zod.string().nonempty().min(8).max(36),
    confirmPassword: zod.string().nonempty().min(8).max(36),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const sendVerificationEmailSchema = zod.strictObject({
  email: zod.string().nonempty().email().toLowerCase().default(""),
  name: zod.string().trim().nonempty().default(""),
  id: zod
    .string()
    .nonempty()
    .refine((value) => checkObjectId(value), "Invalid id")
    .default(""),
});

export const verifyEmailSchema = zod.strictObject({
  token: zod.string().nonempty(),
});

export type LoginBody = zod.infer<typeof loginSchema>;
export type RegisterBody = zod.infer<typeof registerSchema>;
export type ForgetPasswordBody = zod.infer<typeof forgetPasswordSchema>;
export type ResetPasswordBody = zod.infer<typeof resetPasswordSchema>;
export type SendVerificationEmailBody = zod.infer<
  typeof sendVerificationEmailSchema
>;
export type VerifyEmailBody = zod.infer<typeof verifyEmailSchema>;
