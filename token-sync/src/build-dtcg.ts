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

// First stage of the Figma → DTCG → CSS pipeline. Fetches Figma variables,
// transforms them into DTCG JSON files + a manifest. The output of this file
// is the input to the later CSS-generation stage (style-dictionary etc.).

import path from 'node:path';

import {
  buildDTCGTreeForMode,
  buildLocalVariablesByKey,
  buildPreservedReferenceKeys,
  classifyCollections,
} from './dtcg-transformer';
import { writeDTCGFiles } from './dtcg-writer';
import {
  FigmaApi,
  type GetLocalVariablesResponse,
  type LocalVariableCollection,
} from './figma-api';
import { filterLocalTargets, sortBy } from './sync-helpers';
import { SKIPPED_VARIABLE_REASONS } from './types';

import type {
  ClassifiedCollection,
  DTCGManifest,
  DTCGModeOutput,
  ResolveContext,
} from './types';


export interface BuildDTCGOutputsResult {
  classified: ClassifiedCollection[];
  outputs: DTCGModeOutput[];
  missingNames: string[];
}

// Pure end-to-end transform: filter targets, classify, build per-mode trees.
export function buildDTCGOutputs(
  response: GetLocalVariablesResponse,
  targetNames: readonly string[],
  options: { skipUnresolvedAliases?: boolean } = {},
): BuildDTCGOutputsResult {
  const localVariables = response.meta.variables;
  const localCollectionsById = response.meta.variableCollections;
  const allCollections: LocalVariableCollection[] = Object.values(localCollectionsById);

  const { availableLocalNames, matchedCollections, missingNames } = filterLocalTargets(
    allCollections,
    targetNames,
  );

  if (matchedCollections.length === 0) {
    throw new Error(
      `None of the target collections [${targetNames.join(', ')}] were found as local collections in the file. ` +
        `Available local collections: ${availableLocalNames.join(', ') || '(none)'}.`,
    );
  }

  const classified = classifyCollections(sortBy(matchedCollections, (c) => c.name));
  const localVariablesByKey = buildLocalVariablesByKey(localVariables);

  const outputs: DTCGModeOutput[] = [];
  for (const classifiedCollection of classified) {
    const { collection } = classifiedCollection;
    const collectionVariables = Object.values(localVariables).filter(
      (variable) => variable.variableCollectionId === collection.id,
    );
    const preservedReferenceKeys = buildPreservedReferenceKeys(
      classified,
      collection.id,
      localVariables,
    );
    const context: ResolveContext = {
      localVariablesById: localVariables,
      localVariablesByKey,
      localCollectionsById,
      preservedReferenceKeys,
    };
    // Sort modes by name so the manifest + summary ordering is stable even
    // if a designer reorders modes in Figma. Filenames are mode-named so
    // the on-disk layout doesn't change either way.
    const sortedModes = sortBy(collection.modes, (m) => m.name);
    for (const mode of sortedModes) {
      outputs.push(
        buildDTCGTreeForMode(
          classifiedCollection,
          mode.name,
          collectionVariables,
          context,
          options,
        ),
      );
    }
  }

  return { classified, outputs, missingNames };
}

export interface BuildDTCGOptions {
  token: string;
  fileKey: string;
  targetNames: readonly string[];
  outputDir: string;
  skipUnresolvedAliases?: boolean;
  now?: () => Date;
}

export interface BuildDTCGResult {
  classified: ClassifiedCollection[];
  outputs: DTCGModeOutput[];
  missingNames: string[];
  manifest: DTCGManifest;
  outputDir: string;
}

// Full build stage: fetch → transform → write DTCG files + manifest.
export async function buildDTCG(
  options: BuildDTCGOptions,
): Promise<BuildDTCGResult> {
  const api = new FigmaApi(options.token);
  const response = await api.getLocalVariables(options.fileKey);

  const { classified, missingNames, outputs } = buildDTCGOutputs(
    response,
    options.targetNames,
    { skipUnresolvedAliases: options.skipUnresolvedAliases },
  );

  const manifest = await writeDTCGFiles(
    outputs,
    options.outputDir,
    options.now,
  );

  return {
    classified,
    outputs,
    missingNames,
    manifest,
    outputDir: options.outputDir,
  };
}

type SkippedByKey = Map<
  string,
  { collectionName: string; variableName: string; modes: Set<string> }
>;

function addToGroup(
  groupMap: Map<string, SkippedByKey>,
  bucketKey: string,
  collectionName: string,
  variableName: string,
  modeName: string,
): void {
  if (!groupMap.has(bucketKey)) groupMap.set(bucketKey, new Map());
  const references = groupMap.get(bucketKey)!;
  const referenceKey = `${collectionName}  ${variableName}`;
  if (!references.has(referenceKey)) {
    references.set(referenceKey, { collectionName, variableName, modes: new Set() });
  }
  references.get(referenceKey)!.modes.add(modeName);
}

