const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });

  const page = await browser.newPage();

  await page.goto("https://netology.ru/?modal=sign_in");

  await page.click(
    "[data-testid='profile-personal-info-avatar-popup'] button >> nth=0"
  );

  await browser.close();
})();
