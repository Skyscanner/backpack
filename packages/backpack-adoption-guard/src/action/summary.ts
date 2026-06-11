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
import type { ActionResult, AdoptionReport, GuardResult } from "../shared/types";

const STATUS_HEADER: Record<GuardResult["status"], string> = {
  pass: "✅ Backpack Adoption Guard — Pass",
  fail: "❌ Backpack Adoption Guard — Fail",
  warn: "⚠️ Backpack Adoption Guard — Warning",
};

const formatPercentage = (value: number | null) =>
  value === null ? "n/a" : `${value.toFixed(2)}%`;

const formatDelta = (value: number | null) => {
  if (value === null) {
    return "n/a";
  }
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}pp`;
};

const formatVersion = (value: string | null) => value || "unknown";

const formatCount = (value: number) => value.toLocaleString("en-US");

const formatPercentageAndCount = (
  percentage: number,
  count: number,
) => `${percentage.toFixed(2)}% (${formatCount(count)})`;

const buildPlainEnglishMain = (report: AdoptionReport) => {
  const total =
    report.usage.backpack.count +
    report.usage.nonBackpack.count +
    report.usage.rawHtml.count;
  return `\`${formatCount(report.usage.backpack.count)} of ${formatCount(total)} React elements use Backpack components (across ${formatCount(report.filesAnalyzed)} files).\``;
};

const buildPlainEnglishComparison = (
  head: AdoptionReport,
  base: AdoptionReport,
) => {
  const headTotal =
    head.usage.backpack.count +
    head.usage.nonBackpack.count +
    head.usage.rawHtml.count;
  const baseTotal =
    base.usage.backpack.count +
    base.usage.nonBackpack.count +
    base.usage.rawHtml.count;
  return `\`This PR: ${formatCount(head.usage.backpack.count)} of ${formatCount(headTotal)} elements use Backpack. Main: ${formatCount(base.usage.backpack.count)} of ${formatCount(baseTotal)}.\``;
};

const buildParseErrorDetails = (
  parseErrors: AdoptionReport["parseErrors"],
  label: string,
) => {
  if (parseErrors.length === 0) {
    return "";
  }

  const items = parseErrors
    .map(({ file, message }) => `- \`${file}\` — ${message}`)
    .join("\n");

  return `\n<details>
<summary>${parseErrors.length} file(s) skipped in ${label} because @babel/parser could not parse them. Once main reaches the adoption threshold, the guard fails when this number is non-zero.</summary>

${items}

</details>
`;
};

const buildMainView = (result: ActionResult) => {
  const { head, guard } = result;
  const skipped = head.parseErrors.length;
  const skippedRow = `| Skipped files (parse error) | ${formatCount(skipped)} |`;

  return `## ${STATUS_HEADER[guard.status]}

> ${guard.reason}

### Backpack adoption rate: **${formatPercentage(guard.headBackpackPercentage)}**

${buildPlainEnglishMain(head)}

| Category | Count | % |
| --- | ---: | ---: |
| Backpack | ${formatCount(head.usage.backpack.count)} | ${head.usage.backpack.percentage.toFixed(2)}% |
| └ Pure | ${formatCount(head.usage.pureBackpack.count)} | ${head.usage.pureBackpack.percentage.toFixed(2)}% |
| └ With className override | ${formatCount(head.usage.nonPureBackpack.count)} | ${head.usage.nonPureBackpack.percentage.toFixed(2)}% |
| Non-Backpack | ${formatCount(head.usage.nonBackpack.count)} | ${head.usage.nonBackpack.percentage.toFixed(2)}% |
| Raw HTML | ${formatCount(head.usage.rawHtml.count)} | ${head.usage.rawHtml.percentage.toFixed(2)}% |

### Run details

| Detail | Value |
| --- | --- |
| Files analyzed | ${formatCount(head.filesAnalyzed)} |
| backpack-web version | ${formatVersion(head.backpackWebVersion)} |
| Guard threshold | ${guard.threshold.toFixed(2)}% |
${skippedRow}
${buildParseErrorDetails(head.parseErrors, "this run")}
`;
};

