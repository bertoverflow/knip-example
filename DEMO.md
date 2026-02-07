# knip-example

## TODOs before talk

- [ ] checkout the demo branch and reset it
- [ ] open in a browser
  - https://knip.dev/overview/getting-started
  - https://knip.dev/reference/plugins
  - https://knip.dev/guides/handling-issues

- 🎮️ doing stuff (editing package.json, deleting files, etc.)
- ⌨️ command in terminal
- 📄 copy something to README.md and/or show something there
- 📒️️ edit the knip config

## intro

- switch here from PRESENTATION
- show the project
- eslint config
- vitest as test runner
- look into package.json
- run lint, typecheck and tests -> all green :)
- main target is `pnpm run start`
  - IGNORE start:pretty for now
- run main target -> error?
- have a look at the `main.ts` file -> error seems strange, but ok (it is an exampe project to highlight knip 🙈)

## guided tour to knip

- https://knip.dev/overview/getting-started
- install knip
```bash
pnpm create @knip/config
```

- adds knip and its peer dependencies (typescript + @types/nodes) to the project

- run knip
```bash
pnpm run knip
```

- show the full output
- LOTS of issues
- start with only a subset of the reported issues
- knip (and I) recommend to start with unused files (we will see later why)

### start with unused files

```bash
pnpm run knip --files
```

- `src/math-utils.ts`
  - when starting out with knip: always check manually first, do not trust :D
  - so we check with the IDE that the file IS actually unused -> it is
    - 🎮️ delete `src/math-utils.ts`
- but wait... how does knip determine something is unused? why is `main.ts` NOT unused? (check with IDE)
  - **entry vs. project files**
  - 📄 copy to README.md
    - > unused files = project files - (entry files + resolved files)
  - show the basic project-file and entry-file matcher
  - 📄 copy to README.md

    ```typescript
    const DEFAULT_PROJECT_FILES = "**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!";

    const DEFAULT_ENTRIES = [
      "{index,cli,main}.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!",
      "src/{index,cli,main}.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!",
    ];
    ```

  - knip then checks for imports, require calls, and even some forms of dynamic imports etc.

- `scripts/helper` -> hmmm... we use it manually -> we have to help knip
  - option a) -> add it to `package.json`
    - 🎮️ `"helper": "node scripts/helper.js"`
    - explain that knip parses the `package.json` file to look for entry files
  - option b) -> knip config
    - 📒️️ `0.knip.config.ts`
    - this works, but there is a subtle issue: we replaced the default entry files
    - > The values you set override the default values, they are not merged.
    - this still works because we have the `start` commands, but better to be explicit
    - 📒️️ `1.knip.config.ts`

### dependencies

```bash
pnpm run knip --dependencies
```

- `moment` -> unused dependency (project switched to dayjs)
  - ⌨️️ `pnpm remove moment`
- `@vitest/coverage-istanbul` -> unused devDependency
  - ⌨️️ `pnpm remove @vitest/coverage-istanbul`
- but wait... how does knip know that `@vitest/coverage-v8` IS used?
  - **plugin system**
    - understands how to parse configs
    - adds additional entry files
  - aha effect -> `eslint.config.mjs`, `vitest.config.ts` are entry files too (!)
    - and even `vitest.setup.ts` is resolved via the plugin!
  - https://knip.dev/reference/plugins
    - example: Next.js plugin registers all page.tsx files as entry files
- ignore `webpack` for the moment
- unlisted dependency `lodash/now`
  - ⌨️ `pnpm why lodash`
  - ⌨️ `pnpm add lodash`
- unlisted binary `ts-node`
  - we switched from `ts-node` to `tsx` but forgot to adapt the target -> nice hint :)
    - 🎮️️ replace `ts-node` with `tsx` in command in package.json
  - knip knows that certain tools come with a binary
  - it has also a list of expected/known os-binaries: https://github.com/webpro-nl/knip/blob/b70958a58ea255ee7a7831e404786da807ca93d7/packages/knip/src/constants.ts#L37-L139
- also highlight the `start:pretty` and use of `--require pretty-error/start`
- Überleitung: But what if knip DOES not figure it out?
  - back to the webpack devDependency
    - fictional scenario: we have a legacy dependency that requires webpack to be provided
  - 📒️️ `2.knip.config.ts`
  - -> also gives you a place to DOCUMENT stuff
- back to the overall picture: why files BEFORE dependencies ?
  - show that `yargs` is an unused devDependency when we remove `scripts/helper.mjs` from the knip configuration
    > Dependencies imported in unused files are reported as unused dependencies.
    > That’s why it’s strongly recommended to try and remedy unused files first.
    > Better entry and project file coverage will solve many cases of reported unused dependencies.

### exports

```bash
pnpm run knip --exports
```

- `getYearOfDate` -> unused (IDE already HINT at this, but not catched by linter)
  - 🎮️ we can remove the `export` modifier
  - ⌨️ `pnpm run lint` -> linter now gets it
- explain that knip + linter work together and there is a working loop
- what if you have 300 issues reported here???
- `pnpm run knip --exports --fix`
- then again remove with the help of the linter
- this will automatically remove the `CalculationResult` type export in `math-module.ts`
  - hmmm... but we actually WANTED this to be exported (it IS used in the file, it is the interface -> common pattern to expose this)
- explain that you can configure that exported interfaces are fine
- 📒️️ `3.knip.config.ts`

### production mode

- what about this math module... (not used in main.ts at all)
- problem: it is used in the test files

```bash
pnpm run knip --production
```

- production mode is basically (https://knip.dev/features/production-mode)
  - > Only entry and project patterns suffixed with !
  - > Only the "start" and "postinstall" scripts (in package.json)
  - and only the "normal" dependencies in the package.json are checked
- `scr/math-module.ts`
  - 🎮️ delete together with the test file
- `src/date.fixture.ts`
  - explain knip that this is NOT a production project file
  - exclamation mark at the beginning and end
  - without the exclamation mark at the end, it would not even be considered as a project file
  - 📒️️ `4.knip.config.ts`
- `vitest.setup.ts`
  - error in the plugin IMHO
  - resolved the same way as the fixture
  - 📒️️ `5.knip.config.ts`
- unused dependency `pretty-error`
  - only the `start` command is checked in production mode
  - `pretty-error` is currently listed as a production dependency
  - two options:
    - a) move pretty-error to `devDependencies`
    - b) configure knip to ignore this dependency in our production config
  - 🎮️ we now choose option a) move pretty-error to `devDependencies` in package.json
- unlisted binary `tsx`
  - the `start` command is checked and assumed to be the production command
  - -> `tsx` should be a production dependency (currently it is a devDependency)
  - 🎮️ move tsx to `dependencies` in package.json
- unused export `formatDateAsIso8601String`
  - we are exporting this function because we want to separately test it
  - common use case
  - 📒️️ `knip.config.production.ts`
  - 🎮️ `"knip:production": "knip --production --config knip.config.production.ts ",`
  - we also need to add the new knip config to our entries (bug in knip plugin IMHO)
  - 📒️️ `6.knip.config.ts`

## Further Infos

- works with monorepos
- https://knip.dev/guides/handling-issues
- https://knip.dev/reference/faq#where-does-knip-look-for-entry-files
- https://knip.dev/reference/faq#what-does-knip-look-for-in-source-files

## how to debug the knip configuration (very optional)

```bash
pnpm run knip --debug | sed 's/\x1b\[[0-9;]*[mG]//g' > knip_debug.txt
```

## TODOs

- add example for WIP code
- maybe improve the examples at least a bit :D
- add some tests
- update dependencies
- add renovate
- push as open source example
