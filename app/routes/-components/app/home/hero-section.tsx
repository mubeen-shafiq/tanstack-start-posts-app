import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const HomeHeroSection = () => {
  return (
    <section className="flex flex-col gap-10 justify-center items-center bg-blend-overlay bg-[url('/assets/banners/hero-1.jpg')] bg-size-[100%_100%] bg-foreground/95 bg-no-repeat h-[600px]">
      <h1 className="text-5xl font-bold text-background">
        Welcome to <span className="text-primary">Tanstack Start</span>
      </h1>
      <div className="flex gap-2 items-center">
        <Button type="button" variant="outline" size="lg" asChild>
          <Link to="/app/posts">Explore Posts</Link>
        </Button>
        <Button type="button" size="lg" asChild>
          <Link to="/app/users">Explore Users</Link>
        </Button>
      </div>
    </section>
  );
};
