import { createFileRoute } from "@tanstack/react-router";
import { authHelpers } from "@/api/helpers/auth";

export const Route = createFileRoute("/auth/forget-password")({
  component: ForgetPasswordPage,
});

function ForgetPasswordPage() {
  const { mutateAsync } = authHelpers.useForgetPasswordMutation();

  const handleSubmit = async () => {
    try {
      const response = await mutateAsync({ email: "test@mail.com" });
      response.data.redirectUrl;
    } catch (error) {}
  };
  return <div>Hello "/_blankLayout/auth/forget-password"!</div>;
}
