# Backpack Adoption Guard

This GitHub Action calculates Backpack adoption for a consuming repository
and writes the result to a JSON file. On pull requests it compares the PR
checkout against the base checkout and fails only when the base adoption is
already at least 60% and the PR lowers the Backpack adoption rate.

The guard threshold is maintained inside the action and is not configurable by
consumer repositories.

## Quick start (recommended)

This package ships a reusable workflow that handles checkout, runs the guard,
and uploads metrics to Cortex on default-branch pushes — all in five lines on
the consumer side.

```yaml
on: [pull_request, push]

jobs:
  backpack-adoption-guard:
    uses: Skyscanner/backpack/.github/workflows/backpack-adoption-guard.yml@backpack-adoption-guard/v1
    with:
      cortex-entity: <your-cortex-entity-tag>
    secrets:
      CORTEX_WEBHOOK_UUID: ${{ secrets.BACKPACK_ADOPTION_CORTEX_WEBHOOK_UUID }}
```

PR runs only compute the rate; Cortex is only uploaded on pushes to the default
branch.

### Prerequisites

- A Cortex custom integration webhook configured for this repo's entity. The
  recommended values are entity tag JQ `.entity_tag` and CQL key
  `backpack-adoption-metadata`. Coordinate with SRE to create one if needed.
- A repo secret holding the webhook UUID, mapped into the workflow's
  `CORTEX_WEBHOOK_UUID` secret as shown above.

### Reusable workflow inputs

| Input | Description | Required | Default |
| --- | --- | --- | --- |
| `cortex-entity` | Cortex entity tag for this repo. | Yes | — |
| `dry-run` | Report PR adoption regressions as warnings instead of failing. The guard never blocks the default branch regardless of this flag. | No | `true` |
| `pattern` | Glob for files scanned. | No | `**/*.{jsx,tsx}` |
| `runs-on` | Runner label. | No | `ubuntu-latest` |

| Secret | Description | Required |
| --- | --- | --- |
| `CORTEX_WEBHOOK_UUID` | UUID of the Cortex custom integration webhook. Only consumed on default-branch pushes, but `workflow_call` resolves it up front so it must always be passed. | Yes |

## Behaviour

The action emits one of three guard statuses:

| Status | Meaning |
| --- | --- |
| ✅ `pass` | Adoption did not regress, or the run is informational only (`main`, or PR where main is still below 60%). |
| ⚠️ `warn` | The run is informational with caveats: a regression detected under `dry-run`, the base ref could not be loaded, files were skipped on a `main` run, or a would-be parse-error fail was downgraded by `dry-run`. The CI step does not fail. |
| ❌ `fail` | The guard refused to pass: a regression after main reached the 60% threshold, files were skipped at or above the threshold (incomplete data), or the base ref could not be loaded (with `dry-run` off). |

| Branch context | Behaviour |
| --- | --- |
| `refs/heads/main` | Reports adoption only. Never fails. Emits `warn` if files could not be parsed. |
| Pull request, main adoption < 60% | Reports adoption. Never blocks; any skipped files are flagged in the report but do not change the result. |
| Pull request, main adoption ≥ 60% | Fails when adoption drops, or when files were skipped on either side (incomplete data). `dry-run: true` downgrades the failure to a warning. |
| Pull request, base ref unavailable | Fails (`warn` under `dry-run`) so the workflow surfaces the misconfiguration. |

## Manual setup (advanced)

If you can't or don't want to use the reusable workflow above (e.g. because
you need fine-grained control over the steps surrounding the guard), invoke
the action directly.

```yaml
- uses: actions/checkout@v6

- name: Backpack Adoption Guard
  uses: Skyscanner/backpack/packages/backpack-adoption-guard@backpack-adoption-guard/v1
  with:
    dry-run: ${{ vars.BACKPACK_ADOPTION_DRY_RUN }}
```

The action transparently fetches the PR base commit on demand, so the default
shallow `actions/checkout` is enough. If your runner blocks single-commit
fetches, fall back to `fetch-depth: 0` on the checkout step.

### Action inputs

| Input | Description | Required | Default |
| --- | --- | --- | --- |
| `dry-run` | Report adoption drops as warnings instead of failing the PR. | No | `false` |
| `pattern` | Glob for files scanned. | No | `**/*.{jsx,tsx}` |
| `output-path` | Path for the generated adoption result JSON. | No | `backpack-adoption-results.json` |

> Note: the action's `dry-run` defaults to `false` (strict), while the reusable
> workflow's `dry-run` defaults to `true` (safe). The reusable workflow targets
> first-time consumers; direct action callers are assumed to want strict
> behaviour by default.

### Uploading metrics to Cortex manually

The action only writes a JSON results file. To ship the results to Cortex on
the default branch, add a separate step using
[`Skyscanner/push-custom-cortex-data`](https://github.com/Skyscanner/push-custom-cortex-data)
and point its `data-descriptor.path` at the file produced above. Use
`backpack-adoption` as the `data-descriptor.key` (the top-level key the
results JSON uses). The file intentionally contains compact default-branch
metrics for Cortex; detailed guard, PR comparison, parse-error, and
per-component data stays in the GitHub step summary and action internals.

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
    }
  }
}
```

```yaml
- uses: actions/checkout@v6

- name: Backpack Adoption Guard
  uses: Skyscanner/backpack/packages/backpack-adoption-guard@backpack-adoption-guard/v1

- name: Upload Backpack adoption metrics to Cortex
  if: github.event_name == 'push' && github.ref_name == github.event.repository.default_branch
  uses: skyscanner/push-custom-cortex-data@v0.0.3
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

The committed `dist/index.js` is a single-file bundle produced by `esbuild`.
After changing any source under `src/`, run:

```bash
npx nx run backpack-adoption-guard:build
```

…and commit the regenerated `dist/`. The release workflow's `verify-dist`
target re-runs the build and rejects the release if the committed bundle does
not match the source.
