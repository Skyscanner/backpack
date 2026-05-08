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
npm run tokens:fetch
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

[Style Dictionary](https://styledictionary.com/) v5 reads the DTCG files above
and emits two CSS files — one per theme — to `token-sync/css/`.

From the repo root, **after** running Stage 1:

```bash
npm run tokens:build-css
```

Output:

```text
token-sync/css/
├─ theme-backpack-light.css     # :root                    { --bpk-…: <light value>; }
└─ theme-backpack-dark.css      # :root[data-theme="dark"] { --bpk-…: <dark value>;  }
```

Apply dark mode by setting `data-theme="dark"` on `<html>` or `<body>`.

### Things worth knowing

- **Light / Dark symmetry is enforced.** Every token must exist in both modes;
  any that are missing from one mode will abort the build. Fix it in Figma by adding the missing path to the other mode.
- **`Component` prefix is stripped.** `Component.Badge.Colour.bg-default`
  becomes `--bpk-badge-colour-bg-default`. If stripping would cause two tokens
  to collide on the same CSS variable name, the build refuses and tells you
  which ones to rename in Figma.
- **Non-`px` dimensions abort the build.** Every `$type: dimension` value must
  be `Xpx` (e.g. `"16px"`) or a DTCG alias; other units or bare numbers are
  rejected so they can't be silently miscalculated during `px → rem` conversion.
- **The CSS lives outside `token-sync/tokens/`** so Stage 1's directory wipe
  doesn't clobber it.

### Overriding paths

`DTCG_OUTPUT_DIR` and `CSS_OUTPUT_DIR` can be set to absolute paths if the
default layout doesn't suit your build pipeline.

### Combined sync + build

```bash
npm run tokens:sync
```
