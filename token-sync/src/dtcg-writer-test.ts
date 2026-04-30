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

import {
  buildManifest,
  countModesPerCollection,
  dtcgFileNameFor,
  slugify,
  stringifyDtcg,
  writeDtcgFiles,
} from './dtcg-writer';

import type { DtcgManifest, DtcgModeOutput } from './dtcg-types';

const fixedNow = () => new Date('2026-04-29T12:00:00.000Z');

function primitiveOutput(overrides: Partial<DtcgModeOutput> = {}): DtcgModeOutput {
  return {
    collectionName: 'Primitives',
    modeName: 'Hex',
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
    },
    ...overrides,
  };
}

function backpackOutput(
  modeName: 'Day' | 'Night',
  overrides: Partial<DtcgModeOutput> = {},
): DtcgModeOutput {
  return {
    collectionName: 'Backpack',
    modeName,
    role: 'semantic',
    tree: {
      Canvas: {
        $type: 'color',
        Default: {
          $value: modeName === 'Day' ? '{Colour.Pink}' : '{Colour.Berry}',
        },
      },
    },
    stats: {
      tokenCount: 1,
      preservedAliasCount: 1,
      inlinedAliasCount: 0,
      skippedVariableCount: 0,
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

describe('dtcgFileNameFor', () => {
  it('omits the mode segment for single-mode collections', () => {
    expect(dtcgFileNameFor('Primitives', 'Hex', false)).toBe('primitives.json');
  });

  it('includes the mode segment for multi-mode collections', () => {
    expect(dtcgFileNameFor('Backpack', 'Day', true)).toBe('backpack.day.json');
    expect(dtcgFileNameFor('Backpack', 'Night', true)).toBe(
      'backpack.night.json',
    );
  });
});

describe('countModesPerCollection', () => {
  it('sums modes per collection name', () => {
    const counts = countModesPerCollection([
      primitiveOutput(),
      backpackOutput('Day'),
      backpackOutput('Night'),
    ]);
    expect(counts.get('Primitives')).toBe(1);
    expect(counts.get('Backpack')).toBe(2);
  });
});

describe('buildManifest', () => {
  const outputs = [
    primitiveOutput(),
    backpackOutput('Day'),
    backpackOutput('Night'),
  ];
  const modeCounts = countModesPerCollection(outputs);
  const manifest = buildManifest('file-123', outputs, modeCounts, '2026-04-29T12:00:00.000Z');

  it('sets top-level fields', () => {
    expect(manifest.fileKey).toBe('file-123');
    expect(manifest.sourceFileUrl).toBe('https://www.figma.com/design/file-123');
    expect(manifest.generatedAt).toBe('2026-04-29T12:00:00.000Z');
  });

  it('preserves the order of outputs in the files array', () => {
    expect(manifest.files.map((f) => f.fileName)).toEqual([
      'primitives.json',
      'backpack.day.json',
      'backpack.night.json',
    ]);
  });

  it('mirrors the output stats into each file record', () => {
    const backpackDay = manifest.files.find((f) => f.fileName === 'backpack.day.json');
    expect(backpackDay).toMatchObject({
      collectionName: 'Backpack',
      modeName: 'Day',
      role: 'semantic',
      variableCount: 1,
      preservedAliasCount: 1,
      inlinedAliasCount: 0,
      skippedVariableCount: 0,
    });
  });

  it('contract: every file record has the required shape', () => {
    const requiredKeys = [
      'fileName',
      'collectionName',
      'modeName',
      'role',
      'variableCount',
      'preservedAliasCount',
      'inlinedAliasCount',
      'skippedVariableCount',
    ];
    for (const file of manifest.files) {
      for (const key of requiredKeys) {
        expect(file).toHaveProperty(key);
      }
    }
  });
});

describe('stringifyDtcg', () => {
  it('emits stable, newline-terminated 2-space JSON', () => {
    expect(stringifyDtcg({ b: 2, a: 1 })).toBe('{\n  "b": 2,\n  "a": 1\n}\n');
  });
});

describe('writeDtcgFiles', () => {
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
      backpackOutput('Day'),
      backpackOutput('Night'),
    ];
    const manifest = await writeDtcgFiles(
      'file-123',
      outputs,
      tempDir,
      fixedNow,
    );

    const entries = (await readdir(tempDir)).sort();
    expect(entries).toEqual([
      'backpack.day.json',
      'backpack.night.json',
      'manifest.json',
      'primitives.json',
    ]);

    const manifestOnDisk = JSON.parse(
      await readFile(path.join(tempDir, 'manifest.json'), 'utf8'),
    ) as DtcgManifest;
    expect(manifestOnDisk).toEqual(manifest);
    expect(manifestOnDisk.files.map((f) => f.fileName).sort()).toEqual([
      'backpack.day.json',
      'backpack.night.json',
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

    await writeDtcgFiles('file-123', outputs, tempDir, fixedNow);
    await writeDtcgFiles('file-123', outputs, secondDir, fixedNow);

    const firstContent = await readFile(path.join(tempDir, 'primitives.json'));
    const secondContent = await readFile(path.join(secondDir, 'primitives.json'));
    expect(firstContent.equals(secondContent)).toBe(true);

    const firstManifest = await readFile(path.join(tempDir, 'manifest.json'));
    const secondManifest = await readFile(path.join(secondDir, 'manifest.json'));
    expect(firstManifest.equals(secondManifest)).toBe(true);

    await rm(secondDir, { force: true, recursive: true });
  });
});
