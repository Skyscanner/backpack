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
import { mkdtemp, rm, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { analyzeRepository } from "./analyze-repository";

const createRepo = async () => mkdtemp(join(tmpdir(), "bpk-adoption-test-"));

const writeRepoFile = async (repoPath: string, filePath: string, content: string) => {
  const absolutePath = join(repoPath, filePath);
  await mkdir(join(absolutePath, ".."), { recursive: true });
  await writeFile(absolutePath, content, "utf8");
};

describe("analyzeRepository", () => {
  let repoPath: string;

  beforeEach(async () => {
    repoPath = await createRepo();
  });

  afterEach(async () => {
    await rm(repoPath, { force: true, recursive: true });
  });

  it("classifies Backpack, non-Backpack, raw HTML, and className overrides", async () => {
    await writeRepoFile(
      repoPath,
      "package.json",
      JSON.stringify({
        dependencies: {
          "@skyscanner/backpack-web": "^42.0.0",
        },
      }),
    );
    await writeRepoFile(
      repoPath,
      "src/App.tsx",
      `
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import { BpkText } from '@skyscanner/backpack-web';
import styles from './App.module.scss';

const LocalCard = () => (
  <section>
    <BpkText>Nested Backpack text</BpkText>
  </section>
);

const NonVisual = () => null;

export const App = () => (
  <>
    <BpkButton className={styles.ButtonOverride}>Book</BpkButton>
    <BpkText>Visible Backpack text</BpkText>
    <LocalCard />
    <NonVisual />
    <div className="layout-wrapper">Raw HTML</div>
  </>
);
`,
    );

    const report = await analyzeRepository(repoPath);

    expect(report.filesAnalyzed).toBe(1);
    expect(report.backpackWebVersion).toBe("^42.0.0");
    expect(report.usage.backpack.count).toBe(3);
    expect(report.usage.nonBackpack.count).toBe(1);
    expect(report.usage.rawHtml.count).toBe(2);
    expect(report.usage.backpack.percentage).toBe(50);
    expect(report.usage.pureBackpack.count).toBe(2);
    expect(report.usage.nonPureBackpack.count).toBe(1);
    expect(report.componentCounts).toEqual({
      BpkButton: 1,
      BpkText: 2,
    });
  });

  it("ignores generated, test, story, mock, and dependency files", async () => {
    await writeRepoFile(
      repoPath,
      "src/App.tsx",
      `
import BpkText from '@skyscanner/backpack-web/bpk-component-text';

export const App = () => <BpkText>Only production file</BpkText>;
`,
    );
    await writeRepoFile(repoPath, "src/App.test.tsx", "export const Test = () => <div />;");
    await writeRepoFile(repoPath, "src/App.spec.tsx", "export const Spec = () => <div />;");
    await writeRepoFile(repoPath, "src/App.stories.tsx", "export const Story = () => <div />;");
    await writeRepoFile(repoPath, "src/__mocks__/Mock.tsx", "export const Mock = () => <div />;");
    await writeRepoFile(repoPath, "dist/Generated.tsx", "export const Generated = () => <div />;");
    await writeRepoFile(repoPath, "build/Generated.tsx", "export const Built = () => <div />;");
    await writeRepoFile(repoPath, "node_modules/pkg/Component.tsx", "export const Dep = () => <div />;");

    const report = await analyzeRepository(repoPath);

    expect(report.filesAnalyzed).toBe(1);
    expect(report.usage.backpack.count).toBe(1);
    expect(report.usage.rawHtml.count).toBe(0);
  });
});