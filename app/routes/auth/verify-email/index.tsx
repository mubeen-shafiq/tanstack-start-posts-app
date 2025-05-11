import { authHelpers } from "@/api/helpers/auth";
import { verifyEmailSchema } from "@/lib/validation-schemas/auth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/verify-email/")({
  component: VerifyEmailPage,
  validateSearch: verifyEmailSchema,
});

function VerifyEmailPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/auth/verify-email" });
  const { mutateAsync } = authHelpers.useVerifyEmailMutation();

  useEffect(() => {
    const handleVerifyEmail = async () => {
      try {
        await mutateAsync(search);
        navigate({
          to: "/auth/verify-email/$status",
          params: { status: "success" },
          replace: true,
        });
      } catch (error) {
        navigate({
          to: "/auth/verify-email/$status",
          params: { status: "error" },
          replace: true,
        });
      }
    };
    handleVerifyEmail();
  }, []);
  return <div>Verifying your email. Please be patient!</div>;
}
