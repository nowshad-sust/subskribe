import express, { Router } from "express";
import auth from "./auth";
import programs from "./programs";

const routes = Router();

routes.use("/auth", auth);
routes.use("/programs", programs);

export default routes;
