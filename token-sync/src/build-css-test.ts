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
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
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
} from './style-dictionary-config';

// We invoke the CLI via tsx in a child process rather than calling
// runBuildCSS() directly. Style Dictionary v5 ships ESM-only and pulls in a
// chain of ESM-only deps (chalk, change-case, path-unified, …) that would
// otherwise force the whole jest suite to babel-transform every nested
// `node_modules`. Spawning keeps the contract end-to-end (env vars + exit
// code + filesystem output) and isolates SD's runtime from the test runner.

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

// Minimal DTCG fixtures covering the variable shapes Backpack emits today:
// colour primitives + alias references, dimension with `px` suffix, and a
// "shared value across modes" case expressed as the same DTCG alias on both
// sides — the symmetry check requires every semantic path to exist in both
// Light and Dark, even when the resolved value is identical.
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
  // Same alias on both sides: this is how a Backpack designer expresses
  // "two modes share a value" — symmetry check requires the path to exist
  // in both files, but the underlying primitive can be the same.
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

async function setUpFixture(): Promise<{
  tokensDir: string;
  buildDir: string;
  cleanup: () => Promise<void>;
}> {
  const root = await mkdtemp(path.join(os.tmpdir(), 'bpk-build-css-'));
  const tokensDir = path.join(root, 'tokens');
  const buildDir = path.join(tokensDir, 'css');
  await mkdir(tokensDir, { recursive: true });
  await writeFile(
    path.join(tokensDir, PRIMITIVES_FILE),
    JSON.stringify(PRIMITIVES, null, 2),
    'utf8',
  );
  await writeFile(
    path.join(tokensDir, BACKPACK_LIGHT_FILE),
    JSON.stringify(BACKPACK_LIGHT, null, 2),
    'utf8',
  );
  await writeFile(
    path.join(tokensDir, BACKPACK_DARK_FILE),
    JSON.stringify(BACKPACK_DARK, null, 2),
    'utf8',
  );
  return {
    tokensDir,
    buildDir,
    cleanup: () => rm(root, { force: true, recursive: true }),
  };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

describe('build-css CLI', () => {
  // ESM module graph init via tsx is slow on cold start; give each spawn
  // headroom so flaky CI runs don't trip us up.
  jest.setTimeout(60_000);

  it('reports every missing DTCG input and exits non-zero', async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'bpk-build-css-empty-'));
    try {
      const tokensDir = path.join(root, 'tokens');
      await mkdir(tokensDir, { recursive: true });
      await writeFile(
        path.join(tokensDir, PRIMITIVES_FILE),
        JSON.stringify(PRIMITIVES),
        'utf8',
      );
      const result = await runCli({
        DTCG_OUTPUT_DIR: tokensDir,
        CSS_OUTPUT_DIR: path.join(root, 'css'),
      });
      expect(result.code).not.toBe(0);
      expect(result.stderr).toMatch(/Missing Stage 1 DTCG file/);
      expect(result.stderr).toMatch(BACKPACK_LIGHT_FILE);
      expect(result.stderr).toMatch(BACKPACK_DARK_FILE);
    } finally {
      await rm(root, { force: true, recursive: true });
    }
  });

  it('refuses to build to filesystem root', async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'bpk-build-css-root-'));
    try {
      const result = await runCli({
        DTCG_OUTPUT_DIR: root,
        CSS_OUTPUT_DIR: '/',
      });
      expect(result.code).not.toBe(0);
      expect(result.stderr).toMatch(/Refusing to use filesystem root/);
    } finally {
      await rm(root, { force: true, recursive: true });
    }
  });

  it('emits one CSS file per mode with the spec selector and prefix', async () => {
    const { buildDir, cleanup, tokensDir } = await setUpFixture();
    try {
      const result = await runCli({
        DTCG_OUTPUT_DIR: tokensDir,
        CSS_OUTPUT_DIR: buildDir,
      });
      expect(result.code).toBe(0);

      const light = await readFile(path.join(buildDir, LIGHT_OUTPUT_FILE), 'utf8');
      const dark = await readFile(path.join(buildDir, DARK_OUTPUT_FILE), 'utf8');

      expect(light).toMatch(new RegExp(`${escapeRegExp(LIGHT_SELECTOR)} \\{`));
      expect(dark).toMatch(new RegExp(`${escapeRegExp(DARK_SELECTOR)} \\{`));

      // Aliases inline to the primitive literal — we don't preserve `var()`
      // references, since light and dark live in separate stylesheets and the
      // primitive variables are not emitted there.
      expect(light).toMatch(/--bpk-canvas-default:\s*#ff66b3/);
      expect(dark).toMatch(/--bpk-canvas-default:\s*#cc0066/);

      // 16px → 1rem via size/pxToRem and the bpk prefix is applied to the
      // kebab-cased token path. The leading `Component` group is stripped
      // so the variable name is `--bpk-button-…`, not `--bpk-component-…`.
      expect(light).toMatch(/--bpk-button-dimension-padding-h:\s*1rem/);
      expect(light).not.toMatch(/--bpk-component-/);
      expect(dark).not.toMatch(/--bpk-component-/);

      // Symmetry rule: Surface.Highlight is declared in both files (with
      // the same alias), so both stylesheets emit the variable. The shared
      // value comes from the alias resolving to the same primitive.
      expect(light).toMatch(/--bpk-surface-highlight:\s*#ff66b3/);
      expect(dark).toMatch(/--bpk-surface-highlight:\s*#ff66b3/);

      // Primitives must NOT leak into the per-mode CSS.
      expect(light).not.toMatch(/--bpk-colour-pink/);
      expect(dark).not.toMatch(/--bpk-colour-berry/);
    } finally {
      await cleanup();
    }
  });

  it('rejects when a semantic token is defined on Light but missing on Dark', async () => {
    const { buildDir, cleanup, tokensDir } = await setUpFixture();
    try {
      // Strip Surface.Highlight from Dark so it's Light-only.
      const darkWithoutSurface = {
        ...BACKPACK_DARK,
      };
      delete (darkWithoutSurface as { Surface?: unknown }).Surface;
      await writeFile(
        path.join(tokensDir, BACKPACK_DARK_FILE),
        JSON.stringify(darkWithoutSurface, null, 2),
        'utf8',
      );

      const result = await runCli({
        DTCG_OUTPUT_DIR: tokensDir,
        CSS_OUTPUT_DIR: buildDir,
      });
      expect(result.code).not.toBe(0);
      expect(result.stderr).toMatch(/semantic token\(s\) defined in only one of/);
      expect(result.stderr).toMatch(
        new RegExp(`Missing in ${escapeRegExp(BACKPACK_DARK_FILE)}`),
      );
      expect(result.stderr).toContain('Surface.Highlight');
    } finally {
      await cleanup();
    }
  });

  it('rejects when a semantic token is defined on Dark but missing on Light', async () => {
    const { buildDir, cleanup, tokensDir } = await setUpFixture();
    try {
      const lightWithoutSurface = {
        ...BACKPACK_LIGHT,
      };
      delete (lightWithoutSurface as { Surface?: unknown }).Surface;
      await writeFile(
        path.join(tokensDir, BACKPACK_LIGHT_FILE),
        JSON.stringify(lightWithoutSurface, null, 2),
        'utf8',
      );

      const result = await runCli({
        DTCG_OUTPUT_DIR: tokensDir,
        CSS_OUTPUT_DIR: buildDir,
      });
      expect(result.code).not.toBe(0);
      expect(result.stderr).toMatch(/semantic token\(s\) defined in only one of/);
      expect(result.stderr).toMatch(
        new RegExp(`Missing in ${escapeRegExp(BACKPACK_LIGHT_FILE)}`),
      );
      expect(result.stderr).toContain('Surface.Highlight');
    } finally {
      await cleanup();
    }
  });

  it('rejects DTCG inputs whose tokens collide on CSS name after Component stripping', async () => {
    // Reproduce the failure mode: someone adds a top-level `Button` group
    // alongside the existing `Component.Button` namespace. After stripping,
    // both produce the same `--bpk-button-…` variable. The build must
    // refuse rather than emit one of them silently.
    const { buildDir, cleanup, tokensDir } = await setUpFixture();
    try {
      const colliding = {
        ...BACKPACK_LIGHT,
        // Top-level `Button` clashes with `Component.Button` already in the
        // fixture once `Component` is stripped.
        Button: {
          Dimension: {
            $type: 'dimension',
            'padding-h': { $value: '8px' },
          },
        },
      };
      await writeFile(
        path.join(tokensDir, BACKPACK_LIGHT_FILE),
        JSON.stringify(colliding, null, 2),
        'utf8',
      );

      const result = await runCli({
        DTCG_OUTPUT_DIR: tokensDir,
        CSS_OUTPUT_DIR: buildDir,
      });
      expect(result.code).not.toBe(0);
      expect(result.stderr).toMatch(/CSS variable name collision/);
      expect(result.stderr).toContain('--bpk-button-dimension-padding-h');
      // Both source paths should be cited so the designer can find them.
      expect(result.stderr).toContain('Button.Dimension.padding-h');
      expect(result.stderr).toContain('Component.Button.Dimension.padding-h');
    } finally {
      await cleanup();
    }
  });

  it('rejects DTCG inputs containing non-px dimension values', async () => {
    // Stage 1 today only emits px, but a manual edit, a future Figma change
    // or a third-party token feed could introduce other units. The CLI must
    // refuse instead of letting size/pxToRem mishandle them silently.
    const { buildDir, cleanup, tokensDir } = await setUpFixture();
    try {
      const badDark = {
        ...BACKPACK_DARK,
        Component: {
          Button: {
            Dimension: {
              $type: 'dimension',
              // Two violations on purpose: assert the message lists both,
              // not just the first.
              'padding-h': { $value: '16em' },
              'gap-pct': { $value: '50%' },
            },
          },
        },
      };
      await writeFile(
        path.join(tokensDir, BACKPACK_DARK_FILE),
        JSON.stringify(badDark, null, 2),
        'utf8',
      );

      const result = await runCli({
        DTCG_OUTPUT_DIR: tokensDir,
        CSS_OUTPUT_DIR: buildDir,
      });
      expect(result.code).not.toBe(0);
      expect(result.stderr).toMatch(/Found 2 dimension token\(s\)/);
      expect(result.stderr).toContain('"16em"');
      expect(result.stderr).toContain('"50%"');
      expect(result.stderr).toContain(BACKPACK_DARK_FILE);
      // The bad input must short-circuit before SD writes anything — no
      // half-built CSS lying around for the next run to confuse a debugger.
      const lightPath = path.join(buildDir, LIGHT_OUTPUT_FILE);
      const darkPath = path.join(buildDir, DARK_OUTPUT_FILE);
      await expect(readFile(lightPath, 'utf8')).rejects.toThrow();
      await expect(readFile(darkPath, 'utf8')).rejects.toThrow();
    } finally {
      await cleanup();
    }
  });

  it('leaves the previous build dir intact and cleans up staging when the build fails', async () => {
    const { buildDir, cleanup, tokensDir } = await setUpFixture();
    try {
      // Seed buildDir with a previous successful run.
      const first = await runCli({
        DTCG_OUTPUT_DIR: tokensDir,
        CSS_OUTPUT_DIR: buildDir,
      });
      expect(first.code).toBe(0);
      const previousLight = await readFile(path.join(buildDir, LIGHT_OUTPUT_FILE), 'utf8');
      const before = (await readdir(buildDir)).sort();

      // Introduce asymmetric tokens so the second run aborts before SD writes.
      const darkWithoutSurface = { ...BACKPACK_DARK };
      delete (darkWithoutSurface as { Surface?: unknown }).Surface;
      await writeFile(
        path.join(tokensDir, BACKPACK_DARK_FILE),
        JSON.stringify(darkWithoutSurface, null, 2),
        'utf8',
      );

      const second = await runCli({
        DTCG_OUTPUT_DIR: tokensDir,
        CSS_OUTPUT_DIR: buildDir,
      });
      expect(second.code).not.toBe(0);

      // buildDir is byte-identical to the previous successful run.
      const after = (await readdir(buildDir)).sort();
      expect(after).toEqual(before);
      expect(await readFile(path.join(buildDir, LIGHT_OUTPUT_FILE), 'utf8')).toBe(previousLight);

      // No staging or backup dirs left alongside buildDir.
      const parentEntries = await readdir(path.dirname(buildDir));
      const base = path.basename(buildDir);
      expect(parentEntries.filter((e) => e.startsWith(`${base}.staging-`))).toEqual([]);
      expect(parentEntries.filter((e) => e.startsWith(`${base}.backup-`))).toEqual([]);
    } finally {
      await cleanup();
    }
  });

  it('creates and removes a backup dir when swapping in a new build over an existing one', async () => {
    const { buildDir, cleanup, tokensDir } = await setUpFixture();
    try {
      // Seed buildDir with a first successful run.
      const first = await runCli({
        DTCG_OUTPUT_DIR: tokensDir,
        CSS_OUTPUT_DIR: buildDir,
      });
      expect(first.code).toBe(0);
      const firstLight = await readFile(path.join(buildDir, LIGHT_OUTPUT_FILE), 'utf8');

      // Second run with valid inputs — should succeed and swap in fresh output.
      const second = await runCli({
        DTCG_OUTPUT_DIR: tokensDir,
        CSS_OUTPUT_DIR: buildDir,
      });
      expect(second.code).toBe(0);
      // Output is regenerated correctly.
      expect(await readFile(path.join(buildDir, LIGHT_OUTPUT_FILE), 'utf8')).toBe(firstLight);

      // Neither staging nor backup dirs must linger alongside buildDir.
      const parentEntries = await readdir(path.dirname(buildDir));
      const base = path.basename(buildDir);
      expect(parentEntries.filter((e) => e.startsWith(`${base}.staging-`))).toEqual([]);
      expect(parentEntries.filter((e) => e.startsWith(`${base}.backup-`))).toEqual([]);
    } finally {
      await cleanup();
    }
  });

  it('clears stale files in the build dir before each run', async () => {
    const { buildDir, cleanup, tokensDir } = await setUpFixture();
    try {
      // First run, then drop a stale file alongside the outputs.
      const first = await runCli({
        DTCG_OUTPUT_DIR: tokensDir,
        CSS_OUTPUT_DIR: buildDir,
      });
      expect(first.code).toBe(0);
      await writeFile(path.join(buildDir, 'old-stale.css'), '/* stale */', 'utf8');

      const second = await runCli({
        DTCG_OUTPUT_DIR: tokensDir,
        CSS_OUTPUT_DIR: buildDir,
      });
      expect(second.code).toBe(0);
      const entries = await readdir(buildDir);
      expect(entries.sort()).toEqual([LIGHT_OUTPUT_FILE, DARK_OUTPUT_FILE].sort());
    } finally {
      await cleanup();
    }
  });
});
