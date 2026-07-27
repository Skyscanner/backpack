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
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { readProjectResult, writeProjectResult } from "./results-store";

import type { ProjectAdoptionResult } from "./results-store";

const projectResult: ProjectAdoptionResult = {
  projectName: "flights",
  threshold: 60,
  headReport: {
    repository: "workspace",
    generatedAt: "2026-07-20T00:00:00.000Z",
    filesAnalyzed: 1,
    parseErrors: [],
    backpackWebVersion: null,
    usage: {
      backpack: { count: 1, percentage: 100 },
      pureBackpack: { count: 1, percentage: 100 },
      nonPureBackpack: { count: 0, percentage: 0 },
      nonBackpack: { count: 0, percentage: 0 },
      rawHtml: { count: 0, percentage: 0 },
    },
    componentCounts: {},
  },
  baseReport: null,
  guard: {
    status: "pass",
    reason: "stubbed pass",
    dryRun: false,
    threshold: 60,
    baseBackpackPercentage: null,
    headBackpackPercentage: 100,
    delta: null,
  },
};

describe("project results store", () => {
  let workspaceRoot: string;

  beforeEach(async () => {
    workspaceRoot = await mkdtemp(join(tmpdir(), "bpk-nx-results-test-"));
  });

  afterEach(async () => {
    await rm(workspaceRoot, { force: true, recursive: true });
  });

  it("writes and reads a project result, creating parent directories", () => {
    const resultsPath = join(workspaceRoot, "apps/flights/.reports/result.json");

    writeProjectResult(resultsPath, projectResult);

    expect(readProjectResult(resultsPath)).toEqual(projectResult);
  });

  it("returns null when no result file exists", () => {
    expect(readProjectResult(join(workspaceRoot, "missing.json"))).toBeNull();
  });

  it("returns null when a result file contains invalid JSON", async () => {
    const resultsPath = join(workspaceRoot, "invalid.json");
    await writeFile(resultsPath, "not JSON", "utf8");

    expect(readProjectResult(resultsPath)).toBeNull();
  });
});
