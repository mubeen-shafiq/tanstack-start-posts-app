import {
  ForgetPasswordBody,
  LoginBody,
  RegisterBody,
  ResetPasswordBody,
  VerifyEmailBody,
} from "../validation-schemas/auth";

export const loginInitialValues: LoginBody = {
  email: "",
  password: "",
};

export const registerInitialValues: RegisterBody = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const forgetPasswordInitialValues: ForgetPasswordBody = {
  email: "",
};

export const resetPasswordInitialValues: ResetPasswordBody = {
  token: "",
  password: "",
  confirmPassword: "",
};

export const verifyEmailInitialValues: VerifyEmailBody = {
  token: "",
};
