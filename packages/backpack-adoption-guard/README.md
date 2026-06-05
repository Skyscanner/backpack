# Backpack Adoption Guard

This GitHub Action calculates Backpack adoption for a consuming repository
and writes the result to a JSON file. On pull requests it compares the PR
checkout against the base checkout and fails only when the base adoption is
already at least 60% and the PR lowers the Backpack adoption rate.

```yaml
- uses: actions/checkout@v6
  with:
    fetch-depth: 0

- name: Backpack Adoption Guard
  uses: Skyscanner/backpack/packages/backpack-adoption-guard@backpack-adoption-guard/v1
  with:
    dry-run: ${{ vars.BACKPACK_ADOPTION_DRY_RUN }}
```

The guard threshold is maintained inside the action and is not configurable by
consumer repositories.

## Behaviour

| Branch context | Behaviour |
| --- | --- |
| `refs/heads/main` | Calculates adoption and writes JSON. Never fails. |
| Pull request, base adoption < 60% | Calculates adoption and reports. Never blocks. |
| Pull request, base adoption ≥ 60% | Fails when head adoption drops below base adoption. `dry-run: true` downgrades the failure to a warning. |

## Inputs

| Input | Description | Required | Default |
| --- | --- | --- | --- |
| `dry-run` | Report adoption drops as warnings instead of failing the PR. | No | `false` |
| `pattern` | Glob for files scanned. | No | `**/*.{jsx,tsx}` |
| `output-path` | Path for the generated adoption result JSON. | No | `backpack-adoption-results.json` |

## Uploading metrics to Cortex

This action only writes a JSON results file. To ship the results to Cortex on
`main`, add a separate step that uses
[`Skyscanner/push-custom-cortex-data`](https://github.com/Skyscanner/push-custom-cortex-data)
and points its `data-descriptor.path` at the file produced above. Use
`backpack-adoption` as the `data-descriptor.key` (the top-level key the
results JSON uses).

```yaml
- uses: actions/checkout@v6
  with:
    fetch-depth: 0

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
