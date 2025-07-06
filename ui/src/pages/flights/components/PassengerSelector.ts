import { Locator, Page } from "@playwright/test";

export class PassengerSelector {
  private readonly page: Page;
  private readonly openSelectorButton: Locator;
  private readonly addAdultButton: Locator;
  private readonly doneButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openSelectorButton = page.locator('[data-ui-name="button_occupancy"]');
    this.addAdultButton = page.locator(
      '[data-ui-name="button_occupancy_adults_plus"]'
    );
    this.doneButton = page.getByRole("button", { name: "Done" });
  }

  async selectTwoPassengers() {
    await this.openSelectorButton.click();
    await this.addAdultButton.click();
    await this.doneButton.click();
  }
}
