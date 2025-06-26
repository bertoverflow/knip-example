import type { KnipConfig } from "knip";

const DEFAULT_ENTRIES = [
  "{index,cli,main}.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!",
  "src/{index,cli,main}.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!",
];

const config: KnipConfig = {
  entry: [...DEFAULT_ENTRIES, "scripts/helper.mjs"],
  ignoreDependencies: [
    // this is required for our arcane-legacy-dependency to work
    "webpack",
  ],
};

export default config;
