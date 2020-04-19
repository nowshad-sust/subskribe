import express from "express";
import { getAll } from "../services/programs";

const router = express.Router();

router.get("/programs", async (req, res) => {
  const data = await getAll();
  res.status(200).json(data);
});

router.get("/about", function (req, res) {
  res.send("About us");
});

export default router;
