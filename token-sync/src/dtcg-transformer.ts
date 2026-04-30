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

import type { LocalVariable, LocalVariableCollection } from './figma-api';
import type {
  ClassifiedCollection,
  CollectionRole,
  DTCGModeOutput,
  DTCGScalar,
  DTCGToken,
  DTCGTokenType,
  DTCGTree,
  FigmaRGBA,
  FigmaVariableAlias,
  ResolveContext,
  ResolveValueResult,
  SkippedVariableRecord,
} from './types';

// Target collections and how each is classified. Keep in one place so future
// additions require a single edit.
export const COLLECTION_ROLES: Record<string, CollectionRole> = {
  Primitives: 'primitive',
  Backpack: 'semantic',
};

export type DTCGTransformErrorReason =
  | 'unresolved-alias'
  | 'alias-cycle'
  | 'missing-mode-value'
  | 'path-collision';

export interface DTCGTransformErrorDetails {
  aliasId?: string;
  variableName: string;
  modeName?: string;
  collidingVariableName?: string;
}

export class DTCGTransformError extends Error {
  readonly reason: DTCGTransformErrorReason;

  readonly aliasId?: string;

  readonly variableName: string;

  readonly modeName?: string;

  readonly collidingVariableName?: string;

  constructor(
    reason: DTCGTransformErrorReason,
    details: DTCGTransformErrorDetails,
  ) {
    super(buildTransformErrorMessage(reason, details));
    this.name = 'DTCGTransformError';
    this.reason = reason;
    this.aliasId = details.aliasId;
    this.variableName = details.variableName;
    this.modeName = details.modeName;
    this.collidingVariableName = details.collidingVariableName;
  }
}

