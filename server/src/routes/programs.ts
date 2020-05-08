import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import programValidator from "../validation/program";
import ProgramController from "../controllers/ProgramController";
import { checkJwt } from "../middlewares/checkJwt";
import { optionalJwt } from "./../middlewares/optionalJwt";
import { hasRole } from "../middlewares/hasRole";

const router = Router();

router.get(
  "/",
  [programValidator.getAll, optionalJwt],
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

router.get(
  "/requests",
  [checkJwt, hasRole("admin")],
  expressAsyncHandler(ProgramController.getRequests)
);

router.put(
  "/requests/approve",
  [checkJwt, hasRole("admin")],
  expressAsyncHandler(ProgramController.approveRequest)
);

router.post(
  "/requests",
  [programValidator.request, checkJwt],
  expressAsyncHandler(ProgramController.requestProgram)
);

export default router;
