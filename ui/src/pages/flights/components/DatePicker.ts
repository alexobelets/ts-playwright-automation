import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../BasePage";

export class DatePicker extends BasePage {
  private readonly dateInput: Locator;
  private readonly activeDates: Locator;

  constructor(page: Page) {
    super(page);
    this.dateInput = page.locator('[data-ui-name="button_date_segment_0"]');
    this.activeDates = page.locator(
      'td[role="gridcell"]:not([aria-hidden="true"])'
    );
  }

  async selectFirstAvailableDate() {
    await this.dateInput.click();
    await this.waitAndClick(this.activeDates.first());
  }
}
