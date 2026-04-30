# token-sync

A small CLI that authenticates against Figma's [Variables REST API](https://www.figma.com/developers/api#variables)
and fetches variable collections from the Backpack Foundations & Components file. It prints the matched
collection names and modes — a minimal, verifiable foundation for downstream design-token sync.

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
npm run sync
```

Expected output (shape; counts may differ):

```
Fetching variable collections from file...
Found 2 variable collection(s):
- Backpack
    modes: Day, Night
- Primitives
    modes: Hex
Done.
```

Errors (missing env / bad token / wrong file key) exit with a hint that points to the right
place depending on whether you're running locally or in CI.

A manually-triggered workflow at `.github/workflows/sync-figma-variables.yml` runs the same
command in CI; trigger it from **Actions → Sync Figma variables → Run workflow**. It reads the
two repo secrets from step 2.

## How it works

- Calls `GET /v1/files/{file_key}/variables/local` with the `X-Figma-Token` header.
- Filters the response to the two target collections: `Primitives` and `Backpack`.
- Keeps only locally-authored collections (drops any `remote: true` Library-subscription copies
  — those are read-only snapshots of the last publish and would duplicate the working state).
- Logs the matched collections with their modes.
