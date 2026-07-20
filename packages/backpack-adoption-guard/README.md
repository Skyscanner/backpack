# Backpack Adoption Guard

This GitHub Action calculates Backpack adoption for a consuming repository
and writes the result to a JSON file. On pull requests it compares the PR
checkout against the base checkout and fails only when the base adoption is
already at least the configured threshold and the PR lowers the Backpack
adoption rate.

```yaml
- uses: actions/checkout@v6

- name: Backpack Adoption Guard
  uses: Skyscanner/backpack/packages/backpack-adoption-guard@backpack-adoption-guard/v1.0.0
  with:
    dry-run: ${{ vars.BACKPACK_ADOPTION_DRY_RUN }}
```

Replace `v1.0.0` with the immutable release tag you want to pin.

The action transparently fetches the PR base commit on demand, so the default
shallow `actions/checkout` is enough. If your runner blocks single-commit
fetches, fall back to `fetch-depth: 0` on the checkout step.

The guard threshold defaults to 60%. Consumer repositories can set the
`threshold` input to use a different adoption starting point.

## Behaviour

The action emits one of three guard statuses:

| Status | Meaning |
| --- | --- |
| ✅ `pass` | Adoption did not regress, or the run is informational only (`main`, or PR where main is still below the configured threshold). |
| ⚠️ `warn` | The run is informational with caveats: a regression detected under `dry-run`, the base ref could not be loaded, files were skipped on a `main` run, or a would-be parse-error fail was downgraded by `dry-run`. The CI step does not fail. |
| ❌ `fail` | The guard refused to pass: a regression after main reached the configured threshold, files were skipped at or above the threshold (incomplete data), or the base ref could not be loaded (with `dry-run` off). |

| Branch context | Behaviour |
| --- | --- |
| `refs/heads/main` | Reports adoption only. Never fails. Emits `warn` if files could not be parsed. |
| Pull request, main adoption < configured threshold | Reports adoption. Never blocks; any skipped files are flagged in the report but do not change the result. |
| Pull request, main adoption ≥ configured threshold | Fails when adoption drops, or when files were skipped on either side (incomplete data). `dry-run: true` downgrades the failure to a warning. |
| Pull request, base ref unavailable | Fails (`warn` under `dry-run`) so the workflow surfaces the misconfiguration. |

### Per-project guard (NX workspaces)

When the scanned repository is an NX workspace (an `nx.json` exists at the
root), the action additionally attributes every scanned file to the NX
project that owns it — using the same longest-root-prefix matching NX itself
uses — and evaluates the guard rules above **per project**, not just for the
repository as a whole.

This means a large, high-adoption project's improvement can no longer mask a
regression in a smaller project: if any individual project would fail the
guard on its own (per the rules in the table above), the overall guard status
becomes `fail`, even if the repository-wide percentage held steady or
improved. The same logic applies to `warn`. The top-level `reason` names the
project(s) responsible so it's clear at a glance who to talk to.

Files that don't fall under any detected NX project root are grouped into a
`(unassigned)` bucket rather than being dropped or folded into another
project. This is intentional (it mirrors `Skyscanner/ds-analyser`) — a large
`(unassigned)` bucket usually means root-level files, or a directory that
should have its own `project.json`, and is worth investigating rather than
hiding.

Per-project results are included in the PR step summary as an additional
table, and in the generated results JSON under `head.projects` /
`guard.projects`. Non-NX repositories are unaffected: `projects` is simply
absent everywhere.

## Inputs

| Input | Description | Required | Default |
| --- | --- | --- | --- |
| `dry-run` | Report adoption drops as warnings instead of failing the PR. | No | `false` |
| `pattern` | Glob for files scanned. | No | `**/*.{jsx,tsx}` |
| `output-path` | Path for the generated adoption result JSON. | No | `backpack-adoption-results.json` |
| `threshold` | Backpack adoption percentage threshold before the guard starts blocking decreases. | No | `60` |

## Uploading metrics to Cortex

