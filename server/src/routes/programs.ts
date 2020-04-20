import express, { Request, Response, Router } from "express";
import { getAll } from "../services/programs";
import { Pagination } from "../types";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string);
  const limit: number = parseInt(req.query.limit as string);
  const data = await getAll({ page, limit });
  res.status(200).json(data);
});

export default router;
