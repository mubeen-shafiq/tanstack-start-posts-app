import bcryptjs from "bcryptjs";

export const createHash = (text: string, salt: number | string = 10) =>
  bcryptjs.hash(text, salt);

export const compareHash = (plainText: string, hash: string) =>
  bcryptjs.compare(plainText, hash);

export const genSalt = (rounds: number = 10) => bcryptjs.genSalt(rounds);
