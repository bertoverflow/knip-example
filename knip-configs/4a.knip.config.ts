import type { KnipConfig } from "knip";

const DEFAULT_PROJECT_FILES = "**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!";

const devtoolsOrTestingProjectFile = (projectPattern: string) => {
  // having an exclamation mark at the beginning AND the end tells knip: this is NOT production code
  return `!${projectPattern}!`;
};

const config: KnipConfig = {
  entry: [
    "src/main.ts!",
    "src/health-check.ts!",
    "scripts/environment-helper.mjs",
  ],
  project: [
    DEFAULT_PROJECT_FILES,
    devtoolsOrTestingProjectFile("**/**.fixture.ts"),
  ],
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
