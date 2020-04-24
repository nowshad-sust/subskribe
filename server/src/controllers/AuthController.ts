import { Request, Response, Router } from "express";
import { validate, ValidationError } from "class-validator";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { ErrorHandler } from "../utils/index";
import { generateToken, loginUser } from "../services/auth";
import {
  getUserByEmail,
  getUserById,
  createUser,
  updatePassword,
} from "../services/user";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  res.formatter.ok(result);
};

const changePassword = async (req: Request, res: Response) => {
  const id = res.locals.jwtPayload.userId;
  const { oldPassword, newPassword } = req.body;
  const result = await updatePassword(id, oldPassword, newPassword);
  res.formatter.created(result);
};

export default {
  login,
  changePassword,
};
