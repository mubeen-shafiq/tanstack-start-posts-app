import { Link, redirect } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Fragment } from "react/jsx-runtime";
import { useSession } from "@/lib/hooks/use-session";
import { LogOut } from "lucide-react";
import { createServerFn } from "@tanstack/react-start";
import { deleteCookie } from "@tanstack/react-start/server";
import { WrapTooltip } from "../ui/warp-tooltip";

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
  return (
    <Comp {...(!hideLinks && { className: "flex gap-8 items-center" })}>
      {!hideLinks && (
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
      )}
      {session ? (
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
      ) : (
        <div className="flex gap-2 items-center">
          <Link to="/auth/login">
            <Button type="button">Login</Button>
          </Link>
          <Link to="/auth/register">
            <Button type="button" variant="outline">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </Comp>
  );
};
