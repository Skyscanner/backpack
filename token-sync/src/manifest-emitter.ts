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

// Emits a `tokens-mangle-map.json` file that lists every CSS custom property
// the build produces, mapping each readable original name to its mangled
// counterpart. A consumer-side PostCSS plugin uses this map to rewrite
// `var(--bpk-original)` references in compiled CSS to the mangled form, so
// component authors keep writing readable names while the bundle ships the
// short form.

import { writeFile } from 'node:fs/promises';
import path from 'node:path';

import { buildNameMap } from './mangle-token-name';
import { CSS_PREFIX, kebabBpkName } from './style-dictionary-config';

export const TOKENS_MANGLE_MAP_FILE = 'tokens-mangle-map.json';

// Walks a DTCG tree and visits every leaf token (a node with `$value`),
// passing its dotted path segments to the callback.
function walkLeafTokens(
  node: unknown,
  visit: (segments: readonly string[]) => void,
  pathSegments: readonly string[] = [],
): void {
  if (typeof node !== 'object' || node === null || Array.isArray(node)) {
    return;
  }
  const record = node as Record<string, unknown>;
  if (Object.prototype.hasOwnProperty.call(record, '$value')) {
    visit(pathSegments);
    return;
  }
  for (const [key, child] of Object.entries(record)) {
    if (!key.startsWith('$')) {
      walkLeafTokens(child, visit, [...pathSegments, key]);
    }
  }
}

// Object form of the manifest:
//   { "--bpk-private-button-colour-bg-primary": "--bpk-p-button-c-bg-primary" }
// Object lookup is what the PostCSS rewrite plugin does at runtime, so
// keeping the on-disk shape match the lookup shape avoids transform code on
// the consumer side.
export type TokensMangleMap = Record<string, string>;

// Build the manifest object for the given parsed DTCG trees. Public so the
// emitter is unit-testable without touching the filesystem.
export function buildTokensMangleMap(
  trees: readonly unknown[],
): TokensMangleMap {
  const collectedNames: string[] = [];
  for (const tree of trees) {
    walkLeafTokens(tree, (segments) => {
      collectedNames.push(kebabBpkName(segments, CSS_PREFIX));
    });
  }

  // `buildNameMap` deduplicates and runs collision detection in one pass.
  const mappings = buildNameMap(collectedNames);

  // Sort keys so file diffs stay stable when token order changes upstream.
  const sorted = mappings
    .slice()
    .sort((a, b) => a.original.localeCompare(b.original));

  const map: TokensMangleMap = {};
  for (const { mangled, original } of sorted) {
    map[`--${original}`] = `--${mangled}`;
  }
  return map;
}

export interface EmitTokensMangleMapOptions {
  // Directory that already contains the SD-emitted CSS files (typically the
  // staging dir during `runBuildCSS`).
  buildDir: string;
  // Parsed DTCG trees whose leaves should appear in the manifest.
  trees: readonly unknown[];
}

// Emits the manifest JSON file alongside the CSS outputs. Returns the
// absolute path written so callers can record it in their build outputs list.
export async function emitTokensMangleMap({
  buildDir,
  trees,
}: EmitTokensMangleMapOptions): Promise<string> {
  const map = buildTokensMangleMap(trees);
  const manifestPath = path.join(buildDir, TOKENS_MANGLE_MAP_FILE);
  // 2-space indent + trailing newline keeps the file friendly for `git diff`
  // and for any human who opens it for debug.
  await writeFile(manifestPath, `${JSON.stringify(map, null, 2)}\n`, 'utf8');
  return manifestPath;
}
