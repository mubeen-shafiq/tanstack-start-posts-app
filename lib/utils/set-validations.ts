import { UseFormSetError } from "react-hook-form";

export const setValidations = (
  setError: UseFormSetError<any>,
  errors?: any,
) => {
  if (errors) {
    for (const key in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, key)) {
        const errorText = errors[key];
        if (errorText) setError(key, { message: errorText });
      }
    }
  }
};
