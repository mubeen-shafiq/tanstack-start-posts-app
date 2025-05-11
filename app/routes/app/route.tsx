import { AppFooter } from "@/components/core/app-footer";
import { AppNavbar } from "@/components/core/app-navbar";
import { getSessionServerFn } from "@/lib/hooks/use-session";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  beforeLoad: async ({ location }) => {
    const session = await getSessionServerFn();
    if (!session)
      throw redirect({
        to: "/auth/login",
        replace: true,
        search: { redirect: location.href },
      });
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppNavbar />
      <main className="py-5 flex flex-col container grow">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
