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
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import runExecutor from "./executor";

import type { ExecutorContext } from "@nx/devkit";
import type { GuardResult } from "@skyscanner/backpack-adoption-analyzer";
import type { ProjectAdoptionResult } from "../results-store";

const createWorkspace = async () => mkdtemp(join(tmpdir(), "bpk-nx-report-test-"));

const buildContext = (
  workspaceRoot: string,
  projects: Record<string, string>,
): ExecutorContext => ({
  root: workspaceRoot,
  cwd: workspaceRoot,
  isVerbose: false,
  projectGraph: { nodes: {}, dependencies: {} },
  projectsConfigurations: {
    projects: Object.fromEntries(
      Object.entries(projects).map(([name, root]) => [name, { root }]),
    ),
    version: 2,
  },
  nxJsonConfiguration: {},
});

const guardWithStatus = (status: GuardResult["status"]): GuardResult => ({
  status,
  reason: `stubbed ${status}`,
  dryRun: false,
  threshold: 60,
  baseBackpackPercentage: 60,
  headBackpackPercentage: status === "pass" ? 61 : 59,
  delta: status === "pass" ? 1 : -1,
});

const writeProjectResultFile = async (
  workspaceRoot: string,
  projectRoot: string,
  fileName: string,
  result: ProjectAdoptionResult,
) => {
  const absolutePath = join(workspaceRoot, projectRoot, fileName);
  await mkdir(join(absolutePath, ".."), { recursive: true });
  await writeFile(absolutePath, JSON.stringify(result), "utf8");
};

const stubResult = (
  projectName: string,
  status: GuardResult["status"],
): ProjectAdoptionResult => ({
  projectName,
  threshold: 60,
  headReport: {
    repository: "workspace",
    generatedAt: "2026-07-20T00:00:00.000Z",
    filesAnalyzed: 1,
    parseErrors: [],
    backpackWebVersion: null,
    usage: {
      backpack: { count: 1, percentage: 60 },
      pureBackpack: { count: 1, percentage: 60 },
      nonPureBackpack: { count: 0, percentage: 0 },
      nonBackpack: { count: 0, percentage: 0 },
      rawHtml: { count: 0, percentage: 40 },
    },
    componentCounts: {},
  },
  baseReport: null,
  guard: guardWithStatus(status),
});

describe("report executor", () => {
  let workspaceRoot: string;

  beforeEach(async () => {
    workspaceRoot = await createWorkspace();
  });

  afterEach(async () => {
    await rm(workspaceRoot, { force: true, recursive: true });
  });

  it("succeeds when every project's guard passed", async () => {
    await writeProjectResultFile(
      workspaceRoot,
      "apps/flights",
      "results.json",
      stubResult("flights", "pass"),
    );
    await writeProjectResultFile(
      workspaceRoot,
      "apps/hotels",
      "results.json",
      stubResult("hotels", "pass"),
    );

    const context = buildContext(workspaceRoot, {
      flights: "apps/flights",
      hotels: "apps/hotels",
    });

    const result = await runExecutor({ resultsFileName: "results.json" }, context);

    expect(result.success).toBe(true);
  });

  it("fails when any project's guard failed, even if others passed", async () => {
    await writeProjectResultFile(
      workspaceRoot,
      "apps/flights",
      "results.json",
      stubResult("flights", "pass"),
    );
    await writeProjectResultFile(
      workspaceRoot,
      "apps/hotels",
      "results.json",
      stubResult("hotels", "fail"),
    );

    const context = buildContext(workspaceRoot, {
      flights: "apps/flights",
      hotels: "apps/hotels",
    });

    const result = await runExecutor({ resultsFileName: "results.json" }, context);

    expect(result.success).toBe(false);
  });

  it("succeeds (with a warning) when a project warns but none fail", async () => {
    await writeProjectResultFile(
      workspaceRoot,
      "apps/flights",
      "results.json",
      stubResult("flights", "warn"),
    );

    const context = buildContext(workspaceRoot, { flights: "apps/flights" });

    const result = await runExecutor({ resultsFileName: "results.json" }, context);

    expect(result.success).toBe(true);
  });

  it("ignores projects with no results file on disk", async () => {
    await writeProjectResultFile(
      workspaceRoot,
      "apps/flights",
      "results.json",
      stubResult("flights", "pass"),
    );
    // apps/hotels has no results file written.

    const context = buildContext(workspaceRoot, {
      flights: "apps/flights",
      hotels: "apps/hotels",
    });

    const result = await runExecutor({ resultsFileName: "results.json" }, context);

    expect(result.success).toBe(true);
  });

  it("restricts aggregation to the explicitly listed projects", async () => {
    await writeProjectResultFile(
      workspaceRoot,
      "apps/flights",
      "results.json",
      stubResult("flights", "pass"),
    );
    await writeProjectResultFile(
      workspaceRoot,
      "apps/hotels",
      "results.json",
      stubResult("hotels", "fail"),
    );

    const context = buildContext(workspaceRoot, {
      flights: "apps/flights",
      hotels: "apps/hotels",
    });

    const result = await runExecutor(
      { resultsFileName: "results.json", projects: ["flights"] },
      context,
    );

    expect(result.success).toBe(true);
  });

  it("fails when an explicitly listed project cannot be resolved", async () => {
    const context = buildContext(workspaceRoot, { flights: "apps/flights" });

    const result = await runExecutor({ projects: ["flgihts"] }, context);

    expect(result.success).toBe(false);
  });

  it("fails when an explicitly listed project did not produce a result", async () => {
    const context = buildContext(workspaceRoot, { flights: "apps/flights" });

    const result = await runExecutor({ projects: ["flights"] }, context);

    expect(result.success).toBe(false);
  });

  it("fails cleanly when a result path cannot be read", async () => {
    await mkdir(join(workspaceRoot, "apps/flights/results"), { recursive: true });
    const context = buildContext(workspaceRoot, { flights: "apps/flights" });

    const result = await runExecutor(
      { projects: ["flights"], resultsFileName: "results" },
      context,
    );

    expect(result.success).toBe(false);
  });
});
