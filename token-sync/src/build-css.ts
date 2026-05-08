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

import { access, mkdir, readFile, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import StyleDictionary from 'style-dictionary';
import { transforms as sdTransforms } from 'style-dictionary/enums';

import { assertSafeOutputDir } from './dtcg-writer';
import {
  BACKPACK_DARK_FILE,
  BACKPACK_LIGHT_FILE,
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

// Custom name transform: drops the leading `Component` group from the path
// so `Component.Badge.Colour.bg-default` emits as `--bpk-badge-colour-bg-default`
// instead of `--bpk-component-badge-colour-bg-default`. The Component prefix
// comes from Figma's organisational hierarchy and carries no information
// downstream consumers need.
//
// Registered once at module load. SD's registry is a module-scoped singleton
// so re-importing this file (e.g. across jest workers) is safe — the same
// name is overwritten with the same implementation.
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

// Take the default `css` transform group from the running SD version and
// swap `size/rem` for `size/pxToRem` so dimension values like `"16px"` emit
// as `1rem` instead of `16rem`. Reading from SD at runtime — instead of
// hard-coding the list — means we automatically pick up any transforms SD
// adds to the group in future versions, and rely on the typed enum
// (`sdTransforms.sizeRem`) so a SD rename surfaces at compile time rather
// than silently failing the swap.
//
// Exposed for unit testing. Asserts the swap actually happened so a SD
// upgrade that drops `size/rem` from the group can't pass through unnoticed.
export function buildCssTransforms(): readonly string[] {
  const cssGroup = StyleDictionary.hooks.transformGroups.css;
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

// Verify each Stage 1 file is present on disk. SD would otherwise throw a
// less actionable error mid-build. Doing it up-front lets us point the user
// at the exact missing file and the `npm run sync` command that creates them.
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
  if (missing.length > 0) {
    throw new Error(
      `Missing Stage 1 DTCG file(s):\n  ${missing.join(
        '\n  ',
      )}\nRun \`npm run sync\` to (re)generate them before building CSS.`,
    );
  }
}

// Parse every input file once and run all the structural checks Stage 2
// cares about: dimension values must be `Xpx` (or a DTCG alias) so the
// px→rem transform can handle them, and no two tokens may collapse to the
// same CSS variable name after `Component` stripping. Doing both walks off
// a single parse keeps the I/O cost down and lets a bad input file surface
// every issue it has at once instead of one per build attempt.
async function assertInputsAreBuildable(tokensDir: string): Promise<void> {
  const parsedFiles = await Promise.all(
    REQUIRED_INPUT_FILES.map(async (fileName) => {
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

  // Surface dimension issues first — they're more common and likely to be
  // the real source of any name collisions (e.g. a typo also restructuring
  // the tree). Throwing here aborts the build before SD touches the buildDir.
  if (dimensionViolations.length > 0) {
    throw new Error(formatDimensionViolations(dimensionViolations));
  }
  if (collisionsByFile.length > 0) {
    throw new Error(formatCssNameCollisions(collisionsByFile));
  }

  // Light / Dark must declare the same set of semantic token paths. A token
  // present in only one mode would either silently inherit the other mode's
  // value via CSS cascade (Light-only) or fail open with `unset` in default
  // mode (Dark-only) — both indistinguishable from "designer forgot to
  // define the other side", so we refuse to build either way.
  const lightParsed = parsedFiles.find(
    (parsed) => path.basename(parsed.filePath) === BACKPACK_LIGHT_FILE,
  );
  const darkParsed = parsedFiles.find(
    (parsed) => path.basename(parsed.filePath) === BACKPACK_DARK_FILE,
  );
  // Both files are guaranteed to exist by `assertInputsExist` — guard
  // anyway so a future refactor of REQUIRED_INPUT_FILES doesn't break this
  // check silently.
  if (lightParsed && darkParsed) {
    const asymmetry = findAsymmetricSemanticTokens(
      lightParsed.tree,
      darkParsed.tree,
    );
    if (asymmetry.lightOnly.length > 0 || asymmetry.darkOnly.length > 0) {
      throw new Error(formatAsymmetricSemanticTokens(asymmetry));
    }
  }
}

// Run the light + dark Style Dictionary builds. Returns the absolute paths of
// the generated CSS files. The function is intentionally side-effect-light
// outside the file system: no logging, no process.exit. The CLI wrapper in
// `index-css.ts` (or wherever it ends up) is in charge of presentation.
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

  // Reuse the same safety net as Stage 1: refuses fs root, $HOME, cwd, and
  // ancestors of cwd. Cheap insurance against an environment variable typo.
  assertSafeOutputDir(buildDir);

  await assertInputsExist(tokensDir);
  await assertInputsAreBuildable(tokensDir);

  // Stage in a sibling directory so any SD failure leaves the existing
  // `buildDir` (committed to git) untouched. The rename at the end is the
  // only step that mutates `buildDir`.
  const stagingDir = `${buildDir}.staging-${process.pid}-${Date.now()}`;
  assertSafeOutputDir(stagingDir);

  const cssTransforms = buildCssTransforms();
  const configs = buildStyleDictionaryConfigs({
    tokensDir,
    buildDir: stagingDir,
    cssTransforms,
  });
  const outputs: string[] = [];

  try {
    await rm(stagingDir, { force: true, recursive: true });
    await mkdir(stagingDir, { recursive: true });

    // Run sequentially: SD's `buildAllPlatforms` mutates internal state on the
    // instance, and parallelism here would offer no measurable speedup for two
    // small theme builds while making any failure logs interleave. Reduce
    // serializes the awaits without tripping the no-await-in-loop rule.
    await configs.reduce<Promise<void>>(async (prev, { config }) => {
      await prev;
      const sd = new StyleDictionary(config);
      await sd.buildAllPlatforms();
      const filesForPlatform = config.platforms?.css?.files ?? [];
      for (const file of filesForPlatform) {
        if (file.destination) {
          outputs.push(path.join(buildDir, file.destination));
        }
      }
    }, Promise.resolve());

    await rm(buildDir, { force: true, recursive: true });
    await rename(stagingDir, buildDir);
  } catch (error) {
    await rm(stagingDir, { force: true, recursive: true });
    throw error;
  }

  return { outputs };
}
