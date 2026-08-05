# Dev Releases

A **dev release** publishes a pre-release of `@skyscanner-internal/backpack-web` to the internal Artifactory npm registry
from an open pull request, so you can validate the change in a consuming
application before it is merged and a real release is cut.

Dev releases never overwrite a real version. They use the version format
`<latest-stable>-dev-v<run_id>.<run_attempt>` (for example
`42.21.1-dev-v26558464180.1`) and are published under the `dev` dist-tag.

## When to use it

- You opened a PR to fix a bug and need to confirm the fix works in
  `hotels-web` / `flights-day-view` / etc. before asking for a final review.
- You opened a PR for a new component or behaviour and want to integrate it
  in a consumer to gather screenshots or feedback.
- You want to unblock another team during the review window without merging
  to `main`.

If you only need a Storybook to share, the internal PR Storybook preview is
posted automatically on the pull request and is faster.

## How to trigger

The workflow is `workflow_dispatch`-only. Anyone with write access to
`Skyscanner/design-system` can trigger it.

### From the GitHub UI

1. Open the [Dev Release workflow page](https://github.com/Skyscanner/design-system/actions/workflows/dev-release.yml).
2. Click **Run workflow** (top right of the runs list).
3. Leave the branch on `main`.
4. Enter the **PR number**.
5. (Optional) Tick **dry_run** to validate the build pipeline without
   publishing to Artifactory.
6. Click **Run workflow**.

### From the CLI

```bash
# Real publish (uploads to internal Artifactory, requires backpack-web team approval)
gh workflow run dev-release.yml \
  -f pr_number=<PR_NUMBER> \
  --repo Skyscanner/design-system

# Dry run (no upload, no approval required)
gh workflow run dev-release.yml \
  -f pr_number=<PR_NUMBER> \
  -f dry_run=true \
  --repo Skyscanner/design-system
```

`pr_number` is the only required input — the workflow always builds the
PR's HEAD commit, regardless of which branch the workflow itself is loaded
from.

## What happens

1. **Security check** — confirms the PR is open, lives in `Skyscanner/design-system`
   (no forks), and the user who triggered the workflow has write access.
2. **Started comment** — a comment is posted on the PR linking to the
   workflow run.
3. **Build** — `pnpm install --frozen-lockfile` and `pnpm run build` run against the PR's HEAD
   commit, producing `packages/backpack-web/dist`.
4. **Publish** — only when `dry_run=false`. Bumps the version with
   `npm version --no-git-tag-version` and runs `npm publish --tag dev` against
   internal Artifactory. This
   step is gated by the `Publishing` GitHub environment, so a member of the
   `backpack-web` team must approve it from the run page.
5. **Result comment** — the same PR comment is updated in place with the
   final outcome and the install command for the published version.

## Consuming a dev release

The PR comment includes the exact install command. The two common forms:

Before installing, configure the internal scope with your approved Artifactory
credentials:

```bash
npm config set @skyscanner-internal:registry https://artifactory.skyscannertools.net/artifactory/api/npm/npm/
```

```bash
# Pin to a specific dev release (recommended for reproducibility)
npm install @skyscanner-internal/backpack-web@42.21.1-dev-v26558464180.1

# Always take the latest dev release for any backpack PR
npm install @skyscanner-internal/backpack-web@dev
```

Pin to a specific version when sharing the dev release with a teammate or
including it in CI — `@dev` will silently drift to whatever the most recent
dev release was (across all PRs).

After validating, switch back to a real version before merging your
consumer change:

```bash
npm install @skyscanner-internal/backpack-web@latest
```

## Dry run vs real publish

|                       | `dry_run=true`           | `dry_run=false`          |
|-----------------------|--------------------------|--------------------------|
| Runs build pipeline   | Yes                      | Yes                      |
| Publishes to Artifactory | No                    | Yes                      |
| Needs `Publishing` approval | No                 | Yes (backpack-web team)  |
| Posts result comment  | "Dry Run Successful"     | "Dev Release Published"  |
| Useful for            | Validating the workflow  | Sharing a build with a consumer |

Use `dry_run=true` when iterating on the workflow itself, or to confirm a
build still passes after a force-push.

## Limitations

- Fork PRs are rejected by the security check. Push your branch directly to
  `Skyscanner/design-system` if you have write access.
- A real publish requires a `backpack-web` team approval each time.
- The base version comes from `git describe --tags --abbrev=0 --exclude='*-*'`
  on the PR's HEAD. If the PR branch is far behind `main`, the base version
  will be older than the current release. Rebase to refresh it.
- Dev releases are not deleted automatically. To clean up the `dev` tag:
  ```bash
  npm dist-tag rm @skyscanner-internal/backpack-web dev
  ```
  Version retention is managed by Artifactory.

## Implementation

The workflow lives at [.github/workflows/dev-release.yml](.github/workflows/dev-release.yml)
and uses two composite actions:

- [.github/actions/pr-security-validation](.github/actions/pr-security-validation/action.yml)
  validates the PR and the triggering user.
- [.github/actions/upsert-pr-comment](.github/actions/upsert-pr-comment/action.yml)
  creates or updates the single PR comment, identified by an HTML marker.

GitHub API calls use the job-scoped `GITHUB_TOKEN` with the minimum required
permissions.
