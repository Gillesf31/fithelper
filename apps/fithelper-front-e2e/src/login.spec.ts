import { expect, test } from '@playwright/test';

const selectors = {
  emailInput: '[data-testid="email-input"]',
  submitButton: '[data-testid="login-submit-button"]',
  emailError: '[data-testid="alert-email-pattern-error"]',
  registerLink: '[data-testid="register-link"]',
  header: 'h1',
};

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display a title', async ({ page }) => {
    await expect(page.locator(selectors.header)).toContainText('Login here!');
  });

  test('submit button should be disable on initial load', async ({ page }) => {
    await expect(page.locator(selectors.submitButton)).toBeDisabled();
  });

  test('should show warning for invalid email with disabled submit button', async ({
    page,
  }) => {
    await page.fill(selectors.emailInput, 'Test email');
    await expect(page.locator(selectors.emailError)).toContainText(
      'Your input should be an email!',
    );
    await expect(page.locator(selectors.submitButton)).toBeDisabled();
  });

  test('should enable submit button when a valid email is entered', async ({
    page,
  }) => {
    await page.fill(selectors.emailInput, 'john.doe@fithelper.com');
    await expect(page.locator(selectors.submitButton)).toBeEnabled();
  });

  test('should redirect', async ({ page }) => {
    await page.click(selectors.registerLink);
    await expect(page).toHaveURL('/register');
  });
});
