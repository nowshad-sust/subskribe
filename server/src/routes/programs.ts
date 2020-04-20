import { Router } from "express";
import asyncHandler from "express-async-handler";
import programValidator from "../validation/program";
import ProgramController from "../controllers/ProgramController";

const router = Router();

router.get(
  "/",
  programValidator.getAll,
  asyncHandler(ProgramController.listAll)
);

export default router;
