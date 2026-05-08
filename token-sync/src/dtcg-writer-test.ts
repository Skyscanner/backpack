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

import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

import {
  BACKPACK_MODE_DARK,
  BACKPACK_MODE_LIGHT,
  PRIMITIVES_MODE_HEX,
} from './__fixtures__/figma-variable';
import {
  assertSafeOutputDir,
  assertUniqueFileNames,
  buildManifest,
  countModesPerCollection,
  DTCGFileNameFor,
  slugify,
  stringifyDTCG,
  writeDTCGFiles,
} from './dtcg-writer';

import type { DTCGManifest, DTCGModeOutput } from './types';

const fixedNow = () => new Date('2026-04-29T12:00:00.000Z');

function primitiveOutput(overrides: Partial<DTCGModeOutput> = {}): DTCGModeOutput {
  return {
    collectionName: 'Primitives',
    modeName: PRIMITIVES_MODE_HEX,
    role: 'primitive',
    tree: {
      Colour: {
        $type: 'color',
        Pink: { $value: '#ff66b3' },
      },
    },
    stats: {
      tokenCount: 1,
      preservedAliasCount: 0,
      inlinedAliasCount: 0,
      skippedVariableCount: 0,
      skippedVariables: [],
      ambiguousFloatVariables: [],
    },
    ...overrides,
  };
}

function backpackOutput(
  modeName: typeof BACKPACK_MODE_LIGHT | typeof BACKPACK_MODE_DARK,
  overrides: Partial<DTCGModeOutput> = {},
): DTCGModeOutput {
  return {
    collectionName: 'Backpack',
    modeName,
    role: 'semantic',
    tree: {
      Canvas: {
        $type: 'color',
        Default: {
          $value: modeName === BACKPACK_MODE_LIGHT ? '{Colour.Pink}' : '{Colour.Berry}',
        },
      },
    },
    stats: {
      tokenCount: 1,
      preservedAliasCount: 1,
      inlinedAliasCount: 0,
      skippedVariableCount: 0,
      skippedVariables: [],
      ambiguousFloatVariables: [],
    },
    ...overrides,
  };
}

describe('slugify', () => {
  it.each([
    ['Primitives', 'primitives'],
    ['Backpack', 'backpack'],
    ['Day Mode', 'day-mode'],
    ['  spaced  ', 'spaced'],
    ['A/B/C', 'a-b-c'],
    ['Hex!', 'hex'],
  ])('turns %p into %p', (input, expected) => {
    expect(slugify(input)).toBe(expected);
  });
});

describe('DTCGFileNameFor', () => {
  it.each<[string, string, boolean, string]>([
    ['Primitives', PRIMITIVES_MODE_HEX, false, 'primitives.json'],
    ['Backpack', BACKPACK_MODE_LIGHT, true, 'backpack.light.json'],
    ['Backpack', BACKPACK_MODE_DARK, true, 'backpack.dark.json'],
  ])('%s/%s multiMode=%s → %s', (collection, mode, multiMode, expected) => {
    expect(DTCGFileNameFor(collection, mode, multiMode)).toBe(expected);
  });
});

describe('countModesPerCollection', () => {
  it('sums modes per collection name', () => {
    const counts = countModesPerCollection([
      primitiveOutput(),
      backpackOutput(BACKPACK_MODE_LIGHT),
      backpackOutput(BACKPACK_MODE_DARK),
    ]);
    expect(counts.get('Primitives')).toBe(1);
    expect(counts.get('Backpack')).toBe(2);
  });
});

const standardOutputs = [
  primitiveOutput(),
  backpackOutput(BACKPACK_MODE_LIGHT),
  backpackOutput(BACKPACK_MODE_DARK),
];
const standardManifest = buildManifest(
  standardOutputs,
  countModesPerCollection(standardOutputs),
  '2026-04-29T12:00:00.000Z',
);

describe('buildManifest', () => {
  it('sets generatedAt and preserves file order', () => {
    expect(standardManifest.generatedAt).toBe('2026-04-29T12:00:00.000Z');
    expect(standardManifest.files.map((f) => f.fileName)).toEqual([
      'primitives.json',
      'backpack.light.json',
      'backpack.dark.json',
    ]);
  });

  it('mirrors the output stats into each file record', () => {
    const backpackLight = standardManifest.files.find(
      (f) => f.fileName === 'backpack.light.json',
    );
    expect(backpackLight).toMatchObject({
      collectionName: 'Backpack',
      modeName: 'Light',
      role: 'semantic',
      variableCount: 1,
      preservedAliasCount: 1,
      inlinedAliasCount: 0,
      skippedVariableCount: 0,
    });
  });
});

describe('assertUniqueFileNames', () => {
  it('passes for manifests with distinct fileNames', () => {
    expect(() => assertUniqueFileNames(standardManifest)).not.toThrow();
  });

  it('throws when two outputs slug to the same fileName', () => {
    // 'Backpack' and 'Backpack!' both slug to 'backpack' → both produce
    // 'backpack.json'. The collision must surface before we write.
    const a = primitiveOutput({ collectionName: 'Backpack' });
    const b = primitiveOutput({ collectionName: 'Backpack!' });
    const manifest = buildManifest(
      [a, b],
      countModesPerCollection([a, b]),
      '2026-04-29T12:00:00.000Z',
    );
    expect(() => assertUniqueFileNames(manifest)).toThrow(/filename collision/);
  });

  it('throws when a collection name slugs to an empty string', () => {
    const emoji = primitiveOutput({ collectionName: '🎨' });
    const manifest = buildManifest(
      [emoji],
      countModesPerCollection([emoji]),
      '2026-04-29T12:00:00.000Z',
    );
    expect(() => assertUniqueFileNames(manifest)).toThrow(
      /slugged to an empty filename/,
    );
  });
});

