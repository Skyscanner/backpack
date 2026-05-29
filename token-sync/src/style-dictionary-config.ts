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

import path from 'node:path';

import type { Config, TransformedToken } from 'style-dictionary/types';

// Light applies globally; Dark scopes to `data-theme="dark"` on <html>/<body>.
export const LIGHT_SELECTOR = ':root';
export const DARK_SELECTOR = ':root[data-theme="dark"]';

export const LIGHT_OUTPUT_FILE = 'theme-backpack-light.css';
export const DARK_OUTPUT_FILE = 'theme-backpack-dark.css';

// Theme-independent primitives (Spacing, Radius, …) get their own file under
// `:root` so consumers can import a single sheet without picking a theme.
// Color and Heights primitives are intentionally excluded — see
// `makeWebPrimitivesTokenFilter` for the rationale.
export const PRIMITIVES_OUTPUT_FILE = 'primitives.css';
export const PRIMITIVES_SELECTOR = ':root';

export const PRIMITIVES_FILE = 'primitives.json';
export const BACKPACK_LIGHT_FILE = 'backpack.light.json';
export const BACKPACK_DARK_FILE = 'backpack.dark.json';

// One rem = 16 px in Backpack today. Variable dimensions are emitted in px by
// the DTCG writer (e.g. `"16px"`); the `size/pxToRem` transform divides by
// this base to get a rem-friendly value.
export const BASE_PX_FONT_SIZE = 16;

// CSS prefix shared by every Backpack custom property, matching the existing
// `--bpk-*` convention on bpk-tokens / bpk-stylesheets.
export const CSS_PREFIX = 'bpk';

// Name of the SD fileHeader that emits the Apache 2.0 license + auto-generated
// notice. Registered in build-css.ts so SD's module-scoped registry picks it up
// before configs run; referenced by name from the file options below.
export const BPK_FILE_HEADER = 'bpk-license-and-generated';

// Figma's `Component` group is renamed to `private` in the CSS variable name
// to mark these tokens as component internals, not part of the public semantic
// API consumers should target.
// e.g. `Component.Badge.Colour.bg-default` → `--bpk-private-badge-colour-bg-default`.
export const COMPONENT_SEGMENT = 'component';
export const PRIVATE_SEGMENT_RENAME = 'private';

