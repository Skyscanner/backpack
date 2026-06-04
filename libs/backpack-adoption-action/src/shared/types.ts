export type UsageMetric = {
  count: number;
  percentage: number;
};

export type UsageSummary = {
  backpack: UsageMetric;
  pureBackpack: UsageMetric;
  nonPureBackpack: UsageMetric;
  nonBackpack: UsageMetric;
  rawHtml: UsageMetric;
};

export type AdoptionReport = {
  repository: string;
  generatedAt: string;
  filesAnalyzed: number;
  parseErrors: Array<{
    file: string;
    message: string;
  }>;
  backpackWebVersion: string | null;
  usage: UsageSummary;
  componentCounts: Record<string, number>;
};

export type GuardStatus = "pass" | "fail" | "warn" | "not_applicable";

export type GuardResult = {
  status: GuardStatus;
  reason: string;
  dryRun: boolean;
  threshold: number;
  baseBackpackPercentage: number | null;
  headBackpackPercentage: number;
  delta: number | null;
};

export type CortexStatus = "skipped" | "uploaded" | "warning";

export type CortexResult = {
  status: CortexStatus;
  reason: string;
};

export type ActionResult = {
  generatedAt: string;
  repository: string;
  branch: {
    ref: string | null;
    eventName: string | null;
    isMain: boolean;
    isPullRequest: boolean;
  };
  head: AdoptionReport;
  base: AdoptionReport | null;
  comparison: {
    baseBackpackPercentage: number | null;
    headBackpackPercentage: number;
    delta: number | null;
    threshold: number;
  };
  guard: GuardResult;
  cortex: CortexResult;
};

export type ResultsFile = {
  "backpack-adoption": ActionResult;
};
