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
// Verbatim port of Skyscanner/ds-analyser src/nx-projects.js to TypeScript.
// Behaviour matches the JS source one-for-one; see analyze-repository.ts for
// the verbatim-port convention used across this package.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, sep } from "node:path";

import { globSync } from "glob";

export const UNASSIGNED = "(unassigned)";

export type NxProject = {
  name: string;
  root: string;
  type: string | null;
};

export type NxProjectIndexEntry = {
  name: string;
  root: string;
  prefix: string;
};

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

/**
 * Detect NX projects in a repository using static file reads only.
 * No NX runtime, daemon, or `npm install` is required — safe to run in the
 * weekly clone-and-scan worker.
 *
 * Detection:
 *   - isNx: an `nx.json` exists at the repo root
 *   - projects: discovered by globbing `project.json` files and `package.json`
 *     files that carry an `nx` field. Each project's `root` is its directory
 *     relative to the repo (POSIX-style, matching analyzer relative paths).
 *
 * @param repoPath - Absolute path to the repository root
 */
export function detectNxProjects(
  repoPath: string,
): { isNx: boolean; projects: NxProject[] } {
  const isNx = existsSync(join(repoPath, "nx.json"));

  if (!isNx) {
    return { isNx: false, projects: [] };
  }

  const projects: NxProject[] = [];
  const seenRoots = new Set<string>();

  // project.json is the canonical NX project marker
  const projectFiles = globSync("**/project.json", {
    cwd: repoPath,
    ignore: ["**/node_modules/**", "**/dist/**", "**/build/**"],
    absolute: false,
  }) as string[];

  for (const file of projectFiles) {
    const root = toPosix(dirname(file));
    if (seenRoots.has(root)) continue;
    const project = readProjectFile(join(repoPath, file), root);
    if (project) {
      projects.push(project);
      seenRoots.add(root);
    }
  }

  // package.json files with an `nx` field are also valid NX projects
  const packageFiles = globSync("**/package.json", {
    cwd: repoPath,
    ignore: ["**/node_modules/**", "**/dist/**", "**/build/**"],
    absolute: false,
  }) as string[];

  for (const file of packageFiles) {
    const root = toPosix(dirname(file));
    if (seenRoots.has(root)) continue;
    try {
      const pkg = JSON.parse(readFileSync(join(repoPath, file), "utf-8"));
      // Only treat as a project if it opts into NX or declares a workspace name
      if (pkg.nx || (pkg.name && root !== ".")) {
        projects.push({
          name: pkg.nx?.name || pkg.name || root,
          root,
          type: pkg.nx?.projectType || null,
        });
        seenRoots.add(root);
      }
    } catch {
      // Skip unparseable package.json files
    }
  }

  return { isNx: true, projects };
}

/**
 * Build an index for fast longest-prefix project resolution.
 * Roots are sorted longest-first so the first match wins.
 */
export function buildProjectIndex(
  projects: NxProject[],
): NxProjectIndexEntry[] {
  return projects
    .map((p) => ({
      name: p.name,
      root: p.root,
      // Normalise root to a path prefix ending in '/', except for the repo root '.'
      prefix: p.root === "." ? "" : `${p.root.replace(/\/+$/, "")}/`,
    }))
    .sort((a, b) => b.prefix.length - a.prefix.length);
}

/**
 * Resolve which NX project a file belongs to via longest-matching root prefix.
 * Files matching no project root fall into the `(unassigned)` bucket.
 *
 * @param relativePath - Repo-relative file path (POSIX or native sep)
 * @param projectIndex - From buildProjectIndex
 */
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
