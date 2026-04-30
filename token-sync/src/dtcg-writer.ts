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
import path from 'node:path';

import type {
  DtcgManifest,
  DtcgManifestFileRecord,
  DtcgModeOutput,
} from './dtcg-types';

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
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
export function buildManifest(
  fileKey: string,
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
    fileKey,
    sourceFileUrl: `https://www.figma.com/design/${fileKey}`,
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
  fileKey: string,
  outputs: DtcgModeOutput[],
  outputDir: string,
  now: () => Date = () => new Date(),
): Promise<DtcgManifest> {
  await rm(outputDir, { force: true, recursive: true });
  await mkdir(outputDir, { recursive: true });

  const modeCounts = countModesPerCollection(outputs);
  const manifest = buildManifest(
    fileKey,
    outputs,
    modeCounts,
    now().toISOString(),
  );

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
