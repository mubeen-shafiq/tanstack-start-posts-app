import { authHelpers } from "@/api/helpers/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sendVerificationEmailSchema } from "@/lib/validation-schemas/auth";
import {
  createFileRoute,
  Navigate,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useEffect, useState } from "react";
import { RegisterSuccessSkeleton } from "../../-components/skeletons/register-success";
import { errorToast, successToast } from "@/lib/toast";
import { ErrorCodes } from "@/definitions/enums/common";

export const Route = createFileRoute("/auth/register/success")({
  validateSearch: zodValidator(sendVerificationEmailSchema),
  beforeLoad: ({ search }) => {
    if (!search.name || !search.email || !search.id)
      throw redirect({ to: "/auth/login", replace: true });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const registerData = Route.useSearch();
  const mutation = authHelpers.useSendVerifyEmailMutation();
  const [coolDownTime, setCoolDownTime] = useState(0);
  const navigate = useNavigate({ from: "/auth/register/success" });

  const handleSendVerifyEmail = async () => {
    if (coolDownTime > 0) return;
    try {
      const response = await mutation.mutateAsync({ id: registerData.id });
      setCoolDownTime(response.data?.coolDownTime || 0);
      successToast(response.message);
    } catch (error) {
      if (error.code === ErrorCodes.AlreadyDone) {
        errorToast("User already verified. Please login!");
        navigate({ to: "/auth/login", replace: true });
        return;
      }
      if (error.code === ErrorCodes.NotFound) {
        errorToast("User not found. Please register!");
        navigate({ to: "/auth/register", replace: true });
        return;
      }
      if (error.code === ErrorCodes.RateLimit) {
        errorToast(error.message);
        setCoolDownTime(error.details.coolDownTime);
        return;
      }
      errorToast(error.message);
    }
  };

  useEffect(() => {
    handleSendVerifyEmail();
  }, []);

  useEffect(() => {
    if (coolDownTime > 0) {
      const timeoutId = setTimeout(() => {
        setCoolDownTime((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [coolDownTime]);

  if (mutation.isIdle || mutation.isPending) return <RegisterSuccessSkeleton />;

  return (
    <div className="flex flex-col gap-8 grow">
      <div className="flex flex-col justify-center items-center gap-5 text-2xl font-bold text-center">
        <h3>Hurrah &#127881;! Thanks for registering</h3>
        <h3 className="bg-primary/10 px-3 py-2 rounded text-primary">
          {registerData.name}
        </h3>
      </div>
      <Card className="max-w-md w-full mx-auto h-full">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            Please check your inbox to verify your email. After that, you can
            login to our app. If not then check your spam folder.{" "}
            <strong>({registerData.email})</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-2">
          <Button
            disabled={coolDownTime > 0}
            type="button"
            onClick={handleSendVerifyEmail}
            variant={coolDownTime > 0 ? "destructive" : "default"}
            block
          >
            {coolDownTime > 0
              ? `${coolDownTime} seconds`
              : "Resend Verification Email"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
