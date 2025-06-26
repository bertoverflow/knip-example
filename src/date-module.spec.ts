import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  formatDateAsIso8601String,
  getNowAsIso8601String,
} from "./date-module";

describe("getNowAsIso8601String", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the current time as an ISO8601 string", () => {
    const fixedDate = new Date("2000-01-01T00:00:00.000Z");
    vi.setSystemTime(fixedDate);
    const result = getNowAsIso8601String();
    expect(result).toEqual("2000-01-01T00:00:00.000Z");
  });
});

describe("formatDateAsIso8601String", () => {
  it("will format a date as ISO 8601", () => {
    const date = new Date(0);
    const result = formatDateAsIso8601String(date);
    expect(result).toEqual("1970-01-01T00:00:00.000Z");
  });
});
