import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import { checkIfUnencryptedPasswordIsValid } from "./auth";
import { ErrorHandler } from "../utils/index";
import { validate, ValidationError } from "class-validator";

const saltRounds: number = parseInt(process.env.JWT_SALT_ROUNDS as string);

export const getUserByEmail = async (email: string) => {
  return await User.findOneOrFail({ where: { email } });
};

export const getUserById = async (id: number) => {
  return await User.findOneOrFail(id);
};

const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, saltRounds);
};

export const updatePassword = async (
  userId: number,
  oldPassword: string,
  newPassword: string
) => {
  let user: User;
  try {
    // Get user from the database
    user = await getUserById(userId);
  } catch (id) {
    throw new ErrorHandler(401, "unauthorized");
  }

  // Check if old password matchs
  if (!checkIfUnencryptedPasswordIsValid(user.password, oldPassword)) {
    throw new ErrorHandler(401, "unauthorized");
  }

  const errors = await validate(user);
  if (errors.length > 0) {
    const message = errors
      .map((error: ValidationError) =>
        Object.values(error.constraints as object)
      )
      .join(", ");
    throw new ErrorHandler(401, message);
  }
  // Hash the new password and save
  user.password = hashPassword(newPassword);
  return await User.save(user);
};

export const createUser = async (email: string, password: string) => {
  const user = new User();
  user.email = email;
  user.password = hashPassword(password);

  return await User.save(user);
};
