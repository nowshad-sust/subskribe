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
  port: parseInt(APP_PORT),
};

const dbConfig = {
  type: DB_TYPE,
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
};

export { appConfig, dbConfig };
