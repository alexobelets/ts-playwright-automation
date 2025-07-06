export class FlightCountHelper {
  static extractNumberFromText(text?: string): number {
    const match = text?.match(/\d+/);
    const number = match ? Number(match[0]) : NaN;
    if (isNaN(number)) throw new Error("No valid number in summary.");
    return number;
  }

  static extractPageNumbers(texts: string[]): number[] {
    return texts
      .filter((text) => /^\d+$/.test(text))
      .map((text) => Number(text));
  }

  static calculateTotalFromPagination(
    pages: number[],
    lastPageItemCount: number
  ): number {
    const totalPages = Math.max(...pages);
    if (isNaN(totalPages) || totalPages === 1) {
      return lastPageItemCount;
    }
    return (totalPages - 1) * 15 + lastPageItemCount;
  }
}
