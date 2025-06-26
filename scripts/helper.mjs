#!/usr/bin/env node

// Generates a random number using CLI arguments
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
  .option("min", {
    alias: "m",
    description: "Minimum value",
    type: "number",
    default: 0,
  })
  .option("max", {
    alias: "M",
    description: "Maximum value",
    type: "number",
    default: 100,
  })
  .help()
  .alias("help", "h").argv;

const min = argv.min;
const max = argv.max;
const random = Math.floor(Math.random() * (max - min + 1)) + min;
console.log(random);
