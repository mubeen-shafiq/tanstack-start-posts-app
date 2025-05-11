import { createFileRoute } from "@tanstack/react-router";
import { RegisterForm } from "../../-components/auth/register-form";

export const Route = createFileRoute("/auth/register/")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="grow flex justify-center items-center">
      <div className="max-w-md w-full mx-auto">
        <RegisterForm />
      </div>
    </div>
  );
}
