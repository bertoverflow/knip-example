import { describe, expect, it } from "vitest";
import { calculateSquare } from "./math-module";

describe("calculateSquare", () => {
  it("will calculate the square of 4", () => {
    const number = 4;
    const result = calculateSquare(number);
    expect(result).toEqual(16);
  });
});
