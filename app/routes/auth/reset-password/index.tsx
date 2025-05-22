import { createFileRoute, redirect } from "@tanstack/react-router";
import { ResetPasswordForm } from "../../-components/auth/reset-password.form";

export const Route = createFileRoute("/auth/reset-password/")({
  component: ResetPasswordPage,
  validateSearch: (search) => search as { token: string },
  beforeLoad: ({ search }) => {
    if (!search.token) throw redirect({ to: "/auth/login", replace: true });
  },
});

function ResetPasswordPage() {
  const { token } = Route.useSearch();
  return (
    <div className="grow flex justify-center items-center">
      <div className="max-w-md w-full mx-auto">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
