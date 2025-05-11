import { useMutation } from "@tanstack/react-query";
import { AUTH, authHttp } from "@/api/http/auth";

export const authHelpers = {
  useLoginMutation: () =>
    useMutation({
      mutationKey: [AUTH.LOGIN],
      mutationFn: authHttp.login,
    }),

  useRegisterMutation: () =>
    useMutation({
      mutationKey: [AUTH.REGISTER],
      mutationFn: authHttp.register,
    }),

  useForgetPasswordMutation: () =>
    useMutation({
      mutationKey: [AUTH.FORGET_PASSWORD],
      mutationFn: authHttp.forgetPassword,
    }),

  useResetPasswordMutation: () =>
    useMutation({
      mutationKey: [AUTH.RESET_PASSWORD],
      mutationFn: authHttp.resetPassword,
    }),

  useSendVerifyEmailMutation: () =>
    useMutation({
      mutationKey: [AUTH.SEND_VERIFY_EMAIL],
      mutationFn: authHttp.sendVerifyEmail,
    }),
  useVerifyEmailMutation: () =>
    useMutation({
      mutationKey: [AUTH.VERIFY_EMAIL],
      mutationFn: authHttp.verifyEmail,
    }),
};
