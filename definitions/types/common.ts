export type ValueOf<T> = T[keyof T];

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
