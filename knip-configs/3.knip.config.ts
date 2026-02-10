import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: [
    "src/main.ts!",
    "src/health-check.ts!",
    "scripts/environment-helper.mjs",
  ],
};

export default config;
