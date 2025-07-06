import { Locator, Page } from "@playwright/test";
import { BasePage } from "src/pages/BasePage";

export class FlightForm extends BasePage {
  private readonly oneWayRadio: Locator;
  private readonly cityInput: Locator;
  private readonly leavingFrom: Locator;
  private readonly goingTo: Locator;
  private readonly suggestionsList: Locator;
  private readonly deleteCityButton: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.oneWayRadio = page.getByText("One-way", { exact: true });
    this.cityInput = page.locator('[data-ui-name="input_text_autocomplete"]');
    this.leavingFrom = page
      .locator('[class*="ShellButton-module__inner"]')
      .nth(0);
    this.goingTo = page.locator('[class*="ShellButton-module__inner"]').nth(1);
    this.suggestionsList = page.locator("#flights-searchbox_suggestions li");
    this.deleteCityButton = page.locator(
      'button[data-autocomplete-chip-idx="0"]'
    );
    this.searchButton = page.locator('[data-ui-name="button_search_submit"]');
  }

  async selectOneWay(): Promise<void> {
    await this.oneWayRadio.click();
  }

  async selectFromCity(city: string): Promise<void> {
    await this.waitAndClick(this.leavingFrom);
    await this.deleteDefaultCityFromInput();
    await this.selectRandomAirportFromSuggestions(city);
  }

  async selectToCity(city: string): Promise<void> {
    await this.goingTo.click();
    await this.selectRandomAirportFromSuggestions(city);
  }

  async searchFlights(): Promise<void> {
    await this.searchButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  private async deleteDefaultCityFromInput(): Promise<void> {
    await this.waitAndClick(this.deleteCityButton);
  }

  private async selectRandomAirportFromSuggestions(
    city: string
  ): Promise<void> {
    await this.waitAndFill(this.cityInput, city);

    await this.waitUntilVisible(this.suggestionsList.first());

    const options = await this.suggestionsList.all();
    const randomIndex = Math.floor(Math.random() * options.length);
    await options[randomIndex].click();
  }
}
