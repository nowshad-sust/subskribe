import path from "path";
import { DatabaseType } from "typeorm";

const {
  APP_PORT,
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

const appConfig = {
  port: APP_PORT,
};

const dbConfig = {
  type: DB_TYPE as "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [path.join(__dirname, "../entity/*.ts")],
  synchronize: true,
  logging: false,
};

export { appConfig, dbConfig };
