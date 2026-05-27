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

import {
  BACKPACK_MODE_DARK,
  BACKPACK_MODE_LIGHT,
  KEY_SEM_CANVAS_CONTRAST,
  KEY_SEM_CANVAS_DEFAULT,
  buildFixtureResponse,
} from './__fixtures__/figma-variable';
import { buildDTCG, buildDTCGOutputs, formatBuildSummary } from './build-dtcg';
import { FigmaApi } from './figma-api';
import { TARGET_COLLECTION_NAMES } from './sync-helpers';

import type { BuildDTCGResult } from './build-dtcg';
import type { DTCGModeOutput, SkippedVariableRecord } from './types';

jest.mock('./figma-api');

describe('buildDTCGOutputs (end-to-end on fixtures)', () => {
  it('produces one DTCG output per (collection, mode), classified and with alias stats', () => {
    const response = buildFixtureResponse();
    const { classified, outputs } = buildDTCGOutputs(
      response,
      TARGET_COLLECTION_NAMES,
    );

    expect(classified).toEqual([
      {
        collection: expect.objectContaining({ name: 'Backpack' }),
        role: 'semantic',
      },
      {
        collection: expect.objectContaining({ name: 'Primitives' }),
        role: 'primitive',
      },
    ]);

    // 1 primitives + 2 backpack modes
    expect(outputs).toHaveLength(3);
    expect(outputs.map((o) => `${o.collectionName}/${o.modeName}`)).toEqual([
      'Backpack/Dark',
      'Backpack/Light',
      'Primitives/Hex',
    ]);

    // Light tree exercises the full alias machinery: Canvas/Default aliases a
    // primitive (preserved as {Colour.Pink}); Canvas/Contrast aliases another
    // semantic in the same collection (inlined, transitively → {Colour.Pink}).
    const [backpackDark, backpackLight, primitives] = outputs;
    expect(backpackLight.tree).toEqual({
      Canvas: {
        $type: 'color',
        Contrast: {
          $value: '{Colour.Pink}',
          $extensions: {
            figma: expect.objectContaining({ key: KEY_SEM_CANVAS_CONTRAST }),
          },
        },
        Default: {
          $value: '{Colour.Pink}',
          $extensions: {
            figma: expect.objectContaining({ key: KEY_SEM_CANVAS_DEFAULT }),
          },
        },
      },
    });
    expect(backpackLight.stats).toMatchObject({
      preservedAliasCount: 1,
      inlinedAliasCount: 1,
    });

    // Dark just needs to confirm the per-mode alias swap landed.
    expect(backpackDark.tree).toMatchObject({
      Canvas: { Default: { $value: '{Colour.Berry}' } },
    });

    // Primitives: spot-check the role and one literal of each $type.
    expect(primitives.role).toBe('primitive');
    expect(primitives.tree).toMatchObject({
      Colour: { Pink: { $value: '#ff66b3' } },
      Spacing: { $type: 'dimension', md: { $value: '8px' } },
    });
  });

  it('throws when no target collection is present locally', () => {
    const response = buildFixtureResponse();
    expect(() => buildDTCGOutputs(response, ['DoesNotExist'])).toThrow(
      /None of the target collections/,
    );
  });

  // Regression: the mapping must rename only the OUTPUT mode (so filenames
  // and the manifest reflect the published name). Value resolution still
  // needs the original Figma mode name to find the modeId in valuesByMode.
  // If the mapped name leaked into resolution, getCollectionModeId would
  // miss and fall back to defaultModeId, collapsing all modes to the
  // default's values — which is exactly what happened in the first cut.
  it('renames output mode names without collapsing per-mode values', () => {
    const response = buildFixtureResponse();
    const { outputs } = buildDTCGOutputs(response, TARGET_COLLECTION_NAMES, {
      modeNameMap: { Light: 'LightSky', Dark: 'DarkSky' },
    });

    expect(
      outputs.filter((o) => o.collectionName === 'Backpack'),
    ).toMatchObject([
      {
        modeName: 'DarkSky',
        tree: { Canvas: { Default: { $value: '{Colour.Berry}' } } },
      },
      {
        modeName: 'LightSky',
        tree: { Canvas: { Default: { $value: '{Colour.Pink}' } } },
      },
    ]);
  });
});

