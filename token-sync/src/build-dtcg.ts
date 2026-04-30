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
  buildDtcgTreeForMode,
  buildLocalVariablesByKey,
  buildPreservedReferenceKeys,
  classifyCollections,
} from './dtcg-transformer';
import { writeDtcgFiles } from './dtcg-writer';
import {
  FigmaApi,
  type GetLocalVariablesResponse,
  type LocalVariable,
  type LocalVariableCollection,
} from './figma-api';
import { filterLocalTargets } from './sync-helpers';

import type {
  ClassifiedCollection,
  DtcgManifest,
  DtcgModeOutput,
  ResolveContext,
} from './dtcg-types';

function sortByName<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((left, right) => left.name.localeCompare(right.name));
}

function collectVariablesForCollection(
  variables: Record<string, LocalVariable>,
  collectionId: string,
): LocalVariable[] {
  return Object.values(variables).filter(
    (variable) =>
      !variable.remote && variable.variableCollectionId === collectionId,
  );
}

export interface BuildDtcgOutputsResult {
  classified: ClassifiedCollection[];
  outputs: DtcgModeOutput[];
  missingNames: string[];
}

// Pure end-to-end transform: filter targets, classify, build per-mode trees.
// Exposed for tests and anyone wanting the outputs without writing files.
export function buildDtcgOutputs(
  response: GetLocalVariablesResponse,
  targetNames: readonly string[],
  options: { skipUnresolvedAliases?: boolean } = {},
): BuildDtcgOutputsResult {
  const localVariables = response.meta.variables;
  const localCollectionsById = response.meta.variableCollections;
  const allCollections = Object.values(
    localCollectionsById,
  ) as LocalVariableCollection[];

  const { availableLocalNames, matched, missingNames } = filterLocalTargets(
    allCollections,
    targetNames,
  );

  if (matched.length === 0) {
    throw new Error(
      `None of the target collections [${targetNames.join(', ')}] were found as local collections in the file. ` +
        `Available local collections: ${availableLocalNames.join(', ') || '(none)'}.`,
    );
  }

  const classified = classifyCollections(sortByName(matched));
  const localVariablesByKey = buildLocalVariablesByKey(localVariables);

  const outputs: DtcgModeOutput[] = [];
  for (const classifiedCollection of classified) {
    const { collection } = classifiedCollection;
    const collectionVariables = collectVariablesForCollection(
      localVariables,
      collection.id,
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
    for (const mode of collection.modes) {
      outputs.push(
        buildDtcgTreeForMode(
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

export interface BuildDtcgOptions {
  token: string;
  fileKey: string;
  targetNames: readonly string[];
  outputDir: string;
  // Injectable for tests.
  api?: Pick<FigmaApi, 'getLocalVariables'>;
  skipUnresolvedAliases?: boolean;
  now?: () => Date;
}

export interface BuildDtcgResult {
  classified: ClassifiedCollection[];
  outputs: DtcgModeOutput[];
  missingNames: string[];
  manifest: DtcgManifest;
  outputDir: string;
}

// Full build stage: fetch → transform → write DTCG files + manifest. Accepts
// an injectable api so tests can drive the pipeline without hitting the network.
export async function buildDtcg(
  options: BuildDtcgOptions,
): Promise<BuildDtcgResult> {
  const api = options.api ?? new FigmaApi(options.token);
  const response = await api.getLocalVariables(options.fileKey);

  const { classified, missingNames, outputs } = buildDtcgOutputs(
    response,
    options.targetNames,
    { skipUnresolvedAliases: options.skipUnresolvedAliases },
  );

  const manifest = await writeDtcgFiles(
    options.fileKey,
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

// Pure formatter — returns the lines a CLI should print. Kept here (not in
// index.ts) so the summary format is unit-testable and lives next to the
// data shape it describes.
export function formatBuildSummary(result: BuildDtcgResult): string[] {
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

  lines.push(`Manifest: ${path.join(result.outputDir, 'manifest.json')}`);
  lines.push(
    `Wrote ${result.manifest.files.length} DTCG file(s) to ${result.outputDir}.`,
  );
  return lines;
}
