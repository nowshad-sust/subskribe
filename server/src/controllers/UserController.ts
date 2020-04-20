import { Request, Response } from "express";
import { createUser } from "../services/user";

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await createUser(email, password);
  } catch (e) {
    res.status(409).json("email already in use");
    return;
  }

  res.status(201).json("User created");
};

export default {
  register,
};
