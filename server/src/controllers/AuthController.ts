import { Request, Response, Router } from "express";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { generateToken } from "../services/auth";
import {
  getUserByEmail,
  getUserById,
  createUser,
  updatePassword,
} from "../services/user";

const login = async (req: Request, res: Response) => {
  // Check if email and password are set
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).json("bad request");
  }

  let user: User;
  try {
    // Get user from database
    user = await getUserByEmail(email);
  } catch (error) {
    return res.status(401).json("unauthorized");
  }

  // Check if encrypted password match
  if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    return res.status(401).json("unauthorized");
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
    res.status(400).json("bad request");
  }

  let user: User;
  try {
    // Get user from the database
    user = await getUserById(id);
  } catch (id) {
    return res.status(401).json("unauthorized");
  }

  // Check if old password matchs
  if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
    return res.status(401).json("unauthorized");
  }

  user.password = newPassword;
  const errors = await validate(user);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  await updatePassword(user);

  res.status(201).json("password updated!");
};

export default {
  login,
  changePassword,
};
