import { getNowAsIso8601String, isNightTime } from "./date-module.js";
import { doMaintenance } from "./maintenance-module.js";

console.log(">>> Job started at: ", getNowAsIso8601String());

if (!isNightTime()) {
  throw new Error("Maintenance can only be performed at night!");
}

doMaintenance();

// further code here...
