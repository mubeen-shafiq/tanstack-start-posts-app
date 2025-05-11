import { AppFooter } from "@/components/core/app-footer";
import { AppNavbar } from "@/components/core/app-navbar";
import { getSessionServerFn } from "@/lib/hooks/use-session";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  beforeLoad: async () => {
    const session = await getSessionServerFn();
    if (session) {
      throw redirect({
        to: "/app/home",
        replace: true,
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppNavbar hideLinks />
      <main className="container py-5 flex flex-col grow">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
