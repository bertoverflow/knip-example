import { getNowAsIso8601String } from "./date-module.js";

console.log(">>> Started!");

const now = getNowAsIso8601String();

console.log(">>> Now: ", now);

if (now !== "2025-01-01T00:00:00.000Z") {
  throw new Error("Script can only be called on 2025-01-01!");
}

// further code here...
