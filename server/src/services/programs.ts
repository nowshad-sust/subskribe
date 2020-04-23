import { getConnection, getRepository } from "typeorm";
import { upsert } from "../utils/typeormUpsert";
import { Program } from "../entity/Program";
import { User } from "../entity/User";
import { transformProgram } from "../transformers/program";
import { Pagination, AttachProgram } from "../types";

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

const attachDetachProgram = async ({ userId, programId }: AttachProgram) => {
  const userRepo = getRepository(User);

  const user: User = (await userRepo.findOne(userId, {
    relations: ["programs"],
  })) as User;

  const program: Program = (await getRepository(Program).findOne({
    id: programId,
  })) as Program;

  const programExists = user.programs.findIndex((p) => p.id === programId);
  if (programExists !== -1) {
    user.programs = user.programs.filter((p) => p.id !== programId);
  } else {
    user.programs.push(program);
  }
  return await userRepo.save(user);
};

export { batchSave, getAll, attachDetachProgram };
