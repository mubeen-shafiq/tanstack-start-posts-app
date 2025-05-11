import { createFileRoute } from "@tanstack/react-router";
import * as zod from "zod";

const verifyEmailResultsSchema = zod.strictObject({
  status: zod.enum(["success", "error"]),
});

export const Route = createFileRoute("/auth/verify-email/$status")({
  params: verifyEmailResultsSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return (
    <div>
      {params.status === "success"
        ? "Email is verified!"
        : "Unable to verify email!"}
    </div>
  );
}

