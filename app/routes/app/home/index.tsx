import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeHeroSection } from "../../-components/app/home/hero-section";
import { HomePostsSection } from "../../-components/app/home/posts-section";
import { HomeUsersSection } from "../../-components/app/home/users-section";
import { HomeCommentsSection } from "../../-components/app/home/comments-section";

export const Route = createFileRoute("/app/home/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-col gap-5">
      <HomeHeroSection />
      <HomePostsSection />
      <HomeUsersSection />
      <HomeCommentsSection />
    </div>
  );
}
