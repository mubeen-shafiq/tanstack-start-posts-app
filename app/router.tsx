import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { QueryClient } from "@tanstack/react-query";

import { routeTree } from "./routeTree.gen";

export function createRouter() {
  const queryClient = new QueryClient();
  const router = routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      scrollRestoration: true,
      context: { queryClient },
    }),
    queryClient,
  );

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