const buildPRWithoutBaseView = (result: ActionResult) => {
  const { head, guard } = result;
  const skipped = head.parseErrors.length;

  return `## ${STATUS_HEADER[guard.status]}

> ${guard.reason}

### Backpack adoption rate: **${formatPercentage(guard.headBackpackPercentage)}** (this PR)

${buildPlainEnglishMain(head)}

| Category | Count | % |
| --- | ---: | ---: |
| Backpack | ${formatCount(head.usage.backpack.count)} | ${head.usage.backpack.percentage.toFixed(2)}% |
| └ Pure | ${formatCount(head.usage.pureBackpack.count)} | ${head.usage.pureBackpack.percentage.toFixed(2)}% |
| └ With className override | ${formatCount(head.usage.nonPureBackpack.count)} | ${head.usage.nonPureBackpack.percentage.toFixed(2)}% |
| Non-Backpack | ${formatCount(head.usage.nonBackpack.count)} | ${head.usage.nonBackpack.percentage.toFixed(2)}% |
| Raw HTML | ${formatCount(head.usage.rawHtml.count)} | ${head.usage.rawHtml.percentage.toFixed(2)}% |

### Run details

| Detail | Value |
| --- | --- |
| Files analyzed | ${formatCount(head.filesAnalyzed)} |
| backpack-web version | ${formatVersion(head.backpackWebVersion)} |
| Guard threshold | ${guard.threshold.toFixed(2)}% |
| Dry run | ${guard.dryRun ? "true" : "false"} |
| Skipped files (parse error) | ${formatCount(skipped)} |
${buildParseErrorDetails(head.parseErrors, "this PR")}
`;
};

const buildPRComparisonView = (result: ActionResult) => {
  const { base, head, guard } = result;
  if (!base) {
    return buildPRWithoutBaseView(result);
  }

  const headSkipped = head.parseErrors.length;
  const baseSkipped = base.parseErrors.length;

  return `## ${STATUS_HEADER[guard.status]}

> ${guard.reason}

### Backpack adoption rate: **${formatPercentage(guard.headBackpackPercentage)}** (${formatDelta(guard.delta)} vs \`main\`)

${buildPlainEnglishComparison(head, base)}

| Category | This PR | Main | Change |
| --- | ---: | ---: | ---: |
| Backpack | ${formatPercentageAndCount(head.usage.backpack.percentage, head.usage.backpack.count)} | ${formatPercentageAndCount(base.usage.backpack.percentage, base.usage.backpack.count)} | ${formatDelta(Number((head.usage.backpack.percentage - base.usage.backpack.percentage).toFixed(2)))} |
| └ Pure | ${formatPercentageAndCount(head.usage.pureBackpack.percentage, head.usage.pureBackpack.count)} | ${formatPercentageAndCount(base.usage.pureBackpack.percentage, base.usage.pureBackpack.count)} | ${formatDelta(Number((head.usage.pureBackpack.percentage - base.usage.pureBackpack.percentage).toFixed(2)))} |
| └ With className override | ${formatPercentageAndCount(head.usage.nonPureBackpack.percentage, head.usage.nonPureBackpack.count)} | ${formatPercentageAndCount(base.usage.nonPureBackpack.percentage, base.usage.nonPureBackpack.count)} | ${formatDelta(Number((head.usage.nonPureBackpack.percentage - base.usage.nonPureBackpack.percentage).toFixed(2)))} |
| Non-Backpack | ${formatPercentageAndCount(head.usage.nonBackpack.percentage, head.usage.nonBackpack.count)} | ${formatPercentageAndCount(base.usage.nonBackpack.percentage, base.usage.nonBackpack.count)} | ${formatDelta(Number((head.usage.nonBackpack.percentage - base.usage.nonBackpack.percentage).toFixed(2)))} |
| Raw HTML | ${formatPercentageAndCount(head.usage.rawHtml.percentage, head.usage.rawHtml.count)} | ${formatPercentageAndCount(base.usage.rawHtml.percentage, base.usage.rawHtml.count)} | ${formatDelta(Number((head.usage.rawHtml.percentage - base.usage.rawHtml.percentage).toFixed(2)))} |

### Run details

| Detail | Value |
| --- | --- |
| Files analyzed (this PR) | ${formatCount(head.filesAnalyzed)} |
| Files analyzed (main) | ${formatCount(base.filesAnalyzed)} |
| backpack-web version | ${formatVersion(head.backpackWebVersion)} |
| Guard threshold | ${guard.threshold.toFixed(2)}% |
| Dry run | ${guard.dryRun ? "true" : "false"} |
| Skipped files in this PR | ${formatCount(headSkipped)} |
| Skipped files in main | ${formatCount(baseSkipped)} |
${buildParseErrorDetails(head.parseErrors, "this PR")}${buildParseErrorDetails(base.parseErrors, "main")}
`;
};

export const buildStepSummary = (result: ActionResult) => {
  if (result.branch.isMain) {
    return buildMainView(result);
  }
  return buildPRComparisonView(result);
};
