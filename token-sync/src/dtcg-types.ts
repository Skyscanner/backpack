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
// Backpack's Figma variables actually produce today.
export type DTCGTokenType =
  | 'boolean'
  | 'color'
  | 'dimension'
  | 'fontFamily'
  | 'fontWeight'
  | 'string';

// Scalar value assigned to $value. DTCG also allows objects for composite
// types (e.g. typography) but Backpack variables only emit primitives.
export type DTCGScalar = boolean | number | string;

export interface DTCGToken {
  $value: DTCGScalar;
  $type?: DTCGTokenType;
}

// Recursive DTCG group: a node is either a token (has $value) or another group
// of named children. $type on a group applies to descendants without their own.
export type DTCGTree = {
  $type?: DTCGTokenType;
  [segment: string]: DTCGToken | DTCGTree | DTCGTokenType | undefined;
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

export interface DTCGModeOutputStats {
  // Number of tokens written into the tree for this mode (excludes skipped).
  tokenCount: number;
  // Aliases preserved as `{...}` references to another selected collection.
  preservedAliasCount: number;
  // Aliases resolved to literal values (including transitively).
  inlinedAliasCount: number;
  // Variables skipped because their alias chain could not be resolved.
  skippedVariableCount: number;
}

export interface DTCGModeOutput {
  collectionName: string;
  modeName: string;
  role: CollectionRole;
  tree: DTCGTree;
  stats: DTCGModeOutputStats;
}

export interface DTCGManifestFileRecord {
  fileName: string;
  collectionName: string;
  modeName: string;
  role: CollectionRole;
  variableCount: number;
  preservedAliasCount: number;
  inlinedAliasCount: number;
  skippedVariableCount: number;
}

export interface DTCGManifest {
  fileKey: string;
  sourceFileUrl: string;
  generatedAt: string;
  files: DTCGManifestFileRecord[];
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
  value: DTCGScalar;
  // Set when the result is a `{...}` reference preserving an alias target.
  preservedAliasTo?: string;
  // Set when the original variable was an alias and we inlined its literal.
  inlinedFrom?: string;
}
