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

/**
 * Standalone script that reads backpack.light.json and emits
 * packages/backpack-web/src/bpk-theming/src/generated/BpkTheme.ts
 *
 * Run via: pnpm -w run build:theme-types
 *
 * The emitted file contains:
 *   - BpkThemedValue type
 *   - One interface per component (BpkButtonTheme, BpkBadgeTheme, …)
 *   - BpkTheme root interface: flat semantic keys + component namespace keys
 *   - themeToVars() runtime mapper
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(scriptDir, '..', '..');
const TOKENS_DIR = path.join(REPO_ROOT, 'token-sync', 'tokens');
const OUTPUT_PATH = path.join(
  REPO_ROOT,
  'packages',
  'backpack-web',
  'src',
  'bpk-theming',
  'src',
  'generated',
  'BpkTheme.ts',
);

// Groups excluded from the generated theme type (internal / platform / test)
const SKIP_GROUPS = new Set([
  'Test',
  'Title?',
  'Typography None Binding ❌',
  'Typography',
]);

// Segments excluded from component names (platform-specific)
const NON_WEB_SEGMENT = /\b(ios|android)\b/i;

// ─── Path → camelCase key conversion ────────────────────────────────────────

function toCamelFragment(segment: string): string {
  return segment
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c: string) => c.toUpperCase())
    .replace(/^(.)/, (c: string) => c.toLowerCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}

function pathToCamelKey(segments: readonly string[]): string {
  return segments
    .map((s, i) => {
      const frag = toCamelFragment(s);
      if (i === 0) return frag;
      return frag.charAt(0).toUpperCase() + frag.slice(1);
    })
    .join('');
}

// ─── Path → CSS var name conversion ─────────────────────────────────────────

function kebabSegment(s: string): string {
  return s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function pathToCssVar(tokenPath: readonly string[]): string {
  const renamed =
    tokenPath.length > 0 && tokenPath[0].toLowerCase() === 'component'
      ? ['private', ...tokenPath.slice(1)]
      : tokenPath;
  return `bpk-${renamed.map(kebabSegment).filter(Boolean).join('-')}`;
}

// ─── Token tree walker ───────────────────────────────────────────────────────

interface LeafToken {
  keyPath: string[];
  cssVar: string;
}

function collectLeaves(
  node: unknown,
  dtcgPath: string[],
  keyPath: string[],
): LeafToken[] {
  if (typeof node !== 'object' || node === null || Array.isArray(node))
    return [];
  const rec = node as Record<string, unknown>;
  if ('$value' in rec) {
    return [{ keyPath, cssVar: pathToCssVar(dtcgPath) }];
  }
  return Object.entries(rec)
    .filter(([k]) => !k.startsWith('$'))
    .flatMap(([k, child]) =>
      collectLeaves(child, [...dtcgPath, k], [...keyPath, k]),
    );
}

// ─── TypeScript code generator ───────────────────────────────────────────────

const LICENSE_HEADER = `/*
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
 */`;

function toTypeName(groupName: string): string {
  return groupName
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function emitComponentInterface(
  name: string,
  leaves: LeafToken[],
  lines: string[],
): void {
  lines.push(`export interface ${name} {`);
  leaves.forEach((leaf) => {
    const key = pathToCamelKey(leaf.keyPath);
    lines.push(`  /** --${leaf.cssVar} */`);
    lines.push(`  ${key}?: BpkThemedValue;`);
  });
  lines.push('}');
  lines.push('');
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  const lightJson = JSON.parse(
    readFileSync(path.join(TOKENS_DIR, 'backpack.light.json'), 'utf-8'),
  ) as Record<string, unknown>;

  const lines: string[] = [
    LICENSE_HEADER,
    '',
    '// GENERATED — do not edit by hand. Run: pnpm -w run build:theme-types',
    '',
    'export type BpkThemedValue = string | { light: string; dark: string };',
    '',
  ];

  // ── Component interfaces ─────────────────────────────────────────────────
  const componentNode = lightJson.Component;
  const componentEntries: Array<{ nsKey: string; typeName: string }> = [];

  if (typeof componentNode === 'object' && componentNode !== null) {
    Object.entries(componentNode as Record<string, unknown>)
      .filter(([compName]) => !compName.startsWith('$') && !NON_WEB_SEGMENT.test(compName))
      .forEach(([compName, compValue]) => {
        const leaves = collectLeaves(compValue, ['Component', compName], []);
        const fixedLeaves = leaves.map((leaf) =>
          leaf.keyPath.length === 0 ? { ...leaf, keyPath: ['value'] } : leaf,
        );
        if (fixedLeaves.length === 0) return;

        const typeName = `Bpk${toTypeName(compName)}Theme`;
        const nsKey = toCamelFragment(compName);

        emitComponentInterface(typeName, fixedLeaves, lines);
        componentEntries.push({ nsKey, typeName });
      });
  }

  // ── Collect semantic leaves (flat into BpkTheme) ─────────────────────────
  const semanticLeaves: LeafToken[] = [];
  Object.entries(lightJson)
    .filter(([groupName]) =>
      !groupName.startsWith('$') &&
      groupName !== 'Component' &&
      !SKIP_GROUPS.has(groupName),
    )
    .forEach(([groupName, groupValue]) => {
      const leaves = collectLeaves(groupValue, [groupName], []);
      leaves.forEach((leaf) => {
        semanticLeaves.push({ keyPath: [groupName, ...leaf.keyPath], cssVar: leaf.cssVar });
      });
    });

  // ── BpkTheme root interface ───────────────────────────────────────────────
  lines.push('export interface BpkTheme {');
  semanticLeaves.forEach((leaf) => {
    const key = pathToCamelKey(leaf.keyPath);
    lines.push(`  /** --${leaf.cssVar} */`);
    lines.push(`  ${key}?: BpkThemedValue;`);
  });
  componentEntries.forEach(({ nsKey, typeName }) => {
    lines.push(`  ${nsKey}?: ${typeName};`);
  });
  lines.push('}');
  lines.push('');

  // ── themeToVars runtime mapper ────────────────────────────────────────────
  lines.push('/**');
  lines.push(' * Maps a BpkTheme object to a flat Record of CSS custom property overrides.');
  lines.push(' * Plain string values are returned directly.');
  lines.push(' * Mode-specific `{ light, dark }` values are excluded — BpkThemeProvider');
  lines.push(' * injects those via a `<style>` tag keyed to a generated ID.');
  lines.push(' * @param {BpkTheme} theme - The BpkTheme object to map.');
  lines.push(' * @returns {Record<string, string>} A flat record of CSS custom property overrides.');
  lines.push(' */');
  lines.push('export const themeToVars = (theme: BpkTheme): Record<string, string> => {');
  lines.push('  const vars: Record<string, string> = {};');
  lines.push('  const t = theme as Record<string, unknown>;');

  // Semantic tokens are flat on the theme object
  semanticLeaves.forEach((leaf) => {
    const key = pathToCamelKey(leaf.keyPath);
    lines.push(`  if (typeof t.${key} === 'string') vars['--${leaf.cssVar}'] = t.${key} as string;`);
  });

  // Component tokens are nested under their namespace
  lines.push('  let ns: Record<string, BpkThemedValue> | undefined;');

  if (typeof componentNode === 'object' && componentNode !== null) {
    Object.entries(componentNode as Record<string, unknown>)
      .filter(([compName]) => !compName.startsWith('$') && !NON_WEB_SEGMENT.test(compName))
      .forEach(([compName, compValue]) => {
        const leaves = collectLeaves(compValue, ['Component', compName], []);
        const entries = leaves.map((leaf) => {
          const keyPath = leaf.keyPath.length === 0 ? ['value'] : leaf.keyPath;
          return { key: pathToCamelKey(keyPath), cssVar: `--${leaf.cssVar}` };
        });
        if (entries.length === 0) return;

        const ns = toCamelFragment(compName);
        lines.push(`  ns = t.${ns} as Record<string, BpkThemedValue> | undefined;`);
        lines.push(`  if (ns) {`);
        entries.forEach(({ cssVar, key }) => {
          lines.push(`    if (typeof ns.${key} === 'string') vars['${cssVar}'] = ns.${key} as string;`);
        });
        lines.push(`  }`);
      });
  }

  lines.push('  return vars;');
  lines.push('};');
  lines.push('');

  // ── Write output ──────────────────────────────────────────────────────────
  const outputDir = path.dirname(OUTPUT_PATH);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(OUTPUT_PATH, lines.join('\n'), 'utf-8');
  // eslint-disable-next-line no-console
  console.log(`✓ Written ${path.relative(REPO_ROOT, OUTPUT_PATH)}`);
}

main();
