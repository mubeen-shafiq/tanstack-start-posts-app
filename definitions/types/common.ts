import { AppTheme } from "../enums/common";

export type ValueOf<T> = T[keyof T];

export type ChildrenProp = Readonly<{ children: React.ReactNode }>;

export type ApiResponse<T = undefined> = {
  message: string;
  success: boolean;
  data: T;
};

export type ApiError = {
  message: string;
  success: boolean;
  details?: any;
};

export type ThemeContextValue = {
  theme: AppTheme;
  changeTheme: (theme: AppTheme) => void;
};
