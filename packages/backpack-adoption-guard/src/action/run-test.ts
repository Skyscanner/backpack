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

import { run } from "./run";
import type { ActionIO } from "./io";

const createRepo = async () => mkdtemp(join(tmpdir(), "bpk-action-test-"));

const writeRepoFile = async (
  repoPath: string,
  filePath: string,
  content: string,
) => {
  const absolutePath = join(repoPath, filePath);
  await mkdir(join(absolutePath, ".."), { recursive: true });
  await writeFile(absolutePath, content, "utf8");
};

const createTestIO = (inputs: Record<string, string> = {}): ActionIO => ({
  getInput: (name) => inputs[name] || "",
  info: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
  setFailed: jest.fn(),
  appendSummary: jest.fn().mockResolvedValue(undefined),
});

describe("run", () => {
  const originalEnv = { ...process.env };
  let repoPath: string;

  beforeEach(async () => {
    repoPath = await createRepo();
    process.env = {
      ...originalEnv,
      GITHUB_EVENT_NAME: "push",
      GITHUB_REF: "refs/heads/main",
    };
  });

  afterEach(async () => {
    process.env = originalEnv;
    await rm(repoPath, { force: true, recursive: true });
  });

  it("writes a compact Cortex metrics file without guard or analyser details", async () => {
    await writeRepoFile(
      repoPath,
      "package.json",
      JSON.stringify({
        dependencies: {
          "@skyscanner/backpack-web": "^42.21.1",
        },
      }),
    );
    await writeRepoFile(
      repoPath,
      "src/App.tsx",
      `
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';

export const App = () => (
  <>
    <BpkButton>Book</BpkButton>
    <BpkText className="override">Text</BpkText>
    <div>Raw HTML</div>
  </>
);
`,
    );

    const result = await run({ cwd: repoPath, io: createTestIO() });
    const resultsFile = JSON.parse(
      await readFile(join(repoPath, "backpack-adoption-results.json"), "utf8"),
    );
    const metrics = resultsFile["backpack-adoption"];

    expect(metrics).toEqual({
      generatedAt: result.generatedAt,
      repository: result.repository,
      backpackWebVersion: "^42.21.1",
      filesAnalyzed: result.head.filesAnalyzed,
      skippedFiles: 0,
      usage: result.head.usage,
    });
    expect(result.head.componentCounts).toEqual({
      BpkButton: 1,
      BpkText: 1,
    });
    expect(metrics).not.toHaveProperty("head");
    expect(metrics).not.toHaveProperty("base");
    expect(metrics).not.toHaveProperty("comparison");
    expect(metrics).not.toHaveProperty("guard");
    expect(metrics).not.toHaveProperty("componentCounts");
    expect(metrics).not.toHaveProperty("parseErrors");
  });

  it("uses the default guard threshold when the input is omitted", async () => {
    const result = await run({ cwd: repoPath, io: createTestIO() });

    expect(result.guard.threshold).toBe(60);
    expect(result.comparison.threshold).toBe(60);
  });

  it("uses the configured guard threshold", async () => {
    const result = await run({
      cwd: repoPath,
      io: createTestIO({ threshold: "70" }),
    });

    expect(result.guard.threshold).toBe(70);
    expect(result.comparison.threshold).toBe(70);
  });

  it("rejects an invalid guard threshold", async () => {
    await expect(
      run({
        cwd: repoPath,
        io: createTestIO({ threshold: "101" }),
      }),
    ).rejects.toThrow("Invalid threshold input");
  });
});
