# token-sync validation runbook

Use this runbook to validate the end-to-end automated token pipeline from a controlled Figma change
to a repository output change.

## End-to-end validation

1. Choose a low-risk token in Figma and make a controlled change. Prefer adding a temporary test
   token, or changing a value that can be safely reverted after validation. Publish the Figma
   variables once the change is ready.
2. Trigger the agreed workflow mechanism:
   - During validation, use **Actions -> Sync Figma variables -> Run workflow**.
   - Leave `file_key` empty unless you intentionally need to test a different Figma file. Empty input
     exercises the same `FIGMA_FILE_KEY` secret path used by scheduled runs.
   - For production validation, wait for the scheduled run.
3. Confirm the workflow completes successfully. The expected successful path is:
   - `Stage 1 - Fetch tokens from Figma`
   - `Detect meaningful fetched token changes`
   - `Classify token release label`
   - `Stage 2 - Build CSS from DTCG tokens`
   - `Detect generated token changes`
   - `Commit generated token changes`
   - `Open pull request`
4. Confirm the generated outputs reflect the intended change. Check the new `figma-token-sync/*`
   pull request diff for updates under:
   - `token-sync/tokens/*.json`
   - `token-sync/css/*.css`
   - `token-sync/tokens/manifest.json`
5. Confirm the pull request is correct:
   - It targets `main`.
   - It is opened from a `figma-token-sync/<timestamp>-<run-id>` branch.
   - It has the `design-token-automation` label.
   - It has a `major` label when an existing token path was removed, renamed, or had its value
     changed.
   - It has a `minor` label only when the diff is purely additive (new token paths added).
   - Any removed, renamed, or changed token paths are listed in the pull request body, grouped by
     token file. Pure additions are not listed.
6. After validation, revert the controlled Figma change if it was only for testing, then rerun the
   workflow or wait for the next scheduled run to confirm the repository output returns to the
   expected state.

## Manual intervention

Occasionally the sync needs manual intervention — for example, to apply hand-curated edits, hold a
controversial change for review, or run the sync earlier than the next scheduled tick. The scheduled
workflow only auto-closes pull requests whose branch starts with `figma-token-sync/`, so use a
different branch prefix to keep the workflow from auto-closing your PR.

1. Close the current `figma-token-sync/*` pull request opened by the workflow. Closing it has no
   side effects — the next scheduled run would close it anyway when it opens a fresh one.
2. Run the sync locally:

   ```bash
   pnpm run tokens:sync
   ```

3. Create your branch using a prefix **other than** `figma-token-sync/` (e.g. `manual-token-sync/...`
   or `<jira-key>/token-sync-fix`), commit the regenerated `token-sync/tokens/` and `token-sync/css/`
   output, and open the pull request.
4. Apply labels manually following the same rules the workflow uses:
   - `design-token-automation`
   - `major` if an existing token path was removed, renamed, or had its value changed.
   - `minor` only if the diff is purely additive (new token paths added).

While your manual pull request is open the next scheduled run will still detect the same Figma
changes and may open another `figma-token-sync/*` pull request. Either merge or close your manual
pull request before the next scheduled tick, or close any new auto-generated `figma-token-sync/*`
pull requests while your manual change is in flight.

## Failure triage

- **Auth failures** - Check that `FIGMA_VARIABLES_SYNC_TOKEN` is present, has the
  **Variables - Read-only** scope, is not expired, and can access the Figma file. Check that
  `FIGMA_FILE_KEY` points to the Backpack Foundations & Components file unless testing an override.
- **Build failures** - Read the failing step output. Stage 1 failures usually point to Figma API,
  invalid variable names, unresolved aliases, or DTCG path collisions. Stage 2 failures usually point
  to invalid dimensions, CSS variable name collisions, or Light/Dark token symmetry issues. Fix the
  source token data in Figma, publish, then rerun.
- **No-op runs** - If the workflow exits after `Detect meaningful fetched token changes`, no
  repository output PR is expected. This means either Figma has no token value changes compared with
  `main`, or the only fetched change was `manifest.json`'s `generatedAt` metadata.
- **PR automation failures** - If token generation succeeds but no PR appears, check the
  `create-github-app-token`, `Commit generated token changes`, and `Open pull request` steps. Verify
  `GH_APP_ID` and `GH_APP_PRIVATE_KEY` are configured and that the app can push branches and open
  pull requests.
