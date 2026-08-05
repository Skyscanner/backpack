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
          "@skyscanner-internal/backpack-web": "^42.0.0",
        },
      }),
    );
    await writeRepoFile(
      repoPath,
      "src/App.tsx",
      `
import BpkButton from '@skyscanner-internal/backpack-web/bpk-component-button';
import { BpkText } from '@skyscanner-internal/backpack-web';
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
    // LocalCard is an unstyled wrapper. Its <section> is counted where it is
    // defined, but the wrapper call itself is not a second visual element.
    expect(report.usage.nonBackpack.count).toBe(0);
    expect(report.usage.rawHtml.count).toBe(2);
    expect(report.usage.backpack.percentage).toBe(60);
    expect(report.usage.pureBackpack.count).toBe(2);
    expect(report.usage.nonPureBackpack.count).toBe(1);
    expect(report.componentCounts).toEqual({
      BpkButton: 1,
      BpkText: 2,
    });
  });

  it("counts non-Backpack components only when the call site applies styling", async () => {
    await writeRepoFile(
      repoPath,
      "src/App.tsx",
      `
const LocalCard = () => <section>Card</section>;

export const App = () => (
  <>
    <LocalCard />
    <LocalCard className="card" />
    <LocalCard style={{ marginTop: 8 }} />
  </>
);
`,
    );

    const report = await analyzeRepository(repoPath);

    expect(report.usage.nonBackpack.count).toBe(2);
    expect(report.usage.rawHtml.count).toBe(1);
  });

  it("ignores generated, test, and dependency files", async () => {
    await writeRepoFile(
      repoPath,
      "src/App.tsx",
      `
import BpkText from '@skyscanner-internal/backpack-web/bpk-component-text';

export const App = () => <BpkText>Only production file</BpkText>;
`,
    );
    await writeRepoFile(repoPath, "src/App.test.tsx", "export const Test = () => <div />;");
    await writeRepoFile(repoPath, "dist/Generated.tsx", "export const Generated = () => <div />;");
    await writeRepoFile(repoPath, "build/Generated.tsx", "export const Built = () => <div />;");
    await writeRepoFile(repoPath, "node_modules/pkg/Component.tsx", "export const Dep = () => <div />;");

    const report = await analyzeRepository(repoPath);

    expect(report.filesAnalyzed).toBe(1);
    expect(report.usage.backpack.count).toBe(1);
    expect(report.usage.rawHtml.count).toBe(0);
  });

  it("treats classNames(variable) as no-override (matches ds-analyser)", async () => {
    await writeRepoFile(
      repoPath,
      "src/App.tsx",
      `
import BpkButton from '@skyscanner-internal/backpack-web/bpk-component-button';
import classNames from 'classnames';

const dynamic = 'pill';

export const App = () => (
  <BpkButton className={classNames(dynamic)}>Book</BpkButton>
);
`,
    );

    const report = await analyzeRepository(repoPath, { includeNxProjects: true });

    expect(report.usage.backpack.count).toBe(1);
    // classNames(variable) cannot be statically resolved → ds-analyser does
    // NOT count it as an override. So the BpkButton stays "pure".
    expect(report.usage.pureBackpack.count).toBe(1);
    expect(report.usage.nonPureBackpack.count).toBe(0);
  });

  it("counts each classNames('a', 'b') argument as a separate override", async () => {
    await writeRepoFile(
      repoPath,
      "src/App.tsx",
      `
import BpkButton from '@skyscanner-internal/backpack-web/bpk-component-button';
import classNames from 'classnames';

export const App = () => (
  <BpkButton className={classNames('alpha', 'beta', 'gamma')}>Book</BpkButton>
);
`,
    );

    const report = await analyzeRepository(repoPath, { includeNxProjects: true });

    // 1 Backpack usage, but classNames(...) has 3 string args → overrideCount 3.
    // ds-analyser pure = backpackUsages - classNameOverrides = 1 - 3 = -2.
    expect(report.usage.backpack.count).toBe(1);
    expect(report.usage.pureBackpack.count).toBe(-2);
    expect(report.usage.nonPureBackpack.count).toBe(3);
  });

  it("attributes usages to NX projects, keeping an (unassigned) bucket", async () => {
    await writeRepoFile(repoPath, "nx.json", JSON.stringify({ version: 2 }));
    await writeRepoFile(
      repoPath,
      "apps/flights/project.json",
      JSON.stringify({
        name: "flights",
        root: "apps/flights",
        projectType: "application",
      }),
    );
    await writeRepoFile(
      repoPath,
      "libs/shared-ui/project.json",
      JSON.stringify({
        name: "shared-ui",
        root: "libs/shared-ui",
        projectType: "library",
      }),
    );
    await writeRepoFile(
      repoPath,
      "apps/flights/src/App.tsx",
      `
import { BpkButton } from '@skyscanner-internal/backpack-web';

export const App = () => <BpkButton>Go</BpkButton>;
`,
    );
    await writeRepoFile(
      repoPath,
      "libs/shared-ui/src/Card.tsx",
      `
import { BpkCard, BpkText } from '@skyscanner-internal/backpack-web';

export const Card = () => <BpkCard><BpkText>t</BpkText></BpkCard>;
`,
    );
    await writeRepoFile(
      repoPath,
      "RootThing.tsx",
      `
export const RootThing = () => <div>root</div>;
`,
    );

    const report = await analyzeRepository(repoPath, { includeNxProjects: true });

    expect(report.isNx).toBe(true);
    expect(report.projects).toBeDefined();

    const projects = report.projects!;
    expect(projects.flights.usage.backpack.count).toBe(1);
    expect(projects["shared-ui"].usage.backpack.count).toBe(2);
    expect(projects["(unassigned)"].usage.rawHtml.count).toBe(1);

    // Repo-wide usage totals are unaffected by per-project attribution.
    const projectBackpackTotal = Object.values(projects).reduce(
      (sum, project) => sum + project.usage.backpack.count,
      0,
    );
    expect(projectBackpackTotal).toBe(report.usage.backpack.count);

    const projectFilesTotal = Object.values(projects).reduce(
      (sum, project) => sum + project.filesAnalyzed,
      0,
    );
    expect(projectFilesTotal).toBe(report.filesAnalyzed);
  });

  it("counts a file with a parse error toward its project's filesAnalyzed", async () => {
    await writeRepoFile(repoPath, "nx.json", JSON.stringify({ version: 2 }));
    await writeRepoFile(
      repoPath,
      "apps/flights/project.json",
      JSON.stringify({
        name: "flights",
        root: "apps/flights",
        projectType: "application",
      }),
    );
    await writeRepoFile(
      repoPath,
      "apps/flights/src/Broken.tsx",
      "export const Broken = () => <div>{",
    );

    const report = await analyzeRepository(repoPath, { includeNxProjects: true });

    // The file failed to parse (no usages recorded), but it still matched
    // the glob and its project should still count it as analyzed — matching
    // the repo-wide filesAnalyzed, which counts every matched file.
    expect(report.filesAnalyzed).toBe(1);
    expect(report.parseErrors).toHaveLength(1);
    expect(report.projects!.flights.filesAnalyzed).toBe(1);

    const projectFilesTotal = Object.values(report.projects!).reduce(
      (sum, project) => sum + project.filesAnalyzed,
      0,
    );
    expect(projectFilesTotal).toBe(report.filesAnalyzed);
  });

  it("omits projects/isNx for non-NX repositories", async () => {
    await writeRepoFile(
      repoPath,
      "src/App.tsx",
      `
import BpkText from '@skyscanner-internal/backpack-web/bpk-component-text';

export const App = () => <BpkText>Prod</BpkText>;
`,
    );

    const report = await analyzeRepository(repoPath);

    expect(report.isNx).toBeUndefined();
    expect(report.projects).toBeUndefined();
  });

  it("ignores spec, story, and mock files (alignment with ds-analyser)", async () => {
    await writeRepoFile(
      repoPath,
      "src/App.tsx",
      `
import BpkText from '@skyscanner-internal/backpack-web/bpk-component-text';

export const App = () => <BpkText>Prod</BpkText>;
`,
    );
    await writeRepoFile(repoPath, "src/App.spec.tsx", "export const Spec = () => <div />;");
    await writeRepoFile(repoPath, "src/App.stories.tsx", "export const Story = () => <div />;");
    await writeRepoFile(repoPath, "src/__mocks__/Mock.tsx", "export const Mock = () => <div />;");
    await writeRepoFile(repoPath, "src/__mock__/Mock2.tsx", "export const Mock2 = () => <div />;");
    await writeRepoFile(repoPath, "src/mocks/Mock3.tsx", "export const Mock3 = () => <div />;");

    const report = await analyzeRepository(repoPath);

    expect(report.filesAnalyzed).toBe(1);
    expect(report.usage.backpack.count).toBe(1);
    expect(report.usage.rawHtml.count).toBe(0);
  });
});
