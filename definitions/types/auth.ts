export type ForgetPasswordResponse = {
  redirectUrl: string;
};

export type AuthPayload = {
  id: string;
};

export type EmailVerificationMailerPayload = {
  to: string;
  redirectUrl: string;
  name: string;
};

export type RegisterResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type SendVerificationEmailResponse =
  | {
      coolDownTime: number;
    }
  | undefined;
