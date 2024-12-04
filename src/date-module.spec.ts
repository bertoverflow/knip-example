import { describe, expect, it } from "vitest";
import { formatDate } from "./date-module";

describe("formatDate", () => {
  it("will format a date", () => {
    const date = new Date(0);
    const result = formatDate(date);
    expect(result).toEqual("1970-01-01T00:00:00.000Z");
  });
});