describe('buildDTCG (full pipeline)', () => {
  let tempDir: string;
  let mockGetLocalVariables: jest.Mock;

  beforeEach(async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), 'token-sync-build-'));
    mockGetLocalVariables = jest.fn();
    (FigmaApi as jest.Mock).mockImplementation(() => ({
      getLocalVariables: mockGetLocalVariables,
    }));
  });

  afterEach(async () => {
    await rm(tempDir, { force: true, recursive: true });
  });

  it('runs fetch → transform → write and returns a complete BuildDTCGResult', async () => {
    const response = buildFixtureResponse();
    mockGetLocalVariables.mockResolvedValue(response);

    const result = await buildDTCG({
      token: 'test-token',
      fileKey: 'file-123',
      targetNames: TARGET_COLLECTION_NAMES,
      outputDir: tempDir,
      now: () => new Date('2026-04-29T12:00:00.000Z'),
    });

    expect(mockGetLocalVariables).toHaveBeenCalledWith('file-123');
    expect(result.outputDir).toBe(tempDir);
    expect(result.classified).toHaveLength(2);
    expect(result.outputs).toHaveLength(3);
    expect(result.manifest.generatedAt).toBe('2026-04-29T12:00:00.000Z');
    expect(result.manifest.files.map((f) => f.fileName).sort()).toEqual([
      'backpack.dark.json',
      'backpack.light.json',
      'primitives.json',
    ]);
  });
});

