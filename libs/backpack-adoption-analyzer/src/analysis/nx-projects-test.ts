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
import { dirname, join } from "node:path";

import {
  UNASSIGNED,
  buildProjectIndex,
  detectNxProjects,
  resolveProject,
} from "./nx-projects";

const createRepo = async () => mkdtemp(join(tmpdir(), "bpk-nx-test-"));

const writeRepoFile = async (
  repoPath: string,
  filePath: string,
  content: string,
) => {
  const absolutePath = join(repoPath, filePath);
  await mkdir(dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, content, "utf8");
};

describe("nx-projects", () => {
  let repoPath: string;

  beforeEach(async () => {
    repoPath = await createRepo();
  });

  afterEach(async () => {
    await rm(repoPath, { force: true, recursive: true });
  });

  describe("detectNxProjects", () => {
    it("returns isNx false when no nx.json exists", async () => {
      await writeRepoFile(repoPath, "App.tsx", "export const A = () => null;");

      const { isNx, projects } = detectNxProjects(repoPath);

      expect(isNx).toBe(false);
      expect(projects).toEqual([]);
    });

    it("discovers project.json projects", async () => {
      await writeRepoFile(repoPath, "nx.json", '{ "version": 2 }');
      await writeRepoFile(
        repoPath,
        "apps/flights/project.json",
        '{ "name": "flights", "root": "apps/flights", "projectType": "application" }',
      );
      await writeRepoFile(
        repoPath,
        "libs/shared-ui/project.json",
        '{ "name": "shared-ui", "root": "libs/shared-ui", "projectType": "library" }',
      );

      const { isNx, projects } = detectNxProjects(repoPath);

      expect(isNx).toBe(true);
      expect(projects.map((project) => project.name).sort()).toEqual([
        "flights",
        "shared-ui",
      ]);
      expect(projects.find((project) => project.name === "flights")?.root).toBe(
        "apps/flights",
      );
    });

    it("discovers package.json projects that carry an nx field", async () => {
      await writeRepoFile(repoPath, "nx.json", '{ "version": 2 }');
      await writeRepoFile(
        repoPath,
        "libs/checkout/package.json",
        JSON.stringify({
          name: "checkout-pkg",
          nx: { name: "checkout", projectType: "library" },
        }),
      );

      const { projects } = detectNxProjects(repoPath);
      const checkout = projects.find((project) => project.name === "checkout");
      expect(checkout?.root).toBe("libs/checkout");
      expect(checkout?.type).toBe("library");
    });
  });

  describe("buildProjectIndex", () => {
    it("strips trailing slashes from the project root when building the prefix", () => {
      const [entry] = buildProjectIndex([
        { name: "web", root: "apps/web///", type: null },
      ]);

      expect(entry.prefix).toBe("apps/web/");
      expect(resolveProject("apps/web/Home.tsx", [entry])).toBe("web");
    });

    it("maps a root of \".\" to an empty prefix that matches every path", () => {
      const [entry] = buildProjectIndex([
        { name: "root", root: ".", type: null },
      ]);

      expect(entry.prefix).toBe("");
      expect(resolveProject("App.tsx", [entry])).toBe("root");
    });
  });

  describe("resolveProject", () => {
    it("uses longest-prefix match and falls back to the unassigned bucket", () => {
      const index = buildProjectIndex([
        { name: "flights", root: "apps/flights", type: null },
        { name: "shared-ui", root: "libs/shared-ui", type: null },
      ]);

      expect(resolveProject("apps/flights/src/App.tsx", index)).toBe("flights");
      expect(resolveProject("libs/shared-ui/src/Card.tsx", index)).toBe("shared-ui");
      expect(resolveProject("RootThing.tsx", index)).toBe(UNASSIGNED);
    });

    it("prefers the longer of two nested roots", () => {
      const index = buildProjectIndex([
        { name: "web", root: "apps/web", type: null },
        { name: "web-feature", root: "apps/web/features/checkout", type: null },
      ]);

      expect(resolveProject("apps/web/features/checkout/Page.tsx", index)).toBe(
        "web-feature",
      );
      expect(resolveProject("apps/web/Home.tsx", index)).toBe("web");
    });
  });
});
