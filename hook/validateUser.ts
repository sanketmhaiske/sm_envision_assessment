import jwt from "jsonwebtoken";
export const validateUser = (token:string) => {
     const user = jwt.verify(token, process.env.JWT_SECRET as string);
     return user
}