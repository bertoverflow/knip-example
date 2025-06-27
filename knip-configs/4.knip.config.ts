import type { KnipConfig } from "knip";

const DEFAULT_ENTRIES = [
  "{index,cli,main}.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!",
  "src/{index,cli,main}.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!",
];

const DEFAULT_PROJECT_FILES = "**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!";

const config: KnipConfig = {
  entry: [...DEFAULT_ENTRIES, "scripts/helper.mjs"],
  project: [DEFAULT_PROJECT_FILES, "!**/**.fixture.ts!"],
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
