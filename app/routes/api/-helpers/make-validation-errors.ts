import { ZodError } from "zod";

export const makeValidationErrors = <T>(error: ZodError<T>) => {
  return Object.keys(error.flatten().fieldErrors).reduce(
    (acc, key) => ({
      ...acc,
      [key]: error.flatten().fieldErrors[key][0],
    }),
    {},
  ) as Record<keyof T, string>;
};
