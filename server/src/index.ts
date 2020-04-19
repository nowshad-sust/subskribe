require("dotenv").config();
import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import router from "./routes";
import { fetchPrograms } from "./jobs";
import { appConfig } from "./config";
const dbConfig = require("./db");

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

    app.listen(appConfig.port, () => {
      console.info(
        `App is listening on port http://localhost:${appConfig.port}!`
      );
    });
  })
  .catch((error) => console.error(error));
