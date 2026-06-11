import { Page, Locator } from "@playwright/test";

/**
 * Page Object for the Login page (/login).
 * Encapsulates all locators and interactions for login UI testing.
 * Used by all Playwright e2e specs that require authentication.
 */
export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorBanner: Locator;
  readonly emailError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput    = page.getByTestId("email-input");
    this.passwordInput = page.getByTestId("password-input");
    this.submitButton  = page.getByTestId("login-submit");
    this.errorBanner   = page.getByTestId("error-banner");
    this.emailError    = page.getByTestId("email-error");
  }

  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.goto();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }
}
