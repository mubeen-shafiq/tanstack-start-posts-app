import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/home/")({
  component: HomePage,
});

function HomePage() {
  return <div className="grow">Hello "/app/home/"!</div>;
}

