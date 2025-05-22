import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/home/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="grow flex flex-col">
      <div className="flex flex-col gap-8 justify-center items-center bg-blend-overlay bg-[url('/assets/banners/hero-1.jpg')] bg-size-[100%_100%] bg-foreground/95 bg-no-repeat grow">
        <h1 className="text-5xl font-bold text-background">
          Welcome to <span className="text-primary">Tanstack Start</span>
        </h1>
        <div className="flex gap-2 items-center">
          <Button type="button" variant="outline" size="lg">
            Explore Posts
          </Button>
          <Button type="button" size="lg">
            Explore Users
          </Button>
        </div>
      </div>
    </div>
  );
}
