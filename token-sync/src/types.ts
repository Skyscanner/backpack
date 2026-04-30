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

import type {
  LocalVariable,
  LocalVariableCollection,
} from './figma-api';

// DTCG token types we emit. Narrower than the full DTCG spec — only the types
// Backpack's Figma variables actually produce today. `'number'` is used for
// unitless FLOAT variables such as opacity and line-height multipliers, so
// they're not mis-serialised as dimensions with a spurious `px` suffix.
export type DtcgTokenType =
  | 'boolean'
  | 'color'
  | 'dimension'
  | 'fontFamily'
  | 'fontWeight'
  | 'number'
  | 'string';

// Scalar value assigned to $value. DTCG also allows objects for composite
// types (e.g. typography) but Backpack variables only emit primitives.
export type DtcgScalar = boolean | number | string;

export interface DtcgToken {
  $value: DtcgScalar;
  $type?: DtcgTokenType;
}

// Recursive DTCG group: a node is either a token (has $value) or another group
// of named children. $type on a group applies to descendants without their own.
export type DtcgTree = {
  $type?: DtcgTokenType;
  [segment: string]: DtcgToken | DtcgTree | DtcgTokenType | undefined;
};

// Collection role drives output naming and alias preservation semantics:
// - primitive: low-level values (colours, raw dimensions) written as literals
// - semantic: higher-level mappings; aliases to other selected collections are
//   preserved as DTCG `{Group.Token}` references rather than inlined
export type CollectionRole = 'primitive' | 'semantic';

export interface ClassifiedCollection {
  collection: LocalVariableCollection;
  role: CollectionRole;
}

// Reason tag on a skipped variable. Each reason has a dedicated cause field
// in `SkippedVariableRecord` so downstream logging can group by reason.
export type SkippedVariableReason =
  | 'unresolved-alias'
  | 'missing-mode-value'
  | 'path-collision'
  | 'invalid-name';

// Diagnostic record for a variable that was skipped while building the tree.
// Surfaced in logs so designers can find and fix the offending source data.
export interface SkippedVariableRecord {
  // The iterated variable — i.e. the one that ends up missing from output.
  variableName: string;
  // The source variable id and key help designers find the broken token in
  // Figma even when the displayed name has been renamed or removed in the UI.
  variableId: string;
  variableKey: string;
  // Why this variable was skipped. Narrows which of the cause fields below
  // will be populated.
  reason: SkippedVariableReason;
  // Present when `reason === 'unresolved-alias'`. The alias id that couldn't
  // be resolved against the local variable set.
  unresolvedAliasId?: string;
  // Present when `reason === 'unresolved-alias'` and the chain broke at a
  // different variable than `variableName`
  // (i.e. variableName → … → unresolvedAt → <missing>).
  unresolvedAt?: string;
  // Present when `reason === 'missing-mode-value'`. The mode name that had
  // no value assigned for this variable.
  missingModeName?: string;
  // Present when `reason === 'path-collision'`. The variable name already
  // occupying the path — either as a token the new variable wants to descend
  // into, or as a group the new variable wants to overwrite.
  collidingVariableName?: string;
  // Present when `reason === 'invalid-name'`. Short description of why the
  // variable name couldn't be placed in the tree (e.g. empty path segment).
  invalidNameReason?: string;
}

export interface DtcgModeOutputStats {
  // Number of tokens written into the tree for this mode (excludes skipped).
  tokenCount: number;
  // Aliases preserved as `{...}` references to another selected collection.
  preservedAliasCount: number;
  // Aliases resolved to literal values (including transitively).
  inlinedAliasCount: number;
  // Variables skipped because their alias chain could not be resolved.
  skippedVariableCount: number;
  // Per-variable detail for the skipped count above. Empty when nothing
  // was skipped, or when the caller left `skipUnresolvedAliases` off.
  skippedVariables: SkippedVariableRecord[];
}

export interface DtcgModeOutput {
  collectionName: string;
  modeName: string;
  role: CollectionRole;
  tree: DtcgTree;
  stats: DtcgModeOutputStats;
}

export interface DtcgManifestFileRecord {
  fileName: string;
  collectionName: string;
  modeName: string;
  role: CollectionRole;
  variableCount: number;
  preservedAliasCount: number;
  inlinedAliasCount: number;
  skippedVariableCount: number;
}

export interface DtcgManifest {
  generatedAt: string;
  files: DtcgManifestFileRecord[];
}

// Minimal alias / color shapes used internally; the `@figma/rest-api-spec`
// types are wider (they include RGB without alpha etc.), so we narrow here.
export interface FigmaVariableAlias {
  type: 'VARIABLE_ALIAS';
  id: string;
}

export interface FigmaRGBA {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface ResolveContext {
  localVariablesById: Record<string, LocalVariable>;
  localVariablesByKey: Map<string, LocalVariable[]>;
  localCollectionsById: Record<string, LocalVariableCollection>;
  // Keys of variables that, when referenced by an alias, should be preserved
  // as DTCG `{Path.To.Token}` references rather than inlined.
  preservedReferenceKeys: Set<string>;
}

export interface ResolveValueResult {
  value: DtcgScalar;
  // Set when the result is a `{...}` reference preserving an alias target.
  preservedAliasTo?: string;
  // Set when the original variable was an alias and we inlined its literal.
  inlinedFrom?: string;
}
