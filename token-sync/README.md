# token-sync

Authenticates against Figma's [Variables REST API](https://www.figma.com/developers/api#variables),
fetches the `Primitives` and `Backpack` variable collections from the Backpack Foundations &
Components file, and transforms them into deterministic [DTCG](https://design-tokens.github.io/community-group/format/)
token files plus a manifest suitable for downstream build tooling (e.g. Style Dictionary).

> Requires a Figma **Enterprise** org. Non-Enterprise accounts get `403` even with a valid token.

## Setup

### 1. Generate a Figma access token

Open <https://www.figma.com/settings> → **Security** → **Personal access tokens**, generate a new
token with the **Variables — Read-only** scope, and copy it (Figma only shows it once).

### 2. Store the token

The token is never committed. There are two places it needs to live:

- **Local dev** — copy `token-sync/.env.example` to `token-sync/.env` and fill in:

  ```
  FIGMA_VARIABLES_SYNC_TOKEN=<token from step 1>
  FIGMA_FILE_KEY=<Backpack Foundations & Components file key>
  ```

  `.env` is git-ignored.

- **CI** — add two repository secrets at **Settings → Secrets and variables → Actions**:

  | Secret name                  | Value                                                      |
  | ---------------------------- | ---------------------------------------------------------- |
  | `FIGMA_VARIABLES_SYNC_TOKEN` | Same token as above                                        |
  | `FIGMA_FILE_KEY`             | Backpack Foundations & Components file key                 |

  Requires repo admin; only needs to be done once.

## Running it

From the repo root:

```bash
npm install
npm run build:dtcg
```

> Future: a `build:style-dictionary` script will consume these DTCG files and
> emit platform outputs (CSS variables, SCSS, etc). That stage is not part of
> this package yet.

Expected output (shape; counts may differ):

```
Fetching variable collections from file...
Classified 2 collection(s): Backpack (semantic), Primitives (primitive).
- Backpack / Day: 170 tokens (103 preserved, 42 inlined)
- Backpack / Night: 170 tokens (105 preserved, 40 inlined)
- Primitives / Hex: 104 tokens (0 preserved, 0 inlined)
Manifest: /…/token-sync/tokens/manifest.json
Wrote 3 DTCG file(s) to /…/token-sync/tokens.
Done.
```

Files written under `token-sync/tokens/` (git-ignored):

```
tokens/
├─ primitives.json       # single-mode primitive tokens (literal values)
├─ backpack.day.json     # semantic tokens, day mode
├─ backpack.night.json   # semantic tokens, night mode
└─ manifest.json         # metadata: fileKey, generatedAt, per-file stats
```

Errors (missing env / bad token / wrong file key) exit with a hint that points to the right
place depending on whether you're running locally or in CI.

A manually-triggered workflow at `.github/workflows/sync-figma-variables.yml` orchestrates
the full pipeline in CI; trigger it from **Actions → Sync Figma variables → Run workflow**.
Today it runs the DTCG build stage only — future stages (CSS, SCSS, etc.) will be added
as additional steps inside the same workflow. It reads the two repo secrets from step 2.

## How it works

1. **Fetch** — `GET /v1/files/{file_key}/variables/local` with the `X-Figma-Token` header.
2. **Filter** — keep only the target collections (`Primitives`, `Backpack`) and drop any
   `remote: true` subscriber copies so we only transform the locally-authored working state.
3. **Classify** — label each collection as `primitive` or `semantic`. This controls how
   aliases are treated.
4. **Transform** per `(collection, mode)`:
    - Non-alias values become literal DTCG tokens. Colours become CSS hex or `rgba()`; floats
      become `px` dimensions unless scoped as font weights.
    - Aliases pointing to variables in **another selected collection** are kept as DTCG
      references (`{Group.Token}`).
    - Aliases pointing **within the same collection** are inlined — resolved recursively
      until they hit a literal or a preserved reference. Cross-library/subscribed ids
      (`VariableID:<key>/…`) are resolved via the variable key.
    - Cycles are detected and abort with a descriptive error.
    - Unresolved aliases abort by default; pass `skipUnresolvedAliases` to opt into skipping.
5. **Emit** — a JSON file per `(collection, mode)` plus `manifest.json`. Output is
   deterministic (variables sorted by name, stable 2-space JSON with a trailing newline) so
   repeated runs produce byte-identical files when inputs haven't changed.

## Manifest contract

```jsonc
{
  "fileKey": "…",
  "sourceFileUrl": "https://www.figma.com/design/…",
  "generatedAt": "2026-04-29T12:00:00.000Z",
  "files": [
    {
      "fileName": "primitives.json",
      "collectionName": "Primitives",
      "modeName": "Hex",
      "role": "primitive",
      "variableCount": 104,
      "preservedAliasCount": 0,
      "inlinedAliasCount": 0,
      "skippedVariableCount": 0
    }
  ]
}
```

Every file record carries the shape above. Tests in `dtcg-writer-test.ts` enforce this
contract so structural drift breaks CI.

## Assumptions & limitations

- Only `COLOR`, `FLOAT`, `STRING`, and `BOOLEAN` variable types are supported — the types
  Backpack currently publishes. Other types will throw at transform time.
- Only the `Primitives` and `Backpack` collections are recognised. Adding a new collection
  requires extending `COLLECTION_ROLES` in `dtcg-transformer.ts`.
- The transformer works off `/variables/local` only. Subscribed library variables in other
  files are resolved via the `VariableID:<key>/…` fallback but their literal values must
  still be present in the fetched payload.
- Font weight is detected via Figma's `FONT_STYLE` scope on `FLOAT` variables; font family
  via the `FONT_FAMILY` scope on `STRING` variables. Anything else defaults to `dimension`
  (numeric → `{n}px`) or `string`.
- `token-sync/tokens/` is git-ignored. Committing generated outputs is a follow-up if we
  want byte-level CI diffs against a checked-in snapshot.
