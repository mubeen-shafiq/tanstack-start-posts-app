import { authHelpers } from "@/api/helpers/auth";
import { ErrorCodes } from "@/definitions/enums/common";
import { errorToast, successToast } from "@/lib/toast";
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
        const response = await mutateAsync(search);
        successToast(response.message);
        navigate({
          to: "/auth/verify-email/$status",
          params: { status: "success" },
          replace: true,
        });
      } catch (error) {
        if (error.code === ErrorCodes.AlreadyDone) {
          navigate({
            to: "/auth/verify-email/$status",
            params: { status: "success" },
            replace: true,
          });
          successToast(error.message);
          return;
        }
        
        navigate({
          to: "/auth/verify-email/$status",
          params: { status: "error" },
          replace: true,
        });
        errorToast(error.message);
      }
    };
    handleVerifyEmail();
  }, []);
  return <div>Verifying your email. Please be patient!</div>;
}
