# knip-example

## Walkthrough

### intro

- show the project
- eslint config
- vitest as test runner
- package.json
- main target is `yarn start`
  - IGNORE start:pretty for now
- run main target
- have a look at the `main.ts` file

### first steps

- install knip
- run knip
- show the full output

- start with unused files
  - src/math-utils.ts -> clearly unused
  - but wait... why is `main.ts` not unused?
    - **entry vs. project files**
    - > unused files = project files - (entry files + resolved files)
    - show the basic project-file and entry-file matcher
  - `scripts/helper` -> hmmm... we use it manually
    - option a) -> add it to `package.json` -> knip parses this
    - option b) -> knip config
      - ❗️ TODO
      - caveat of overwriting vs. extending
- dependencies
  - show that `yargs` is an unused dependency when we remove it from the configuration
    - > Dependencies imported in unused files are reported as unused dependencies.
      > That’s why it’s strongly recommended to try and remedy unused files first.
      > Better entry and project file coverage will solve many cases of reported unused dependencies.
  - `moment` -> unused dependency (project switched to dayjs)
  - `@vitest/coverage-istanbul` -> unused DEV dependency
  - but wait... how does knip know that `@vitest/coverage-v8` IS used?
    - **plugin system**
      - understands how to parse configs
      - adds additional entry files
    - aha effect -> `eslint.config.mjs`, `vitest.config.ts` are entry files too (!)
      - and even `vitest.setup.ts` is resolved via the plugin!
    - https://knip.dev/reference/plugins
  - unlisted dependency `lodash/now`
    - `yarn why lodash`
  - unlisted binary `ts-node`
    - we switched from `ts-node` to `tsx` but forgot to adapt the target -> nice :) 
    - knip knows that certain tools come with a binary
    - it has also a list of expected/known os-binaries: https://github.com/webpro-nl/knip/blob/b70958a58ea255ee7a7831e404786da807ca93d7/packages/knip/src/constants.ts#L37-L139
  - also highlight the `start:pretty` and use of `--require pretty-error/start`
- Überleitung: But what if knip DOES not figure it out?
  - ❗️ TODO
  - example where we need to document a strange library or binary
- exports
    - explain that knip + linter work together and there is a working loop
    - explain that you can configure that exported interfaces are fine
    - ❗️ TODO configuration for that case

### production mode

- production mode
- add a .fixture file for a test-file

### how to debug the knip configuration (very optional)

## TODOs

- remove knip
- maybe improve the examples at least a bit :D

- add some tests
- update dependencies
- add renovate
- push as open source example

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
