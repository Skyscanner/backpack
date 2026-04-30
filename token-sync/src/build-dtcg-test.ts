/**
 * @jest-environment node
 */
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

import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { buildFixtureResponse } from './__fixtures__/figma-variable';
import {
  buildDTCG,
  buildDTCGOutputs,
  formatBuildSummary,
} from './build-dtcg';
import { TARGET_COLLECTION_NAMES } from './sync-helpers';

import type { BuildDTCGResult } from './build-dtcg';

describe('buildDTCGOutputs (end-to-end on fixtures)', () => {
  it('produces one DTCG output per (collection, mode), classified and with alias stats', () => {
    const response = buildFixtureResponse();
    const { classified, outputs } = buildDTCGOutputs(
      response,
      TARGET_COLLECTION_NAMES,
    );

    expect(classified).toEqual([
      { collection: expect.objectContaining({ name: 'Backpack' }), role: 'semantic' },
      {
        collection: expect.objectContaining({ name: 'Primitives' }),
        role: 'primitive',
      },
    ]);

    // 1 primitives + 2 backpack modes
    expect(outputs).toHaveLength(3);
    expect(outputs.map((o) => `${o.collectionName}/${o.modeName}`)).toEqual([
      'Backpack/Day',
      'Backpack/Night',
      'Primitives/Hex',
    ]);

    const backpackDay = outputs[0];
    // Canvas/Default aliases a primitive → preserved as {Colour.Pink}.
    // Canvas/Contrast aliases Canvas/Default (same collection) → inlined,
    // eventually resolving to the preserved {Colour.Pink}.
    expect(backpackDay.tree).toEqual({
      Canvas: {
        $type: 'color',
        Contrast: { $value: '{Colour.Pink}' },
        Default: { $value: '{Colour.Pink}' },
      },
    });
    expect(backpackDay.stats.preservedAliasCount).toBe(1);
    expect(backpackDay.stats.inlinedAliasCount).toBe(1);

    const backpackNight = outputs[1];
    expect(backpackNight.tree).toEqual({
      Canvas: {
        $type: 'color',
        Contrast: { $value: '{Colour.Berry}' },
        Default: { $value: '{Colour.Berry}' },
      },
    });

    const primitives = outputs[2];
    expect(primitives.role).toBe('primitive');
    expect(primitives.tree).toEqual({
      Colour: {
        $type: 'color',
        Berry: { $value: 'rgba(0, 0, 0, 0.5)' },
        Pink: { $value: '#ff66b3' },
      },
      Spacing: {
        $type: 'dimension',
        md: { $value: '8px' },
      },
    });
  });

  it('throws when no target collection is present locally', () => {
    const response = buildFixtureResponse();
    expect(() => buildDTCGOutputs(response, ['DoesNotExist'])).toThrow(
      /None of the target collections/,
    );
  });
});

describe('buildDTCG (full pipeline with injected api)', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), 'token-sync-build-'));
  });

  afterEach(async () => {
    await rm(tempDir, { force: true, recursive: true });
  });

  it('runs fetch → transform → write and returns a complete BuildDTCGResult', async () => {
    const response = buildFixtureResponse();
    const fakeApi = { getLocalVariables: jest.fn().mockResolvedValue(response) };

    const result = await buildDTCG({
      token: 'unused',
      fileKey: 'file-123',
      targetNames: TARGET_COLLECTION_NAMES,
      outputDir: tempDir,
      api: fakeApi,
      now: () => new Date('2026-04-29T12:00:00.000Z'),
    });

    expect(fakeApi.getLocalVariables).toHaveBeenCalledWith('file-123');
    expect(result.outputDir).toBe(tempDir);
    expect(result.classified).toHaveLength(2);
    expect(result.outputs).toHaveLength(3);
    expect(result.manifest.generatedAt).toBe('2026-04-29T12:00:00.000Z');
    expect(result.manifest.files.map((f) => f.fileName).sort()).toEqual([
      'backpack.day.json',
      'backpack.night.json',
      'primitives.json',
    ]);
  });
});

