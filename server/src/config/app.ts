import { errorHandler } from "./../middlewares/errorHandler";
import express from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import * as bodyParser from "body-parser";
import { errors } from "celebrate";
import routes from "../routes";

const app: express.Application = express();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", routes);
app.use(errors());
app.use(errorHandler);

export default app;
