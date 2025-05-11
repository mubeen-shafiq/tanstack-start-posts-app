import { useSuspenseQuery } from "@tanstack/react-query";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { deleteCookie, getCookie } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";

export type SessionUser = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string | null;
};

export const getSessionServerFn = createServerFn({ method: "GET" }).handler(
  () => {
    const user = getCookie("auth-user");
    if (!user || user == "null" || user == "undefined") return null;
    const token = getCookie("auth-token");
    if (!token || token == "null" || token == "undefined") return null;

    return { user: JSON.parse(user) as SessionUser, token };
  },
);

export const logoutServerFn = createServerFn({ method: "POST" }).handler(() => {
  deleteCookie("auth-user");
  deleteCookie("auth-token");
  throw redirect({ to: "/auth/login", replace: true });
});

export const useSession = () => {
  const getSession = useServerFn(getSessionServerFn);
  const handleLogout = useServerFn(logoutServerFn);
  const query = useSuspenseQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  return { session: query.data, logout: handleLogout };
};
