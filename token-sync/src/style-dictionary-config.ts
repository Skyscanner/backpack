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

// `:root` for Light, scoped attribute selector for Dark so a single document
// can opt into the Dark palette by setting `data-theme="dark"` on <html> or
// <body>. The values come from CLOV-1403's spec — keep them in sync with any
// runtime theme-toggling code.
export const LIGHT_SELECTOR = ':root';
export const DARK_SELECTOR = ':root[data-theme="dark"]';

// Filenames are spec'd by the ticket. Keep matching the convention used by
// downstream consumers so we don't break any imports.
export const LIGHT_OUTPUT_FILE = 'theme-backpack-light.css';
export const DARK_OUTPUT_FILE = 'theme-backpack-dark.css';

// Source DTCG filenames written by the Stage 1 sync. These names are also
// hard-coded in `dtcg-writer.ts` (single-mode collection) and the Backpack
// collection (multi-mode); both stages need to agree.
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

// Top-level DTCG group names that should NOT show up in the CSS variable
// name. These come from Figma's organisational hierarchy ("Component/" is a
// folder there) but carry no useful information for consumers — every token
// underneath is already namespaced by the component name (Badge, Button, …).
//
// Compared case-insensitively to the first path segment. Strip-then-kebab
// so e.g. `Component.Badge.Colour.bg-default` → `--bpk-badge-colour-bg-default`.
export const STRIPPED_TOP_LEVEL_SEGMENTS: ReadonlySet<string> = new Set([
  'component',
]);

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

// Strip leading `Component` segment (per STRIPPED_TOP_LEVEL_SEGMENTS), then
// kebab-case. `prefix` is prepended after stripping. Refuses to leave a token
// nameless when the whole path is a single stripped segment.
export function kebabBpkName(
  tokenPath: readonly string[],
  prefix?: string,
): string {
  const stripped =
    tokenPath.length > 1 &&
    typeof tokenPath[0] === 'string' &&
    STRIPPED_TOP_LEVEL_SEGMENTS.has(tokenPath[0].toLowerCase())
      ? tokenPath.slice(1)
      : tokenPath;
  const withPrefix =
    typeof prefix === 'string' && prefix.length > 0
      ? [prefix, ...stripped]
      : stripped;
  return withPrefix.map(kebabSegment).filter(Boolean).join('-');
}

export interface CssNameCollision {
  // Final kebab-cased name (without prefix) that two or more tokens share.
  name: string;
  // Dotted DTCG paths of every token that maps to `name`. Always >= 2.
  sources: string[];
}

