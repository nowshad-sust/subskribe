import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as bodyParser from "body-parser";
import router from "../routes";

const app: express.Application = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/", router);

export default app;
