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
  BACKPACK_LIGHT_FILE,
  BPK_FILE_HEADER,
  PRIMITIVES_FILE,
  buildStyleDictionaryConfigs,
  findAsymmetricSemanticTokens,
  findCrossFileCssNameCollisions,
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

// Apache 2.0 license + auto-generated marker. Required by dangerfile's
// shouldContainLicensingInformation check on every new file under the repo.
StyleDictionary.registerFileHeader({
  name: BPK_FILE_HEADER,
  fileHeader: () => [
    "Backpack - Skyscanner's Design System",
    '',
    'Copyright 2016 Skyscanner Ltd',
    '',
    'Licensed under the Apache License, Version 2.0 (the "License");',
    'you may not use this file except in compliance with the License.',
    'You may obtain a copy of the License at',
    '',
    '  http://www.apache.org/licenses/LICENSE-2.0',
    '',
    'Unless required by applicable law or agreed to in writing, software',
    'distributed under the License is distributed on an "AS IS" BASIS,',
    'WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.',
    'See the License for the specific language governing permissions and',
    'limitations under the License.',
    '',
    'Do not edit directly, this file was auto-generated.',
  ],
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

// Verify primitives + the default semantic theme (Light) exist before SD runs.
// Light is the default theme (emitted under `:root`) and is required — without
// it, consumers who don't set `[data-theme="…"]` would get no token values at
// all. Any additional themes (Dark, Sepia, …) are auto-discovered via the
// `backpack.*.json` glob and layer on top via `[data-theme="<mode>"]`
// selectors — no code changes needed to add one.
async function assertInputsExist(tokensDir: string): Promise<void> {
  const missing: string[] = [];
  await Promise.all(
    [PRIMITIVES_FILE, BACKPACK_LIGHT_FILE].map(async (file) => {
      const filePath = path.join(tokensDir, file);
      try {
        await access(filePath);
      } catch {
        missing.push(filePath);
      }
    }),
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing Stage 1 DTCG file(s):\n  ${missing.join(
        '\n  ',
      )}\nRun \`pnpm run tokens:fetch\` to (re)generate them before building CSS.`,
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

  // Check primitives vs Light for cross-file CSS name collisions (both emit to :root).
  // Comparing against Light alone is sufficient — all themes share the same paths.
  const lightFile = parsedFiles.find(
    ({ filePath }) => path.basename(filePath) === BACKPACK_LIGHT_FILE,
  );
  const primitivesFile = parsedFiles.find(
    ({ filePath }) => path.basename(filePath) === PRIMITIVES_FILE,
  );
  if (lightFile && primitivesFile) {
    const crossCollisions = findCrossFileCssNameCollisions([
      primitivesFile,
      lightFile,
    ]);
    if (crossCollisions.length > 0) {
      throw new Error(
        formatCssNameCollisions([
          {
            filePath: `${path.basename(primitivesFile.filePath)} ↔ ${path.basename(lightFile.filePath)}`,
            collisions: crossCollisions,
          },
        ]),
      );
    }
  }

  // Symmetry check against Light (the default theme): every additional
  // semantic file must declare the same token paths as Light. With only Light
  // present this loop is a no-op. Light is guaranteed by `assertInputsExist`
  // above, so `.find` always resolves.
  const semanticParsed = parsedFiles.filter(
    ({ filePath }) => !filePath.endsWith(PRIMITIVES_FILE),
  );
  const referenceFile = semanticParsed.find(
    ({ filePath }) => path.basename(filePath) === BACKPACK_LIGHT_FILE,
  );
  if (!referenceFile) {
    throw new Error(
      `Expected ${BACKPACK_LIGHT_FILE} to be present after input check.`,
    );
  }
  const referenceName = path.basename(referenceFile.filePath);
  for (const candidate of semanticParsed.filter((c) => c !== referenceFile)) {
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
  } catch (error) {
    // SD build failed before any rename — staging is half-built junk.
    await rm(stagingDir, { force: true, recursive: true });
    throw error;
  }

  // Atomic swap: move buildDir aside (backup), promote staging to buildDir,
  // then drop the backup. Each rename failure path cleans up its own mess so
  // we never leak orphaned `.staging-*` / `.backup-*` dirs.
  // Note: between the two renames, `buildDir` briefly does not exist on disk.
  // Fine for offline CSS builds; not safe for live-served paths. Keep the
  // two-step swap so non-empty directory replacement stays portable (POSIX
  // `rename` cannot atomically overwrite a non-empty directory cross-platform).
  let backupCreated = false;
  try {
    await rename(resolvedBuildDir, backupDir);
    backupCreated = true;
  } catch (error: unknown) {
    // ENOENT just means first run (no prior buildDir); anything else is real.
    if ((error as Error & { code?: string }).code !== 'ENOENT') {
      await rm(stagingDir, { force: true, recursive: true });
      throw error;
    }
  }

  try {
    await rename(stagingDir, resolvedBuildDir);
  } catch (renameError) {
    // First run + swap fails: no backup to restore, just drop staging.
    if (!backupCreated) {
      await rm(stagingDir, { force: true, recursive: true });
      throw renameError;
    }
    try {
      // Swap failed but we still have the backup — put it back.
      await rename(backupDir, resolvedBuildDir);
    } catch {
      // Catastrophic: swap AND rollback both failed. Leave staging + backup
      // on disk so the operator can recover one of them by hand.
      throw renameError;
    }
    // Rollback succeeded: previous build is restored, staging is now stale.
    await rm(stagingDir, { force: true, recursive: true });
    throw renameError;
  }

  // Swap succeeded: previous build (now in backupDir) is no longer needed.
  if (backupCreated) {
    await rm(backupDir, { force: true, recursive: true });
  }

  return { outputs };
}
