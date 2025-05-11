import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "./common/card";

export const RegisterSuccessSkeleton = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 text-2xl font-bold text-center">
        <Skeleton className="w-[450px] h-10" />
        <Skeleton className="w-[200px] h-10" />
      </div>
      <div className="max-w-md w-full mx-auto h-full">
        <Skeleton className="w-full h-[175px] rounded-xl" />
      </div>
    </>
  );
};
