import { useScroll } from "@/lib/hooks/use-scroll";
import { AppLogo } from "./app-logo";
import { AppNavigation } from "./app-navigation";
import { cn } from "@/lib/utils/cn";

type PropsType = {
  hideLinks?: boolean;
};

const SCROLL_THRESHOLD = 75;

export const AppNavbar = ({ hideLinks }: PropsType) => {
  const { isScrolled } = useScroll(SCROLL_THRESHOLD);
  return (
    <header
      className={cn(
        "fixed z-50 left-0 w-full transition-colors duration-300 top-0 h-16",
        isScrolled
          ? "bg-card drop-shadow-md"
          : "bg-transparent text-background",
        hideLinks && "border-b border-border",
      )}
    >
      <div className="container flex items-center justify-between h-full">
        <AppLogo />
        <AppNavigation isScrolled={isScrolled} hideLinks={hideLinks} />
      </div>
    </header>
  );
};
