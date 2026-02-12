# Knip example

This project demonstrates how to use [Knip](https://knip.dev/).

It is prepared with some intentionally unused files and dependencies to show how Knip works in practice.

## Getting started

This project uses pnpm as package manager. You can install the dependencies by running:

```bash
pnpm install
```

Then, you can run knip in normal mode and in production mode via

```bash
pnpm run knip
pnpm run knip:production
```

[knip.config.ts](./knip.config.ts) and [knip.config.production.ts](./knip.config.production.ts) demonstrate how I
structure my knip configuration.

[DEMO.md](./DEMO.md) contains a guided tour to the project and to Knip. It is prepared for a live demo, but you can also
read through it to get a better understanding of how Knip works in practice.
