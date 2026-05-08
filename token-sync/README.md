# token-sync

A small CLI that syncs design tokens from the Backpack Foundations & Components
Figma file into the Backpack codebase, in two stages:

**Figma variables → DTCG JSON → CSS custom properties.**

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

  | Secret name                  | Value                                      |
  |------------------------------|--------------------------------------------|
  | `FIGMA_VARIABLES_SYNC_TOKEN` | Same token as above                        |
  | `FIGMA_FILE_KEY`             | Backpack Foundations & Components file key |

  Requires repo admin; only needs to be done once.

## Stage 1 — Figma → DTCG

Fetches the `Primitives` and `Backpack` collections from the Figma
[Variables REST API](https://www.figma.com/developers/api#variables) and writes
deterministic [DTCG](https://design-tokens.github.io/community-group/format/)
JSON files to `token-sync/tokens/`.

From the repo root:

```bash
npm install
npm run sync
```

Output:

```text
token-sync/tokens/
├─ primitives.json      # raw colour/spacing/… literals
├─ backpack.light.json  # semantic tokens, Light mode
├─ backpack.dark.json   # semantic tokens, Dark mode
└─ manifest.json        # metadata: counts, roles, generatedAt
```

A manually-triggered workflow at `.github/workflows/sync-figma-variables.yml` runs the same
command in CI; trigger it from **Actions → Sync Figma variables → Run workflow**. It reads the
two repo secrets from step 2.

### How it works

- Calls `GET /v1/files/{file_key}/variables/local` with the `X-Figma-Token` header.
- Filters the response to the two target collections: `Primitives` and `Backpack`.
- Keeps only locally-authored collections (drops any `remote: true` Library-subscription copies
  — those are read-only snapshots of the last publish and would duplicate the working state).
- Cross-collection aliases (semantic → primitive) are preserved as DTCG
  references like `{Colour.Pink}`; same-collection aliases (semantic →
  semantic) are inlined to their final literal value.
- Unresolved aliases are skipped and reported in the console summary, along
  with any path collisions, missing-mode values, or invalid names.

Errors (missing env / bad token / wrong file key) exit with a hint that points to the right
place depending on whether you're running locally or in CI.

## Stage 2 — DTCG → CSS

_Coming next: style-dictionary transforms the DTCG files above into CSS custom
properties._
