# token-sync

Fetches Figma variables from the Backpack Foundations & Components file and
writes deterministic [DTCG](https://design-tokens.github.io/community-group/format/)
JSON files under `token-sync/tokens/`.

> Requires a Figma **Enterprise** org.

## Setup

Create `token-sync/.env` from `token-sync/.env.example` and set:

```bash
FIGMA_VARIABLES_SYNC_TOKEN=<read-only variables token>
FIGMA_FILE_KEY=<Backpack Foundations & Components file key>
```

In CI, set the same two values as repository secrets.

## Run

From the repo root:

```bash
npm install
npm run sync
```

This writes:

```text
token-sync/tokens/
├─ primitives.json
├─ backpack.day.json
├─ backpack.night.json
└─ manifest.json
```

## Behavior

- Reads `/variables/local` from the Figma Variables REST API.
- Transforms only the `Primitives` and `Backpack` collections.
- Preserves cross-collection aliases as DTCG references like `{Colour.Pink}`.
- Inlines same-collection aliases to their final literal values.
- Skips unresolved aliases and reports them in the console summary.
- Produces stable output: sorted input, stable filenames, stable JSON formatting.
