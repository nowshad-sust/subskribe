import { Request, Response, NextFunction } from "express";

// middleware for doing role-based permissions
export const hasRole = (...allowed: string[]) => {
  const isAllowed = (role: string) => allowed.indexOf(role) > -1;

  // return a middleware
  return (req: Request, res: Response, next: NextFunction) => {
    const role: string = res.locals.jwtPayload.role as string;
    if (role && isAllowed(role)) next();
    // role is allowed, so continue on the next middleware
    else {
      res.formatter.forbidden("Forbidden");
    }
  };
};
