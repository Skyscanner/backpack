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
import { mkdir, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";

import { analyzeRepository } from "../analysis/analyze-repository";
import {
  BACKPACK_ADOPTION_OUTPUT_KEY,
  DEFAULT_ADOPTION_GUARD_THRESHOLD,
  DEFAULT_OUTPUT_PATH,
  DEFAULT_PATTERN,
} from "../shared/config";
import type {
  ActionResult,
  AdoptionReport,
  BackpackAdoptionMetrics,
  GuardResult,
  ResultsFile,
} from "../shared/types";
import {
  combineGuardStatuses,
  evaluateGuard,
  evaluateProjectGuards,
} from "../guard/evaluate-guard";
import {
  getPullRequestBaseRef,
  isMainBranch,
  isPullRequestEvent,
  withBaseWorktree,
} from "../git/base-worktree";
import { createGitHubActionsIO, getBooleanInput } from "./io";
import type { ActionIO } from "./io";
import { buildStepSummary } from "./summary";

export type RunOptions = {
  cwd?: string;
  io?: ActionIO;
};

const writeResults = async (
  cwd: string,
  outputPath: string,
  result: ActionResult,
) => {
  const absolutePath = resolve(cwd, outputPath);
  await mkdir(dirname(absolutePath), { recursive: true });

  const metrics: BackpackAdoptionMetrics = {
    generatedAt: result.generatedAt,
    repository: result.repository,
    backpackWebVersion: result.head.backpackWebVersion,
    filesAnalyzed: result.head.filesAnalyzed,
    skippedFiles: result.head.parseErrors.length,
    usage: result.head.usage,
  };

  if (result.head.projects) {
    metrics.projects = {};
    for (const [name, project] of Object.entries(result.head.projects)) {
      metrics.projects[name] = {
        filesAnalyzed: project.filesAnalyzed,
        ...project.usage,
      };
    }
  }

  const resultsFile: ResultsFile = {
    [BACKPACK_ADOPTION_OUTPUT_KEY]: metrics,
  };

  await writeFile(
    absolutePath,
    `${JSON.stringify(resultsFile, null, 2)}\n`,
    "utf8",
  );
};

const createActionResult = ({
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
});

const analyzeBaseReport = async ({
  cwd,
  io,
  pattern,
}: {
  cwd: string;
  io: ActionIO;
  pattern: string;
}): Promise<AdoptionReport | null> => {
  if (!isPullRequestEvent()) {
    return null;
  }

  const baseRef = getPullRequestBaseRef();
  if (!baseRef) {
    return null;
  }

  try {
    return await withBaseWorktree(
      cwd,
      baseRef,
      (basePath) => analyzeRepository(basePath, { pattern }),
      { log: (message) => io.warning(message) },
    );
  } catch (error) {
    io.warning(
      `Failed to analyze base ref \`${baseRef}\`: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return null;
  }
};

const parseThresholdInput = (input: string) => {
  const value = input.trim();
  if (!value) {
    return DEFAULT_ADOPTION_GUARD_THRESHOLD;
  }

  const threshold = Number(value);
  if (!Number.isFinite(threshold) || threshold < 0 || threshold > 100) {
    throw new Error(
      `Invalid threshold input: ${input}. Expected a number between 0 and 100.`,
    );
  }

  return threshold;
};

const projectNamesWithStatus = (
  projectGuards: Record<string, GuardResult>,
  status: GuardResult["status"],
) =>
  Object.entries(projectGuards)
    .filter(([, projectGuard]) => projectGuard.status === status)
    .map(([name]) => name);

const buildCombinedReason = (
  guard: GuardResult,
  projectGuards: Record<string, GuardResult>,
  combinedStatus: GuardResult["status"],
): string => {
  if (combinedStatus === guard.status) {
    return guard.reason;
  }

  if (combinedStatus === "fail") {
    const names = projectNamesWithStatus(projectGuards, "fail").join(", ");
    return `${guard.reason} Also failing due to per-project regression in: ${names}.`;
  }

  const names = projectNamesWithStatus(projectGuards, "warn").join(", ");
  return `${guard.reason} Also warning due to per-project regression in: ${names}.`;
};

export const run = async ({
  cwd = process.cwd(),
  io = createGitHubActionsIO(),
}: RunOptions = {}) => {
  const dryRun = getBooleanInput(io, "dry-run");
  const pattern = io.getInput("pattern") || DEFAULT_PATTERN;
  const outputPath = io.getInput("output-path") || DEFAULT_OUTPUT_PATH;
  const threshold = parseThresholdInput(io.getInput("threshold"));
  const main = isMainBranch();
  const pullRequest = isPullRequestEvent();

  io.info(`Analyzing Backpack adoption in ${cwd}`);
  io.info(`Using file pattern: ${pattern}`);

  const headReport = await analyzeRepository(cwd, { pattern });
  const baseReport = main
    ? null
    : await analyzeBaseReport({
        cwd,
        io,
        pattern,
      });
  const guard = evaluateGuard({
    baseReport,
    dryRun,
    headReport,
    isMain: main,
    threshold,
  });
  const projectGuards = evaluateProjectGuards({
    baseReport,
    dryRun,
    headReport,
    isMain: main,
    threshold,
  });
  const combinedStatus = combineGuardStatuses(guard, projectGuards);
  const combinedReason = buildCombinedReason(guard, projectGuards, combinedStatus);
  const combinedGuard = {
    ...guard,
    status: combinedStatus,
    reason: combinedReason,
    projects: projectGuards,
  };
  const result = createActionResult({
    baseReport,
    eventName: process.env.GITHUB_EVENT_NAME || null,
    guard: combinedGuard,
    headReport,
    isMain: main,
    isPullRequest: pullRequest,
    ref: process.env.GITHUB_REF || null,
    repository: basename(cwd),
  });

  await writeResults(cwd, outputPath, result);
  await io.appendSummary(buildStepSummary(result));

  io.info(`Backpack adoption results written to ${outputPath}`);
  io.info(`Head Backpack adoption: ${headReport.usage.backpack.percentage}%`);

  if (baseReport) {
    io.info(`Base Backpack adoption: ${baseReport.usage.backpack.percentage}%`);
    io.info(`Backpack adoption delta: ${guard.delta}%`);
  }

  if (headReport.parseErrors.length > 0) {
    io.warning(
      `${headReport.parseErrors.length} file(s) could not be parsed during head analysis.`,
    );
  }

  if (baseReport && baseReport.parseErrors.length > 0) {
    io.warning(
      `${baseReport.parseErrors.length} file(s) could not be parsed during base analysis.`,
    );
  }

  if (result.guard.status === "warn") {
    io.warning(result.guard.reason);
  }

  if (result.guard.status === "fail") {
    io.setFailed(result.guard.reason);
  }

  return result;
};
