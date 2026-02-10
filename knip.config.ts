import type { KnipConfig } from "knip";

/*
 SHORT KNIP INTRO
 ----------------

 Knip detects unused files via the following mechanism:
 unused files = project files - (entry files + resolved files)

 Project files are (by default) ALL JavaScript and TypeScript files in the repository
 (see below for the default pattern: DEFAULT_PRODUCTION_PROJECT_FILES).

 Entry files are:
 - {index,cli,main}.{js,mjs,cjs,jsx,ts,tsx,mts,cts} (default)
 - src/{index,cli,main}.{js,mjs,cjs,jsx,ts,tsx,mts,cts} (default)
 - derived from the scripts-section in the package.json
 - added via plugins that are automatically loaded by knip depending on your dependencies

 When knip reports an unused file (in "normal" mode) that YOU KNOW is actually used, you can either
 - add it as a normal entry in this config if it is dev tooling related (e.g. a script that generates some code)
    - Note: you can use the `devtoolsOrTestingEntry()` helper function to add a production entry
 - add is as a production entry in this config if it is production code (e.g. the entry to a lambda handler function)
    - Note: you can use the `productionEntry()` helper function to add a production entry

 Production mode:
 In production mode, knip only considers the entries and project files that are marked as production code.
 By default, knip assumes ALL javascript/typescript files in your repository to be production code.
 Plugins like vitest then read your vitest config and mark the files matching your test patterns as NOT production code.
 However, for other code that is in your repository, but NOT production code, you have to explicitly tell this knip,
 because otherwise these files will be considered unused in production mode.
 You can use the `devtoolsOrTestingProjectFile()` helper function to mark files as NOT production code.
*/

// These are the default project files used by knip if you do NOT specify any project files yourself
//  As soon as you specify project files for a workspace yourself, please explicitly add these project files since
//  they are not merged together automatically.
const DEFAULT_PRODUCTION_PROJECT_FILES =
  "**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!";

const devtoolsOrTestingProjectFile = (projectPattern: string) => {
  // having an exclamation mark at the beginning AND the end tells knip: this is NOT production code
  return `!${projectPattern}!`;
};

const productionEntry = (entryPattern: string) => {
  // having an exclamation mark at the end tells knip: this is production code
  return `${entryPattern}!`;
};

const devtoolsOrTestingEntry = (entryPattern: string) => {
  return `${entryPattern}`;
};

const config: KnipConfig = {
  entry: [
    productionEntry("src/main.ts"),
    productionEntry("src/health-check.ts"),
    devtoolsOrTestingEntry("scripts/environment-helper.mjs"),
    // unfortunately, Knip does not handle its own config parameter correctly
    devtoolsOrTestingEntry("knip.config.production.ts"),
  ],
  project: [
    DEFAULT_PRODUCTION_PROJECT_FILES,
    devtoolsOrTestingProjectFile("**/**.fixture.ts"),
    // unfortunately, Knip does not handle the setupFiles section in the vitest config correctly
    devtoolsOrTestingProjectFile("vitest.setup.ts"),
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
