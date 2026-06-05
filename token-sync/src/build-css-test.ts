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

import { spawn } from 'node:child_process';
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import {
  BACKPACK_DARK_FILE,
  BACKPACK_LIGHT_FILE,
  DARK_OUTPUT_FILE,
  DARK_SELECTOR,
  LIGHT_OUTPUT_FILE,
  LIGHT_SELECTOR,
  PRIMITIVES_FILE,
  PRIMITIVES_OUTPUT_FILE,
  PRIMITIVES_SELECTOR,
} from './style-dictionary-config';

// CLI is spawned via tsx (not imported) to keep SD's ESM runtime out of
// jest's CJS babel transform.

const REPO_ROOT = path.resolve(__dirname, '../..');
const CLI_ENTRY = path.resolve(__dirname, 'build-css-cli.ts');
// Use the project-local tsx so the test doesn't depend on a globally
// installed binary.
const TSX_BIN = path.resolve(REPO_ROOT, 'node_modules/.bin/tsx');

interface CliResult {
  code: number | null;
  stdout: string;
  stderr: string;
}

function runCli(env: Record<string, string>): Promise<CliResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(TSX_BIN, [CLI_ENTRY], {
      env: { ...process.env, ...env },
      cwd: REPO_ROOT,
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk: Buffer) => {
      stdout += chunk.toString('utf8');
    });
    child.stderr.on('data', (chunk: Buffer) => {
      stderr += chunk.toString('utf8');
    });
    child.on('error', reject);
    child.on('close', (code) => resolve({ code, stdout, stderr }));
  });
}

// Minimal DTCG fixtures: primitives + aliases, dimension with `px`, and a
// "shared across modes" case expressed via the same alias on both sides.
const PRIMITIVES = {
  Colour: {
    $type: 'color',
    Pink: { $value: '#ff66b3' },
    Berry: { $value: '#cc0066' },
  },
  Spacing: {
    $type: 'dimension',
    md: { $value: '16px' },
  },
  Heights: {
    $type: 'dimension',
    36: { $value: '36px' },
  },
};

const BACKPACK_LIGHT = {
  Canvas: {
    $type: 'color',
    Default: { $value: '{Colour.Pink}' },
  },
  Component: {
    Button: {
      Dimension: {
        $type: 'dimension',
        'padding-h': { $value: '{Spacing.md}' },
      },
    },
  },
  // Same alias on both sides — the canonical "shared across modes" pattern.
  Surface: {
    $type: 'color',
    Highlight: { $value: '{Colour.Pink}' },
  },
};

const BACKPACK_DARK = {
  Canvas: {
    $type: 'color',
    Default: { $value: '{Colour.Berry}' },
  },
  Component: {
    Button: {
      Dimension: {
        $type: 'dimension',
        'padding-h': { $value: '{Spacing.md}' },
      },
    },
  },
  Surface: {
    $type: 'color',
    Highlight: { $value: '{Colour.Pink}' },
  },
};

let testRoot: string;
let tokensDir: string;
let buildDir: string;

async function setUpFixture(): Promise<void> {
  await mkdir(tokensDir, { recursive: true });
  await Promise.all(
    [
      [PRIMITIVES_FILE, PRIMITIVES],
      [BACKPACK_LIGHT_FILE, BACKPACK_LIGHT],
      [BACKPACK_DARK_FILE, BACKPACK_DARK],
    ].map(([fileName, data]) => writeTokenFile(fileName as string, data)),
  );
}

function writeTokenFile(fileName: string, data: unknown): Promise<void> {
  return writeFile(
    path.join(tokensDir, fileName),
    JSON.stringify(data, null, 2),
    'utf8',
  );
}

