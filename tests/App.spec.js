import { test, expect } from "@playwright/test";
const user = require("../user");

test("test authorization existing user ", async ({ page }) => {
  // Go to https://netology.ru/
  await page.goto("https://netology.ru/");

  // Click text=Войти
  await page.locator("text=Войти").click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");

  // Click [data-testid="profile-personal-info-avatar-popup"] button >> nth=0
  await page
    .locator('[data-testid="profile-personal-info-avatar-popup"] button')
    .first()
    .click();
  await expect(page).toHaveURL(
    "https://oauth.vk.com/authorize?client_id=7053090&redirect_uri=https%3A%2F%2Fnetology.ru%2Fusers%2Fauth%2Fvkontakte%2Fcallback&response_type=code&scope=user%2Cemail&state=180a689e8cd176ff4f4042da198f8b0f20eae265219096a3"
  );

  // Click input[name="email"]
  await page.locator('input[name="email"]').click();

  // Fill input[name="email"]
  await page.locator('input[name="email"]').fill(user.data.validEmail);

  // Click input[name="pass"]
  await page.locator('input[name="pass"]').click();

  // Fill input[name="pass"]
  await page.locator('input[name="pass"]').fill(user.data.validPassword);

  // Click button:has-text("Войти")
  await page.locator('button:has-text("Войти")').click();
  await expect(page).toHaveURL(
    "https://netology.ru/profile?provider=vkontakte"
  );
});

test("test authorization of a non-existent user", async ({ page }) => {
  // Go to https://netology.ru/
  await page.goto("https://netology.ru/");

  // Click text=Войти
  await page.locator("text=Войти").click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");

  // Click [placeholder="Email"]
  await page.locator('[placeholder="Email"]').click();

  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill(user.data.invalidEmail);

  // Click [placeholder="Пароль"]
  await page.locator('[placeholder="Пароль"]').click();

  // Fill [placeholder="Пароль"]
  await page.locator('[placeholder="Пароль"]').fill(user.data.invalidPassword);

  // Click [data-testid="login-submit-btn"]
  await page.locator('[data-testid="login-submit-btn"]').click();

  // Expect text=Неверный email
  const locator = page.locator("text=Неверный email");
  await expect(locator).toBeVisible();
});
