import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 1100 },
});

await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });

await page.screenshot({
  path: "artifacts/homepage.png",
  fullPage: true,
});

await browser.close();
