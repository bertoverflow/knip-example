import type { KnipConfig } from "knip";
import defaultConfig from "./knip.config.js";

/**
 Using the default configuration would lead to a lot of false positives. Suppose you have a function `fooBar` that is
 used in production. This function does some heavy lifting, and you extracted some of the logic in a helper method:
 `fooBarHelper`.
 `fooBarHelper` is so complicated by itself that you decided to write tests for it - so you have to
 export it! Running knip in production mode will flag this export as unused (because in production the helper function
 will only be called directly from within the same file - so the export statement is unnecessary).

 To work around this, we can use the following option: `ignoreExportsUsedInFile`.
 We set it to `true` which will ignore export statements for ALL kind of declarations (also
 functions) that ARE used in the file where they are defined in.
 **/

const config: KnipConfig = {
  ...defaultConfig,
  ignoreExportsUsedInFile: true,
};

export default config;
