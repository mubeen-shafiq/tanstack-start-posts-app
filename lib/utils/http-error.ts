import { AxiosError } from "axios";
import { ApiError } from "@/definitions/types/common";

export const createHttpError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    return (
      error.response?.data || { success: false, message: "Runtime exception" }
    );
  }

  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: false,
    message: "Something happened from our end. Please try again later.",
  };
};
