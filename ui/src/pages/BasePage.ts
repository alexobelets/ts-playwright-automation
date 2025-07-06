import { Page, Locator } from "@playwright/test";

export class BasePage {
  constructor(protected readonly page: Page) {}

  async waitAndClick(locator: Locator, timeout = 5000): Promise<void> {
    await locator.waitFor({ state: "visible", timeout });
    await locator.click();
  }

  async waitAndFill(
    locator: Locator,
    value: string,
    timeout = 5000
  ): Promise<void> {
    await locator.waitFor({ state: "visible", timeout });
    await locator.fill(value);
  }

  async waitUntilVisible(locator: Locator, timeout = 5000): Promise<void> {
    await locator.waitFor({ state: "visible", timeout });
  }
}
