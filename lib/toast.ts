import toast, { ToastOptions } from "react-hot-toast";

export const successToast = (message: string, options?: ToastOptions) =>
  toast.success(message, options);

export const errorToast = (message: string, options?: ToastOptions) =>
  toast.error(message, options);
