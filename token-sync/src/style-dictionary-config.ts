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

// Kebab one path segment. Mirrors the rules SD's `name/kebab` applies to
// our actual data, plus a sanitisation pass that keeps the output a valid
// CSS identifier no matter what the designer typed in Figma:
//   "Grey 10"             → "grey-10"        (whitespace → dash, lowercased)
//   "bg-default"          → "bg-default"     (existing dashes preserved)
//   "borderRadius"        → "border-radius"  (camelCase boundary inserted)
//   "stroke (new)"        → "stroke-new"     (parens treated as separators)
//   "Card [draft]"        → "card-draft"     (brackets too)
//   "🎨 colour"           → "colour"         (non-ASCII / emoji dropped)
//   "!important"          → "important"      (any other punctuation too)
//
// The CSS spec restricts custom-property identifiers to letters, digits,
// `-`, `_`, escaped chars, and non-ASCII Unicode. We narrow further to
// `[a-z0-9-]` because anything else (parens, brackets, emoji, …) would
// either need escaping or fail to parse. Sanitising silently — rather
// than hard-failing — means designer annotations like `(new)`, `(WIP)`,
// `[draft]` flow through as readable name suffixes (`-new`, `-wip`,
// `-draft`) without breaking the build. Real collisions surfaced by the
// rewrite are caught by `findCssNameCollisions` downstream.
function kebabSegment(segment: string): string {
  return segment
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
    // Replace any run of CSS-unsafe characters with a single dash. The `u`
    // flag makes the regex iterate by Unicode code point so a multi-code-
    // unit emoji (e.g. surrogate pair) becomes one run, not two.
    .replace(/[^a-z0-9-]+/gu, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Strip then kebab-case, returning the final CSS variable name body (i.e.
// without the leading `--` from `var()`). Pure — no SD, no I/O.
//
// `prefix`, when given, is treated as an additional first segment after
// stripping; SD's built-in `name/kebab` works the same way (it joins
// `[prefix, ...token.path]` then kebabs). Strip is applied to `path` only,
// so a `prefix` of `bpk` does NOT match the strip set even if it ever
// happens to be `'component'`.
//
// The strip refuses to leave a token nameless: if the entire path is the
// single stripped segment (`['Component']`), we keep it intact. Defensive
// — Backpack doesn't author such tokens today, but a refactor that flattens
// `Component.Foo` up to `Component` shouldn't silently produce `--bpk-`.
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
  for (const [name, sources] of seen) {
    if (sources.length > 1) {
      collisions.push({ name, sources: sources.slice().sort() });
    }
  }
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
    `${[...STRIPPED_TOP_LEVEL_SEGMENTS].join(', ')} segment(s):\n` +
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

// Compare the leaf token paths of the two semantic files and return the
// symmetric difference. Backpack's contract is that every semantic token
// must exist in both themes — designers express "two themes share a value"
// via a DTCG alias (`{Group.Token}` in both files) rather than by leaving
// one side blank. Asymmetry would otherwise mean either:
//   - the Light stylesheet declares a `--bpk-…` the Dark stylesheet doesn't
//     override (so toggling to Dark silently keeps the Light value), or
//   - the Dark stylesheet declares one missing from Light (so default-theme
//     consumers get an `unset` `var()` that fails open).
// Both look identical to "designer forgot to set the other theme" — we
// can't tell intent from data, so we refuse to build and let the designer
// disambiguate by adding the missing key (with an alias if the value really
// should be shared).
//
// Pure: no I/O, no SD. Caller passes the parsed JSON for both files.
export function findAsymmetricSemanticTokens(
  lightTree: unknown,
  darkTree: unknown,
): SemanticTokenAsymmetry {
  const lightPaths = new Set(collectTokenPaths(lightTree));
  const darkPaths = new Set(collectTokenPaths(darkTree));
  const lightOnly: string[] = [];
  const darkOnly: string[] = [];
  for (const tokenPath of lightPaths) {
    if (!darkPaths.has(tokenPath)) lightOnly.push(tokenPath);
  }
  for (const tokenPath of darkPaths) {
    if (!lightPaths.has(tokenPath)) darkOnly.push(tokenPath);
  }
  return { lightOnly: lightOnly.sort(), darkOnly: darkOnly.sort() };
}

// Render the asymmetry into a multi-line CLI error message.
export function formatAsymmetricSemanticTokens(
  asymmetry: SemanticTokenAsymmetry,
): string {
  const { lightOnly, darkOnly } = asymmetry;
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

// Recognised forms for a `$type: dimension` value:
//
//   "16px", "1.5px", "-1px", "0px"   ← literal Xpx (with optional sign / decimal)
//   "{Group.Token}"                   ← DTCG alias (resolved later by SD)
//
// Anything else (e.g. `"16em"`, `"50%"`, `"1rem"`, bare numbers) would be
// silently mishandled by SD's `size/pxToRem` transform — it strips the `px`
// suffix and divides by `BASE_PX_FONT_SIZE`, so a non-px input either fails
// the strip and emits a wrong unit, or is divided as a number when the
// designer meant something else. We catch those at build time instead.
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
  // Absolute path to the directory containing the DTCG `*.json` files written
  // by Stage 1. Resolved by the caller so this module stays cwd-agnostic.
  tokensDir: string;
  // Absolute path the CSS output should land in. Created if missing.
  buildDir: string;
  // Ordered list of SD transform names applied to every token. Caller is
  // responsible for assembling this from SD's runtime (so we follow SD
  // upgrades automatically and stay typed against `transforms` enum), then
  // passing it in. Keeping it as a parameter — instead of importing SD here
  // — lets this module remain SD-runtime-free, which matters because SD v5
  // is ESM-only and pulling it in here would force every consumer (including
  // jest unit tests under the project's CJS babel config) to transform a
  // long chain of nested ESM dependencies (chalk, change-case, …).
  cssTransforms: readonly string[];
}

// Builds the array of named (name, config) pairs the runner iterates over.
// Pure function: no I/O, no SD instantiation — keeps it cheap to unit-test.
export function buildStyleDictionaryConfigs({
  buildDir,
  cssTransforms,
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

  return [
    {
      name: 'web-light',
      config: {
        // Both files are loaded so `{Group.Token}` aliases in the Backpack
        // file resolve into Primitive literals during build. Only the
        // Backpack file is emitted (see filter below).
        source: [
          path.join(tokensDir, PRIMITIVES_FILE),
          path.join(tokensDir, BACKPACK_LIGHT_FILE),
        ],
        platforms: {
          css: {
            ...sharedPlatformOptions,
            files: [
              {
                destination: LIGHT_OUTPUT_FILE,
                format: 'css/variables',
                filter: makeBackpackTokenFilter(BACKPACK_LIGHT_FILE),
                options: {
                  selector: LIGHT_SELECTOR,
                  // Disable SD's outputReferences for now: light and dark live
                  // in different stylesheets, so a `var(--neutral-grey-10)`
                  // reference in the dark file would point at a primitive
                  // that no longer exists in the output. Keep values inline.
                  outputReferences: false,
                },
              },
            ],
          },
        },
      },
    },
    {
      name: 'web-dark',
      config: {
        source: [
          path.join(tokensDir, PRIMITIVES_FILE),
          path.join(tokensDir, BACKPACK_DARK_FILE),
        ],
        platforms: {
          css: {
            ...sharedPlatformOptions,
            files: [
              {
                destination: DARK_OUTPUT_FILE,
                format: 'css/variables',
                filter: makeBackpackTokenFilter(BACKPACK_DARK_FILE),
                options: {
                  selector: DARK_SELECTOR,
                  outputReferences: false,
                },
              },
            ],
          },
        },
      },
    },
  ];
}

// Convenience export for callers that want to iterate the input filenames
// (e.g. existence checks before invoking SD). Order is irrelevant.
export const REQUIRED_INPUT_FILES = [
  PRIMITIVES_FILE,
  BACKPACK_LIGHT_FILE,
  BACKPACK_DARK_FILE,
] as const;