describe('assertSafeOutputDir', () => {
  it('accepts a subdirectory of the current working directory', () => {
    expect(() =>
      assertSafeOutputDir(path.join(process.cwd(), 'token-sync', 'tokens')),
    ).not.toThrow();
  });

  it.each([
    ['empty string',    '',                              /empty/],
    ['filesystem root', path.parse(process.cwd()).root,  /filesystem root/],
    ['home directory',  os.homedir(),                    /home directory/],
    ['cwd itself',      process.cwd(),                   /current working directory/],
    ['ancestor of cwd', path.dirname(process.cwd()),     /ancestor of the current working directory/],
  ])('rejects %s', (_, dir, pattern) => {
    expect(() => assertSafeOutputDir(dir as string)).toThrow(pattern as RegExp);
  });
});

describe('stringifyDTCG', () => {
  it('emits stable, newline-terminated 2-space JSON', () => {
    expect(stringifyDTCG({ b: 2, a: 1 })).toBe('{\n  "b": 2,\n  "a": 1\n}\n');
  });
});

describe('writeDTCGFiles', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), 'token-sync-writer-'));
  });

  afterEach(async () => {
    await rm(tempDir, { force: true, recursive: true });
  });

  it('writes one file per mode plus a manifest, and clears previous contents', async () => {
    // Pre-populate with a stale file that must be removed.
    await writeFile(path.join(tempDir, 'stale.json'), '{}');

    const outputs = [
      primitiveOutput(),
      backpackOutput(BACKPACK_MODE_LIGHT),
      backpackOutput(BACKPACK_MODE_DARK),
    ];
    const manifest = await writeDTCGFiles(outputs, tempDir, fixedNow);

    const entries = (await readdir(tempDir)).sort();
    expect(entries).toEqual([
      'backpack.dark.json',
      'backpack.light.json',
      'manifest.json',
      'primitives.json',
    ]);

    const manifestOnDisk = JSON.parse(
      await readFile(path.join(tempDir, 'manifest.json'), 'utf8'),
    ) as DTCGManifest;
    expect(manifestOnDisk).toEqual(manifest);
    expect(manifestOnDisk.files.map((f) => f.fileName).sort()).toEqual([
      'backpack.dark.json',
      'backpack.light.json',
      'primitives.json',
    ]);

    const primitives = JSON.parse(
      await readFile(path.join(tempDir, 'primitives.json'), 'utf8'),
    );
    expect(primitives).toEqual(outputs[0].tree);
  });

  it('produces byte-identical output for two consecutive runs with the same inputs and clock', async () => {
    const outputs = [primitiveOutput()];
    const secondDir = await mkdtemp(path.join(os.tmpdir(), 'token-sync-writer-'));

    await writeDTCGFiles(outputs, tempDir, fixedNow);
    await writeDTCGFiles(outputs, secondDir, fixedNow);

    const firstContent = await readFile(path.join(tempDir, 'primitives.json'));
    const secondContent = await readFile(path.join(secondDir, 'primitives.json'));
    expect(firstContent.equals(secondContent)).toBe(true);

    const firstManifest = await readFile(path.join(tempDir, 'manifest.json'));
    const secondManifest = await readFile(path.join(secondDir, 'manifest.json'));
    expect(firstManifest.equals(secondManifest)).toBe(true);

    await rm(secondDir, { force: true, recursive: true });
  });

  it('leaves the previous output intact and cleans up staging when a write fails', async () => {
    // Seed `tempDir` with a previous successful run.
    await writeDTCGFiles([primitiveOutput()], tempDir, fixedNow);
    const before = (await readdir(tempDir)).sort();
    const previousPrimitives = await readFile(
      path.join(tempDir, 'primitives.json'),
      'utf8',
    );

    // A circular tree makes `JSON.stringify` throw inside the staging write,
    // exercising the catch path without monkey-patching node:fs.
    const broken = primitiveOutput();
    const cycle: Record<string, unknown> = {};
    cycle.self = cycle;
    broken.tree = cycle as DTCGModeOutput['tree'];

    await expect(
      writeDTCGFiles([broken], tempDir, fixedNow),
    ).rejects.toThrow();

    // outputDir is byte-identical to the previous run.
    const after = (await readdir(tempDir)).sort();
    expect(after).toEqual(before);
    expect(
      await readFile(path.join(tempDir, 'primitives.json'), 'utf8'),
    ).toBe(previousPrimitives);

    // No staging dir is left behind alongside outputDir.
    const parentEntries = await readdir(path.dirname(tempDir));
    const stagingLeftovers = parentEntries.filter((entry) =>
      entry.startsWith(`${path.basename(tempDir)}.staging-`),
    );
    expect(stagingLeftovers).toEqual([]);
  });
});
