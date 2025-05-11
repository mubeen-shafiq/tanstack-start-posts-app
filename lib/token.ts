import crypto from "crypto";

export const generateSecretToken = (userId: string): string => {
  const timestamp = Date.now().toString();

  const payload = `${userId}:${timestamp}`;

  const signature = crypto
    .createHmac("sha256", process.env.OPEN_SSL_SECRET_KEY!)
    .update(payload)
    .digest("base64url");

  // Combine and encode
  const token = `${userId}:${timestamp}:${signature}`;
  return Buffer.from(token).toString("base64url");
};

/**
 * Validate a secret token, return the user's ID if valid, otherwise return null
 * @param {string} token The secret token to validate
 * @param {number} [expireIn] The number of seconds from time of creation that the token should be considered valid. If not passed then there will be no expire time.
 * @returns {{ user: string } | null}
 */
export const validateSecretToken = (
  token: string,
  expireIn?: number,
): { user: string } | null => {
  const decodedSignature = Buffer.from(token, "base64url").toString("utf-8");
  const [userId, timestamp, signature] = decodedSignature.split(":");

  const expectedSignature = crypto
    .createHmac("sha256", process.env.OPEN_SSL_SECRET_KEY!)
    .update(`${userId}:${timestamp}`)
    .digest("base64url");

  const signatureMatched = signature === expectedSignature;
  if (!signatureMatched) return null;

  const payload = { user: userId };

  if (!expireIn) return payload;

  const currentTimeStamp = Date.now() / 1000; // in seconds

  const creationTime = Number(timestamp) / 1000; // in seconds
  const timeDiff = currentTimeStamp - creationTime;

  if (timeDiff > expireIn) return null;

  return payload;
};
