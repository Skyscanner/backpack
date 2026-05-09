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

import { access, mkdir, readdir, readFile, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import StyleDictionary from 'style-dictionary';
import { transforms as sdTransforms } from 'style-dictionary/enums';

import { assertSafeOutputDir } from './dtcg-writer';
import {
  BACKPACK_DARK_FILE,
  BACKPACK_LIGHT_FILE,
  PRIMITIVES_FILE,
  buildStyleDictionaryConfigs,
  findAsymmetricSemanticTokens,
  findCssNameCollisions,
  findInvalidDimensions,
  formatAsymmetricSemanticTokens,
  formatCssNameCollisions,
  formatDimensionViolations,
  kebabBpkName,
} from './style-dictionary-config';

import type {
  CssNameCollision,
  DimensionViolation,
} from './style-dictionary-config';

// Drops the leading `Component` group so `Component.Badge.Colour.bg-default`
// emits as `--bpk-badge-…` not `--bpk-component-badge-…`.
// SD's registry is module-scoped, so re-importing is safe.
const BPK_NAME_TRANSFORM = 'name/bpk-kebab';
StyleDictionary.registerTransform({
  name: BPK_NAME_TRANSFORM,
  type: 'name',
  transform: (token, config) =>
    kebabBpkName(
      token.path,
      typeof config?.prefix === 'string' ? config.prefix : undefined,
    ),
});

// Take SD's default `css` transform group and swap `size/rem` → `size/pxToRem`
// and `name/kebab` → our `name/bpk-kebab`.
export function buildCssTransforms(): readonly string[] {
  const cssGroup = StyleDictionary.hooks.transformGroups?.css;
  if (!cssGroup) {
    throw new Error(
      'Style Dictionary "css" transform group is not registered. ' +
        'Has the package been initialized correctly?',
    );
  }
  const swapped = cssGroup.map((name) => {
    if (name === sdTransforms.sizeRem) return sdTransforms.sizePxToRem;
    if (name === sdTransforms.nameKebab) return BPK_NAME_TRANSFORM;
    return name;
  });
  if (!swapped.includes(sdTransforms.sizePxToRem)) {
    throw new Error(
      `Expected "${sdTransforms.sizePxToRem}" in the css transform list ` +
        `after swapping "${sdTransforms.sizeRem}". The default css transform ` +
        `group has changed (or no longer contains "${sdTransforms.sizeRem}"); ` +
        `update build-css.ts to match the new SD version.`,
    );
  }
  if (!swapped.includes(BPK_NAME_TRANSFORM)) {
    throw new Error(
      `Expected "${BPK_NAME_TRANSFORM}" in the css transform list after ` +
        `swapping "${sdTransforms.nameKebab}". The default css transform group ` +
        `has changed (or no longer contains "${sdTransforms.nameKebab}"); ` +
        `update build-css.ts to match the new SD version.`,
    );
  }
  return swapped;
}

export interface BuildCSSOptions {
  // Directory containing the Stage 1 DTCG output (`primitives.json`,
  // `backpack.light.json`, `backpack.dark.json`). Must be absolute.
  tokensDir: string;
  // Where to write the per-mode CSS files. Must be absolute. Cleaned before
  // each run so stale files from prior builds don't linger.
  buildDir: string;
}

export interface BuildCSSResult {
  // Absolute paths of CSS files written, in the order builds ran.
  outputs: string[];
}

async function discoverSemanticFiles(tokensDir: string): Promise<string[]> {
  const entries = await readdir(tokensDir);
  return entries.filter((f) => f.startsWith('backpack.') && f.endsWith('.json')).sort();
}

// Verify primitives + at least one semantic token file exists before SD runs.
// Semantic token files (backpack.*.json) are auto-discovered, so new themes
// require no code changes — just add the file via Stage 1 sync.
async function assertInputsExist(tokensDir: string): Promise<void> {
  const missing: string[] = [];
  const primitivesPath = path.join(tokensDir, PRIMITIVES_FILE);
  try {
    await access(primitivesPath);
  } catch {
    missing.push(primitivesPath);
  }

  let semanticFiles: string[] = [];
  try {
    semanticFiles = await discoverSemanticFiles(tokensDir);
  } catch {
    // readdir fails if tokensDir doesn't exist; let the primitives check surface it.
  }

  if (missing.length > 0 || semanticFiles.length === 0) {
    const allMissing = [...missing];
    if (semanticFiles.length === 0) {
      allMissing.push(path.join(tokensDir, BACKPACK_LIGHT_FILE));
      allMissing.push(path.join(tokensDir, BACKPACK_DARK_FILE));
    }
    throw new Error(
      `Missing Stage 1 DTCG file(s):\n  ${allMissing.join(
        '\n  ',
      )}\nRun \`npm run tokens:fetch\` to (re)generate them before building CSS.`,
    );
  }
}

// Run all Stage 2 structural checks (dimension units, CSS name collisions,
// semantic token symmetry) off a single parse.
// Returns the discovered semantic file names for later use in SD config building.
async function assertInputsAreBuildable(
  tokensDir: string,
): Promise<{ semanticFileNames: string[] }> {
  const semanticFileNames = await discoverSemanticFiles(tokensDir);

  const fileNames = [PRIMITIVES_FILE, ...semanticFileNames];
  const parsedFiles = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(tokensDir, fileName);
      const raw = await readFile(filePath, 'utf8');
      try {
        return { filePath, tree: JSON.parse(raw) as unknown };
      } catch (error) {
        throw new Error(
          `Failed to parse ${filePath} as JSON: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }),
  );

  const dimensionViolations: DimensionViolation[] = [];
  const collisionsByFile: Array<{
    filePath: string;
    collisions: CssNameCollision[];
  }> = [];
  for (const { filePath, tree } of parsedFiles) {
    dimensionViolations.push(...findInvalidDimensions(tree, filePath));
    const collisions = findCssNameCollisions(tree);
    if (collisions.length > 0) {
      collisionsByFile.push({ filePath, collisions });
    }
  }

  if (dimensionViolations.length > 0) {
    throw new Error(formatDimensionViolations(dimensionViolations));
  }
  if (collisionsByFile.length > 0) {
    throw new Error(formatCssNameCollisions(collisionsByFile));
  }

  // Symmetry check against a fixed reference theme: every other semantic file
  // must declare the same token paths as the reference. Light is the canonical
  // baseline (it's the `:root` theme; other themes layer on top via attribute
  // selectors). Falls back to the first file alphabetically if Light is absent
  // — keeps the check working for downstream forks that ship without Light.
  const semanticParsed = parsedFiles.filter(
    ({ filePath }) => !filePath.endsWith(PRIMITIVES_FILE),
  );
  const referenceFile =
    semanticParsed.find(
      ({ filePath }) => path.basename(filePath) === BACKPACK_LIGHT_FILE,
    ) ?? semanticParsed[0];
  const referenceName = path.basename(referenceFile.filePath);
  for (const candidate of semanticParsed) {
    if (candidate === referenceFile) continue; // eslint-disable-line no-continue
    const asymmetry = findAsymmetricSemanticTokens(
      referenceFile.tree,
      candidate.tree,
    );
    if (
      asymmetry.onlyInFirst.length > 0 ||
      asymmetry.onlyInSecond.length > 0
    ) {
      throw new Error(
        formatAsymmetricSemanticTokens(
          asymmetry,
          referenceName,
          path.basename(candidate.filePath),
        ),
      );
    }
  }

  return { semanticFileNames };
}

// Run the SD builds for all discovered semantic token themes (light, dark, etc).
// No logging / no process.exit — the CLI wrapper (build-css-cli.ts) handles presentation.
export async function runBuildCSS({
  buildDir,
  tokensDir,
}: BuildCSSOptions): Promise<BuildCSSResult> {
  // Absolute paths only — CWD can change mid-run (e.g. SD's config loading),
  // which would break the staging/atomic-swap dance.
  if (!path.isAbsolute(tokensDir)) {
    throw new Error(`tokensDir must be absolute, got "${tokensDir}".`);
  }
  if (!path.isAbsolute(buildDir)) {
    throw new Error(`buildDir must be absolute, got "${buildDir}".`);
  }

  assertSafeOutputDir(buildDir);

  await assertInputsExist(tokensDir);
  const { semanticFileNames } = await assertInputsAreBuildable(tokensDir);

  const resolvedBuildDir = path.resolve(buildDir);
  const stagingDir = `${resolvedBuildDir}.staging-${process.pid}-${Date.now()}`;
  const backupDir = `${resolvedBuildDir}.backup-${process.pid}-${Date.now()}`;
  assertSafeOutputDir(stagingDir);
  assertSafeOutputDir(backupDir);

  const cssTransforms = buildCssTransforms();
  const configs = buildStyleDictionaryConfigs({
    tokensDir,
    buildDir: stagingDir,
    cssTransforms,
    semanticFileNames,
  });
  const outputs: string[] = [];

  try {
    await rm(stagingDir, { force: true, recursive: true });
    await mkdir(stagingDir, { recursive: true });

    // Sequential builds: serialises awaits without tripping no-await-in-loop.
    await configs.reduce<Promise<void>>(async (prev, { config }) => {
      await prev;
      const sd = new StyleDictionary(config);
      await sd.buildAllPlatforms();
      const filesForPlatform = config.platforms?.css?.files ?? [];
      for (const file of filesForPlatform) {
        if (file.destination) {
          outputs.push(path.join(resolvedBuildDir, file.destination));
        }
      }
    }, Promise.resolve());

    // Swap staging into place: backup → swap → cleanup, with rollback on
    // a failed swap.
    let backupCreated = false;
    try {
      await rename(resolvedBuildDir, backupDir);
      backupCreated = true;
    } catch (error: unknown) {
      // First run — resolvedBuildDir doesn't exist yet; any other code is real.
      if ((error as Error & { code?: string }).code !== 'ENOENT') throw error;
    }

    try {
      await rename(stagingDir, resolvedBuildDir);
    } catch (renameError) {
      if (backupCreated) {
        // If restore also fails, surface the original error and leave both
        // dirs on disk for manual recovery.
        await rename(backupDir, resolvedBuildDir).catch(() => {});
      }
      throw renameError;
    }

    if (backupCreated) {
      await rm(backupDir, { force: true, recursive: true });
    }
  } catch (error) {
    await rm(stagingDir, { force: true, recursive: true });
    throw error;
  }

  return { outputs };
}
