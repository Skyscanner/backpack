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

// Mangles long, repetitive segments inside CSS variable names so the bytes
// shipped to consumers are smaller. The full semantic name (e.g.
// `bpk-private-button-colour-bg-primary`) stays available via the SCSS
// bridge generated alongside the CSS, so component authors never see the
// mangled form.
//
// Phase 1 dictionary: only the four highest-frequency repeated segments. Each
// of these appears in ~most variables, so even a tiny dictionary moves real
// bytes. Add more abbreviations later in increments and rerun the build to
// confirm collisions stay at zero.

export const SEGMENT_ABBREVIATIONS: Readonly<Record<string, string>> = {
  private: 'p',
  colour: 'c',
  dimension: 'd',
  typography: 't',
};

const PREFIX = 'bpk';

// Apply the abbreviation dictionary segment-by-segment to a kebab-cased CSS
// name produced by `kebabBpkName` (e.g. `bpk-private-button-colour-bg-primary`
// → `bpk-p-button-c-bg-primary`). The `bpk-` prefix is preserved as-is so the
// public CSS namespace stays recognisable.
export function mangleVariableName(originalName: string): string {
  if (!originalName.startsWith(`${PREFIX}-`)) {
    return originalName;
  }
  const tail = originalName.slice(PREFIX.length + 1);
  if (tail.length === 0) {
    return originalName;
  }
  const segments = tail.split('-');
  const mangled = segments.map(
    (segment) => SEGMENT_ABBREVIATIONS[segment] ?? segment,
  );
  return [PREFIX, ...mangled].join('-');
}

export interface MangleNameMapping {
  // Original semantic name (no leading `--`), e.g. `bpk-private-button-…`.
  original: string;
  // Mangled output (no leading `--`), e.g. `bpk-p-button-…`.
  mangled: string;
}

// Build the name map for the full set of variable names emitted by a build.
// Throws on collisions so a poorly-chosen abbreviation can't silently rename
// two distinct tokens to the same CSS variable.
export function buildNameMap(
  originalNames: readonly string[],
): MangleNameMapping[] {
  const seen = new Map<string, string>();
  const mappings: MangleNameMapping[] = [];

  for (const original of originalNames) {
    const mangled = mangleVariableName(original);
    const previousOriginal = seen.get(mangled);
    if (previousOriginal !== undefined && previousOriginal !== original) {
      throw new Error(
        `Mangle collision: "${previousOriginal}" and "${original}" both ` +
          `mangle to "${mangled}". Update SEGMENT_ABBREVIATIONS to disambiguate.`,
      );
    }
    if (previousOriginal === undefined) {
      seen.set(mangled, original);
      mappings.push({ original, mangled });
    }
  }

  return mappings;
}
