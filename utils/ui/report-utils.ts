import fs from "fs";
import path from "path";
import { Page } from "@playwright/test";

const REPORT_DIR = path.resolve("test-report");

export class ReportUtils {
  static ensureReportDirExists(): void {
    if (!fs.existsSync(REPORT_DIR)) {
      fs.mkdirSync(REPORT_DIR, { recursive: true });
    }
  }

  static async saveScreenshot(page: Page, filename: string): Promise<void> {
    this.ensureReportDirExists();
    const filePath = path.join(REPORT_DIR, filename);
    await page.screenshot({
      path: filePath,
      fullPage: true,
    });
  }

  static getReportPath(filename: string): string {
    this.ensureReportDirExists();
    return path.join(REPORT_DIR, filename);
  }
}
