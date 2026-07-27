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
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import runExecutor from "./executor";

import type { ExecutorContext } from "@nx/devkit";
import type { AnalyzeExecutorSchema } from "./schema";

const createWorkspace = async () => mkdtemp(join(tmpdir(), "bpk-nx-analyze-test-"));

const writeWorkspaceFile = async (
  workspaceRoot: string,
  filePath: string,
  content: string,
) => {
  const absolutePath = join(workspaceRoot, filePath);
  await mkdir(join(absolutePath, ".."), { recursive: true });
  await writeFile(absolutePath, content, "utf8");
};

const buildContext = (
  workspaceRoot: string,
  projectName: string,
  projectRoot: string,
): ExecutorContext => ({
  root: workspaceRoot,
  cwd: workspaceRoot,
  isVerbose: false,
  projectName,
  projectGraph: { nodes: {}, dependencies: {} },
  projectsConfigurations: {
    projects: {
      [projectName]: { root: projectRoot },
    },
    version: 2,
  },
  nxJsonConfiguration: {},
});

describe("analyze executor", () => {
  let workspaceRoot: string;

  beforeEach(async () => {
    workspaceRoot = await createWorkspace();
  });

  afterEach(async () => {
    await rm(workspaceRoot, { force: true, recursive: true });
  });

  it("fails when the executor context has no project name", async () => {
    const context = buildContext(workspaceRoot, "flights", "apps/flights");
    const result = await runExecutor({}, { ...context, projectName: undefined });

    expect(result.success).toBe(false);
  });

  it("fails when the project root cannot be resolved", async () => {
    const context: ExecutorContext = {
      ...buildContext(workspaceRoot, "flights", "apps/flights"),
      projectsConfigurations: { projects: {}, version: 2 },
    };

    const result = await runExecutor({}, context);

    expect(result.success).toBe(false);
  });

  it("analyzes only the target project's files and writes a result file using the configured threshold", async () => {
    await writeWorkspaceFile(
      workspaceRoot,
      "apps/flights/src/App.tsx",
      `
import { BpkButton } from '@skyscanner/backpack-web';
export const App = () => <BpkButton>Go</BpkButton>;
`,
    );
    await writeWorkspaceFile(
      workspaceRoot,
      "apps/hotels/src/App.tsx",
      `
export const App = () => <div>Raw HTML only</div>;
`,
    );

    const context = buildContext(workspaceRoot, "flights", "apps/flights");
    const options: AnalyzeExecutorSchema = {
      threshold: 75,
      outputPath: "results.json",
    };

    const result = await runExecutor(options, context);

    expect(result.success).toBe(true);

    const written = JSON.parse(
      await readFile(join(workspaceRoot, "apps/flights/results.json"), "utf8"),
    );

    expect(written.projectName).toBe("flights");
    expect(written.threshold).toBe(75);
    expect(written.headReport.filesAnalyzed).toBe(1);
    expect(written.headReport.usage.backpack.count).toBe(1);
    expect(written.guard.threshold).toBe(75);
    expect(written.guard.status).toBe("pass");
    expect(written.guard.reason).toContain("never blocks");
  });

  it("compares against a base worktree when baseWorktreePath is provided", async () => {
    const baseWorktreePath = await createWorkspace();
    try {
      await writeWorkspaceFile(
        baseWorktreePath,
        "apps/flights/src/App.tsx",
        `
import { BpkButton } from '@skyscanner/backpack-web';
export const App = () => <BpkButton>Go</BpkButton>;
`,
      );
      await writeWorkspaceFile(
        workspaceRoot,
        "apps/flights/src/App.tsx",
        `
export const App = () => <div>Regressed to raw HTML</div>;
`,
      );

      const context = buildContext(workspaceRoot, "flights", "apps/flights");
      const options: AnalyzeExecutorSchema = {
        threshold: 50,
        baseWorktreePath,
        outputPath: "results.json",
      };

      const result = await runExecutor(options, context);

      expect(result.success).toBe(true);

      const written = JSON.parse(
        await readFile(join(workspaceRoot, "apps/flights/results.json"), "utf8"),
      );

      expect(written.baseReport).not.toBeNull();
      expect(written.baseReport.usage.backpack.percentage).toBe(100);
      expect(written.headReport.usage.backpack.percentage).toBe(0);
      expect(written.guard.status).toBe("fail");
    } finally {
      await rm(baseWorktreePath, { force: true, recursive: true });
    }
  });
});