function buildTransformErrorMessage(
  reason: DTCGTransformErrorReason,
  details: DTCGTransformErrorDetails,
): string {
  switch (reason) {
    case 'unresolved-alias':
      return `Could not resolve alias target "${details.aliasId}" for "${details.variableName}"`;
    case 'alias-cycle':
      return `Alias cycle detected while resolving "${details.variableName}"`;
    case 'missing-mode-value':
      return `Variable "${details.variableName}" has no value for mode "${details.modeName}"`;
    case 'path-collision':
      return (
        `DTCG path collision: cannot place "${details.variableName}" because ` +
        `"${details.collidingVariableName}" already occupies part of the same path.`
      );
    default:
      return `DTCG transform error for "${details.variableName}"`;
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

// Figma FLOAT scopes that unambiguously indicate a unitless numeric value.
// OPACITY is 0..1; LINE_HEIGHT is commonly a multiplier (1.5) in Figma and
// converting it to "1.5px" is always wrong.
const NUMBER_FLOAT_SCOPES: readonly string[] = ['OPACITY', 'LINE_HEIGHT'];

export function inferDTCGType(variable: LocalVariable): DTCGTokenType {
  switch (variable.resolvedType) {
    case 'COLOR':
      return 'color';
    case 'BOOLEAN':
      return 'boolean';
    case 'STRING':
      return variable.scopes.includes('FONT_FAMILY') ? 'fontFamily' : 'string';
    case 'FLOAT': {
      // FONT_STYLE is Figma's scope for font weight sliders.
      if (variable.scopes.includes('FONT_STYLE')) return 'fontWeight';
      if (
        variable.scopes.some((scope) => NUMBER_FLOAT_SCOPES.includes(scope))
      ) {
        return 'number';
      }
      // Everything else (sizes, spacings, radii, ALL_SCOPES, unknown) is a
      // dimension — the vast majority of Backpack FLOAT variables today.
      return 'dimension';
    }
    default:
      return 'string';
  }
}

// Normalize a Figma literal value to a DTCG scalar. `tokenType` controls
// dimension suffixing and lets colours be written as strings.
export function normalizeLiteralValue(
  value: unknown,
  tokenType: DTCGTokenType,
): DTCGScalar {
  if (isColorValue(value)) {
    return figmaColorToCss(value);
  }
  if (typeof value === 'number') {
    // JSON.stringify turns NaN / Infinity into `null`, which would silently
    // produce broken downstream tokens. Fail loudly instead.
    if (!Number.isFinite(value)) {
      throw new Error(
        `Non-finite numeric value for DTCG token type "${tokenType}": ${String(value)}`,
      );
    }
    return tokenType === 'dimension' ? `${value}px` : value;
  }
  if (typeof value === 'string' || typeof value === 'boolean') {
    return value;
  }
  throw new Error(
    `Unsupported literal value for DTCG token type "${tokenType}": ${JSON.stringify(value)}`,
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
    throw new DTCGTransformError('missing-mode-value', {
      variableName: variable.name,
      modeName: sourceModeName,
    });
  }

  const tokenType = inferDTCGType(variable);

  if (!isAliasValue(rawValue)) {
    return { value: normalizeLiteralValue(rawValue, tokenType) };
  }

  const target = resolveAliasTarget(rawValue.id, context);
  if (!target) {
    throw new DTCGTransformError('unresolved-alias', {
      aliasId: rawValue.id,
      variableName: variable.name,
    });
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
    throw new DTCGTransformError('alias-cycle', {
      variableName: variable.name,
    });
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

// Variable-name validation --------------------------------------------------

// Returns a short reason string when `variableName` would produce empty tree
// segments (which DTCG can't represent cleanly), or `undefined` if the name
// is well-formed. Exported so callers can decide whether to skip or throw.
export function describeInvalidVariableName(
  variableName: string,
): string | undefined {
  if (variableName.length === 0) return 'name is empty';
  const segments = variableName.split('/');
  if (segments.some((segment) => segment.length === 0)) {
    return 'name contains an empty path segment (leading/trailing or consecutive "/")';
  }
  return undefined;
}

// Tree building -------------------------------------------------------------

// Track, per tree, which variable name first claimed each path. Used by
// setTokenAtPath to report both sides of a collision (the new variable and
// the already-written one).
const PATH_OWNERS = new WeakMap<DTCGTree, Map<string, string>>();

function recordPathOwner(
  tree: DTCGTree,
  pathKey: string,
  variableName: string,
): void {
  let owners = PATH_OWNERS.get(tree);
  if (!owners) {
    owners = new Map<string, string>();
    PATH_OWNERS.set(tree, owners);
  }
  owners.set(pathKey, variableName);
}

function ownerOf(tree: DTCGTree, pathKey: string): string | undefined {
  return PATH_OWNERS.get(tree)?.get(pathKey);
}

// Breadth-first search under `node` for any recorded path owner. Used to
// name a concrete variable when a leaf collision hits a group that was
// created implicitly (no owner was recorded at the exact prefix path).
function findOwnerBelow(
  tree: DTCGTree,
  node: Record<string, unknown>,
  nodePath: string,
): string | undefined {
  const owners = PATH_OWNERS.get(tree);
  if (!owners) return undefined;
  const queue: Array<[Record<string, unknown>, string]> = [[node, nodePath]];
  while (queue.length > 0) {
    const [current, currentPath] = queue.shift()!;
    for (const [segmentKey, value] of Object.entries(current)) {
      if (segmentKey !== '$type') {
        const childPath = `${currentPath}/${segmentKey}`;
        const maybeOwner = owners.get(childPath);
        if (maybeOwner) return maybeOwner;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          queue.push([value as Record<string, unknown>, childPath]);
        }
      }
    }
  }
  return undefined;
}

function isTokenNode(value: unknown): value is DTCGToken {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    '$value' in (value as Record<string, unknown>)
  );
}

// Set `token` at the nested path derived from a Figma variable name like
// "Colour/Brand/Pink" — each slash becomes a nested group.
//
// Throws `DTCGTransformError` with reason `path-collision` when a prefix of
// the path is already a
// written token (e.g. "Color/Brand" exists, adding "Color/Brand/Pink"), or
// when the leaf position is already a non-empty group (e.g. "Color/Brand/Pink"
// exists, adding "Color/Brand"). The caller decides whether to treat that as
// fatal or to skip the colliding variable.
export function setTokenAtPath(
  tree: DTCGTree,
  variableName: string,
  token: DTCGToken,
): void {
  const segments = variableName.split('/');
  let current = tree as Record<string, unknown>;

  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];
    const prefixPath = segments.slice(0, index + 1).join('/');

    if (index === segments.length - 1) {
      const existing = current[segment];
      // Leaf-vs-group collision: the last segment is already a non-empty
      // group — some other variable wrote a deeper path through here first.
      // Prefer the explicit owner if we recorded one at this exact path,
      // otherwise walk any descendant to name a concrete offender.
      if (
        existing &&
        typeof existing === 'object' &&
        !Array.isArray(existing) &&
        !isTokenNode(existing)
      ) {
        const existingRecord = existing as Record<string, unknown>;
        const childKeys = Object.keys(existingRecord).filter(
          (key) => key !== '$type',
        );
        if (childKeys.length > 0) {
          const collider =
            ownerOf(tree, prefixPath) ??
            findOwnerBelow(tree, existingRecord, prefixPath) ??
            '<existing group>';
          throw new DTCGTransformError('path-collision', {
            variableName,
            collidingVariableName: collider,
          });
        }
      }
      current[segment] = token;
      recordPathOwner(tree, prefixPath, variableName);
      return;
    }

    const existing = current[segment];
    // Token-vs-group collision: an ancestor slot is already a leaf token;
    // descending into it would produce a node with both $value and children.
    if (isTokenNode(existing)) {
      const collider = ownerOf(tree, prefixPath) ?? '<unknown>';
      throw new DTCGTransformError('path-collision', {
        variableName,
        collidingVariableName: collider,
      });
    }
    if (!existing || typeof existing !== 'object' || Array.isArray(existing)) {
      current[segment] = {};
    }
    current = current[segment] as Record<string, unknown>;
  }
}

