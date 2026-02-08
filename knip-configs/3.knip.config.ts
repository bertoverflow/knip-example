import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["src/main.ts", "scripts/random-number.mjs"],
  ignoreDependencies: [
    // this is required for our arcane-legacy-dependency to work
    "webpack",
  ],
  ignoreExportsUsedInFile: {
    interface: true,
    type: true,
  },
};

export default config;
