import * as jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/index";
import { getUserByEmail } from "./user";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";

const jwtSecret: string = process.env.JWT_SECRET as string;
const jwtExpiresIn: string = process.env.JWT_EXPIRES_IN as string;

export const generateToken = (userId: number, email: string, role: string) =>
  jwt.sign({ userId, email, role }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });

export const loginUser = async (email: string, password: string) => {
  let user: User;
  try {
    user = await getUserByEmail(email);
  } catch (error) {
    throw new ErrorHandler(401, "unauthorized");
  }

  // Check if encrypted password match
  if (!checkIfUnencryptedPasswordIsValid(user.password, password)) {
    throw new ErrorHandler(401, "unauthorized");
  }
  return generateToken(user.id, user.email, user.role);
};

export const checkIfUnencryptedPasswordIsValid = (
  password: string,
  unencryptedPassword: string
) => {
  return bcrypt.compareSync(unencryptedPassword, password);
};