// Walk the variable list and assign a group-level $type when every descendant
// of that group shares a single DTCG type. Reduces verbosity in output files.
export function addGroupTypes(tree: DTCGTree, variables: LocalVariable[]): void {
  const groupTypes = new Map<string, Set<DTCGTokenType>>();

  for (const variable of variables) {
    const segments = variable.name.split('/');
    const tokenType = inferDTCGType(variable);
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
  inheritedType?: DTCGTokenType,
): void {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return;

  const record = node as Record<string, unknown>;
  const ownType =
    typeof record.$type === 'string' ? (record.$type as DTCGTokenType) : undefined;
  const isLeaf = '$value' in record;

  if (ownType && inheritedType && ownType === inheritedType) {
    delete record.$type;
  }

  const nextInheritedType =
    (record.$type as DTCGTokenType | undefined) ?? inheritedType;
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
export function buildDTCGTreeForMode(
  classifiedCollection: ClassifiedCollection,
  modeName: string,
  collectionVariables: LocalVariable[],
  context: ResolveContext,
  options: { skipUnresolvedAliases?: boolean } = {},
): DTCGModeOutput {
  const tree: DTCGTree = {};
  let preservedAliasCount = 0;
  let inlinedAliasCount = 0;
  const skippedVariables: SkippedVariableRecord[] = [];
  const writtenVariables: LocalVariable[] = [];

  const sorted = [...collectionVariables].sort((left, right) =>
    left.name.localeCompare(right.name),
  );

  for (const variable of sorted) {
    let shouldWriteVariable = true;

    // Reject names that would produce empty tree segments (leading/trailing
    // slash, consecutive slashes, or "/"). These can't be represented as a
    // DTCG path so skip rather than silently write a node at key "".
    const invalidNameReason = describeInvalidVariableName(variable.name);
    if (invalidNameReason) {
      if (options.skipUnresolvedAliases) {
        skippedVariables.push({
          variableName: variable.name,
          variableId: variable.id,
          variableKey: variable.key,
          reason: 'invalid-name',
          invalidNameReason,
        });
        shouldWriteVariable = false;
      } else {
        throw new Error(
          `Invalid variable name "${variable.name}": ${invalidNameReason}`,
        );
      }
    }

    let resolved: ResolveValueResult | undefined;
    if (shouldWriteVariable) {
      try {
        resolved = resolveVariableValue(variable, modeName, context);
      } catch (error: unknown) {
        if (
          options.skipUnresolvedAliases &&
          error instanceof DTCGTransformError &&
          error.reason === 'unresolved-alias'
        ) {
          skippedVariables.push({
            variableName: variable.name,
            variableId: variable.id,
            variableKey: variable.key,
            reason: 'unresolved-alias',
            unresolvedAliasId: error.aliasId,
            // When the chain broke at a different variable (X → M → missing),
            // remember M so the diagnostic can point at it.
            ...(error.variableName !== variable.name
              ? { unresolvedAt: error.variableName }
              : {}),
          });
          shouldWriteVariable = false;
        } else if (
          options.skipUnresolvedAliases &&
          error instanceof DTCGTransformError &&
          error.reason === 'missing-mode-value'
        ) {
          skippedVariables.push({
            variableName: variable.name,
            variableId: variable.id,
            variableKey: variable.key,
            reason: 'missing-mode-value',
            missingModeName: error.modeName,
          });
          shouldWriteVariable = false;
        } else {
          throw error;
        }
      }
    }

    if (shouldWriteVariable && resolved) {
      if (resolved.preservedAliasTo) preservedAliasCount += 1;
      if (resolved.inlinedFrom) inlinedAliasCount += 1;

      try {
        setTokenAtPath(tree, variable.name, {
          $value: resolved.value,
          $type: inferDTCGType(variable),
        });
      } catch (error: unknown) {
        if (
          options.skipUnresolvedAliases &&
          error instanceof DTCGTransformError &&
          error.reason === 'path-collision'
        ) {
          skippedVariables.push({
            variableName: variable.name,
            variableId: variable.id,
            variableKey: variable.key,
            reason: 'path-collision',
            collidingVariableName: error.collidingVariableName,
          });
          // Undo the alias counters we bumped for a write that didn't land.
          if (resolved.preservedAliasTo) preservedAliasCount -= 1;
          if (resolved.inlinedFrom) inlinedAliasCount -= 1;
          shouldWriteVariable = false;
        } else {
          throw error;
        }
      }

      if (shouldWriteVariable) {
        writtenVariables.push(variable);
      }
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
      skippedVariableCount: skippedVariables.length,
      skippedVariables,
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
