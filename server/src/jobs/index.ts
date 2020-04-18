import puppeteer = require("puppeteer");
import queryString = require("query-string");
import { batchSave } from "../services/programs";
import { getProxy } from "./proxies";

const ROOT_URL = "https://api.reelgood.com/v3.0/content/browse/filtered";
const queryParams = {
  availability: "onAnySource",
  content_kind: "both",
  hide_seen: "false",
  hide_tracked: "false",
  hide_watchlisted: "false",
  imdb_end: "10",
  imdb_start: "0",
  region: "us",
  rt_end: "100",
  rt_start: "0",
  skip: "0",
  sort: "0",
  take: "50",
  year_end: "2020",
  year_start: "1900",
};

export const fetchPrograms = async () => {
  const proxy = getProxy();
  const url = queryString.stringifyUrl({ url: ROOT_URL, query: queryParams });

  const browser = await puppeteer.launch({
    args: [`--proxy-server=http://${proxy}`, "--incognito"],
  });
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() =>
    JSON.parse(document.querySelector("body")?.innerText || "{}")
  );

  if (data) {
    const res = await batchSave(data.results);
    console.log("db resp: ", res);
  }
  await browser.close();
};
