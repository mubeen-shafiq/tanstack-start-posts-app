import { AppTheme } from "@/definitions/enums/common";
import { ChildrenProp } from "@/definitions/types/common";
import React, { useEffect, useRef, useState } from "react";
import { ThemeContext } from "../contexts/theme-context";

type ThemeProviderProps = {
  defaultTheme: AppTheme;
} & ChildrenProp;

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [theme, setTheme] = useState<AppTheme>(props.defaultTheme);
  const documentRef = useRef(document);

  useEffect(() => {
    const savedTheme = (localStorage.getItem("app-theme") ??
      props.defaultTheme) as AppTheme;

    changeTheme(savedTheme);
  }, []);

  const changeTheme = (theme: AppTheme) => {
    if (theme === AppTheme.System) {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? AppTheme.Dark
        : AppTheme.Light;
    }

    localStorage.setItem("app-theme", theme);

    // update html className
    if (theme === AppTheme.Dark)
      documentRef.current.documentElement.classList.add("dark");

    if (theme === AppTheme.Light)
      documentRef.current.documentElement.classList.remove("dark");

    setTheme(theme);
  };
  return (
    <ThemeContext value={{ theme, changeTheme }}>{props.children}</ThemeContext>
  );
};