describe('formatBuildSummary', () => {
  // Minimal fake — we only exercise the formatter, not the writer.
  function fakeResult(overrides: Partial<BuildDTCGResult> = {}): BuildDTCGResult {
    const base: BuildDTCGResult = {
      classified: [
        {
          collection: { name: 'Backpack' } as BuildDTCGResult['classified'][number]['collection'],
          role: 'semantic',
        },
        {
          collection: { name: 'Primitives' } as BuildDTCGResult['classified'][number]['collection'],
          role: 'primitive',
        },
      ],
      outputs: [
        {
          collectionName: 'Backpack',
          modeName: 'Day',
          role: 'semantic',
          tree: {},
          stats: {
            tokenCount: 10,
            preservedAliasCount: 5,
            inlinedAliasCount: 2,
            skippedVariableCount: 0,
            skippedVariables: [],
          },
        },
      ],
      missingNames: [],
      manifest: {
        generatedAt: '2026-04-29T12:00:00.000Z',
        files: [
          {
            fileName: 'backpack.day.json',
            collectionName: 'Backpack',
            modeName: 'Day',
            role: 'semantic',
            variableCount: 10,
            preservedAliasCount: 5,
            inlinedAliasCount: 2,
            skippedVariableCount: 0,
          },
        ],
      },
      outputDir: '/tmp/out',
    };
    return { ...base, ...overrides };
  }

  it('summarises classification, per-output stats, and footer lines', () => {
    const lines = formatBuildSummary(fakeResult());
    expect(lines).toEqual([
      'Classified 2 collection(s): Backpack (semantic), Primitives (primitive).',
      '- Backpack / Day: 10 tokens (5 preserved, 2 inlined)',
      'Manifest: /tmp/out/manifest.json',
      'Wrote 1 DTCG file(s) to /tmp/out.',
    ]);
  });

  it('reports skipped variables grouped by missing alias id', () => {
    const lines = formatBuildSummary(
      fakeResult({
        outputs: [
          {
            collectionName: 'Backpack',
            modeName: 'Day',
            role: 'semantic',
            tree: {},
            stats: {
              tokenCount: 8,
              preservedAliasCount: 5,
              inlinedAliasCount: 2,
              skippedVariableCount: 2,
              skippedVariables: [
                {
                  variableName: 'Component/Button/bg-default',
                  variableId: 'VariableID:1234:5678',
                  variableKey: 'source-key-1',
                  reason: 'unresolved-alias',
                  unresolvedAliasId: 'VariableID:1111:2222',
                },
                {
                  variableName: 'Component/Button/bg-default',
                  variableId: 'VariableID:1234:5678',
                  variableKey: 'source-key-1',
                  reason: 'unresolved-alias',
                  unresolvedAliasId: 'VariableID:1111:2222',
                },
                {
                  variableName: 'Component/Chip/bg-active',
                  variableId: 'VariableID:9876:5432',
                  variableKey: 'source-key-2',
                  reason: 'unresolved-alias',
                  unresolvedAliasId: 'VariableID:3333:4444',
                  unresolvedAt: 'Component/Chip/internal',
                },
              ],
            },
          },
          {
            collectionName: 'Backpack',
            modeName: 'Night',
            role: 'semantic',
            tree: {},
            stats: {
              tokenCount: 8,
              preservedAliasCount: 5,
              inlinedAliasCount: 2,
              skippedVariableCount: 1,
              skippedVariables: [
                {
                  variableName: 'Component/Button/bg-default',
                  variableId: 'VariableID:1234:5678',
                  variableKey: 'source-key-1',
                  reason: 'unresolved-alias',
                  unresolvedAliasId: 'VariableID:1111:2222',
                },
              ],
            },
          },
        ],
      }),
    );
    expect(lines).toContain(
      '- Backpack / Day: 8 tokens (5 preserved, 2 inlined, 2 skipped)',
    );
    expect(lines).toContain(
      'Skipped 3 variable instance(s) due to unresolved aliases across 2 missing target variable(s) (likely cross-library or deleted references):',
    );
    expect(lines).toContain(
      '  - missing VariableID:1111:2222 ← [Backpack] Component/Button/bg-default (modes: Day, Night)',
    );
    expect(lines).toContain(
      '  - missing VariableID:3333:4444 ← [Backpack] Component/Chip/bg-active (modes: Day)',
    );
  });

  it('includes a warning when target collections are missing', () => {
    const lines = formatBuildSummary(fakeResult({ missingNames: ['VDL'] }));
    expect(lines.some((line) => line.includes('Warning') && line.includes('VDL'))).toBe(
      true,
    );
  });

  it('groups skipped variables by reason with separate sections', () => {
    const lines = formatBuildSummary(
      fakeResult({
        outputs: [
          {
            collectionName: 'Backpack',
            modeName: 'Day',
            role: 'semantic',
            tree: {},
            stats: {
              tokenCount: 0,
              preservedAliasCount: 0,
              inlinedAliasCount: 0,
              skippedVariableCount: 2,
              skippedVariables: [
                {
                  variableName: 'Opacity/Hover',
                  variableId: 'v-opacity-hover',
                  variableKey: 'k-opacity-hover',
                  reason: 'missing-mode-value',
                  missingModeName: 'Day',
                },
                {
                  variableName: 'Colour/Brand/Pink',
                  variableId: 'v-brand-pink',
                  variableKey: 'k-brand-pink',
                  reason: 'path-collision',
                  collidingVariableName: 'Colour/Brand',
                },
              ],
            },
          },
        ],
      }),
    );
    expect(lines).toContain(
      'Skipped 1 variable instance(s) with no value assigned for the requested mode:',
    );
    expect(lines).toContain(
      '  - missing value for mode "Day" ← [Backpack] Opacity/Hover (modes: Day)',
    );
    expect(lines).toContain(
      "Skipped 1 variable instance(s) due to DTCG path collisions with another variable's name:",
    );
    expect(lines).toContain(
      '  - collides with "Colour/Brand" ← [Backpack] Colour/Brand/Pink (modes: Day)',
    );
  });
});
