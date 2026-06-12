# Backpack Adoption Guard

This GitHub Action calculates Backpack adoption for a consuming repository
and writes the result to a JSON file. On pull requests it compares the PR
checkout against the base checkout and fails only when the base adoption is
already at least the configured threshold and the PR lowers the Backpack
adoption rate.

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
    }
  }
}
```

```yaml
- uses: actions/checkout@v6

- name: Backpack Adoption Guard
  uses: Skyscanner/backpack/packages/backpack-adoption-guard@backpack-adoption-guard/v1

- name: Upload Backpack adoption metrics to Cortex
  if: github.ref == 'refs/heads/main'
  uses: Skyscanner/push-custom-cortex-data@v1
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
