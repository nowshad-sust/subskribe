import { Request, Response } from "express";
import { createUser } from "../services/user";
import { ErrorHandler } from "../utils/index";

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await createUser(email, password);
  } catch (e) {
    throw new ErrorHandler(409, "email already in use");
  }

  res.formatter.created("User created");
};

export default {
  register,
};
