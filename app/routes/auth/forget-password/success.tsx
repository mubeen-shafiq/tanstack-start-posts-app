import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/forget-password/success")({
  component: ForgetPasswordSuccessPage,
});

function ForgetPasswordSuccessPage() {
  return (
    <div className="grow flex justify-center items-center">
      <div className="max-w-md w-full mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Reset password link sent!</CardTitle>
            <CardDescription>
              Reset password email has been sent to given email address. Please
              check and click on the link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-6">
            <Button type="button" block asChild>
              <Link to="/auth/login" replace>
                Login
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
