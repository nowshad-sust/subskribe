import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { checkJwt } from "../middlewares/checkJwt";
import authValidator from "../validation/auth";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";

const router = Router();

router.post(
  "/login",
  authValidator.login,
  expressAsyncHandler(AuthController.login)
);
router.post(
  "/register",
  authValidator.register,
  expressAsyncHandler(UserController.register)
);
router.post(
  "/change-password",
  [authValidator.changePassword, checkJwt],
  expressAsyncHandler(AuthController.changePassword)
);

export default router;
