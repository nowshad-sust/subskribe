import * as jwt from "jsonwebtoken";
import { checkJwt } from "../middlewares/checkJwt";

const jwtSecret: string = process.env.JWT_SECRET as string;
const jwtExpiresIn: string = process.env.JWT_EXPIRES_IN as string;

export const generateToken = (userId: number, email: string, role: string) =>
  jwt.sign({ userId, email, role }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
