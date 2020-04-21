import { getConnection, EntityManager, getRepository } from "typeorm";
import { upsert } from "../utils/typeormUpsert";
import { Program } from "../entity/Program";
import { transformProgram } from "../transformers/program";
import { Pagination } from "../types";

const batchSave = async (rawPrograms: any) => {
  const programs = rawPrograms.map(transformProgram);
  const connection = getConnection();
  const upserted_post = await upsert(connection.manager, Program, programs, {
    pk: "slug",
  });
  return await upserted_post;
};

const getAll = async ({ page, limit }: Pagination) => {
  return await getRepository(Program)
    .createQueryBuilder()
    .orderBy("id", "DESC")
    .take(limit)
    .skip((page - 1) * limit)
    .getMany();
};

export { batchSave, getAll };
