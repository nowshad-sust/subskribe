import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils";

export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
