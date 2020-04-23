import { Request, Response } from "express";
import {
  getAll,
  attachDetachProgram,
  listFavourites,
} from "../services/programs";

const listAll = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string, 10);
  const limit: number = parseInt(req.query.limit as string, 10);
  const data = await getAll({ page, limit });
  res.formatter.ok(data);
};

const toggleInFavourites = async (req: Request, res: Response) => {
  const userId: number = res.locals.jwtPayload.userId;
  const programId: number = parseInt(req.body.programId as string, 10);

  const result = await attachDetachProgram({ userId, programId });
  res.formatter.ok(result);
};

const getFavourites = async (req: Request, res: Response) => {
  const userId: number = res.locals.jwtPayload.userId;
  const favourites = await listFavourites(userId);
  res.formatter.ok(favourites);
};

export default {
  listAll,
  toggleInFavourites,
  getFavourites,
};
