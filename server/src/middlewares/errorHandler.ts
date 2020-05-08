import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils";

interface LooseObject {
  [key: number]: string;
}

const responseMap: LooseObject = {
  400: "badRequest",
  401: "unauthorized",
  403: "forbidden",
  404: "notFound",
  405: "methodNotAllowed",
  408: "timeout",
  409: "conflict",
  422: "unprocess",
  429: "tooManyRequests",
  500: "serverError",
  502: "badGateway",
  503: "serviceUnavailable",
  504: "gatewayTimeout",
};

export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, message }: { statusCode: number; message: string } = err;
  const errorType: string = responseMap[statusCode] as string;
  if (errorType) {
    res.formatter[errorType](message);
  } else {
    throw err;
  }
};
