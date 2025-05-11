import jwt from "jsonwebtoken";

const envJwtSecret = process.env.JWT_SECRET!;

export const signToken = (
  payload: string | Buffer | object,
  config: jwt.SignOptions,
) => jwt.sign(payload, envJwtSecret, config);

export const verifyToken = (token: string) => jwt.verify(token, envJwtSecret);
