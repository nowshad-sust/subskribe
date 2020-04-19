import { getConnection, getRepository } from "typeorm";
import { Program } from "../entity/Program";
import { transformProgram } from "../transformers/program";

const batchSave = async (rawPrograms: any) => {
  const programs = rawPrograms.map(transformProgram);
  const programRepository = getRepository(Program);
  return await programRepository.save(programs);
};

const getAll = async () => {
  const programRepository = getRepository(Program);
  return await programRepository
    .createQueryBuilder()
    .orderBy("id", "DESC")
    .getMany();
};

export { batchSave, getAll };
