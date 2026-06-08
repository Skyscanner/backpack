/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
  const headParseErrorCount = headReport.parseErrors.length;

  if (isMain) {
    if (headParseErrorCount > 0) {
      return {
        status: "warn",
        reason: `Adoption metrics for \`main\` reported, but ${headParseErrorCount} file(s) were skipped (parse error). Reported numbers may be inaccurate.`,
        dryRun,
        threshold: ADOPTION_GUARD_THRESHOLD,
        baseBackpackPercentage: null,
        headBackpackPercentage,
        delta: null,
      };
    }

    return {
      status: "pass",
      reason: "Adoption metrics for `main` are reported here for visibility. The guard never blocks on `main`.",
      dryRun,
      threshold: ADOPTION_GUARD_THRESHOLD,
      baseBackpackPercentage: null,
      headBackpackPercentage,
      delta: null,
    };
  }

  if (!baseReport) {
    return {
      status: dryRun ? "warn" : "fail",
      reason: dryRun
        ? "Could not load `main` for comparison; treated as warning because dry-run is enabled."
        : "Could not load `main` for comparison. Ensure the workflow uses `actions/checkout` and the base ref is reachable.",
      dryRun,
      threshold: ADOPTION_GUARD_THRESHOLD,
      baseBackpackPercentage: null,
      headBackpackPercentage,
      delta: null,
    };
  }

  const baseBackpackPercentage = baseReport.usage.backpack.percentage;
  const delta = Number((headBackpackPercentage - baseBackpackPercentage).toFixed(2));

  // Parse errors silently drop the offending file's element counts from the
  // totals, which can artificially inflate head adoption (e.g. a raw-HTML-heavy
  // file that fails to parse on head removes its rawHtmlUsages from the
  // denominator). Refusing to evaluate on incomplete data prevents the guard
  // from masking real regressions.
  const baseParseErrorCount = baseReport.parseErrors.length;
  if (headParseErrorCount > 0 || baseParseErrorCount > 0) {
    const sides: string[] = [];
    if (headParseErrorCount > 0) sides.push(`this PR (${headParseErrorCount})`);
    if (baseParseErrorCount > 0) sides.push(`main (${baseParseErrorCount})`);
    const summary = sides.join(" and ");
    return {
      status: dryRun ? "warn" : "fail",
      reason: dryRun
        ? `Skipped files in ${summary}; treated as warning because dry-run is enabled.`
        : `Skipped files in ${summary}; refusing to evaluate adoption with incomplete data.`,
      dryRun,
      threshold: ADOPTION_GUARD_THRESHOLD,
      baseBackpackPercentage,
      headBackpackPercentage,
      delta,
    };
  }

  if (baseBackpackPercentage < ADOPTION_GUARD_THRESHOLD) {
    return {
      status: "pass",
      reason: `Main is currently below the ${ADOPTION_GUARD_THRESHOLD}% threshold, so this PR is reported but not blocked.`,
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
        : `Backpack adoption decreased after this repository had reached the ${ADOPTION_GUARD_THRESHOLD}% threshold.`,
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
