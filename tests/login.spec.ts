import { test, expect } from "@playwright/test";
import { LoginPage } from "./LoginPage";

test.describe("Login flow", () => {
  test("valid credentials navigate to dashboard", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillEmail("alice@example.com");
    await loginPage.fillPassword("secureP@ss123");
    await loginPage.submit();
    await expect(page).toHaveURL("/dashboard");
    await expect(page.getByTestId("welcome-header")).toContainText("Welcome");
  });

  test("invalid credentials show error message", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillEmail("alice@example.com");
    await loginPage.fillPassword("wrongpassword");
    await loginPage.submit();
    await expect(page.getByTestId("error-banner")).toBeVisible();
    await expect(page.getByTestId("error-banner")).toContainText("Invalid credentials");
  });

  test("empty email shows validation error", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillPassword("somepassword");
    await loginPage.submit();
    await expect(page.getByTestId("email-error")).toBeVisible();
  });

  test("protected route redirects unauthenticated user to login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login\?next=\/dashboard/);
  });
});
