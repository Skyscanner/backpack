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

import { mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

import type {
  DtcgManifest,
  DtcgManifestFileRecord,
  DtcgModeOutput,
} from './types';

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Guard against filenames that would silently collide or land at `.json`
// (empty slug). Both forms would otherwise let one mode's output overwrite
// another on disk.
export function assertUniqueFileNames(manifest: DtcgManifest): void {
  const owners = new Map<string, DtcgManifestFileRecord>();
  for (const file of manifest.files) {
    const baseName = file.fileName.replace(/\.json$/, '');
    if (baseName === '' || baseName === '.') {
      throw new Error(
        `DTCG output for ${file.collectionName} / ${file.modeName} slugged to an empty ` +
          `filename. Rename the collection/mode so it contains at least one a-z0-9 character.`,
      );
    }
    const existing = owners.get(file.fileName);
    if (existing) {
      throw new Error(
        `DTCG output filename collision: both "${existing.collectionName} / ${existing.modeName}" and ` +
          `"${file.collectionName} / ${file.modeName}" resolve to "${file.fileName}". ` +
          `Rename one of the collections or modes in Figma to disambiguate.`,
      );
    }
    owners.set(file.fileName, file);
  }
}

// Refuse to run `rm -rf` on paths that are almost certainly wrong —
// filesystem roots, the user's home, the current working directory or any of
// its ancestors. The default output dir sits inside the repo so this only
// bites if someone explicitly overrides `DTCG_OUTPUT_DIR`.
export function assertSafeOutputDir(outputDir: string): void {
  if (!outputDir || !outputDir.trim()) {
    throw new Error('DTCG output directory is empty.');
  }
  const absolute = path.resolve(outputDir);
  const normalized = path.normalize(absolute);

  // Root of a filesystem: posix "/", windows "C:\". path.parse(root).root
  // equals the input when the path is a root.
  if (path.parse(normalized).root === normalized) {
    throw new Error(
      `Refusing to use filesystem root "${normalized}" as the DTCG output directory.`,
    );
  }

  const homeDir = os.homedir();
  if (homeDir && normalized === path.normalize(homeDir)) {
    throw new Error(
      `Refusing to use the user home directory "${normalized}" as the DTCG output directory.`,
    );
  }

  const cwd = path.normalize(process.cwd());
  if (normalized === cwd) {
    throw new Error(
      `Refusing to use the current working directory "${normalized}" as the DTCG output directory.`,
    );
  }
  const relativeFromOutput = path.relative(normalized, cwd);
  // cwd sits *inside* outputDir → outputDir is an ancestor of cwd. `rm -rf`
  // on an ancestor would wipe the project itself.
  if (
    relativeFromOutput &&
    !relativeFromOutput.startsWith('..') &&
    !path.isAbsolute(relativeFromOutput)
  ) {
    throw new Error(
      `Refusing to use an ancestor of the current working directory ("${normalized}") as the DTCG output directory.`,
    );
  }
}

// Derive the output filename for one mode. Single-mode collections drop the
// mode segment so the filename stays short and matches the ticket's expected
// layout (e.g. `primitives.json`, `backpack.day.json`).
export function dtcgFileNameFor(
  collectionName: string,
  modeName: string,
  isMultiMode: boolean,
): string {
  if (isMultiMode) {
    return `${slugify(collectionName)}.${slugify(modeName)}.json`;
  }
  return `${slugify(collectionName)}.json`;
}

// Build the manifest records in the same order as the outputs so callers
// control determinism. Pure — useful for unit tests.
//
// The Figma file key is deliberately NOT included: this directory is
// committed to the open-source repo, and the key identifies the private
// source file. Downstream stages (style-dictionary etc.) only read the
// token files, not the manifest.
export function buildManifest(
  outputs: DtcgModeOutput[],
  modeCounts: ReadonlyMap<string, number>,
  generatedAt: string = new Date().toISOString(),
): DtcgManifest {
  const files: DtcgManifestFileRecord[] = outputs.map((output) => {
    const modesForCollection = modeCounts.get(output.collectionName) ?? 1;
    const isMultiMode = modesForCollection > 1;
    return {
      fileName: dtcgFileNameFor(
        output.collectionName,
        output.modeName,
        isMultiMode,
      ),
      collectionName: output.collectionName,
      modeName: output.modeName,
      role: output.role,
      variableCount: output.stats.tokenCount,
      preservedAliasCount: output.stats.preservedAliasCount,
      inlinedAliasCount: output.stats.inlinedAliasCount,
      skippedVariableCount: output.stats.skippedVariableCount,
    };
  });

  return {
    generatedAt,
    files,
  };
}

// Count modes per collection to decide whether to use the short or the
// mode-suffixed filename. Separate from buildManifest so tests can inject
// arbitrary counts.
export function countModesPerCollection(
  outputs: DtcgModeOutput[],
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const output of outputs) {
    counts.set(output.collectionName, (counts.get(output.collectionName) ?? 0) + 1);
  }
  return counts;
}

// Stable JSON output: 2-space indent, trailing newline. Kept as a single
// helper so every file we write has the same whitespace conventions — this
// is what makes `git diff` noise-free across runs.
export function stringifyDtcg(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

// Write outputs + manifest to `outputDir`. Clears the directory first so
// stale files from a previous run are not left behind. Returns the manifest.
export async function writeDtcgFiles(
  outputs: DtcgModeOutput[],
  outputDir: string,
  now: () => Date = () => new Date(),
): Promise<DtcgManifest> {
  // Guard the destructive `rm` below against obviously-wrong output dirs,
  // and fail fast on filename collisions so we never silently overwrite.
  assertSafeOutputDir(outputDir);

  const modeCounts = countModesPerCollection(outputs);
  const manifest = buildManifest(outputs, modeCounts, now().toISOString());
  assertUniqueFileNames(manifest);

  await rm(outputDir, { force: true, recursive: true });
  await mkdir(outputDir, { recursive: true });

  // Issue all token-file writes in parallel — they're independent siblings
  // under `outputDir`. Awaiting in-loop would serialize them needlessly.
  await Promise.all(
    outputs.map((output, index) =>
      writeFile(
        path.join(outputDir, manifest.files[index].fileName),
        stringifyDtcg(output.tree),
        'utf8',
      ),
    ),
  );

  const manifestPath = path.join(outputDir, 'manifest.json');
  await writeFile(manifestPath, stringifyDtcg(manifest), 'utf8');

  return manifest;
}
