import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "src/pages/BasePage";
import { ReportUtils } from "utils/ui/report-utils";
import { FlightCountHelper } from "utils/ui/flight-count-utils";

export class SearchResults extends BasePage {
  private readonly resultItem: Locator;
  private readonly summaryResultText: Locator;
  private readonly paginationItem: Locator;
  private readonly searchFlightMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.resultItem = page.locator('li[class*="List-module__item"]');
    this.summaryResultText = page.getByTestId(
      "search_filters_summary_results_number"
    );
    this.paginationItem = page.locator('li[class*="Pagination-module__item"]');
    this.searchFlightMessage = page.locator(
      'div[class*="Frame-module__margin"]'
    );
  }

  async verify() {
    if (await this.hasNoFlightsMessage()) {
      console.log("No flights found — skipping verification steps.");
      await ReportUtils.saveScreenshot(this.page, "no-flights-found.png");
      return;
    }

    await this.waitUntilVisible(this.resultItem.first());

    const total = await this.countTotalFlights();
    console.log(`Total number of flights found: ${total}`);
    expect(total).toBeGreaterThan(0);
  }

  private async hasNoFlightsMessage(): Promise<boolean> {
    const messages = [
      /flights matching your search/i,
      /No flights match your filters/i,
      /flights that match your search/i,
    ];

    for (const regex of messages) {
      try {
        await this.searchFlightMessage
          .filter({ hasText: regex })
          .first()
          .waitFor({ state: "visible", timeout: 3000 });
        return true;
      } catch {
        continue;
      }
    }

    return false;
  }

  private async countTotalFlights(): Promise<number> {
    try {
      const text = await this.summaryResultText.textContent({ timeout: 3000 });
      return FlightCountHelper.extractNumberFromText(text ?? undefined);
    } catch {
      console.warn("Fallback to pagination-based count.");
      return await this.countViaPagination();
    }
  }

  private async countViaPagination(): Promise<number> {
    const count = await this.paginationItem.count();
    if (count === 0) return await this.resultItem.count();

    const pageTexts: string[] = [];

    for (let i = 0; i < count; i++) {
      const text = await this.paginationItem.nth(i).textContent();
      if (text) pageTexts.push(text.trim());
    }

    const pageNumbers = FlightCountHelper.extractPageNumbers(pageTexts);
    const lastPageNumber = Math.max(...pageNumbers);

    await this.paginationItem.filter({ hasText: `${lastPageNumber}` }).click();

    await this.waitUntilVisible(this.resultItem);
    const lastPageCount = await this.resultItem.count();

    return FlightCountHelper.calculateTotalFromPagination(
      pageNumbers,
      lastPageCount
    );
  }
}
