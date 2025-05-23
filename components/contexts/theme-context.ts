import { AppTheme } from "@/definitions/enums/common";
import { ThemeContextValue } from "@/definitions/types/common";
import { createContext } from "react";

export const ThemeContext = createContext<ThemeContextValue>({
  theme: AppTheme.System,
  changeTheme: () => {
    return;
  },
});
