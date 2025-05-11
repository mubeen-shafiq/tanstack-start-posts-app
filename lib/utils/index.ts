export const makeFullName = (firstName: string, lastName?: string | null) =>
  firstName + (lastName ? " " + lastName : "");

export const COOL_DOWN_TIME = [30, 60, 120, 180, 240, 300];
