import { Router } from "express";
import asyncHandler from "express-async-handler";
import { checkJwt } from "../middlewares/checkJwt";
import authValidator from "../validation/auth";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/login", authValidator.login, asyncHandler(AuthController.login));
router.post(
  "/register",
  authValidator.register,
  asyncHandler(UserController.register)
);
router.post(
  "/change-password",
  [authValidator.changePassword, checkJwt],
  asyncHandler(AuthController.changePassword)
);

export default router;
