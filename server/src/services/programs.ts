import { getConnection, getRepository } from "typeorm";
import { Program } from "../entity/Program";
import { transformProgram } from "../transformers/program";
import { Pagination } from "../types";

const batchSave = async (rawPrograms: any) => {
  const programs = rawPrograms.map(transformProgram);
  const programRepository = getRepository(Program);
  return await programRepository.save(programs);
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