This action only writes a JSON results file. To ship the results to Cortex on
`main`, add a separate step that uses
[`Skyscanner/push-custom-cortex-data`](https://github.com/Skyscanner/push-custom-cortex-data)
and points its `data-descriptor.path` at the file produced above. Use
`backpack-adoption` as the `data-descriptor.key` (the top-level key the
results JSON uses). The file intentionally contains compact main-branch
metrics for Cortex; detailed guard, PR comparison, parse-error, and per-component
data stays in the GitHub step summary and action internals.

```json
{
  "backpack-adoption": {
    "generatedAt": "2026-06-08T08:21:38.000Z",
    "repository": "consumer-repo",
    "backpackWebVersion": "^42.21.1",
    "filesAnalyzed": 328,
    "skippedFiles": 0,
    "usage": {
      "backpack": { "count": 1234, "percentage": 62.5 },
      "pureBackpack": { "count": 1100, "percentage": 55.75 },
      "nonPureBackpack": { "count": 134, "percentage": 6.75 },
      "nonBackpack": { "count": 500, "percentage": 25.35 },
      "rawHtml": { "count": 240, "percentage": 12.15 }
    },
    "projects": {
      "banana-webapp": {
        "filesAnalyzed": 210,
        "backpack": { "count": 900, "percentage": 70.31 },
        "pureBackpack": { "count": 850, "percentage": 66.41 },
        "nonPureBackpack": { "count": 50, "percentage": 3.9 },
        "nonBackpack": { "count": 300, "percentage": 23.44 },
        "rawHtml": { "count": 80, "percentage": 6.25 }
      },
      "(unassigned)": {
        "filesAnalyzed": 12,
        "backpack": { "count": 10, "percentage": 20 },
        "pureBackpack": { "count": 10, "percentage": 20 },
        "nonPureBackpack": { "count": 0, "percentage": 0 },
        "nonBackpack": { "count": 5, "percentage": 10 },
        "rawHtml": { "count": 35, "percentage": 70 }
      }
    }
  }
}
```

`projects` is only present for NX workspaces, and (to keep the always-loaded
Cortex payload small) each project entry omits `componentCounts` — the full
per-project detail, including component counts, is available in the PR step
summary and the generated `backpack-adoption-results.json`'s `head.projects`.

```yaml
- uses: actions/checkout@v6

- name: Backpack Adoption Guard
  uses: Skyscanner/backpack/packages/backpack-adoption-guard@backpack-adoption-guard/v1.0.0

- name: Upload Backpack adoption metrics to Cortex
  if: github.ref == 'refs/heads/main'
  uses: Skyscanner/push-custom-cortex-data@v0.0.4
  with:
    webhook-uuid: ${{ secrets.BACKPACK_ADOPTION_CORTEX_WEBHOOK_UUID }}
    cortex-entity: <your-cortex-entity>
    data-descriptor: |
      {
        "description": "Backpack adoption metrics",
        "key": "backpack-adoption",
        "path": "backpack-adoption-results.json"
      }
```

## Source structure

```text
src/
├── action/        # GitHub Action orchestration, input/output, step summary
├── analysis/      # Repository scanning and JSX adoption metrics
├── git/           # Pull request base checkout helpers
├── guard/         # Adoption guard decision logic
└── shared/        # Constants and shared result types
```

`src/action/run.ts` should stay thin: it wires inputs, analysis, guard
evaluation, and results writing. The adoption metric logic belongs under
`src/analysis/`, and the PR blocking policy belongs under `src/guard/`.

The JSX/TS analyser uses [`@babel/parser`](https://babeljs.io/docs/babel-parser)
and [`@babel/traverse`](https://babeljs.io/docs/babel-traverse) — kept in sync
with [`Skyscanner/ds-analyser`](https://github.com/Skyscanner/ds-analyser).

## Building

`dist/index.js` is a single-file bundle produced by `esbuild`. It is generated
on demand and is not committed to the main Backpack source tree. After changing
any source under `src/`, run:

```bash
npx nx run backpack-adoption-guard:build
```

The generated `dist/` directory is ignored by git. Any ref used directly as a
GitHub JavaScript action must still contain the generated bundle because
`action.yml` runs `dist/index.js`; keep that packaging step separate from normal
source changes.

## Releasing

> **Migration to v2**: Starting with `backpack-adoption-guard/v2.0.0`, the
> guard evaluates NX projects individually (see
> [Per-project guard (NX workspaces)](#per-project-guard-nx-workspaces)) —
> a PR that regresses a single NX project now fails even if the
> repository-wide adoption percentage is unchanged or improved. This is a
> pass/fail behaviour change: consumers on NX workspaces should expect some
> previously-passing PRs to start failing (or warn, under `dry-run`) once
> they upgrade. Non-NX repositories are unaffected.

Use the `Backpack Adoption Guard Release` workflow and choose the semver bump
type:

| Release type | Use when |
| --- | --- |
| `patch` | Fixing bugs or release packaging without changing consumer-facing behaviour. |
| `minor` | Adding backwards-compatible optional inputs, outputs, or reporting. |
| `major` | Changing defaults, guard pass/fail behaviour, inputs, or the results JSON schema. |

> **Migration**: The floating `backpack-adoption-guard/v1` major tag is no
> longer updated. Pin to an immutable tag such as
> `backpack-adoption-guard/v1.0.0` or newer.

The workflow calculates the next immutable
`backpack-adoption-guard/vMAJOR.MINOR.PATCH` tag from existing release tags. It
builds `dist/` into a tag-only release commit so generated bundles stay out of
`main`. Only workflow runs dispatched from the `main` branch can create release
tags; runs from other branches validate, lint, test, and build only.
