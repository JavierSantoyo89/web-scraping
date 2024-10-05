import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

const page = await browser.newPage();

await page.goto("https://github.com/JavierSantoyo89/Estudios");

const courses = await page.$$eval(
  ".react-directory-row-name-cell-large-screen",
  (results) =>
    results.map((el) => {
      const title = el.querySelector(".Link--primary")?.innerText;
      if (!title) return "not title";
      const link =
        "https://github.com" +
        el.querySelector(".Link--primary")?.getAttribute("href");
      if (!link) return "not link";
      return {
        title,
        link,
      };
    })
);
console.log(courses);
await browser.close();
