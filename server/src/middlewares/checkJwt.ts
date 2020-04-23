import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/index";

const jwtSecret: string = process.env.JWT_SECRET as string;

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  // Get the jwt token from the head
  const token: string = req.headers.authorization as string;
  if (!token) {
    throw new ErrorHandler(401, "unauthorized");
  }

  let jwtPayload;

  // Try to validate the token and get data
  try {
    jwtPayload = jwt.verify(token.replace("Bearer ", ""), jwtSecret) as any;
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
    throw new ErrorHandler(401, "unauthorized");
  }

  // The token is valid for 1 hour
  // We want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, jwtSecret, {
    expiresIn: "1h",
  });
  res.setHeader("token", newToken);

  // Call the next middleware or controller
  next();
};
