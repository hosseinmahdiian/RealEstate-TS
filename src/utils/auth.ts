import { hash, compare } from "bcryptjs";

async function HashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

async function VerifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export { HashPassword as hashPassword, VerifyPassword as verifyPassword };
