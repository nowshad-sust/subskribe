import { Request, Response, Router } from "express";
import { validate, ValidationError } from "class-validator";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { generateToken } from "../services/auth";
import { ErrorHandler } from "../utils/index";
import {
  getUserByEmail,
  getUserById,
  createUser,
  updatePassword,
} from "../services/user";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user: User;
  try {
    user = await getUserByEmail(email);
  } catch (error) {
    throw new ErrorHandler(401, "unauthorized");
  }

  // Check if encrypted password match
  if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    throw new ErrorHandler(401, "unauthorized");
  }

  // Sing JWT, valid for 1 hour
  const token = generateToken(user.id, user.email, user.role);

  // Send the jwt in the response
  res.status(200).json(token);
};

const changePassword = async (req: Request, res: Response) => {
  // Get ID from JWT
  const id = res.locals.jwtPayload.userId;

  // Get parameters from the body
  const { oldPassword, newPassword } = req.body;
  if (!(oldPassword && newPassword)) {
    throw new ErrorHandler(400, "bad request");
  }

  let user: User;
  try {
    // Get user from the database
    user = await getUserById(id);
  } catch (id) {
    throw new ErrorHandler(401, "unauthorized");
  }

  // Check if old password matchs
  if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
    throw new ErrorHandler(401, "unauthorized");
  }

  user.password = newPassword;
  const errors = await validate(user);
  if (errors.length > 0) {
    const message = errors
      .map((error: ValidationError) =>
        Object.values(error.constraints as Object)
      )
      .join(", ");
    throw new ErrorHandler(401, message);
  }

  await updatePassword(user);

  res.status(201).json("password updated!");
};

export default {
  login,
  changePassword,
};
