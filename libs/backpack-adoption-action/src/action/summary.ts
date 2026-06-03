import type { ActionResult } from "../shared/types";

const percentage = (value: number | null) =>
  value === null ? "n/a" : `${value.toFixed(2)}%`;

const delta = (value: number | null) => {
  if (value === null) {
    return "n/a";
  }

  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}pp`;
};

const statusLabel = (status: ActionResult["guard"]["status"]) => {
  if (status === "fail") {
    return "Fail";
  }

  if (status === "warn") {
    return "Warning";
  }

  if (status === "pass") {
    return "Pass";
  }

  return "Not applicable";
};

export const buildStepSummary = (result: ActionResult) => `## Backpack Adoption Guard

| Metric | Value |
| --- | ---: |
| Base Backpack adoption | ${percentage(result.comparison.baseBackpackPercentage)} |
| Head Backpack adoption | ${percentage(result.comparison.headBackpackPercentage)} |
| Delta | ${delta(result.comparison.delta)} |
| Guard threshold | ${result.comparison.threshold.toFixed(2)}% |
| Dry run | ${result.guard.dryRun ? "true" : "false"} |
| Guard status | ${statusLabel(result.guard.status)} |
| Cortex upload | ${result.cortex.status} |

${result.guard.reason}

`;
