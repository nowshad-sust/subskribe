import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils";

export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, message } = err;
  res.locals.error = err;
  const status = statusCode >= 100 && statusCode < 600 ? statusCode : 500;
  res.status(statusCode).json({
    message,
    statusCode: status,
    status: "error",
  });
};
