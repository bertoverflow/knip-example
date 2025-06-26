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
- run knip
```bash
yarn knip
```
- show the full output


### start with unused files 

- src/math-utils.ts -> clearly unused
- but wait... why is `main.ts` not unused?
  - **entry vs. project files**
  - > unused files = project files - (entry files + resolved files)
  - show the basic project-file and entry-file matcher
- `scripts/helper` -> hmmm... we use it manually
  - option a) -> add it to `package.json` -> knip parses this
  - option b) -> knip config
    - ❗️ TODO: create knip.config.ts
    - caveat of overwriting vs. extending


### dependencies

- show that `yargs` is an unused devDependency when we remove it from the configuration
  - > Dependencies imported in unused files are reported as unused dependencies.
      > That’s why it’s strongly recommended to try and remedy unused files first.
      > Better entry and project file coverage will solve many cases of reported unused dependencies.
- `moment` -> unused dependency (project switched to dayjs)
- `@vitest/coverage-istanbul` -> unused devDependency
- but wait... how does knip know that `@vitest/coverage-v8` IS used?
  - **plugin system**
    - understands how to parse configs
    - adds additional entry files
  - aha effect -> `eslint.config.mjs`, `vitest.config.ts` are entry files too (!)
    - and even `vitest.setup.ts` is resolved via the plugin!
  - https://knip.dev/reference/plugins
    - example: Next.js plugin registers all page.tsx files as entry files
- ignore webpack for the moment
- unlisted dependency `lodash/now`
  - `yarn why lodash`
- unlisted binary `ts-node`
  - we switched from `ts-node` to `tsx` but forgot to adapt the target -> nice :) 
  - knip knows that certain tools come with a binary
  - it has also a list of expected/known os-binaries: https://github.com/webpro-nl/knip/blob/b70958a58ea255ee7a7831e404786da807ca93d7/packages/knip/src/constants.ts#L37-L139
- also highlight the `start:pretty` and use of `--require pretty-error/start`
- Überleitung: But what if knip DOES not figure it out?
  - back to the webpack devDependency
    - fictional scenario: we have a legacy dependency that requires webpack to be provided
  - ❗️ TODO: adjust knip.config.ts
  - also gives you a place to DOCUMENT stuff


### exports

- `getYearOfDate` -> unused -> we can remove this -> linter gets it
- explain that knip + linter work together and there is a working loop
- `yarn knip --exports --fix`
- this will automatically remove the CalculationResult type export
  - hmmm... but we actually WANTED this to be exported
- explain that you can configure that exported interfaces are fine
- ❗️ TODO: configuration for that case


### production mode

- production mode
- add a .fixture file for a test-file

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

- remove knip
- maybe improve the examples at least a bit :D

- add some tests
- update dependencies
- add renovate
- push as open source example
