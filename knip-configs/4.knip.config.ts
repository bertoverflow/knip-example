import type { KnipConfig } from "knip";

const DEFAULT_PROJECT_FILES = "**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!";

const config: KnipConfig = {
  entry: [
    "src/main.ts!",
    "src/health-check.ts!",
    "scripts/environment-helper.mjs",
  ],
  project: [DEFAULT_PROJECT_FILES, "!**/**.fixture.ts!"],
};

export default config;
