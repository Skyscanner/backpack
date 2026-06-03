# Backpack Adoption Guard

This GitHub Action calculates Backpack adoption for a consuming repository.
On `main`, it writes a results JSON file and can upload the data to Cortex.
On pull requests, it compares the PR checkout against the base checkout and
fails only when the base adoption is already at least 60% and the PR lowers the
Backpack adoption rate.

```yaml
- uses: actions/checkout@v6
  with:
    fetch-depth: 0

- name: Backpack Adoption Guard
  uses: Skyscanner/backpack/libs/backpack-adoption-action@backpack-adoption-action/v1
  with:
    dry-run: ${{ vars.BACKPACK_ADOPTION_DRY_RUN }}
    cortex-webhook-uuid: ${{ secrets.BACKPACK_ADOPTION_CORTEX_WEBHOOK_UUID }}
    cortex-entity: carhire-homepage
```

The guard threshold is maintained inside the action and is not configurable by
consumer repositories.

## Source structure

```text
src/
├── action/        # GitHub Action orchestration, input/output, step summary
├── analysis/      # Repository scanning and JSX/CSS adoption metrics
├── cortex/        # Cortex custom data upload
├── git/           # Pull request base checkout helpers
├── guard/         # Adoption guard decision logic
└── shared/        # Constants and shared result types
```

`src/action/run.ts` should stay thin: it wires inputs, analysis, guard
evaluation, results writing, and optional Cortex upload. The adoption metric
logic belongs under `src/analysis/`, and the PR blocking policy belongs under
`src/guard/`.
