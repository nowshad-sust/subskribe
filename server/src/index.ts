import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import router from "./routes";
import { fetchPrograms } from "./jobs";

const dbConfig = require("./db");
const PORT = 4000;

// Establish database connection
createConnection(dbConfig)
  .then(async (connection) => {
    // Create a new express app instance
    const app: express.Application = express();

    app.use(bodyParser.json());
    app.use(cors());
    app.use(morgan("dev"));

    app.use("/api/v1/", router);

    // await fetchPrograms();

    app.listen(PORT, () => {
      console.info(`App is listening on port http://localhost:${PORT}!`);
    });
  })
  .catch((error) => console.error(error));
