import { COOL_DOWN_TIME } from "@/lib/utils";

export const resolveBaseUrl = (segment: string) =>
  process.env.BASE_URL! + segment;

export const getCoolDownTimeForEmailVerification = (
  attemptAt: Date,
  attempts: number,
) => {
  const currentTimeStamp = Math.floor(Date.now() / 1000);
  const attemptAtTimeStamp = Math.floor(attemptAt.getTime() / 1000);
  const timeDiff = currentTimeStamp - attemptAtTimeStamp;
  const coolDownTime =
    COOL_DOWN_TIME[attempts - 1] ?? COOL_DOWN_TIME[COOL_DOWN_TIME.length - 1];

  return timeDiff >= coolDownTime ? 0 : coolDownTime - timeDiff;
};
