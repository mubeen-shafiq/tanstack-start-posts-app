import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { createFileRoute, Link } from "@tanstack/react-router";
import * as zod from "zod";

const verifyEmailResultsSchema = zod.strictObject({
  status: zod.enum(["success", "error"]),
});

export const Route = createFileRoute("/auth/verify-email/$status")({
  params: verifyEmailResultsSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { status } = Route.useParams();
  return (
    <Card className="max-w-md mx-auto py-10 w-full">
      <CardContent className="flex flex-col justify-center items-center gap-8">
        <h3
          className={cn(
            "text-center text-2xl font-semibold",
            status === "error" && "text-destructive",
          )}
        >
          {status === "success"
            ? "Email verified successfully!"
            : "Email verification failed!"}
        </h3>

        <Button asChild type="button" variant="default">
          <Link to="/auth/login">Login Here</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
