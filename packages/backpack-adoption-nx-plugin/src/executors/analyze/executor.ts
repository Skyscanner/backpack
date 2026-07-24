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
import {
  DEFAULT_ADOPTION_GUARD_THRESHOLD,
  DEFAULT_PATTERN,
  analyzeRepository,
  evaluateGuard,
} from "@skyscanner/backpack-adoption-analyzer";

import { DEFAULT_RESULTS_FILE_NAME, writeProjectResult } from "../results-store";

import type { ExecutorContext, PromiseExecutor } from "@nx/devkit";
import type { AnalyzeExecutorSchema } from "./schema";

/**
 * Analyzes a single NX project's Backpack adoption and writes a per-project
 * result file. Always returns success — the `report` executor (which depends
 * on every project's `analyze` run) reads these result files and decides the
 * real pass/fail verdict, mirroring devex-web's a11y `emitPrResult` +
 * aggregator pattern.
 */
const runExecutor: PromiseExecutor<AnalyzeExecutorSchema> = async (
  options,
  context: ExecutorContext,
) => {
  const { projectName } = context;
  if (!projectName) {
    logger.error("adoption-guard analyze executor requires a project context.");
    return { success: false };
  }

  const projectRoot = context.projectsConfigurations.projects[projectName]?.root;
  if (!projectRoot) {
    logger.error(`Could not resolve project root for ${projectName}.`);
    return { success: false };
  }

  const pattern = joinPathFragments(projectRoot, options.pattern ?? DEFAULT_PATTERN);
  const threshold = options.threshold ?? DEFAULT_ADOPTION_GUARD_THRESHOLD;

  // Scan from the workspace root (not projectRoot) so findBackpackWebVersion
  // and any other root-relative lookups inside analyzeRepository still work;
  // `pattern` alone scopes the actual file matching to this project.
  const headReport = await analyzeRepository(context.root, { pattern });
  const baseReport = options.baseWorktreePath
    ? await analyzeRepository(options.baseWorktreePath, { pattern })
    : null;

  const guard = evaluateGuard({
    baseReport,
    dryRun: options.dryRun ?? false,
    headReport,
    // A threshold guards regressions, which requires a base report. Without a
    // base worktree this is a metrics-only invocation, equivalent to main:
    // report adoption without blocking the target.
    isMain: !options.baseWorktreePath,
    threshold,
  });

  const outputPath = joinPathFragments(
    context.root,
    projectRoot,
    options.outputPath ?? DEFAULT_RESULTS_FILE_NAME,
  );
  writeProjectResult(outputPath, { projectName, threshold, headReport, baseReport, guard });

  logger.info(
    `[${projectName}] Backpack adoption: ${headReport.usage.backpack.percentage}% (threshold ${threshold}%)`,
  );

  return { success: true };
};

export default runExecutor;