// Kebab one path segment, sanitising to `[a-z0-9-]` so designer annotations
// (parens, brackets, emoji) flow through without breaking the build.
function kebabSegment(segment: string): string {
  return segment
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Rename a leading `Component` segment to `private`, then kebab-case. `prefix`
// is prepended after the rename. The rename signals "component internal" — the
// tokens still ship in CSS, but consumers shouldn't target them as part of the
// public semantic API.
export function kebabBpkName(
  tokenPath: readonly string[],
  prefix?: string,
): string {
  const renamed =
    tokenPath.length > 0 &&
    typeof tokenPath[0] === 'string' &&
    tokenPath[0].toLowerCase() === COMPONENT_SEGMENT
      ? [PRIVATE_SEGMENT_RENAME, ...tokenPath.slice(1)]
      : tokenPath;
  const withPrefix =
    typeof prefix === 'string' && prefix.length > 0
      ? [prefix, ...renamed]
      : renamed;
  const result = withPrefix.map(kebabSegment).filter(Boolean).join('-');
  // Every segment kebabed to "" (e.g. path was all emoji or punctuation) — SD
  // would emit `--bpk-: <value>;` which browsers silently ignore. Fail loud
  // instead. `result === prefix` covers the case where only the prefix survived.
  if (!result || (typeof prefix === 'string' && result === prefix)) {
    throw new Error(
      `Token path ${tokenPath.join('.')} produced an empty CSS name after kebab-casing.`,
    );
  }
  return result;
}

export interface CssNameCollision {
  // Final kebab-cased name (without prefix) that two or more tokens share.
  name: string;
  // Dotted DTCG paths of every token that maps to `name`. Length always >= 2.
  sources: string[];
}

// Walk a DTCG tree and map every leaf token's kebab-cased CSS name back to
// the dotted DTCG paths that produce it. Multiple paths in the same tree can
// share a CSS name when casing or punctuation differences kebab to the same
// string (`Component.Badge` and `Component.badge` both → `private-badge-…`).
function collectCssNamePaths(tree: unknown): Map<string, string[]> {
  const seen = new Map<string, string[]>();

  function walk(node: unknown, pathSegments: readonly string[]): void {
    if (typeof node !== 'object' || node === null || Array.isArray(node)) {
      return;
    }
    const nodeRecord = node as Record<string, unknown>;
    if (Object.prototype.hasOwnProperty.call(nodeRecord, '$value')) {
      const cssName = kebabBpkName(pathSegments);
      const dotted = pathSegments.join('.');
      const existing = seen.get(cssName);
      if (existing) {
        existing.push(dotted);
      } else {
        seen.set(cssName, [dotted]);
      }
      return;
    }
    for (const [key, child] of Object.entries(nodeRecord)) {
      if (!key.startsWith('$')) {
        walk(child, [...pathSegments, key]);
      }
    }
  }

  walk(tree, []);
  return seen;
}

// Return every CSS name that two or more tokens collide on after `kebabBpkName`.
// e.g. casing variants under the same parent (`Component.Badge` and
// `Component.badge`) both kebab to `private-badge-…` (without the `--bpk-` prefix).
export function findCssNameCollisions(tree: unknown): CssNameCollision[] {
  const collisions: CssNameCollision[] = [];
  collectCssNamePaths(tree).forEach((sources, name) => {
    if (sources.length > 1) {
      collisions.push({ name, sources: sources.slice().sort() });
    }
  });
  return collisions;
}

// Detects CSS name collisions across files (e.g. primitives.json and backpack.light.json
// both producing `spacing-base`). Within-file collisions are handled by `findCssNameCollisions`.
export function findCrossFileCssNameCollisions(
  perFile: ReadonlyArray<{ filePath: string; tree: unknown }>,
): CssNameCollision[] {
  const acrossFiles = new Map<string, string[]>();
  for (const { filePath, tree } of perFile) {
    const fileLabel = path.basename(filePath);
    collectCssNamePaths(tree).forEach((dottedPaths, cssName) => {
      const tag = `${fileLabel}: ${dottedPaths[0]}`;
      const existing = acrossFiles.get(cssName);
      if (existing) {
        existing.push(tag);
      } else {
        acrossFiles.set(cssName, [tag]);
      }
    });
  }

  const collisions: CssNameCollision[] = [];
  acrossFiles.forEach((sources, name) => {
    if (sources.length > 1) {
      collisions.push({ name, sources: sources.slice().sort() });
    }
  });
  return collisions;
}

// Render collisions into a multi-line error message for the CLI.
export function formatCssNameCollisions(
  perFile: ReadonlyArray<{
    filePath: string;
    collisions: readonly CssNameCollision[];
  }>,
): string {
  const lines: string[] = [];
  let total = 0;
  for (const { collisions, filePath } of perFile) {
    if (collisions.length === 0) {
      // Files with no collisions don't need a heading — skip them entirely.
      continue; // eslint-disable-line no-continue
    }
    lines.push(`  ${path.basename(filePath)}:`);
    for (const collision of collisions) {
      total += 1;
      lines.push(
        `    --${CSS_PREFIX}-${collision.name} ← ${collision.sources.join(
          ' / ',
        )}`,
      );
    }
  }
  return (
    `Found ${total} CSS variable name collision(s) after renaming leading ` +
    `\`${COMPONENT_SEGMENT}\` → \`${PRIVATE_SEGMENT_RENAME}\` and kebab-casing:\n` +
    `${lines.join('\n')}\n` +
    `Two or more DTCG tokens map to the same CSS custom property. Rename ` +
    `one of the colliding sources in Figma so each path produces a unique CSS ` +
    `variable name.`
  );
}

// Walk a parsed DTCG tree and collect every leaf token's dotted path.
// `Component.Badge.Colour.bg-default` is one entry. Used by the symmetry
// check below.
function collectTokenPaths(tree: unknown): string[] {
  const paths: string[] = [];

  function walk(node: unknown, segments: readonly string[]): void {
    if (typeof node !== 'object' || node === null || Array.isArray(node)) {
      return;
    }
    const nodeRecord = node as Record<string, unknown>;
    if (Object.prototype.hasOwnProperty.call(nodeRecord, '$value')) {
      paths.push(segments.join('.'));
      return;
    }
    for (const [key, child] of Object.entries(nodeRecord)) {
      if (!key.startsWith('$')) {
        walk(child, [...segments, key]);
      }
    }
  }

  walk(tree, []);
  return paths;
}

export interface SemanticTokenAsymmetry {
  // Token paths present in the first tree but missing in the second.
  onlyInFirst: string[];
  // Token paths present in the second tree but missing in the first.
  onlyInSecond: string[];
}

// Symmetric difference of leaf token paths between two semantic token trees.
// Every semantic token must exist in every theme file.
export function findAsymmetricSemanticTokens(
  firstTree: unknown,
  secondTree: unknown,
): SemanticTokenAsymmetry {
  const firstPaths = new Set(collectTokenPaths(firstTree));
  const secondPaths = new Set(collectTokenPaths(secondTree));
  const onlyInFirst: string[] = [];
  const onlyInSecond: string[] = [];
  firstPaths.forEach((tokenPath) => {
    if (!secondPaths.has(tokenPath)) onlyInFirst.push(tokenPath);
  });
  secondPaths.forEach((tokenPath) => {
    if (!firstPaths.has(tokenPath)) onlyInSecond.push(tokenPath);
  });
  return {
    onlyInFirst: onlyInFirst.sort(),
    onlyInSecond: onlyInSecond.sort(),
  };
}

// Render the asymmetry into a multi-line CLI error message. `firstFile` and
// `secondFile` should be the base names of the files compared — they appear
// in the headings so the user knows which file to edit.
export function formatAsymmetricSemanticTokens(
  asymmetry: SemanticTokenAsymmetry,
  firstFile: string,
  secondFile: string,
): string {
  const { onlyInFirst, onlyInSecond } = asymmetry;
  const total = onlyInFirst.length + onlyInSecond.length;
  const lines: string[] = [];
  if (onlyInFirst.length > 0) {
    lines.push(`  Missing in ${secondFile} (only in ${firstFile}):`);
    lines.push(...onlyInFirst.map((tokenPath) => `    ${tokenPath}`));
  }
  if (onlyInSecond.length > 0) {
    lines.push(`  Missing in ${firstFile} (only in ${secondFile}):`);
    lines.push(...onlyInSecond.map((tokenPath) => `    ${tokenPath}`));
  }
  return (
    `Found ${total} semantic token(s) defined in only one of {${firstFile}, ${secondFile}}.\n` +
    `${lines.join('\n')}\n` +
    `Every Backpack semantic token must exist in every theme file. Declare the ` +
    `same path in both files; if the value really is meant to be shared across ` +
    `themes, point one side at the other with a DTCG alias (e.g. \`"{Colour.Pink}"\`).`
  );
}

// Accepted dimension forms: literal `Xpx` (signed/decimal allowed) or a
// DTCG alias `{Group.Token}`.
const VALID_PX_LITERAL = /^-?\d+(\.\d+)?px$/;
const DTCG_ALIAS = /^\{.+\}$/;

export interface DimensionViolation {
  filePath: string;  // absolute path of the source JSON file
  tokenPath: string; // dotted path, e.g. "Component.Button.Dimension.padding-h"
  value: unknown;    // raw rejected $value; kept as unknown for flexible rendering
}

function hasOwnDollarValue(node: Record<string, unknown>): boolean {
  return Object.prototype.hasOwnProperty.call(node, '$value');
}

function isValidDimensionValue(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return VALID_PX_LITERAL.test(value) || DTCG_ALIAS.test(value);
}

// Walk a DTCG tree and return every dimension token whose $value would not
// survive the px→rem transform. $type cascades from ancestor groups per
// https://www.designtokens.org/TR/drafts/format/#type-0
export function findInvalidDimensions(
  tree: unknown,
  filePath: string,
): DimensionViolation[] {
  const violations: DimensionViolation[] = [];

  function walk(
    node: unknown,
    pathSegments: readonly string[],
    inheritedType: string | undefined,
  ): void {
    if (typeof node !== 'object' || node === null || Array.isArray(node)) {
      return;
    }
    const nodeRecord = node as Record<string, unknown>;
    const localType =
      typeof nodeRecord.$type === 'string' ? nodeRecord.$type : inheritedType;

    if (hasOwnDollarValue(nodeRecord)) {
      // It's a token. Validate if it resolves to a `dimension`.
      if (
        localType === 'dimension' &&
        !isValidDimensionValue(nodeRecord.$value)
      ) {
        violations.push({
          filePath,
          tokenPath: pathSegments.join('.'),
          value: nodeRecord.$value,
        });
      }
      return; // Tokens don't have nested children we care about.
    }

    // It's a group: recurse into every non-`$`-prefixed child.
    for (const [key, child] of Object.entries(nodeRecord)) {
      if (!key.startsWith('$')) {
        walk(child, [...pathSegments, key], localType);
      }
    }
  }

  walk(tree, [], undefined);
  return violations;
}

// Format a list of violations across one or more files into the multi-line
// error message we surface to the CLI user. Kept separate so build-css.ts
// can call it with a flat list collected from every input file.
export function formatDimensionViolations(
  violations: readonly DimensionViolation[],
): string {
  const lines = violations.map((violation) => {
    const fileName = path.basename(violation.filePath);
    const where = violation.tokenPath || '<root>';
    return `  ${fileName} → ${where}: ${JSON.stringify(violation.value)}`;
  });
  return (
    `Found ${violations.length} dimension token(s) whose value is not "Xpx" or a DTCG alias.\n` +
    `Stage 2 builds CSS via the size/pxToRem transform, which only handles literal px values.\n` +
    `${lines.join('\n')}\n` +
    `Either change the source values back to px, or extend build-css.ts with a transform ` +
    `that understands the new units (and update findInvalidDimensions accordingly).`
  );
}

// Keeps only tokens from `sourceFileName`, dropping Primitives and any other
// source files loaded solely for alias resolution.
export function makeBackpackTokenFilter(
  sourceFileName: string,
): (token: TransformedToken) => boolean {
  return (token) =>
    typeof token.filePath === 'string' &&
    path.basename(token.filePath) === sourceFileName;
}

// Segments containing a standalone `ios` or `android` word (case-insensitive)
// disqualify a token from the web build (e.g. `Component.Switch.ios-switch-*`,
// `Component.iOS Tab-bar-fill`). They stay in the shared DTCG JSON for
// cross-platform parity but have no use in the browser.
const NON_WEB_SEGMENT_PATTERN = /\b(ios|android)\b/i;

// True if the token belongs in the web CSS build — i.e. no path segment is
// platform-specific to iOS or Android.
export function isWebTokenPath(tokenPath: readonly string[]): boolean {
  return !tokenPath.some((segment) => NON_WEB_SEGMENT_PATTERN.test(segment));
}

// Composite filter applied to each platform's `files[]`: keep tokens that
// belong to the semantic source file AND are web-compatible.
export function makeWebCssTokenFilter(
  sourceFileName: string,
): (token: TransformedToken) => boolean {
  const fileFilter = makeBackpackTokenFilter(sourceFileName);
  return (token) =>
    fileFilter(token) &&
    Array.isArray(token.path) &&
    isWebTokenPath(token.path);
}

// SD v5 preserves both `$type` (DTCG) and `type` (legacy) on transformed
// tokens. Read whichever is present so the filter works regardless of how the
// token entered the pipeline.
function tokenType(token: TransformedToken): string | undefined {
  if (typeof token.$type === 'string') return token.$type;
  if (typeof token.type === 'string') return token.type;
  return undefined;
}

// Filter for the standalone `primitives.css` output: keep Spacing and Radius
// only. Colors are excluded (consumers should use semantic tokens). Heights are
// excluded until there is a confirmed consumer need.
export function makeWebPrimitivesTokenFilter(): (
  token: TransformedToken,
) => boolean {
  const fileFilter = makeBackpackTokenFilter(PRIMITIVES_FILE);
  return (token) =>
    fileFilter(token) &&
    Array.isArray(token.path) &&
    isWebTokenPath(token.path) &&
    tokenType(token) !== 'color' &&
    token.path[0] !== 'Heights';
}

interface BuildConfigOptions {
  tokensDir: string;
  buildDir: string;
  cssTransforms: readonly string[];
  // List of `backpack.<theme>.json` files to emit, supplied by the runner from
  // `discoverSemanticFiles` — typically the default theme (Light) plus any
  // experimental themes (Dark, Sepia, …). One SD config is produced per entry.
  semanticFileNames: readonly string[];
}

// Builds the array of named (name, config) pairs the runner iterates over.
// Auto-discovery lives in build-css.ts (`discoverSemanticFiles`); this function
// just consumes the resolved list.
export function buildStyleDictionaryConfigs({
  buildDir,
  cssTransforms,
  semanticFileNames,
  tokensDir,
}: BuildConfigOptions): Array<{ name: string; config: Config }> {
  const buildPath = buildDir.endsWith(path.sep) ? buildDir : `${buildDir}${path.sep}`;

  const sharedPlatformOptions = {
    prefix: CSS_PREFIX,
    transforms: [...cssTransforms],
    basePxFontSize: BASE_PX_FONT_SIZE,
    buildPath,
  };

  // Emit non-color primitives once (theme-independent), then one file per
  // semantic theme. Primitives ship first to mirror the recommended consumer
  // import order (primitives.css before any theme sheet).
  const primitivesConfig = {
    name: 'web-primitives',
    config: {
      source: [path.join(tokensDir, PRIMITIVES_FILE)],
      platforms: {
        css: {
          ...sharedPlatformOptions,
          files: [
            {
              destination: PRIMITIVES_OUTPUT_FILE,
              format: 'css/variables',
              filter: makeWebPrimitivesTokenFilter(),
              options: {
                selector: PRIMITIVES_SELECTOR,
                outputReferences: false,
                fileHeader: BPK_FILE_HEADER,
              },
            },
          ],
        },
      },
    },
  };

  const semanticConfigs = semanticFileNames.map((semanticFile) => {
    // backpack.light.json → "light"
    const themeName = path.basename(semanticFile, '.json').split('.').at(-1) ?? semanticFile;
    return {
      name: `web-theme-${themeName}`,
      config: {
        // Primitives + semantic tokens for alias resolution. Only the semantic
        // file is emitted (see filter below).
        source: [
          path.join(tokensDir, PRIMITIVES_FILE),
          path.join(tokensDir, semanticFile),
        ],
        platforms: {
          css: {
            ...sharedPlatformOptions,
            files: [
              {
                destination: outputFileForSemanticFile(semanticFile),
                format: 'css/variables',
                filter: makeWebCssTokenFilter(semanticFile),
                options: {
                  selector: selectorForSemanticFile(semanticFile),
                  outputReferences: false,
                  fileHeader: BPK_FILE_HEADER,
                },
              },
            ],
          },
        },
      },
    };
  });

  return [primitivesConfig, ...semanticConfigs];
}

// Map semantic file names to their output CSS file and selector.
function outputFileForSemanticFile(semanticFile: string): string {
  if (semanticFile === BACKPACK_LIGHT_FILE) return LIGHT_OUTPUT_FILE;
  if (semanticFile === BACKPACK_DARK_FILE) return DARK_OUTPUT_FILE;
  const match = semanticFile.match(/^backpack\.(.+)\.json$/);
  return match ? `theme-backpack-${match[1]}.css` : semanticFile.replace('.json', '.css');
}

function selectorForSemanticFile(semanticFile: string): string {
  if (semanticFile === BACKPACK_LIGHT_FILE) return LIGHT_SELECTOR;
  if (semanticFile === BACKPACK_DARK_FILE) return DARK_SELECTOR;
  const match = semanticFile.match(/^backpack\.(.+)\.json$/);
  return match ? `:root[data-theme="${match[1]}"]` : ':root';
}
