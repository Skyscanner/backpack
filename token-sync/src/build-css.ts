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
  REQUIRED_INPUT_FILES,
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

// Verify primitives + at least one semantic token file exists before SD runs.
// Semantic token files (backpack.*.json) are auto-discovered, so new themes
// require no code changes — just add the file via Stage 1 sync.
async function assertInputsExist(tokensDir: string): Promise<void> {
  const missing: string[] = [];
  await Promise.all(
    REQUIRED_INPUT_FILES.map(async (fileName) => {
      const filePath = path.join(tokensDir, fileName);
      try {
        await access(filePath);
      } catch {
        missing.push(filePath);
      }
    }),
  );

  let semanticFiles: string[] = [];
  try {
    const entries = await readdir(tokensDir);
    semanticFiles = entries.filter((f) => f.startsWith('backpack.') && f.endsWith('.json'));
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
// semantic token symmetry) off a single parse. Returns the discovered semantic
// file names for later use in SD config building.
async function assertInputsAreBuildable(
  tokensDir: string,
): Promise<{ semanticFileNames: string[] }> {
  const entries = await readdir(tokensDir);
  const semanticFileNames = entries
    .filter((f) => f.startsWith('backpack.') && f.endsWith('.json'))
    .sort();

  const fileNames = [...REQUIRED_INPUT_FILES, ...semanticFileNames];
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
    const collisions = findCssNameCollisions(tree, filePath);
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

  // All semantic token files must declare the same set of semantic token paths.
  const semanticParsed = parsedFiles.filter(
    ({ filePath }) => !filePath.endsWith(PRIMITIVES_FILE),
  );
  for (let i = 0; i < semanticParsed.length - 1; i += 1) {
    const file1 = semanticParsed[i];
    const file2 = semanticParsed[i + 1];
    const asymmetry = findAsymmetricSemanticTokens(file1.tree, file2.tree);
    if (asymmetry.lightOnly.length > 0 || asymmetry.darkOnly.length > 0) {
      const name1 = path.basename(file1.filePath);
      const name2 = path.basename(file2.filePath);
      const message = formatAsymmetricSemanticTokens(asymmetry);
      throw new Error(
        message
          .replace(`Missing in ${BACKPACK_DARK_FILE}`, `Missing in ${name2}`)
          .replace(`Missing in ${BACKPACK_LIGHT_FILE}`, `Missing in ${name1}`),
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
  if (!path.isAbsolute(tokensDir)) {
    throw new Error(
      `tokensDir must be absolute, got "${tokensDir}".`,
    );
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

    // Run sequentially via reduce (avoids no-await-in-loop). See PR thread
    // on why parallelism here offers no real speedup.
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
    // a failed swap. See PR thread for the failure-mode analysis.
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
