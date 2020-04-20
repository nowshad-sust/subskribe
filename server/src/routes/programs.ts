import { Router } from "express";
import ProgramController from "../controllers/ProgramsController";

const router = Router();

router.get("/", ProgramController.listAll);

export default router;
