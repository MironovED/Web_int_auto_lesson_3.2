const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 2000,
  });

  const page = await browser.newPage();

  await page.goto("https://netology.ru/?modal=sign_in");

  await page.click(".d87LQ");

  await browser.close();
})();
