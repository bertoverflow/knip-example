import type { KnipConfig } from "knip";

const DEFAULT_PROJECT_FILES = "**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!";

const config: KnipConfig = {
  entry: ["src/main.ts", "scripts/random-number.mjs"],
  project: [DEFAULT_PROJECT_FILES, "!**/**.fixture.ts!", "!vitest.setup.ts!"],
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
