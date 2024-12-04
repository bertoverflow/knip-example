import { getNow } from "./date-module";

console.log(">>> Started!");

const now = getNow();

console.log(">>> Now: ", now);

throw new Error("That did not work out :(");
