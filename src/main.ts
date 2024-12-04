import { getNow } from "./feature-a";

console.log(">>> Started!");

const now = getNow();

console.log(">>> Now: ", now);

throw new Error("That did not work out :(");
