import { makeFullName } from "@/lib/utils";
import { User } from "@prisma/client";

export const makeLoginResponse = (user: User) => ({
  id: user.id,
  email: user.email,
  fullName: makeFullName(user.firstName, user.lastName),
  firstName: user.firstName,
  lastName: user.lastName,
});
