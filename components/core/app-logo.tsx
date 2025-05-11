import { Link } from "@tanstack/react-router";

type AppLogoOptions = {
  title?: boolean;
  navigation?: boolean;
};

const defaultOptions = {
  title: true,
  navigation: true,
};

export const AppLogo = ({
  options = defaultOptions,
}: {
  options?: AppLogoOptions;
}) => {
  return (
    <Link
      to={options?.navigation ? "/" : "."}
      className={options?.title ? "flex gap-4 items-center" : undefined}
    >
      <img className="size-10" src="/assets/logos/app-logo.png" />
      {options?.title && (
        <h6 className="text-lg font-semibold">Tanstack Start</h6>
      )}
    </Link>
  );
};
