import { LoginForm } from "@/app/routes/-components/auth/login-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
  validateSearch: (search) => {
    return search as { redirect?: string };
  },
});

function LoginPage() {
  const search = Route.useSearch();
  return (
    <div className="grow flex justify-center items-center">
      <div className="max-w-md w-full mx-auto">
        <LoginForm redirectFrom={search.redirect} />
      </div>
    </div>
  );
}
