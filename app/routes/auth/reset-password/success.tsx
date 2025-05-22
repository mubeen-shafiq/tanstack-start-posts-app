import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/reset-password/success")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grow flex justify-center items-center">
      <div className="max-w-md w-full mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Reset password successfully!</CardTitle>
            <CardDescription>
              You have successfully reset your password. Please login to enjoy
              our services!
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <Button type="button" block asChild>
              <Link to="/auth/login" replace>
                Login to Continue
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
