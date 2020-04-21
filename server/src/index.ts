require("dotenv").config();
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import app from "./config/app";
import { appConfig } from "./config/env";
import "./jobs";

// Establish database connection
createConnection()
  .then((connection: Connection) => {
    app.listen(appConfig.port, () => {
      console.info(
        `App is listening on port http://localhost:${appConfig.port}!`
      );
    });
  })
  .catch((error: any) => console.error(error));
