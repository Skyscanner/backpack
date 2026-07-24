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

import { DEFAULT_RESULTS_FILE_NAME, readProjectResult } from "../results-store";

import type { GuardResult } from "@skyscanner/backpack-adoption-analyzer";
import type { ExecutorContext, PromiseExecutor } from "@nx/devkit";
import type { ReportExecutorSchema } from "./schema";

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

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
  let hasConfigurationError = false;

  for (const projectName of projectNames) {
    const projectRoot = context.projectsConfigurations.projects[projectName]?.root;
    if (!projectRoot) {
      if (options.projects) {
        logger.error(`Could not resolve project root for ${projectName}.`);
        hasConfigurationError = true;
      }
      continue;
    }

    const resultsPath = joinPathFragments(context.root, projectRoot, resultsFileName);
    let result;
    try {
      result = readProjectResult(resultsPath);
    } catch (error) {
      logger.error(
        `[${projectName}] Could not read adoption result at ${resultsPath}: ${getErrorMessage(error)}`,
      );
      hasConfigurationError = true;
      continue;
    }

    if (!result) {
      if (options.projects) {
        logger.error(
          `[${projectName}] No adoption result found at ${resultsPath}. Ensure its analyze target runs before this report.`,
        );
        hasConfigurationError = true;
      }
      continue;
    }

    projectGuards[projectName] = result.guard;
    logger.info(`[${projectName}] guard status: ${result.guard.status}`);
  }

  if (hasConfigurationError) {
    logger.error("Backpack adoption report has configuration errors.");
    return { success: false };
  }

  const statuses = Object.values(projectGuards).map((guard) => guard.status);
  const combinedStatus = statuses.includes("fail")
    ? "fail"
    : statuses.includes("warn")
      ? "warn"
      : "pass";

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
