import { AppLogo } from "./app-logo";
import { AppNavigation } from "./app-navigation";

type PropsType = {
  hideLinks?: boolean;
};

export const AppNavbar = ({ hideLinks }: PropsType) => {
  return (
    <header className="sticky top-0 bg-background border-b border-border h-16">
      <div className="container flex items-center justify-between h-full">
        <AppLogo />
        <AppNavigation hideLinks={hideLinks} />
      </div>
    </header>
  );
};