function renderReferences(references: SkippedByKey): string {
  return sortBy(Array.from(references.values()), (r) => r.variableName)
    .map(({ collectionName, modes, variableName }) => {
      const modeLabel = Array.from(modes).sort().join(', ');
      return `[${collectionName}] ${variableName} (modes: ${modeLabel})`;
    })
    .join('; ');
}

function countInstances(groups: Map<string, SkippedByKey>): number {
  let total = 0;
  groups.forEach((references) => {
    references.forEach(({ modes }) => {
      total += modes.size;
    });
  });
  return total;
}

function pushSkippedSection(
  lines: string[],
  groups: Map<string, SkippedByKey>,
  header: (count: number, groupCount: number) => string,
  itemLabel: (key: string) => string,
): void {
  if (groups.size === 0) return;
  lines.push(header(countInstances(groups), groups.size));
  groups.forEach((refs, key) =>
    lines.push(`  - ${itemLabel(key)} ← ${renderReferences(refs)}`),
  );
}

// Pure formatter — returns the lines a CLI should print. Kept here (not in
// index.ts) so the summary format is unit-testable and lives next to the
// data shape it describes.
export function formatBuildSummary(result: BuildDTCGResult): string[] {
  const lines: string[] = [];

  lines.push(
    `Classified ${result.classified.length} collection(s): ${result.classified
      .map(({ collection, role }) => `${collection.name} (${role})`)
      .join(', ')}.`,
  );

  for (const output of result.outputs) {
    const {
      inlinedAliasCount,
      preservedAliasCount,
      skippedVariableCount,
      tokenCount,
    } = output.stats;
    const skippedLabel =
      skippedVariableCount > 0 ? `, ${skippedVariableCount} skipped` : '';
    lines.push(
      `- ${output.collectionName} / ${output.modeName}: ${tokenCount} tokens ` +
        `(${preservedAliasCount} preserved, ${inlinedAliasCount} inlined${skippedLabel})`,
    );
  }

  if (result.missingNames.length > 0) {
    lines.push(
      `Warning: these target collections were not found as local collections and will be skipped: ${result.missingNames.join(', ')}.`,
    );
  }

  // Group skipped variables by reason. Each reason gets its own short section
  // so the CLI stays legible even when multiple failure modes hit one sync.
  // Day/Night duplicates collapse into a single entry with mode labels.
  const unresolvedGroups = new Map<string, SkippedByKey>();
  const missingModeGroups = new Map<string, SkippedByKey>();
  const pathCollisionGroups = new Map<string, SkippedByKey>();
  const invalidNameGroups = new Map<string, SkippedByKey>();

  for (const output of result.outputs) {
    for (const skipped of output.stats.skippedVariables) {
      switch (skipped.reason) {
        case SKIPPED_VARIABLE_REASONS.unresolvedAlias:
          if (skipped.unresolvedAliasId) {
            addToGroup(
              unresolvedGroups,
              skipped.unresolvedAliasId,
              output.collectionName,
              skipped.variableName,
              output.modeName,
            );
          }
          break;
        case SKIPPED_VARIABLE_REASONS.missingModeValue:
          addToGroup(
            missingModeGroups,
            skipped.missingModeName ?? '(unknown mode)',
            output.collectionName,
            skipped.variableName,
            output.modeName,
          );
          break;
        case SKIPPED_VARIABLE_REASONS.pathCollision:
          addToGroup(
            pathCollisionGroups,
            skipped.collidingVariableName ?? '(unknown variable)',
            output.collectionName,
            skipped.variableName,
            output.modeName,
          );
          break;
        case SKIPPED_VARIABLE_REASONS.invalidName:
          addToGroup(
            invalidNameGroups,
            skipped.invalidNameReason ?? '(invalid name)',
            output.collectionName,
            skipped.variableName,
            output.modeName,
          );
          break;
        default:
          break;
      }
    }
  }

  pushSkippedSection(
    lines,
    unresolvedGroups,
    (count, groupCount) =>
      `Skipped ${count} variable instance(s) due to unresolved aliases across ${groupCount} missing target variable(s) (likely cross-library or deleted references):`,
    (missingAliasId) => `missing ${missingAliasId}`,
  );
  pushSkippedSection(
    lines,
    missingModeGroups,
    (count) =>
      `Skipped ${count} variable instance(s) with no value assigned for the requested mode:`,
    (missingMode) => `missing value for mode "${missingMode}"`,
  );
  pushSkippedSection(
    lines,
    pathCollisionGroups,
    (count) =>
      `Skipped ${count} variable instance(s) due to DTCG path collisions with another variable's name:`,
    (collidingWith) => `collides with "${collidingWith}"`,
  );
  pushSkippedSection(
    lines,
    invalidNameGroups,
    (count) =>
      `Skipped ${count} variable instance(s) whose name cannot be placed in a DTCG tree:`,
    (reason) => reason,
  );

  lines.push(`Manifest: ${path.join(result.outputDir, 'manifest.json')}`);
  lines.push(
    `Wrote ${result.manifest.files.length} DTCG file(s) to ${result.outputDir}.`,
  );
  return lines;
}
