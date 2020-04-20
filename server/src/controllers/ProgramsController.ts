import { Request, Response } from "express";
import { getAll } from "../services/programs";

const listAll = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string);
  const limit: number = parseInt(req.query.limit as string);
  const data = await getAll({ page, limit });
  res.status(200).json(data);
};

export default {
  listAll,
};
