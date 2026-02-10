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
    devtoolsOrTestingProjectFile("vitest.setup.ts"),
  ],
};

export default config;
