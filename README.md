# knip-example

## intro

- show the project
- eslint config
- vitest as test runner
- package.json
- main target is `yarn start`
  - IGNORE start:pretty for now
- run main target
- have a look at the `main.ts` file

## guided tour to knip

- install knip
```bash
yarn create @knip/config
```
- adds knip and its peer dependencies (typescript + @types/nodes) to the project

- run knip
```bash
yarn knip
```
- show the full output


### start with unused files 

```bash
yarn knip --files
```

- src/math-utils.ts -> clearly unused
- but wait... why is `main.ts` not unused?
  - **entry vs. project files**
  - > unused files = project files - (entry files + resolved files)
  - show the basic project-file and entry-file matcher
- `scripts/helper` -> hmmm... we use it manually
  - option a) -> add it to `package.json`
    - explain that knip parses the `package.json` file to look for entry files
  - option b) -> knip config
    - 📒️️ `0.knip.config.ts`
    - this works, but there is a subtle issue: we replaced the default entry files
    - > The values you set override the default values, they are not merged.
    - this still works because we have the `start` commands, but better to be explicit
    - 📒️️ `1.knip.config.ts`


### dependencies

```bash
yarn knip --dependencies
```

- show that `yargs` is an unused devDependency when we remove it from the configuration
  - > Dependencies imported in unused files are reported as unused dependencies.
      > That’s why it’s strongly recommended to try and remedy unused files first.
      > Better entry and project file coverage will solve many cases of reported unused dependencies.
- `moment` -> unused dependency (project switched to dayjs)
  - `yarn remove moment`
- `@vitest/coverage-istanbul` -> unused devDependency
  - `yarn remove @vitest/coverage-istanbul`
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
  - `yarn why lodash`
  - `yarn add lodash`
- unlisted binary `ts-node`
  - we switched from `ts-node` to `tsx` but forgot to adapt the target -> nice hint :)
    - replace `ts-node` with `tsx` in command in package.json
  - knip knows that certain tools come with a binary
  - it has also a list of expected/known os-binaries: https://github.com/webpro-nl/knip/blob/b70958a58ea255ee7a7831e404786da807ca93d7/packages/knip/src/constants.ts#L37-L139
- also highlight the `start:pretty` and use of `--require pretty-error/start`
- Überleitung: But what if knip DOES not figure it out?
  - back to the webpack devDependency
    - fictional scenario: we have a legacy dependency that requires webpack to be provided
  - 📒️️ `2.knip.config.ts`
  - -> also gives you a place to DOCUMENT stuff


### exports

```bash
yarn knip --exports
```

- `getYearOfDate` -> unused -> we can remove this -> linter gets it
- explain that knip + linter work together and there is a working loop
- what if you have 300 issues reported here???
- `yarn knip --exports --fix`
- this will automatically remove the CalculationResult type export
  - hmmm... but we actually WANTED this to be exported
- explain that you can configure that exported interfaces are fine
- 📒️️ `3.knip.config.ts`


### production mode

- what about this math module... (not used in main.ts at all)
- problem: it is used in the test files

```bash
yarn knip --production
```

- production mode is basically
  - > Only entry and project patterns suffixed with !
  - > Only the start and postinstall scripts
  - and only the "normal" dependencies in the package.json are checked
- `scr/math-module.ts`
  - delete together with the test file
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
  - only the `start` command checked in production mode
  - -> pretty-error can be made a devDependency
- unlisted binary `tsx`
  - the `start` command is checked and assumed to be the production command
  - -> `tsx` should be a production dependency
- unused export `formatDateAsIso8601String`
  - we are exporting this function because we want to seperately test it
  - common use case
  - 📒️️ `knip.config.production.ts`
  - `"knip:production": "knip --production --config knip.config.production.ts ",`
  - we need to add the new config to our entries (bug in knip plugin IMHO)
  - 📒️️ `6.knip.config.ts`


## how to debug the knip configuration (very optional)

```bash
yarn knip --debug | sed 's/\x1b\[[0-9;]*[mG]//g' > knip_debug.txt
```

## Further Infos

- works with monorepos
- https://knip.dev/guides/handling-issues

```typescript
const DEFAULT_ENTRIES = [
'{index,cli,main}.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!',
'src/{index,cli,main}.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!',
]
```

```typescript
const DEFAULT_PROJECT_FILES = '**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!'
```

## TODOs

- remove knip and README on a branch
- maybe improve the examples at least a bit :D

- add some tests
- update dependencies
- add renovate
- push as open source example
