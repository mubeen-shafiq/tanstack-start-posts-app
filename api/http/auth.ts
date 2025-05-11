import { queryHelper } from "@/lib/utils/query-helper";
import {
  ForgetPasswordBody,
  LoginBody,
  RegisterBody,
  ResetPasswordBody,
  SendVerificationEmailBody,
  VerifyEmailBody,
} from "@/lib/validation-schemas/auth";
import {
  ForgetPasswordResponse,
  RegisterResponse,
  SendVerificationEmailResponse,
} from "@/definitions/types/auth";
import { ApiResponse, ValueOf } from "@/definitions/types/common";

export const AUTH = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGET_PASSWORD: "/auth/forget-password",
  RESET_PASSWORD: "/auth/reset-password",
  VERIFY_EMAIL: "/auth/verify-email",
  SEND_VERIFY_EMAIL: "/auth/verify-email/send",
} as const;

export type AuthEndpointsType = ValueOf<typeof AUTH>;

export const authHttp = {
  login: (body: LoginBody) =>
    queryHelper<LoginBody, ApiResponse>({
      method: "post",
      url: AUTH.LOGIN,
      data: body,
      config: {
        skipAuth: true,
      },
    }),
  register: (body: RegisterBody) =>
    queryHelper<RegisterBody, ApiResponse<RegisterResponse>>({
      method: "post",
      url: AUTH.REGISTER,
      data: body,
      config: {
        skipAuth: true,
      },
    }),

  forgetPassword: (body: ForgetPasswordBody) =>
    queryHelper<ForgetPasswordBody, ApiResponse<ForgetPasswordResponse>>({
      method: "post",
      url: AUTH.FORGET_PASSWORD,
      data: body,
      config: {
        skipAuth: true,
      },
    }),
  resetPassword: (body: ResetPasswordBody) =>
    queryHelper({
      method: "post",
      url: AUTH.RESET_PASSWORD,
      data: body,
      config: {
        skipAuth: true,
      },
    }),
  sendVerifyEmail: (body: { id: SendVerificationEmailBody["id"] }) =>
    queryHelper<
      { id: SendVerificationEmailBody["id"] },
      ApiResponse<SendVerificationEmailResponse>
    >({
      method: "post",
      url: AUTH.SEND_VERIFY_EMAIL,
      data: body,
      config: { skipAuth: true },
    }),
  verifyEmail: (body: VerifyEmailBody) =>
    queryHelper({
      method: "post",
      url: AUTH.VERIFY_EMAIL,
      data: body,
      config: {
        skipAuth: true,
      },
    }),
};