function build(): Promise<CliResult> {
  return runCli({ DTCG_OUTPUT_DIR: tokensDir, CSS_OUTPUT_DIR: buildDir });
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function listLeftoverDirs(): Promise<string[]> {
  const parent = await readdir(path.dirname(buildDir));
  const base = path.basename(buildDir);
  return parent.filter(
    (e) => e.startsWith(`${base}.staging-`) || e.startsWith(`${base}.backup-`),
  );
}

describe('build-css CLI', () => {
  // tsx ESM cold start is slow; budget for flaky CI.
  jest.setTimeout(60000);

  beforeEach(async () => {
    testRoot = await mkdtemp(path.join(os.tmpdir(), 'bpk-build-css-'));
    tokensDir = path.join(testRoot, 'tokens');
    buildDir = path.join(tokensDir, 'css');
  });

  afterEach(async () => {
    await rm(testRoot, { force: true, recursive: true });
  });

  it('reports the missing default theme when no semantic file exists', async () => {
    await mkdir(tokensDir, { recursive: true });
    await writeTokenFile(PRIMITIVES_FILE, PRIMITIVES);
    const result = await build();
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/Missing Stage 1 DTCG file/);
    // Light is the default theme — it's the minimum required to build.
    // Experimental themes (Dark, etc.) are auto-discovered and not surfaced
    // here as required.
    expect(result.stderr).toMatch(BACKPACK_LIGHT_FILE);
  });

  it('rejects when only an experimental theme is present and the default (Light) is missing', async () => {
    // Dark exists but Light doesn't — without `:root` baseline, consumers who
    // don't set [data-theme="dark"] would get no token values at all.
    await mkdir(tokensDir, { recursive: true });
    await writeTokenFile(PRIMITIVES_FILE, PRIMITIVES);
    await writeTokenFile(BACKPACK_DARK_FILE, BACKPACK_DARK);
    const result = await build();
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/Missing Stage 1 DTCG file/);
    expect(result.stderr).toMatch(BACKPACK_LIGHT_FILE);
  });

  it('builds successfully with only the default theme (Light) — Dark is optional', async () => {
    // Positive coverage for the "Dark is optional" guarantee: Light alone is
    // sufficient. Symmetry check is a no-op with a single semantic file.
    await mkdir(tokensDir, { recursive: true });
    await writeTokenFile(PRIMITIVES_FILE, PRIMITIVES);
    await writeTokenFile(BACKPACK_LIGHT_FILE, BACKPACK_LIGHT);

    const result = await build();
    expect(result.code).toBe(0);
    expect((await readdir(buildDir)).sort()).toEqual(
      [PRIMITIVES_OUTPUT_FILE, LIGHT_OUTPUT_FILE].sort(),
    );

    const light = await readFile(
      path.join(buildDir, LIGHT_OUTPUT_FILE),
      'utf8',
    );
    expect(light).toMatch(new RegExp(`${escapeRegExp(LIGHT_SELECTOR)} \\{`));
    expect(light).toMatch(/--bpk-canvas-default:\s*#ff66b3/);
  });

  it.each([
    ['Light', BACKPACK_LIGHT, BACKPACK_LIGHT_FILE],
    ['Dark', BACKPACK_DARK, BACKPACK_DARK_FILE],
  ])(
    'rejects when a semantic token is missing on %s',
    async (_label, fixture, fileName) => {
      await setUpFixture();
      // Strip Surface.Highlight so the side under test loses it.
      const { Surface: _surface, ...stripped } = fixture;
      await writeTokenFile(fileName, stripped);

      const result = await build();
      expect(result.code).not.toBe(0);
      expect(result.stderr).toMatch(
        /semantic token\(s\) defined in only one of/,
      );
      expect(result.stderr).toContain(fileName);
      expect(result.stderr).toContain('Surface.Highlight');
    },
  );

  it('rejects DTCG inputs whose tokens collide on CSS name after Component → private rename', async () => {
    await setUpFixture();
    // Casing variants under the same Component parent kebab to the same name.
    await writeTokenFile(BACKPACK_LIGHT_FILE, {
      ...BACKPACK_LIGHT,
      Component: {
        Button: {
          Dimension: {
            $type: 'dimension',
            'padding-h': { $value: '16px' },
          },
        },
        button: {
          Dimension: {
            $type: 'dimension',
            'padding-h': { $value: '8px' },
          },
        },
      },
    });

    const result = await build();
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/CSS variable name collision/);
    expect(result.stderr).toContain('--bpk-private-button-dimension-padding-h');
    expect(result.stderr).toContain('Component.Button.Dimension.padding-h');
    expect(result.stderr).toContain('Component.button.Dimension.padding-h');
  });

  it('rejects DTCG inputs whose primitive and semantic tokens share a CSS name', async () => {
    await setUpFixture();
    await writeTokenFile(BACKPACK_LIGHT_FILE, {
      ...BACKPACK_LIGHT,
      Spacing: {
        $type: 'dimension',
        md: { $value: '{Spacing.md}' },
      },
    });
    await writeTokenFile(BACKPACK_DARK_FILE, {
      ...BACKPACK_DARK,
      Spacing: {
        $type: 'dimension',
        md: { $value: '{Spacing.md}' },
      },
    });

    const result = await build();
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/CSS variable name collision/);
    expect(result.stderr).toContain('--bpk-spacing-md');
    // Both source files appear in the error so the operator can locate them.
    expect(result.stderr).toContain(PRIMITIVES_FILE);
    expect(result.stderr).toContain(BACKPACK_LIGHT_FILE);
  });

  it('rejects DTCG inputs containing non-px dimension values', async () => {
    await setUpFixture();
    await writeTokenFile(BACKPACK_DARK_FILE, {
      ...BACKPACK_DARK,
      Component: {
        Button: {
          Dimension: {
            $type: 'dimension',
            'padding-h': { $value: '16em' },
            'gap-pct': { $value: '50%' },
          },
        },
      },
    });

    const result = await build();
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/Found 2 dimension token\(s\)/);
    expect(result.stderr).toContain('"16em"');
    expect(result.stderr).toContain('"50%"');
    expect(result.stderr).toContain(BACKPACK_DARK_FILE);
    await expect(
      readFile(path.join(buildDir, LIGHT_OUTPUT_FILE), 'utf8'),
    ).rejects.toThrow();
    await expect(
      readFile(path.join(buildDir, DARK_OUTPUT_FILE), 'utf8'),
    ).rejects.toThrow();
    await expect(
      readFile(path.join(buildDir, PRIMITIVES_OUTPUT_FILE), 'utf8'),
    ).rejects.toThrow();
  });

  it('emits one CSS file per mode with the spec selector and prefix', async () => {
    await setUpFixture();
    const result = await build();
    expect(result.code).toBe(0);

    const light = await readFile(
      path.join(buildDir, LIGHT_OUTPUT_FILE),
      'utf8',
    );
    const dark = await readFile(path.join(buildDir, DARK_OUTPUT_FILE), 'utf8');

    expect(light).toMatch(new RegExp(`${escapeRegExp(LIGHT_SELECTOR)} \\{`));
    expect(dark).toMatch(new RegExp(`${escapeRegExp(DARK_SELECTOR)} \\{`));

    // Aliases inline to the primitive literal — light/dark live in separate
    // stylesheets and primitive variables are not emitted there.
    expect(light).toMatch(/--bpk-canvas-default:\s*#ff66b3/);
    expect(dark).toMatch(/--bpk-canvas-default:\s*#cc0066/);

    // 16px → 1rem via size/pxToRem; leading `Component` group is renamed to `private`.
    expect(light).toMatch(/--bpk-private-button-dimension-padding-h:\s*1rem/);
    expect(light).not.toMatch(/--bpk-component-/);
    expect(dark).not.toMatch(/--bpk-component-/);
    // Sanity check: the rename actually emits private-prefixed variables.
    expect(light).toMatch(/--bpk-private-/);
    expect(dark).toMatch(/--bpk-private-/);

    // Same alias on both sides resolves to the same primitive.
    expect(light).toMatch(/--bpk-surface-highlight:\s*#ff66b3/);
    expect(dark).toMatch(/--bpk-surface-highlight:\s*#ff66b3/);

    // Primitives must NOT leak into the per-mode CSS.
    expect(light).not.toMatch(/--bpk-colour-pink/);
    expect(dark).not.toMatch(/--bpk-colour-berry/);

    // Non-color primitives ship in their own theme-independent file.
    const primitives = await readFile(
      path.join(buildDir, PRIMITIVES_OUTPUT_FILE),
      'utf8',
    );
    expect(primitives).toMatch(
      new RegExp(`${escapeRegExp(PRIMITIVES_SELECTOR)} \\{`),
    );
    // Spacing.md (16px) → 1rem via size/pxToRem.
    expect(primitives).toMatch(/--bpk-spacing-md:\s*1rem/);
    // Color and Heights primitives are intentionally excluded.
    expect(primitives).not.toMatch(/--bpk-colour-/);
    expect(primitives).not.toMatch(/--bpk-heights-/);
  });

  it('atomically swaps buildDir on success, rolls back on failure, and never leaves staging/backup dirs', async () => {
    await setUpFixture();
    // Seed with a successful first run.
    const first = await build();
    expect(first.code).toBe(0);
    const previousLight = await readFile(
      path.join(buildDir, LIGHT_OUTPUT_FILE),
      'utf8',
    );
    const previousEntries = (await readdir(buildDir)).sort();

    // Re-running with the same inputs succeeds and leaves no staging/backup.
    expect((await build()).code).toBe(0);
    expect(await readFile(path.join(buildDir, LIGHT_OUTPUT_FILE), 'utf8')).toBe(
      previousLight,
    );
    expect(await listLeftoverDirs()).toEqual([]);

    // A failed run must NOT touch the existing buildDir and must clean up.
    const { Surface: _surface, ...darkWithoutSurface } = BACKPACK_DARK;
    await writeTokenFile(BACKPACK_DARK_FILE, darkWithoutSurface);

    const failed = await build();
    expect(failed.code).not.toBe(0);
    expect((await readdir(buildDir)).sort()).toEqual(previousEntries);
    expect(await readFile(path.join(buildDir, LIGHT_OUTPUT_FILE), 'utf8')).toBe(
      previousLight,
    );
    expect(await listLeftoverDirs()).toEqual([]);
  });

  it('clears stale files in the build dir before each run', async () => {
    await setUpFixture();
    expect((await build()).code).toBe(0);
    await writeFile(
      path.join(buildDir, 'old-stale.css'),
      '/* stale */',
      'utf8',
    );

    expect((await build()).code).toBe(0);
    expect((await readdir(buildDir)).sort()).toEqual(
      [LIGHT_OUTPUT_FILE, DARK_OUTPUT_FILE, PRIMITIVES_OUTPUT_FILE].sort(),
    );
  });
});
