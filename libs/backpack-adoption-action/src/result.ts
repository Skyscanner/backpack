import type { ActionResult, AdoptionReport } from "./types";

export const createPendingActionResult = ({
  baseReport,
  eventName,
  guard,
  headReport,
  isMain,
  isPullRequest,
  ref,
  repository,
}: {
  baseReport: AdoptionReport | null;
  eventName: string | null;
  guard: ActionResult["guard"];
  headReport: AdoptionReport;
  isMain: boolean;
  isPullRequest: boolean;
  ref: string | null;
  repository: string;
}): ActionResult => ({
  generatedAt: new Date().toISOString(),
  repository,
  branch: {
    ref,
    eventName,
    isMain,
    isPullRequest,
  },
  head: headReport,
  base: baseReport,
  comparison: {
    baseBackpackPercentage: guard.baseBackpackPercentage,
    headBackpackPercentage: guard.headBackpackPercentage,
    delta: guard.delta,
    threshold: guard.threshold,
  },
  guard,
  cortex: {
    status: "skipped",
    reason: "Cortex upload has not run yet.",
  },
});
