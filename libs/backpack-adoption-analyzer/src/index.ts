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
export { analyzeRepository } from "./analysis/analyze-repository";
export {
  UNASSIGNED,
  buildProjectIndex,
  detectNxProjects,
  resolveProject,
} from "./analysis/nx-projects";
export type { NxProject, NxProjectIndexEntry } from "./analysis/nx-projects";

export {
  combineGuardStatuses,
  evaluateGuard,
  evaluateProjectGuards,
} from "./guard/evaluate-guard";

export {
  BACKPACK_ADOPTION_OUTPUT_KEY,
  DEFAULT_ADOPTION_GUARD_THRESHOLD,
  DEFAULT_IGNORE_PATTERNS,
  DEFAULT_OUTPUT_PATH,
  DEFAULT_PATTERN,
} from "./shared/config";
export type {
  ActionResult,
  AdoptionReport,
  BackpackAdoptionMetrics,
  GuardResult,
  GuardStatus,
  ResultsFile,
  UsageMetric,
  UsageSummary,
} from "./shared/types";
