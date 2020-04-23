import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import programValidator from "../validation/program";
import ProgramController from "../controllers/ProgramController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.get(
  "/",
  [programValidator.getAll],
  expressAsyncHandler(ProgramController.listAll)
);

router.get(
  "/favourites",
  [checkJwt],
  expressAsyncHandler(ProgramController.getFavourites)
);

router.post(
  "/favourites",
  [checkJwt],
  expressAsyncHandler(ProgramController.toggleInFavourites)
);

export default router;
