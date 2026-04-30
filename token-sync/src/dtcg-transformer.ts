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
  ClassifiedCollection,
  CollectionRole,
  DtcgModeOutput,
  DtcgScalar,
  DtcgToken,
  DtcgTokenType,
  DtcgTree,
  FigmaRGBA,
  FigmaVariableAlias,
  ResolveContext,
  ResolveValueResult,
} from './dtcg-types';
import type { LocalVariable, LocalVariableCollection } from './figma-api';

// Target collections and how each is classified. Keep in one place so future
// additions require a single edit.
export const COLLECTION_ROLES: Record<string, CollectionRole> = {
  Primitives: 'primitive',
  Backpack: 'semantic',
};

export class UnresolvedAliasError extends Error {
  constructor(aliasId: string, variableName: string) {
    super(`Could not resolve alias target "${aliasId}" for "${variableName}"`);
    this.name = 'UnresolvedAliasError';
  }
}

export class AliasCycleError extends Error {
  constructor(variableName: string) {
    super(`Alias cycle detected while resolving "${variableName}"`);
    this.name = 'AliasCycleError';
  }
}

// Type guards ----------------------------------------------------------------

export function isAliasValue(value: unknown): value is FigmaVariableAlias {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as { type: unknown }).type === 'VARIABLE_ALIAS' &&
    'id' in value &&
    typeof (value as { id: unknown }).id === 'string'
  );
}

export function isColorValue(value: unknown): value is FigmaRGBA {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.r === 'number' &&
    typeof record.g === 'number' &&
    typeof record.b === 'number'
  );
}

// A canonical local variable id has the shape "VariableID:xxxx:yy". The
// Figma Variables API sometimes references subscribed variables via an id
// like "VariableID:xxxx/yy" — the slash form is not the canonical local id.
function isCanonicalLocalId(id: string): boolean {
  return !id.replace('VariableID:', '').includes('/');
}

// Value conversion -----------------------------------------------------------

// Convert Figma's 0..1 RGBA to a CSS hex or rgba() string. Hex is used when
// alpha is fully opaque, rgba() when any transparency is present.
export function figmaColorToCss(value: FigmaRGBA): string {
  const to255 = (channel: number) => Math.round(channel * 255);
  const [red, green, blue] = [value.r, value.g, value.b].map(to255);
  const alpha = value.a ?? 1;

  if (alpha < 1) {
    const trimmedAlpha = Number(alpha.toFixed(3));
    return `rgba(${red}, ${green}, ${blue}, ${trimmedAlpha})`;
  }

  const hex = [red, green, blue]
    .map((channel) => channel.toString(16).padStart(2, '0'))
    .join('');
  return `#${hex}`;
}

export function inferDtcgType(variable: LocalVariable): DtcgTokenType {
  switch (variable.resolvedType) {
    case 'COLOR':
      return 'color';
    case 'BOOLEAN':
      return 'boolean';
    case 'STRING':
      return variable.scopes.includes('FONT_FAMILY') ? 'fontFamily' : 'string';
    case 'FLOAT':
      // FONT_STYLE is Figma's scope for font weight sliders; everything else
      // (sizes, spacings, radii, line-heights) is a dimension.
      return variable.scopes.includes('FONT_STYLE') ? 'fontWeight' : 'dimension';
    default:
      return 'string';
  }
}

// Normalize a Figma literal value to a DTCG scalar. `dtcgType` controls
// dimension suffixing and lets colours be written as strings.
export function normalizeLiteralValue(
  value: unknown,
  dtcgType: DtcgTokenType,
): DtcgScalar {
  if (isColorValue(value)) {
    return figmaColorToCss(value);
  }
  if (typeof value === 'number') {
    return dtcgType === 'dimension' ? `${value}px` : value;
  }
  if (typeof value === 'string' || typeof value === 'boolean') {
    return value;
  }
  throw new Error(
    `Unsupported literal value for DTCG token type "${dtcgType}": ${JSON.stringify(value)}`,
  );
}

// Classification ------------------------------------------------------------

export function classifyCollections(
  collections: LocalVariableCollection[],
): ClassifiedCollection[] {
  const classified: ClassifiedCollection[] = [];
  for (const collection of collections) {
    const role = COLLECTION_ROLES[collection.name];
    if (!role) {
      throw new Error(
        `Unknown target collection "${collection.name}". Expected one of: ${Object.keys(
          COLLECTION_ROLES,
        ).join(', ')}.`,
      );
    }
    classified.push({ collection, role });
  }
  return classified;
}

// Alias resolution ----------------------------------------------------------

