import { createFileRoute } from "@tanstack/react-router";
import { ForgetPasswordForm } from "../../-components/auth/forget-password-form";

export const Route = createFileRoute("/auth/forget-password/")({
  component: ForgetPasswordPage,
});

function ForgetPasswordPage() {
  return (
    <div className="grow flex justify-center items-center">
      <div className="max-w-md w-full mx-auto">
        <ForgetPasswordForm />
      </div>
    </div>
  );
}
