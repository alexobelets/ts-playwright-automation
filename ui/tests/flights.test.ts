import { test } from "@playwright/test";
import { FlightsPage } from "src/pages/flights/FlightsPage";

const cities = [
  ["Lisbon", "Madrid"],
  ["Berlin", "Amsterdam"],
  ["Paris", "Rome"],
  ["Vienna", "London"],
  ["Warsaw", "Athens"],
];

test("Book one-way flight and verify results", async ({ page }) => {
  const flights = new FlightsPage(page);
  const [from, to] = cities[Math.floor(Math.random() * cities.length)];

  await flights.goto();
  await flights.form.selectOneWay();
  await flights.form.selectFromCity(from)
  await flights.form.selectToCity(to);
  await flights.dates.selectFirstAvailableDate();
  await flights.passengers.selectTwoPassengers();
  await flights.form.searchFlights();
  await flights.results.verify();
});