export function resolveAliasTarget(
  aliasId: string,
  context: ResolveContext,
): LocalVariable | undefined {
  // Direct id match — the common path for same-file aliases.
  if (context.localVariablesById[aliasId]) {
    return context.localVariablesById[aliasId];
  }

  // Subscribed ids: "VariableID:<key>/<sub>". Fall back to matching by the
  // variable key portion so cross-library aliases still resolve.
  const [prefixedKey] = aliasId.split('/', 1);
  const key = prefixedKey.replace('VariableID:', '');
  const candidates = context.localVariablesByKey.get(key);
  if (!candidates || candidates.length === 0) {
    return undefined;
  }
  const canonicalCandidate = candidates.find((candidate) =>
    isCanonicalLocalId(candidate.id),
  );
  return canonicalCandidate ?? candidates[0];
}

// Pick the mode id for a collection by preferred name, falling back to the
// collection's default mode or (for single-mode collections) its only mode.
export function getCollectionModeId(
  collection: LocalVariableCollection,
  preferredModeName: string,
): string {
  const preferred = collection.modes.find(
    (mode) => mode.name === preferredModeName,
  );
  if (preferred) return preferred.modeId;

  if (collection.defaultModeId) return collection.defaultModeId;

  if (collection.modes.length === 1) return collection.modes[0].modeId;

  throw new Error(
    `Could not resolve mode "${preferredModeName}" for collection "${collection.name}"`,
  );
}

// Resolve a variable's value for a mode, following alias chains. Aliases
// pointing at a preserved-reference variable return a `{Group.Token}` DTCG
// reference; other aliases are inlined all the way to the literal value.
export function resolveVariableValue(
  variable: LocalVariable,
  sourceModeName: string,
  context: ResolveContext,
  seen: ReadonlySet<string> = new Set<string>(),
): ResolveValueResult {
  const collection = context.localCollectionsById[variable.variableCollectionId];
  if (!collection) {
    throw new Error(
      `Missing local collection "${variable.variableCollectionId}" for variable "${variable.name}"`,
    );
  }

  const modeId = getCollectionModeId(collection, sourceModeName);
  const rawValue = variable.valuesByMode[modeId];
  if (rawValue === undefined) {
    throw new Error(
      `Variable "${variable.name}" has no value for mode "${sourceModeName}"`,
    );
  }

  const dtcgType = inferDtcgType(variable);

  if (!isAliasValue(rawValue)) {
    return { value: normalizeLiteralValue(rawValue, dtcgType) };
  }

  const target = resolveAliasTarget(rawValue.id, context);
  if (!target) {
    throw new UnresolvedAliasError(rawValue.id, variable.name);
  }

  const targetPath = target.name.replace(/\//g, '.');
  if (context.preservedReferenceKeys.has(target.key)) {
    return {
      value: `{${targetPath}}`,
      preservedAliasTo: targetPath,
    };
  }

  const seenKey = `${variable.key}:${sourceModeName}`;
  if (seen.has(seenKey)) {
    throw new AliasCycleError(variable.name);
  }
  const nextSeen = new Set(seen);
  nextSeen.add(seenKey);

  const resolved = resolveVariableValue(target, sourceModeName, context, nextSeen);
  return {
    value: resolved.value,
    // Report the immediate target path so stats reflect which var we inlined
    // from; downstream consumers can use this to produce traceability output.
    inlinedFrom: resolved.inlinedFrom ?? targetPath,
  };
}

// Tree building -------------------------------------------------------------

// Set `token` at the nested path derived from a Figma variable name like
// "Colour/Brand/Pink" — each slash becomes a nested group.
export function setTokenAtPath(
  tree: DtcgTree,
  variableName: string,
  token: DtcgToken,
): void {
  const segments = variableName.split('/');
  let current = tree as Record<string, unknown>;

  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];
    if (index === segments.length - 1) {
      current[segment] = token;
      return;
    }

    const existing = current[segment];
    if (!existing || typeof existing !== 'object' || Array.isArray(existing)) {
      current[segment] = {};
    }
    current = current[segment] as Record<string, unknown>;
  }
}

