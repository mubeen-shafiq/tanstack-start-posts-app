import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Fragment } from "react/jsx-runtime";
import { useSession } from "@/lib/hooks/use-session";
import { LogOut } from "lucide-react";
import { WrapTooltip } from "../ui/warp-tooltip";
import { useCallback } from "react";

const navLinks = [
  {
    title: "Home",
    path: "/app/home",
  },
  {
    title: "Posts",
    path: "/app/posts",
  },
  {
    title: "Users",
    path: "/app/users",
  },
];

export const AppNavigation = ({
  hideLinks = false,
}: {
  hideLinks?: boolean;
}) => {
  const { session, logout } = useSession();

  const Comp = hideLinks ? Fragment : "nav";

  const renderNavLinks = useCallback(() => {
    if (hideLinks) return null;
    return (
      <ul className="flex gap-2 items-center">
        {navLinks.map((link, idx) => (
          <li key={idx}>
            <Link
              activeOptions={{ exact: false, includeSearch: true }}
              activeProps={{
                className:
                  "pointer-events-none text-primary bg-primary/10 font-semibold",
              }}
              className="px-3 py-1 inline-flex items-center transition ease-out rounded hover:text-primary"
              to={link.path}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }, [hideLinks]);

  const renderAuthLinks = useCallback(() => {
    if (session)
      return (
        <WrapTooltip
          trigger={
            <Button
              size="icon"
              variant="outline"
              type="button"
              onClick={() => logout()}
            >
              <LogOut />
            </Button>
          }
        >
          Logout
        </WrapTooltip>
      );
    return (
      <div className="flex gap-2 items-center">
        <Button type="button" asChild>
          <Link to="/auth/login">Login</Link>
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link to="/auth/register">Sign Up</Link>
        </Button>
      </div>
    );
  }, [session, logout]);
  return (
    <Comp {...(!hideLinks && { className: "flex gap-8 items-center" })}>
      {renderNavLinks()}
      {renderAuthLinks()}
    </Comp>
  );
};
