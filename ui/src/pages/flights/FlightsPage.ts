import { Page } from "@playwright/test";
import { FlightForm } from "./components/FlightForm";
import { DatePicker } from "./components/DatePicker";
import { PassengerSelector } from "./components/PassengerSelector";
import { SearchResults } from "./components/SearchResults";
import { BasePage } from "../BasePage";

export class FlightsPage extends BasePage {
  readonly form: FlightForm;
  readonly dates: DatePicker;
  readonly passengers: PassengerSelector;
  readonly results: SearchResults;

  constructor(page: Page) {
    super(page);
    this.form = new FlightForm(page);
    this.dates = new DatePicker(page);
    this.passengers = new PassengerSelector(page);
    this.results = new SearchResults(page);
  }

  async goto(): Promise<void> {
    await this.page.goto("/flights");
    await this.acceptCookiesIfVisible();
  }

  private async acceptCookiesIfVisible(): Promise<void> {
    const acceptButton = this.page.locator("#onetrust-accept-btn-handler");
    try {
      await this.waitAndClick(acceptButton);
    } catch {
      
      // ignore if cookie banner not visible
    }
  }
}
