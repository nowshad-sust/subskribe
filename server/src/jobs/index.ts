import { CronJob } from "cron";
import { fetchPages } from "./fetchPrograms";

const job = new CronJob(
  "0 0 0 * * *", // every mid night
  fetchPages,
  null,
  true,
  "America/Los_Angeles"
);

job.start();
