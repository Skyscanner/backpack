# Backpack Adoption Guard NX Plugin

This public npm package provides per-project Backpack adoption guard thresholds. Each
project runs the `analyze` executor and writes its own result file; a workspace
target runs the `report` executor after those tasks and produces the overall
pass/fail verdict.

It is separate from the GitHub Action package. Use the Action for a single
whole-repository scan; use this plugin when an NX workspace needs a different
threshold in each project's `project.json`.

Install it in the consuming workspace:

```bash
pnpm add -D @skyscanner/backpack-adoption-nx-plugin
```

The plugin bundle includes Backpack's private analyzer implementation. Consumers
do not install or configure a separate analyzer package.

## Configure projects

Add an `adoption-guard` target to every project to analyse. `threshold` is
configured locally, so each project can choose its own adoption starting point.

```json
{
  "targets": {
    "adoption-guard": {
      "executor": "@skyscanner/backpack-adoption-nx-plugin:analyze",
      "options": {
        "threshold": 75
      }
    }
  }
}
```

The executor scans `**/*.{jsx,tsx}` below the project root by default. It
writes `adoption-guard-results.json` in that root and always succeeds so all
projects can report their results before the final verdict is calculated.

For pull-request comparisons, provide `baseWorktreePath` as an absolute path
to a checkout of the base ref. The base checkout must be **outside** the Nx
workspace root, otherwise Nx discovers its `project.json` files a second time
and fails while constructing the project graph. `dryRun: true` changes
otherwise failing regressions into warnings.

## Aggregate the result

Add a workspace-level target that depends on the project targets and invokes
the `report` executor. The `report` target is the task that fails when any
project's adoption guard fails.

```json
{
  "targets": {
    "adoption-guard-report": {
      "executor": "@skyscanner/backpack-adoption-nx-plugin:report",
      "dependsOn": [
        { "target": "adoption-guard", "projects": "all" }
      ],
      "options": {
        "projects": ["banana-webapp", "flights-webapp"]
      }
    }
  }
}
```

Run the report target to execute the dependency graph and obtain one CI verdict:

```bash
nx run workspace:adoption-guard-report
```

`projects` is optional. When omitted, the report executor considers all NX
projects that have a result file at the configured location. Use
`resultsFileName` on the report target if the analyse targets use a different
result filename.

## Publishing

`@skyscanner/backpack-adoption-nx-plugin` is released to the public npm
registry by the **Backpack Adoption NX Plugin Release** workflow. The published
bundle contains the private `backpack-adoption-analyzer` implementation, so
there is no analyzer package for consumers to install or version separately.

Pull requests that change the plugin or analyzer run the workflow's validation
job automatically. The publish job only runs from a manual, non-dry-run
dispatch on `main`. Before automated publishing, configure npm trusted
publishing for `@skyscanner/backpack-adoption-nx-plugin` with GitHub Actions:
organization `Skyscanner`, repository `backpack`, and workflow filename
`backpack-adoption-nx-plugin-release.yml`. The workflow uses its OIDC identity
and does not require an npm publish token.

## Options

`analyze` options:

| Option | Default | Description |
| --- | --- | --- |
| `pattern` | `**/*.{jsx,tsx}` | Glob relative to the project root. |
| `threshold` | `60` | Adoption percentage at which regressions start failing. |
| `dryRun` | `false` | Downgrade failures to warnings. |
| `outputPath` | `adoption-guard-results.json` | Result path relative to the project root. |
| `baseWorktreePath` | — | Absolute workspace-root path for the PR base checkout. |

`report` options:

| Option | Default | Description |
| --- | --- | --- |
| `projects` | all projects with result files | Project names to aggregate. |
| `resultsFileName` | `adoption-guard-results.json` | Result filename relative to each project root. |
