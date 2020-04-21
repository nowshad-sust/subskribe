import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import programValidator from "../validation/program";
import ProgramController from "../controllers/ProgramController";

const router = Router();

router.get(
  "/",
  programValidator.getAll,
  expressAsyncHandler(ProgramController.listAll)
);

export default router;
