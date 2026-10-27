import jwt from "jsonwebtoken";

export const verifyToken = async (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch {
    return null;
  }
};