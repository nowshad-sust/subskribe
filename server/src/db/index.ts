module.exports = {
  type: "postgres",
  host: "localhost",
  port: 6543,
  username: "postgres",
  password: "postgres",
  database: "subskribe",
  entities: [__dirname + "/entity/*.ts"],
  synchronize: true,
  logging: false,
};
