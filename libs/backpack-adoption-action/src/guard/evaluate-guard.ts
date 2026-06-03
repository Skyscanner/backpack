import { ADOPTION_GUARD_THRESHOLD } from "../shared/config";
import type { AdoptionReport, GuardResult } from "../shared/types";

export const evaluateGuard = ({
  baseReport,
  dryRun,
  headReport,
  isMain,
}: {
  baseReport: AdoptionReport | null;
  dryRun: boolean;
  headReport: AdoptionReport;
  isMain: boolean;
}): GuardResult => {
  const headBackpackPercentage = headReport.usage.backpack.percentage;

  if (isMain) {
    return {
      status: "not_applicable",
      reason: "Main branch runs report adoption but never fail on adoption changes.",
      dryRun,
      threshold: ADOPTION_GUARD_THRESHOLD,
      baseBackpackPercentage: null,
      headBackpackPercentage,
      delta: null,
    };
  }

  if (!baseReport) {
    return {
      status: "not_applicable",
      reason: "No pull request base report was available.",
      dryRun,
      threshold: ADOPTION_GUARD_THRESHOLD,
      baseBackpackPercentage: null,
      headBackpackPercentage,
      delta: null,
    };
  }

  const baseBackpackPercentage = baseReport.usage.backpack.percentage;
  const delta = Number((headBackpackPercentage - baseBackpackPercentage).toFixed(2));

  if (baseBackpackPercentage < ADOPTION_GUARD_THRESHOLD) {
    return {
      status: "pass",
      reason: `Base adoption is below ${ADOPTION_GUARD_THRESHOLD}%, so this PR is reported but not blocked.`,
      dryRun,
      threshold: ADOPTION_GUARD_THRESHOLD,
      baseBackpackPercentage,
      headBackpackPercentage,
      delta,
    };
  }

  if (headBackpackPercentage < baseBackpackPercentage) {
    return {
      status: dryRun ? "warn" : "fail",
      reason: dryRun
        ? "Backpack adoption decreased, but dry-run is enabled."
        : "Backpack adoption decreased after the repository had reached the guard threshold.",
      dryRun,
      threshold: ADOPTION_GUARD_THRESHOLD,
      baseBackpackPercentage,
      headBackpackPercentage,
      delta,
    };
  }

  return {
    status: "pass",
    reason: "Backpack adoption did not decrease.",
    dryRun,
    threshold: ADOPTION_GUARD_THRESHOLD,
    baseBackpackPercentage,
    headBackpackPercentage,
    delta,
  };
};
