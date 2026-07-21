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
import { joinPathFragments, logger } from "@nx/devkit";
import { combineGuardStatuses } from "@skyscanner/backpack-adoption-analyzer";

import { DEFAULT_RESULTS_FILE_NAME, readProjectResult } from "../results-store.ts";

import type { GuardResult } from "@skyscanner/backpack-adoption-analyzer";
import type { ExecutorContext, PromiseExecutor } from "@nx/devkit";
import type { ReportExecutorSchema } from "./schema.ts";

// No repo-wide analysis run backs this aggregation (each project already ran
// its own `analyze` executor) — this trivial "pass" baseline lets
// combineGuardStatuses reduce purely to "fail if any project fails, warn if
// any warns, else pass".
const BASELINE_PASS_GUARD: GuardResult = {
  status: "pass",
  reason: "No repo-wide guard; verdict is derived entirely from per-project results.",
  dryRun: false,
  threshold: 0,
  baseBackpackPercentage: null,
  headBackpackPercentage: 0,
  delta: null,
};

/**
 * Aggregates every NX project's `adoption-guard-results.json` (written by
 * the `analyze` executor) into one pass/fail verdict. Intended to run as a
 * target with `dependsOn: [{ "target": "adoption-guard", "projects": "all" }]`
 * so it executes after every project's `analyze` run has completed.
 */
const runExecutor: PromiseExecutor<ReportExecutorSchema> = async (
  options,
  context: ExecutorContext,
) => {
  const resultsFileName = options.resultsFileName ?? DEFAULT_RESULTS_FILE_NAME;
  const projectNames =
    options.projects ?? Object.keys(context.projectsConfigurations.projects);

  const projectGuards: Record<string, GuardResult> = {};

  for (const projectName of projectNames) {
    const projectRoot = context.projectsConfigurations.projects[projectName]?.root;
    if (!projectRoot) {
      continue;
    }

    const resultsPath = joinPathFragments(context.root, projectRoot, resultsFileName);
    const result = readProjectResult(resultsPath);
    if (!result) {
      continue;
    }

    projectGuards[projectName] = result.guard;
    logger.info(`[${projectName}] guard status: ${result.guard.status}`);
  }

  const combinedStatus = combineGuardStatuses(BASELINE_PASS_GUARD, projectGuards);

  if (combinedStatus === "fail") {
    const failingProjects = Object.entries(projectGuards)
      .filter(([, guard]) => guard.status === "fail")
      .map(([name]) => name);
    logger.error(
      `Backpack adoption guard failed for: ${failingProjects.join(", ")}.`,
    );
    return { success: false };
  }

  if (combinedStatus === "warn") {
    const warningProjects = Object.entries(projectGuards)
      .filter(([, guard]) => guard.status === "warn")
      .map(([name]) => name);
    logger.warn(
      `Backpack adoption guard warned for: ${warningProjects.join(", ")}.`,
    );
  }

  return { success: true };
};

export default runExecutor;
