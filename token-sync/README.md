# token-sync

Two-stage pipeline: Figma variables → DTCG JSON → CSS custom properties.

> Requires a Figma **Enterprise** org.

## Setup

Create `token-sync/.env` from `token-sync/.env.example` and set:

```bash
FIGMA_VARIABLES_SYNC_TOKEN=<read-only variables token>
FIGMA_FILE_KEY=<Backpack Foundations & Components file key>
```

In CI, set the same two values as repository secrets.

## Stage 1 — Figma → DTCG

Fetches the `Primitives` and `Backpack` collections from the Figma Variables
REST API and writes deterministic
[DTCG](https://design-tokens.github.io/community-group/format/) JSON files to
`token-sync/tokens/`.

```bash
npm run sync
```

Output:

```text
token-sync/tokens/
├─ primitives.json      # raw colour/spacing/… literals
├─ backpack.day.json    # semantic tokens, Day mode
├─ backpack.night.json  # semantic tokens, Night mode
└─ manifest.json        # metadata: counts, roles, generatedAt
```

Cross-collection aliases are preserved as DTCG references (e.g.
`{Colour.Pink}`); same-collection aliases are inlined to their final literal
value. Unresolved aliases are skipped and reported in the console summary.

## Stage 2 — DTCG → CSS

_Coming next: style-dictionary transforms the DTCG files above into CSS custom
properties._
