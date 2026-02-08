# knip-example

## TODOs before talk

- [ ] clone the repo a second time and checkout the demo branch
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
- run main target -> error? (maintenance only allowed at night)
- have a look at the `main.ts` file -> script only runs at night (example project to highlight knip 🙈)

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

- good: not every file is reported as unused :D
  - so it is working in general
  - but remember how knip works... what is used as entry file actually?
  - 📄 copy to README.md

```typescript
// unused files = project files - (entry files + resolved files)

const defaultConfig = {
  entry: [
    "{index,cli,main}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
    "src/{index,cli,main}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
  ],
  project: ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}!"],
};
```

- `scripts/environment-helper` -> hmmm... we use it manually -> we have to help knip
  - add it to `package.json`
    - 🎮️ `"setup-environment": "node scripts/environment-helper.mjs"`
    - explain that knip parses the `package.json` file to look for entry files
- `scr/health-check.ts` -> called to check if the deployment is healthy, we do not want it in the package.json 
  - knip config
    - 📒️️ `0.knip.config.ts`
- `src/math-utils.ts`
    - when starting out with knip: always check manually first, do not trust :D
    - so we check with the IDE that the file IS actually unused -> it is
        - 🎮️ delete `src/math-utils.ts`

### dependencies

```bash
pnpm run knip --dependencies
```

- `moment` -> search in project -> project switched to dayjs
  - ⌨️️ `pnpm remove moment`
- `@vitest/coverage-istanbul` -> check vitest config -> project switched to v8
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
- unlisted binary `ts-node`
  - we switched from `ts-node` to `tsx` but forgot to adapt the target -> nice hint :)
    - 🎮️️ replace `ts-node` with `tsx` in command in package.json
  - knip knows that certain tools come with a binary
  - it has also a list of expected/known os-binaries: https://github.com/webpro-nl/knip/blob/b70958a58ea255ee7a7831e404786da807ca93d7/packages/knip/src/constants.ts#L37-L139
- also highlight the `start:pretty` and use of `--require pretty-error/start`
- Überleitung: But what if knip DOES not figure it out?
  - back to the webpack devDependency
    - fictional scenario: we have a legacy dependency that requires webpack to be provided
  - 📒️️ `1.knip.config.ts`
  - -> also gives you a place to DOCUMENT stuff
- back to the overall picture: why files BEFORE dependencies ?
  - show that `yargs` is an unused devDependency when we remove the "setup-environment" target from the package.json
    > Dependencies imported in unused files are reported as unused dependencies.
    > That’s why it’s strongly recommended to try and remedy unused files first.
    > Better entry and project file coverage will solve many cases of reported unused dependencies.

### exports

- ok, we found some completely unused files, but often only parts of a file are unused

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
- 📒️️ `2.knip.config.ts`

### production mode

- what about this math module... (not used in main.ts at all)
- problem: it is used in the test files

```bash
pnpm run knip --production
```

- production mode general idea: test files are NOT production files, so they are not taken into account when analyzing the project
  - OPTIONAL explanation: more details (https://knip.dev/features/production-mode)
    - > Only entry and project patterns suffixed with !
    - > Only the "start" and "postinstall" scripts (in package.json)
    - and only the "normal" dependencies in the package.json are checked
- `src/main.ts`, `src/maintenance-module.ts`, `scripts/environment-helper.mjs` etc. -> clearly something is going wrong 
  - 2 problems:
    - a) setting an entry in the config actually overwrites the default entries, it does not merge with them
      - > The values you set override the default values, they are not merged.
      - so `src/main.ts` is no longer in the list of entry files
    - b) production mode does not really take the commands in the package.json into account
      - according to the docs, it looks for "start" and "postinstall" commands, but seems to be buggy
  - so I recommend to always explicitly set the entry files in the knip config
  - 📒️️ `3.knip.config.ts`
  - point out exclamation mark at the end of the pattern to distinguish between normal and production entries
- `scr/math-module.ts`
  - 🎮️ delete together with the test file
- `src/date.fixture.ts`
  - explain knip that this is NOT a production project file
  - exclamation mark at the beginning and end
  - without the exclamation mark at the end, it would not even be considered as a project file
  - 📒️️ `4.knip.config.ts`
  - very hard to read -> use a helper function
  - 📒️️ `4a.knip.config.ts`
- `vitest.setup.ts`
  - error in the plugin IMHO
  - resolved the same way as the fixture
  - 📒️️ `5.knip.config.ts`
- unused export `formatDateAsIso8601String`
  - we are exporting this function because we want to separately test it
  - common use case
  - 📒️️ `6.knip.config.production.ts`
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

## OPTIONAL

- when declaring `pretty-error` as **dependency**, we can observe and explain the following behavior in production mode
  - unused dependency `pretty-error`
      - only the `start` command is checked in production mode
      - `pretty-error` is currently listed as a production dependency
      - two options:
          - a) move pretty-error to `devDependencies`
          - b) configure knip to ignore this dependency in our production config
      - 🎮️ we now choose option a) move pretty-error to `devDependencies` in package.json
- when declaring `tsx` as **devDependency**, we can observe and explain the following behavior in production mode
  - unlisted binary `tsx`
      - the `start` command is checked and assumed to be the production command
      - -> `tsx` should be a production dependency (currently it is a devDependency)
      - 🎮️ move tsx to `dependencies` in package.json


## TODOs

- add example for WIP code
- add renovate
- push as open source example
