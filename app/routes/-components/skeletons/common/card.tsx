import { Skeleton } from "@/components/ui/skeleton";
import React, { Fragment } from "react";

export const CardSkeleton = ({ title = false }: { title?: boolean }) => {
  const Comp = title ? "div" : Fragment;
  return (
    <Comp {...(title ? { className: "flex flex-col space-y-4" } : {})}>
      <Skeleton className="h-[150px] w-[320px] rounded-xl" />
      {title && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      )}
    </Comp>
  );
};
