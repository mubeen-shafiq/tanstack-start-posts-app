import { HeartIcon } from "lucide-react";
export const AppFooter = () => {
  return (
    <footer className="h-12 bg-background border-t text-secondary-foreground  font-semibold">
      <div className="h-full container flex items-center justify-between">
        <div className="flex gap-1 items-center">
          Made with{" "}
          <span>
            <HeartIcon size={16} className="text-destructive" />
          </span>{" "}
          by Mubeen Shafiq
        </div>
        <div>
          Copyright &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
};
