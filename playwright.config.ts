import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ["list"],
    [
      "html",
      { outputFolder: "test-report/playwright-html-report", open: "never" },
    ],
    ["json", { outputFile: "test-report/report.json" }],
  ],

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: process.env.BASE_URL,

    // Collect trace when retrying the failed test.
    trace: "on-first-retry",

    screenshot: "only-on-failure",
  },

  // Directory where Playwright will store test artifacts like trace files, screenshots, and videos.
  // It will be created automatically if it doesn't exist.
  outputDir: "test-report/artifacts",

  // Maximum time allowed for a single test to run, including all steps and actions.
  // If exceeded, the test will fail with a timeout error
  timeout: 30000,

  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: "./tests",

  // Configure projects.
  projects: [
    {
      name: "api",
      testDir: "./api/tests",
    },
    {
      name: "ui",
      testDir: "./ui/tests",
      use: {
        headless: false,
      },
    },
  ],
});
