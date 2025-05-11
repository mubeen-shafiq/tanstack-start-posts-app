import { ValueOf } from "definitions/types/common";

export const USERS = {
  INDEX: "/users",
  SHOW: "/users/:id",
  CREATE: "/users",
  UPDATE: "/users/:id",
  DELETE: "/users/:id",
} as const;

export type UsersEndpointsType = ValueOf<typeof USERS>;