describe('formatBuildSummary', () => {
  // Fills in dummy id/key so tests only need to spell out the fields they assert on.
  function makeSkipped(
    variableName: string,
    overrides: Partial<SkippedVariableRecord> & {
      reason: SkippedVariableRecord['reason'];
    },
  ): SkippedVariableRecord {
    return {
      variableId: 'unused-id',
      variableKey: 'unused-key',
      variableName,
      ...overrides,
    };
  }

  // Build a minimal Backpack DTCGModeOutput with the given skipped variables.
  function makeOutput(
    modeName: string,
    skipped: SkippedVariableRecord[] = [],
  ): DTCGModeOutput {
    return {
      collectionName: 'Backpack',
      modeName,
      role: 'semantic',
      tree: {},
      stats: {
        tokenCount: 10,
        preservedAliasCount: 5,
        inlinedAliasCount: 2,
        skippedVariableCount: skipped.length,
        skippedVariables: skipped,
        ambiguousFloatVariables: [],
      },
    };
  }

  // Minimal fake — we only exercise the formatter, not the writer.
  function makeResult(
    overrides: Partial<BuildDTCGResult> = {},
  ): BuildDTCGResult {
    return {
      classified: [
        {
          collection: {
            name: 'Backpack',
          } as BuildDTCGResult['classified'][number]['collection'],
          role: 'semantic',
        },
        {
          collection: {
            name: 'Primitives',
          } as BuildDTCGResult['classified'][number]['collection'],
          role: 'primitive',
        },
      ],
      outputs: [makeOutput(BACKPACK_MODE_LIGHT)],
      missingNames: [],
      manifest: {
        generatedAt: '2026-04-29T12:00:00.000Z',
        files: [
          {
            fileName: 'backpack.light.json',
            collectionName: 'Backpack',
            modeName: BACKPACK_MODE_LIGHT,
            role: 'semantic',
            variableCount: 10,
            preservedAliasCount: 5,
            inlinedAliasCount: 2,
            skippedVariableCount: 0,
          },
        ],
      },
      outputDir: '/tmp/out',
      ...overrides,
    };
  }

  it('summarises classification, per-output stats, and footer lines', () => {
    expect(formatBuildSummary(makeResult())).toEqual([
      'Classified 2 collection(s): Backpack (semantic), Primitives (primitive).',
      '- Backpack / Light: 10 tokens (5 preserved, 2 inlined)',
      'Manifest: /tmp/out/manifest.json',
      'Wrote 1 DTCG file(s) to /tmp/out.',
    ]);
  });

  it('includes a warning when target collections are missing', () => {
    const lines = formatBuildSummary(makeResult({ missingNames: ['VDL'] }));
    expect(lines.some((l) => l.includes('Warning') && l.includes('VDL'))).toBe(
      true,
    );
  });

  it('groups unresolved aliases by missing alias id and merges Light/Dark duplicates', () => {
    // Same variable + same missing alias on both modes → one bullet, "(modes: Dark, Light)".
    // A second variable with a different missing alias → its own bullet.
    const dupOnLight = makeSkipped('Component/Button/bg-default', {
      reason: 'unresolved-alias',
      unresolvedAliasId: 'VariableID:1111:2222',
    });
    const dupOnDark = { ...dupOnLight };
    const otherOnLight = makeSkipped('Component/Chip/bg-active', {
      reason: 'unresolved-alias',
      unresolvedAliasId: 'VariableID:3333:4444',
    });

    const lines = formatBuildSummary(
      makeResult({
        outputs: [
          makeOutput(BACKPACK_MODE_LIGHT, [dupOnLight, otherOnLight]),
          makeOutput(BACKPACK_MODE_DARK, [dupOnDark]),
        ],
      }),
    );

    expect(lines).toContain(
      'Skipped 3 variable instance(s) due to unresolved aliases across 2 missing target variable(s) (likely cross-library or deleted references):',
    );
    expect(lines).toContain(
      '  - missing VariableID:1111:2222 ← [Backpack] Component/Button/bg-default (modes: Dark, Light)',
    );
    expect(lines).toContain(
      '  - missing VariableID:3333:4444 ← [Backpack] Component/Chip/bg-active (modes: Light)',
    );
  });

  it('emits a separate section per skip reason', () => {
    const lines = formatBuildSummary(
      makeResult({
        outputs: [
          makeOutput(BACKPACK_MODE_LIGHT, [
            makeSkipped('Opacity/Hover', {
              reason: 'missing-mode-value',
              missingModeName: 'Light',
            }),
            makeSkipped('Colour/Brand/Pink', {
              reason: 'path-collision',
              collidingVariableName: 'Colour/Brand',
            }),
          ]),
        ],
      }),
    );

    expect(lines).toContain(
      'Skipped 1 variable instance(s) with no value assigned for the requested mode:',
    );
    expect(lines).toContain(
      '  - missing value for mode "Light" ← [Backpack] Opacity/Hover (modes: Light)',
    );
    expect(lines).toContain(
      "Skipped 1 variable instance(s) due to DTCG path collisions with another variable's name:",
    );
    expect(lines).toContain(
      '  - collides with "Colour/Brand" ← [Backpack] Colour/Brand/Pink (modes: Light)',
    );
  });

  it('expands into bullet list when multiple variables share the same unresolved alias id', () => {
    const varA = makeSkipped('Component/Button/bg-default', {
      reason: 'unresolved-alias',
      unresolvedAliasId: 'VariableID:9999:0000',
    });
    const varB = makeSkipped('Component/Card/bg-default', {
      reason: 'unresolved-alias',
      unresolvedAliasId: 'VariableID:9999:0000',
    });

    const lines = formatBuildSummary(
      makeResult({ outputs: [makeOutput(BACKPACK_MODE_LIGHT, [varA, varB])] }),
    );

    expect(lines).toContain(
      '  - missing VariableID:9999:0000 (2 variable(s)):',
    );
    expect(lines).toContain(
      '      • [Backpack] Component/Button/bg-default (modes: Light)',
    );
    expect(lines).toContain(
      '      • [Backpack] Component/Card/bg-default (modes: Light)',
    );
  });

  it('expands into bullet list when multiple FLOAT variables share the same scope key', () => {
    const lightOutput = makeOutput(BACKPACK_MODE_LIGHT);
    lightOutput.stats.ambiguousFloatVariables = [
      {
        variableName: 'Typography/Weight/Bold',
        variableId: 'v3',
        variableKey: 'k3',
        scopes: ['ALL_SCOPES'],
        inferredType: 'dimension',
      },
      {
        variableName: 'Typography/Weight/Regular',
        variableId: 'v4',
        variableKey: 'k4',
        scopes: ['ALL_SCOPES'],
        inferredType: 'dimension',
      },
    ];

    const lines = formatBuildSummary(makeResult({ outputs: [lightOutput] }));

    expect(lines).toContain('  - scope=[ALL_SCOPES] (2 variable(s)):');
    expect(lines).toContain(
      '      • [Backpack] Typography/Weight/Bold (modes: Light)',
    );
    expect(lines).toContain(
      '      • [Backpack] Typography/Weight/Regular (modes: Light)',
    );
  });

  it('warns about FLOAT variables with unconstrained scopes and merges Light/Dark duplicates', () => {
    const lightOutput = makeOutput(BACKPACK_MODE_LIGHT);
    lightOutput.stats.ambiguousFloatVariables = [
      {
        variableName: 'Typography/Style/Label',
        variableId: 'v1',
        variableKey: 'k1',
        scopes: ['ALL_SCOPES'],
        inferredType: 'dimension',
      },
    ];
    const darkOutput = makeOutput(BACKPACK_MODE_DARK);
    darkOutput.stats.ambiguousFloatVariables = [
      {
        variableName: 'Typography/Style/Label',
        variableId: 'v1',
        variableKey: 'k1',
        scopes: ['ALL_SCOPES'],
        inferredType: 'dimension',
      },
      {
        variableName: 'Typography/Style/Subhead',
        variableId: 'v2',
        variableKey: 'k2',
        scopes: [],
        inferredType: 'dimension',
      },
    ];
    const lines = formatBuildSummary(
      makeResult({ outputs: [lightOutput, darkOutput] }),
    );

    expect(
      lines.some(
        (l) =>
          l.startsWith('Warning: 3 FLOAT variable instance(s)') &&
          l.includes('typed as "dimension"'),
      ),
    ).toBe(true);
    expect(lines).toContain(
      '  - scope=[ALL_SCOPES] ← [Backpack] Typography/Style/Label (modes: Dark, Light)',
    );
    expect(lines).toContain(
      '  - scope=[(none)] ← [Backpack] Typography/Style/Subhead (modes: Dark)',
    );
  });
});
