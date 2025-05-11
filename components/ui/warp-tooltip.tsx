import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent } from "./tooltip";
import { ReactNode } from "react";

export const WrapTooltip = ({
  trigger,
  children,
  asChild = false,
}: {
  trigger: ReactNode;
  children: ReactNode;
  asChild?: boolean;
}) => (
  <Tooltip>
    <TooltipTrigger asChild={asChild}>{trigger}</TooltipTrigger>
    <TooltipContent>{children}</TooltipContent>
  </Tooltip>
);
