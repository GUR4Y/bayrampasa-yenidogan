import { describe, it, expect } from "vitest";
import { cn, formatDate, formatDayMonth } from "../src/lib/utils";

describe("Utility Functions", () => {
  it("merges Tailwind classes correctly with cn()", () => {
    const result = cn("text-white p-4", "p-6", "bg-black");
    expect(result).toBe("text-white p-6 bg-black");
  });

  it("formats dates in Turkish locale with formatDate()", () => {
    const testDate = new Date("2026-10-26T12:00:00Z");
    const formatted = formatDate(testDate);
    expect(formatted).toContain("2026");
    expect(formatted.toLowerCase()).toContain("ekim");
  });

  it("extracts day and month with formatDayMonth()", () => {
    const testDate = new Date("2026-05-19T10:00:00Z");
    const { day, month } = formatDayMonth(testDate);
    expect(day).toBe("19");
    expect(month.toLowerCase()).toContain("may");
  });
});
