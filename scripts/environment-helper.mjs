#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
  .option("environment", {
    alias: "e",
    description: "which environment to use",
    choices: ["dev", "prod"],
    default: "dev",
  })
  .help()
  .alias("help", "h").argv;

const environment = argv.environment;
console.log("setting environment to:", environment);
