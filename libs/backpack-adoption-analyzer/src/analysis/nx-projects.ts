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
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, sep } from "node:path";

import { globSync } from "glob";

export const UNASSIGNED = "(unassigned)";

export type NxProject = { name: string; root: string; type: string | null };

export type NxProjectIndexEntry = { name: string; root: string; prefix: string };

function toPosix(p: string): string {
  return sep === "/" ? p : p.split(sep).join("/");
}

function readProjectFile(absPath: string, root: string): NxProject | null {
  try {
    const json = JSON.parse(readFileSync(absPath, "utf-8"));
    return {
      name: json.name || root,
      root: json.root ? toPosix(json.root) : root,
      type: json.projectType || null,
    };
  } catch {
    return null;
  }
}

export function detectNxProjects(
  repoPath: string,
): { isNx: boolean; projects: NxProject[] } {
  const isNx = existsSync(join(repoPath, "nx.json"));
  if (!isNx) return { isNx: false, projects: [] };

  const projects: NxProject[] = [];
  const seenRoots = new Set<string>();
  const options = {
    cwd: repoPath,
    ignore: ["**/node_modules/**", "**/dist/**", "**/build/**"],
    absolute: false,
  };

  for (const file of globSync("**/project.json", options) as string[]) {
    const root = toPosix(dirname(file));
    if (seenRoots.has(root)) continue;
    const project = readProjectFile(join(repoPath, file), root);
    if (project) {
      projects.push(project);
      seenRoots.add(root);
    }
  }

  for (const file of globSync("**/package.json", options) as string[]) {
    const root = toPosix(dirname(file));
    if (seenRoots.has(root)) continue;
    try {
      const pkg = JSON.parse(readFileSync(join(repoPath, file), "utf-8"));
      if (pkg.nx || (pkg.name && root !== ".")) {
        projects.push({
          name: pkg.nx?.name || pkg.name || root,
          root,
          type: pkg.nx?.projectType || null,
        });
        seenRoots.add(root);
      }
    } catch {
      // Skip unparseable package.json files.
    }
  }

  return { isNx: true, projects };
}

export function buildProjectIndex(projects: NxProject[]): NxProjectIndexEntry[] {
  return projects
    .map((project) => ({
      name: project.name,
      root: project.root,
      prefix: project.root === "." ? "" : `${project.root.replace(/\/+$/, "")}/`,
    }))
    .sort((a, b) => b.prefix.length - a.prefix.length);
}

export function resolveProject(
  relativePath: string,
  projectIndex: NxProjectIndexEntry[] | null,
): string {
  if (!projectIndex || projectIndex.length === 0) return UNASSIGNED;
  const path = toPosix(relativePath);
  for (const project of projectIndex) {
    if (project.prefix === "" || path.startsWith(project.prefix)) {
      return project.name;
    }
  }
  return UNASSIGNED;
}
