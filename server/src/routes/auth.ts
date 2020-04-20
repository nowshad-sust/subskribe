import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", UserController.register);
router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;
