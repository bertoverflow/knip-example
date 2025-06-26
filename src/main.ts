import { getNowAsIso8601String } from "./date-module";

console.log(">>> Started!");

const now = getNowAsIso8601String();

console.log(">>> Now: ", now);

throw new Error("That did not work out :(");
