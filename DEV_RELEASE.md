# Dev Releases

A **dev release** publishes a pre-release of `@skyscanner/backpack-web` to npm
from an open pull request, so you can validate the change in a consuming
application before it is merged and a real release is cut.

Dev releases never overwrite a real version. They use the version format
`<latest-stable>-dev-v<run_id>.<run_attempt>` (for example
`42.21.1-dev-v26558464180.1`) and are published under the `dev` npm dist-tag.

---

## When to use it

- You opened a PR to fix a bug and need to confirm the fix works in
  `hotels-web` / `flights-day-view` / etc. before asking for a final review.
- You opened a PR for a new component or behaviour and want to integrate it
  in a consumer to gather screenshots or feedback.
- You want to unblock another team during the review window without merging
  to `main`.

If you only need a Storybook to share, the [PR Storybook deploy](https://backpack.github.io/storybook-prs/)
is automatic and faster.

---

## How to trigger

The workflow is `workflow_dispatch`-only. Anyone with write access to
`Skyscanner/backpack` can trigger it.

### From the GitHub UI

1. Open the [Dev Release workflow page](https://github.com/Skyscanner/backpack/actions/workflows/dev-release.yml).
2. Click **Run workflow** (top right of the runs list).
3. Leave the branch on `main`.
4. Enter the **PR number**.
5. (Optional) Tick **dry_run** to validate the build pipeline without
   publishing to npm.
6. Click **Run workflow**.

### From the CLI

```bash
# Real publish (uploads to npm, requires backpack-web team approval)
gh workflow run dev-release.yml \
  -f pr_number=<PR_NUMBER> \
  --repo Skyscanner/backpack

# Dry run (no upload, no approval required)
gh workflow run dev-release.yml \
  -f pr_number=<PR_NUMBER> \
  -f dry_run=true \
  --repo Skyscanner/backpack
```

`pr_number` is the only required input — the workflow always builds the
PR's HEAD commit, regardless of which branch the workflow itself is loaded
from.

---

## What happens

1. **Security check** — confirms the PR is open, lives in `Skyscanner/backpack`
   (no forks), and the user who triggered the workflow has write access.
2. **Started comment** — a comment is posted on the PR linking to the
   workflow run.
3. **Build** — `npm ci` and `npm run build` run against the PR's HEAD
   commit, producing `packages/backpack-web/dist`.
4. **Publish** — only when `dry_run=false`. Bumps the version with
   `npm version --no-git-tag-version` and runs `npm publish --tag dev`. This
   step is gated by the `Publishing` GitHub environment, so a member of the
   `backpack-web` team must approve it from the run page.
5. **Result comment** — the same PR comment is updated in place with the
   final outcome and the install command for the published version.

---

## Consuming a dev release

The PR comment includes the exact install command. The two common forms:

```bash
# Pin to a specific dev release (recommended for reproducibility)
npm install @skyscanner/backpack-web@42.21.1-dev-v26558464180.1

# Always take the latest dev release for any backpack PR
npm install @skyscanner/backpack-web@dev
```

Pin to a specific version when sharing the dev release with a teammate or
including it in CI — `@dev` will silently drift to whatever the most recent
dev release was (across all PRs).

After validating, switch back to a real version before merging your
consumer change:

```bash
npm install @skyscanner/backpack-web@latest
```

---

## Dry run vs real publish

|                       | `dry_run=true`           | `dry_run=false`          |
|-----------------------|--------------------------|--------------------------|
| Runs build pipeline   | Yes                      | Yes                      |
| Calls `npm publish`   | No                       | Yes                      |
| Needs `Publishing` approval | No                 | Yes (backpack-web team)  |
| Posts result comment  | "Dry Run Successful"     | "Dev Release Published"  |
| Useful for            | Validating the workflow  | Sharing a build with a consumer |

Use `dry_run=true` when iterating on the workflow itself, or to confirm a
build still passes after a force-push.

---

## Limitations

- Fork PRs are rejected by the security check. Push your branch directly to
  `Skyscanner/backpack` if you have write access.
- A real publish requires a `backpack-web` team approval each time. This is
  intentional — `npm publish` is irreversible and shows up in every consumer's
  `npm install`.
- The base version comes from `git describe --tags --abbrev=0 --exclude='*-*'`
  on the PR's HEAD. If the PR branch is far behind `main`, the base version
  will be older than the current release. Rebase to refresh it.
- Dev releases are not deleted automatically. To clean up the `dev` tag:
  ```bash
  npm dist-tag rm @skyscanner/backpack-web dev
  ```
  Individual versions cannot be unpublished after 72 hours per npm policy.

---

## Implementation

The workflow lives at [.github/workflows/dev-release.yml](.github/workflows/dev-release.yml)
and uses two composite actions:

- [.github/actions/pr-security-validation](.github/actions/pr-security-validation/action.yml)
  validates the PR and the triggering user.
- [.github/actions/upsert-pr-comment](.github/actions/upsert-pr-comment/action.yml)
  creates or updates the single PR comment, identified by an HTML marker.

GitHub API calls authenticate via the Backpack GitHub App
(`actions/create-github-app-token`) because Skyscanner's organisation IP
allow list rejects the default `GITHUB_TOKEN`.
