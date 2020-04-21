import puppeteer, { Browser } from "puppeteer";
import queryString from "query-string";
import { batchSave } from "../services/programs";
import { getProxy } from "./proxies";

const ROOT_URL = "https://api.reelgood.com/v3.0/content/browse/filtered";
const ROW_PER_PAGE = 20;
const TEMP_PAGE_LIMIT = 2;
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
  take: `${ROW_PER_PAGE}`,
  year_end: "2020",
  year_start: "1980",
};

// const totalPages = 64220;
// const obj = {
//   metadata: {
//     content_kind: null,
//     display_name: null,
//     page_description: "lol",
//     page_subtext: null,
//     row_subtext: null,
//     ad_data: null,
//     ad_conditions: null,
//     disabled_filters: [],
//   },
//   results: [],
//   has_more: false,
//   slug: null,
//   display_name: null,
// };

let browser: Browser;

export const fetchPages = async () => {
  console.log("Crawling started");
  const initBrowser = async () => {
    const proxy = getProxy();
    browser = await puppeteer.launch({
      args: [`--proxy-server=http://${proxy}`, "--incognito"],
    });
  };
  let page = 1;
  let hasNextPage = true;

  await initBrowser();
  for (page = 0; hasNextPage; ) {
    try {
      const { results, has_more } = await fetchPage(page);
      if (results.length > 0) {
        await batchSave(results);
      }
      if (page === TEMP_PAGE_LIMIT) {
        hasNextPage = false;
      }
      page = page + 1;
    } catch {
      initBrowser();
    }
  }
  await browser.close();
  console.log("Crawling ended");
};

const fetchPage = async (page: number) => {
  const updatedQuery = {
    ...queryParams,
    skip: `${(page - 0) * ROW_PER_PAGE}`,
  };
  const url = queryString.stringifyUrl({ url: ROOT_URL, query: updatedQuery });

  const tab = await browser.newPage();
  await tab.goto(url);

  const data = await tab.evaluate(() =>
    JSON.parse(document.querySelector("body")?.innerText || "{}")
  );
  await tab.goto("about:blank");
  await tab.close();
  return data;
};
