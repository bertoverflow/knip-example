import type { KnipConfig } from "knip";
import defaultConfig from "./knip.config";

const config: KnipConfig = {
  ...defaultConfig,
  ignoreExportsUsedInFile: true,
};

export default config;
