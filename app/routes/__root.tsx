import type { ReactNode } from "react";
import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import appCss from "@/app/styles/app.css?url";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppTheme } from "@/definitions/enums/common";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "Tanstack React Start",
        name: "Description",
        content: "Tanstack React Start Basic Learning!",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <ThemeProvider defaultTheme={AppTheme.System}>
        <TooltipProvider>
          <Outlet />
          <Toaster position="top-right" />
        </TooltipProvider>
      </ThemeProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
