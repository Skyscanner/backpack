# figma-token-sync-pr

Composite action used by the [Sync Figma variables](../../workflows/sync-figma-variables.yml) workflow.

**Precondition:** Figma tokens have already been fetched to `token-sync/tokens/` and `npm ci` has been run.

## What it does

1. Classifies the release label (`major` / `minor`) based on the token diff.
2. Builds CSS custom properties from the DTCG tokens (`npm run tokens:build-css`).
3. Rebuilds `packages/backpack-web/src/bpk-stylesheets/base.css` (`npx nx run backpack-web:build-stylesheets`).
4. Commits `token-sync/tokens`, `token-sync/css`, and `base.css` to a new branch and pushes it.
5. Opens a pull request against `main` with a release label and description.
6. Closes any older open Figma token sync PRs superseded by this run.

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| `app_id` | yes | GitHub App ID used to mint the token for creating the PR. |
| `app_private_key` | yes | GitHub App private key. |