// Walk the variable list and assign a group-level $type when every descendant
// of that group shares a single DTCG type. Reduces verbosity in output files.
export function addGroupTypes(tree: DtcgTree, variables: LocalVariable[]): void {
  const groupTypes = new Map<string, Set<DtcgTokenType>>();

  for (const variable of variables) {
    const segments = variable.name.split('/');
    const tokenType = inferDtcgType(variable);
    for (let depth = 1; depth < segments.length; depth += 1) {
      const groupPath = segments.slice(0, depth).join('/');
      const existing = groupTypes.get(groupPath);
      if (existing) {
        existing.add(tokenType);
      } else {
        groupTypes.set(groupPath, new Set([tokenType]));
      }
    }
  }

  // Array.from keeps this compatible with the project's ES5 target (root
  // tsconfig). Iterating a Map directly needs --downlevelIteration.
  Array.from(groupTypes.entries()).forEach(([groupPath, types]) => {
    if (types.size !== 1) return;
    const segments = groupPath.split('/');
    let current: Record<string, unknown> | undefined = tree as Record<
      string,
      unknown
    >;
    for (const segment of segments) {
      const next = current[segment];
      if (!next || typeof next !== 'object' || Array.isArray(next)) {
        current = undefined;
        break;
      }
      current = next as Record<string, unknown>;
    }
    if (current) {
      const [onlyType] = Array.from(types);
      current.$type = onlyType;
    }
  });
}

// Remove $type from a node when it already matches the nearest ancestor's
// $type — keeps the output compact without losing information.
export function stripRedundantTypes(
  node: unknown,
  inheritedType?: DtcgTokenType,
): void {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return;

  const record = node as Record<string, unknown>;
  const ownType =
    typeof record.$type === 'string' ? (record.$type as DtcgTokenType) : undefined;
  const isLeaf = '$value' in record;

  if (ownType && inheritedType && ownType === inheritedType) {
    delete record.$type;
  }

  const nextInheritedType =
    (record.$type as DtcgTokenType | undefined) ?? inheritedType;
  if (isLeaf) return;

  for (const [segmentKey, value] of Object.entries(record)) {
    if (segmentKey !== '$type') {
      stripRedundantTypes(value, nextInheritedType);
    }
  }
}

// Per-mode build ------------------------------------------------------------

// Build the nested DTCG tree for one (collection, mode). Records which
// variables were skipped so callers can decide whether to treat that as fatal.
export function buildDtcgTreeForMode(
  classifiedCollection: ClassifiedCollection,
  modeName: string,
  collectionVariables: LocalVariable[],
  context: ResolveContext,
  options: { skipUnresolvedAliases?: boolean } = {},
): DtcgModeOutput {
  const tree: DtcgTree = {};
  let preservedAliasCount = 0;
  let inlinedAliasCount = 0;
  let skippedVariableCount = 0;
  const writtenVariables: LocalVariable[] = [];

  const sorted = [...collectionVariables].sort((left, right) =>
    left.name.localeCompare(right.name),
  );

  for (const variable of sorted) {
    let resolved: ResolveValueResult | undefined;
    try {
      resolved = resolveVariableValue(variable, modeName, context);
    } catch (error: unknown) {
      if (
        options.skipUnresolvedAliases &&
        error instanceof UnresolvedAliasError
      ) {
        skippedVariableCount += 1;
      } else {
        throw error;
      }
    }

    if (!resolved) {
      // Variable was skipped above; move on to the next one.
    } else {
      if (resolved.preservedAliasTo) preservedAliasCount += 1;
      if (resolved.inlinedFrom) inlinedAliasCount += 1;

      setTokenAtPath(tree, variable.name, {
        $value: resolved.value,
        $type: inferDtcgType(variable),
      });
      writtenVariables.push(variable);
    }
  }

  addGroupTypes(tree, writtenVariables);
  stripRedundantTypes(tree);

  return {
    collectionName: classifiedCollection.collection.name,
    modeName,
    role: classifiedCollection.role,
    tree,
    stats: {
      tokenCount: writtenVariables.length,
      preservedAliasCount,
      inlinedAliasCount,
      skippedVariableCount,
    },
  };
}

// Utilities exposed for the writer ------------------------------------------

export function buildLocalVariablesByKey(
  variables: Record<string, LocalVariable>,
): Map<string, LocalVariable[]> {
  const map = new Map<string, LocalVariable[]>();
  for (const variable of Object.values(variables)) {
    const existing = map.get(variable.key);
    if (existing) {
      existing.push(variable);
    } else {
      map.set(variable.key, [variable]);
    }
  }
  return map;
}

export function buildPreservedReferenceKeys(
  classifiedCollections: ClassifiedCollection[],
  currentCollectionId: string,
  localVariables: Record<string, LocalVariable>,
): Set<string> {
  const preserved = new Set<string>();
  const otherCollectionIds = new Set(
    classifiedCollections
      .map(({ collection }) => collection.id)
      .filter((id) => id !== currentCollectionId),
  );
  for (const variable of Object.values(localVariables)) {
    if (otherCollectionIds.has(variable.variableCollectionId)) {
      preserved.add(variable.key);
    }
  }
  return preserved;
}