// Walk a parsed DTCG tree and return every CSS name that two or more tokens
// would collide on after `kebabBpkName` runs. The most likely cause is a
// top-level `Foo` group co-existing with a `Component.Foo` group: both
// produce `--bpk-foo-…` after stripping. SD itself wouldn't error on this —
// it would just emit both, with the second silently winning the cascade.
export function findCssNameCollisions(
  tree: unknown,
  // Reserved for future cross-file collision detection. Unused today —
  // collisions are scoped per file because each mode's CSS is built
  // independently — but kept on the signature so callers don't need to
  // change shape later.

  _filePath: string,
): CssNameCollision[] {
  const seen = new Map<string, string[]>();

  function walk(node: unknown, pathSegments: readonly string[]): void {
    if (typeof node !== 'object' || node === null || Array.isArray(node)) {
      return;
    }
    const obj = node as Record<string, unknown>;
    if (Object.prototype.hasOwnProperty.call(obj, '$value')) {
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
    for (const [key, child] of Object.entries(obj)) {
      if (!key.startsWith('$')) {
        walk(child, [...pathSegments, key]);
      }
    }
  }

  walk(tree, []);

  const collisions: CssNameCollision[] = [];
  seen.forEach((sources, name) => {
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
    `Found ${total} CSS variable name collision(s) after stripping leading ` +
    `${Array.from(STRIPPED_TOP_LEVEL_SEGMENTS).join(', ')} segment(s):\n` +
    `${lines.join('\n')}\n` +
    `Two or more DTCG tokens map to the same CSS custom property. Rename ` +
    `one of the colliding sources in Figma, or extend STRIPPED_TOP_LEVEL_SEGMENTS ` +
    `with care so the stripping no longer produces a clash.`
  );
}

// Walk a parsed DTCG tree and collect every leaf token's dotted path.
// `Component.Badge.Colour.bg-default` is one entry. Used by the symmetry
// check below — pure, no I/O.
function collectTokenPaths(tree: unknown): string[] {
  const paths: string[] = [];

  function walk(node: unknown, segments: readonly string[]): void {
    if (typeof node !== 'object' || node === null || Array.isArray(node)) {
      return;
    }
    const obj = node as Record<string, unknown>;
    if (Object.prototype.hasOwnProperty.call(obj, '$value')) {
      paths.push(segments.join('.'));
      return;
    }
    for (const [key, child] of Object.entries(obj)) {
      if (!key.startsWith('$')) {
        walk(child, [...segments, key]);
      }
    }
  }

  walk(tree, []);
  return paths;
}

export interface SemanticTokenAsymmetry {
  // Token paths present in Light but missing in Dark. Sorted, de-duplicated.
  lightOnly: string[];
  // Token paths present in Dark but missing in Light. Sorted, de-duplicated.
  darkOnly: string[];
}

// Symmetric difference of leaf token paths between Light and Dark files.
// Every semantic token must exist in both themes — see contract notes in
// the PR thread. Pure: caller passes parsed JSON.
export function findAsymmetricSemanticTokens(
  lightTree: unknown,
  darkTree: unknown,
): SemanticTokenAsymmetry {
  const lightPaths = new Set(collectTokenPaths(lightTree));
  const darkPaths = new Set(collectTokenPaths(darkTree));
  const lightOnly: string[] = [];
  const darkOnly: string[] = [];
  lightPaths.forEach((tokenPath) => {
    if (!darkPaths.has(tokenPath)) lightOnly.push(tokenPath);
  });
  darkPaths.forEach((tokenPath) => {
    if (!lightPaths.has(tokenPath)) darkOnly.push(tokenPath);
  });
  return { lightOnly: lightOnly.sort(), darkOnly: darkOnly.sort() };
}

// Render the asymmetry into a multi-line CLI error message.
export function formatAsymmetricSemanticTokens(
  asymmetry: SemanticTokenAsymmetry,
): string {
  const { darkOnly, lightOnly } = asymmetry;
  const total = lightOnly.length + darkOnly.length;
  const lines: string[] = [];
  if (lightOnly.length > 0) {
    lines.push(`  Missing in ${BACKPACK_DARK_FILE} (only in ${BACKPACK_LIGHT_FILE}):`);
    lines.push(...lightOnly.map((tokenPath) => `    ${tokenPath}`));
  }
  if (darkOnly.length > 0) {
    lines.push(`  Missing in ${BACKPACK_LIGHT_FILE} (only in ${BACKPACK_DARK_FILE}):`);
    lines.push(...darkOnly.map((tokenPath) => `    ${tokenPath}`));
  }
  return (
    `Found ${total} semantic token(s) defined in only one of {Light, Dark}.\n` +
    `${lines.join('\n')}\n` +
    `Every Backpack semantic token must exist in both themes. Declare the same ` +
    `path in both files; if the value really is meant to be shared across themes, ` +
    `point one side at the other with a DTCG alias (e.g. \`"{Colour.Pink}"\`).`
  );
}

// Accepted dimension forms: literal `Xpx` (signed/decimal allowed) or a
// DTCG alias `{Group.Token}`. See PR thread for size/pxToRem rationale.
const VALID_PX_LITERAL = /^-?\d+(\.\d+)?px$/;
const DTCG_ALIAS = /^\{.+\}$/;

export interface DimensionViolation {
  // Absolute path of the JSON file the offending token came from.
  filePath: string;
  // Dotted path inside the file, e.g. "Component.Button.Dimension.padding-h".
  // Empty string for the root token (which shouldn't happen in practice but
  // is well-defined here).
  tokenPath: string;
  // The raw `$value` we rejected. Kept as `unknown` so the caller can decide
  // how to render it (typically `JSON.stringify`) — bare numbers, booleans,
  // etc. should still surface in the error message.
  value: unknown;
}

function hasOwnDollarValue(node: Record<string, unknown>): boolean {
  return Object.prototype.hasOwnProperty.call(node, '$value');
}

function isValidDimensionValue(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return VALID_PX_LITERAL.test(value) || DTCG_ALIAS.test(value);
}

// Walk a parsed DTCG tree and return every dimension token whose `$value`
// would not survive the px→rem assumption. `$type` cascades from the
// nearest ancestor group that declared one (DTCG spec §7.1) — leaf tokens
// rarely repeat `$type` themselves, so the cascade matters in practice.
//
// Pure: no I/O, no SD. Caller is responsible for reading + parsing the JSON.
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
    const obj = node as Record<string, unknown>;
    const localType =
      typeof obj.$type === 'string' ? obj.$type : inheritedType;

    if (hasOwnDollarValue(obj)) {
      // It's a token. Validate iff it resolves to a `dimension`.
      if (localType === 'dimension' && !isValidDimensionValue(obj.$value)) {
        violations.push({
          filePath,
          tokenPath: pathSegments.join('.'),
          value: obj.$value,
        });
      }
      return; // Tokens don't have nested children we care about.
    }

    // It's a group: recurse into every non-`$`-prefixed child.
    for (const [key, child] of Object.entries(obj)) {
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

// Filter that keeps tokens authored in `sourceFileName` and drops the rest.
// We use this to omit Primitives from the per-mode CSS output: they're loaded
// as a `source` so cross-collection aliases resolve, but we don't want raw
// primitives leaking into the theme stylesheets — only the semantic Backpack
// tokens should produce `--bpk-*` variables.
//
// `filePath` is set to the absolute path SD read the file from. We compare on
// basename so the filter remains correct regardless of how callers spell the
// source paths (relative vs absolute, different working dir, etc.).
export function makeBackpackTokenFilter(
  sourceFileName: string,
): (token: TransformedToken) => boolean {
  return (token) =>
    typeof token.filePath === 'string' &&
    path.basename(token.filePath) === sourceFileName;
}

interface BuildConfigOptions {
  tokensDir: string;
  buildDir: string;
  cssTransforms: readonly string[];
  // Semantic token file names (e.g. ['backpack.light.json', 'backpack.dark.json']).
  // If omitted, auto-discovered by reading tokensDir. Pass explicitly to avoid I/O
  // in unit tests or when the caller already has the list.
  semanticFileNames?: string[];
}

// Builds the array of named (name, config) pairs the runner iterates over.
// If semanticFileNames is omitted, reads tokensDir to auto-discover them.
export function buildStyleDictionaryConfigs({
  buildDir,
  cssTransforms,
  semanticFileNames,
  tokensDir,
}: BuildConfigOptions): Array<{ name: string; config: Config }> {
  // Trailing slash is required: SD's `buildPath` is concatenated raw with the
  // file destination, so omitting it produces paths like `/tmp/cssfile.css`.
  const buildPath = buildDir.endsWith(path.sep) ? buildDir : `${buildDir}${path.sep}`;

  const sharedPlatformOptions = {
    prefix: CSS_PREFIX,
    transforms: [...cssTransforms],
    basePxFontSize: BASE_PX_FONT_SIZE,
    buildPath,
  };

  // If not provided by caller, default to known light/dark for backwards compat.
  const filesToBuild = semanticFileNames ?? [BACKPACK_LIGHT_FILE, BACKPACK_DARK_FILE];

  return filesToBuild.map((semanticFile, idx) => ({
    name: `web-theme-${idx}`,
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
              filter: makeBackpackTokenFilter(semanticFile),
              options: {
                selector: selectorForSemanticFile(semanticFile),
                outputReferences: false,
              },
            },
          ],
        },
      },
    },
  }));
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

// Primitives are always required. Semantic token files (backpack.*.json) are
// discovered dynamically from the tokens directory — adding a new theme just
// requires a new file, no code changes.
export const REQUIRED_INPUT_FILES = [PRIMITIVES_FILE] as const;
