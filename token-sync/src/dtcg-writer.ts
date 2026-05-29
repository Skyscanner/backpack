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

import { mkdir, rename, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

import type {
  DTCGManifest,
  DTCGManifestFileRecord,
  DTCGModeOutput,
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
export function assertUniqueFileNames(manifest: DTCGManifest): void {
  const owners = new Map<string, DTCGManifestFileRecord>();
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
// layout (e.g. `primitives.json`, `backpack.light.json`).
export function DTCGFileNameFor(
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
// control determinism.
export function buildManifest(
  outputs: DTCGModeOutput[],
  modeCounts: ReadonlyMap<string, number>,
  generatedAt: string = new Date().toISOString(),
): DTCGManifest {
  const files: DTCGManifestFileRecord[] = outputs.map((output) => {
    const modesForCollection = modeCounts.get(output.collectionName) ?? 1;
    const isMultiMode = modesForCollection > 1;
    return {
      fileName: DTCGFileNameFor(
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
// mode-suffixed filename.
export function countModesPerCollection(
  outputs: DTCGModeOutput[],
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
export function stringifyDTCG(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

// Write outputs + manifest to `outputDir`. Stages the new tree in a sibling
// directory and swaps it into place at the end so a mid-write failure leaves
// the existing `outputDir` untouched.
export async function writeDTCGFiles(
  outputs: DTCGModeOutput[],
  outputDir: string,
  now: () => Date = () => new Date(),
): Promise<DTCGManifest> {
  // Guard the destructive `rm` below against obviously-wrong output dirs,
  // and fail fast on filename collisions so we never silently overwrite.
  assertSafeOutputDir(outputDir);

  const modeCounts = countModesPerCollection(outputs);
  const manifest = buildManifest(outputs, modeCounts, now().toISOString());
  assertUniqueFileNames(manifest);

  // Stage in a sibling directory so any failure during writing leaves the
  // existing `outputDir` (which is committed to git) untouched. The swap at
  // the end is the only step that mutates `outputDir`.
  const stagingDir = `${outputDir}.staging-${process.pid}-${Date.now()}`;
  assertSafeOutputDir(stagingDir);

  try {
    // Pre-clean any leftover staging dir from a previous crashed run.
    await rm(stagingDir, { force: true, recursive: true });
    await mkdir(stagingDir, { recursive: true });

    // Issue all token-file writes in parallel — they're independent siblings
    // under `stagingDir`. Awaiting in-loop would serialize them needlessly.
    await Promise.all(
      outputs.map((output, index) =>
        writeFile(
          path.join(stagingDir, manifest.files[index].fileName),
          stringifyDTCG(output.tree),
          'utf8',
        ),
      ),
    );

    await writeFile(
      path.join(stagingDir, 'manifest.json'),
      stringifyDTCG(manifest),
      'utf8',
    );

    // Swap into place. `rename` over a non-empty directory isn't supported,
    // so remove the old tree first; the window between rm and rename is
    // narrow, and on failure the staging dir is preserved on disk for
    // manual recovery.
    await rm(outputDir, { force: true, recursive: true });
    await rename(stagingDir, outputDir);
  } catch (error) {
    // Drop the half-written staging dir. `outputDir` itself is either
    // untouched (failure before rm) or fully written (failure after rename).
    await rm(stagingDir, { force: true, recursive: true });
    throw error;
  }

  return manifest;
}
