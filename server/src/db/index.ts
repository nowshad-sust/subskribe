import { dbConfig } from "../config";
module.exports = {
  ...dbConfig,
  entities: [__dirname + "/entity/*.ts"],
  synchronize: true,
  logging: false,
};
