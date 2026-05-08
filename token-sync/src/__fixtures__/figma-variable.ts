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

// Test fixtures shared across transformer / writer / sync tests. Data here
// stays small on purpose — every case should exercise a single concern the
// transformer needs to handle (aliases, modes, cycles, colours, etc.). The
// `@figma/rest-api-spec` types require many fields we don't care about; we
// cast partials through `unknown` to keep fixtures minimal.

import type {
  GetLocalVariablesResponse,
  LocalVariable,
  LocalVariableCollection,
} from '../figma-api';

type PartialCollection = Partial<LocalVariableCollection> & {
  id: string;
  name: string;
  modes: LocalVariableCollection['modes'];
  defaultModeId: string;
  remote: boolean;
  key: string;
};

type PartialVariable = Partial<LocalVariable> & {
  id: string;
  key: string;
  name: string;
  variableCollectionId: string;
  resolvedType: LocalVariable['resolvedType'];
  valuesByMode: LocalVariable['valuesByMode'];
  scopes: LocalVariable['scopes'];
  remote: boolean;
};

function makeCollection(
  collection: PartialCollection,
): LocalVariableCollection {
  return collection as unknown as LocalVariableCollection;
}

function makeVariable(variable: PartialVariable): LocalVariable {
  return variable as unknown as LocalVariable;
}

// Mode names (the human-readable label visible in Figma).
export const PRIMITIVES_MODE_HEX = 'Hex';
export const BACKPACK_MODE_LIGHT = 'Light';
export const BACKPACK_MODE_DARK = 'Dark';

// Mode ids (opaque in real Figma — keep them distinct from names so the
// fixture exercises the same shape the production API returns).
export const PRIMITIVES_MODE_HEX_ID = 'mode-hex';
export const BACKPACK_MODE_LIGHT_ID = 'mode-light';
export const BACKPACK_MODE_DARK_ID = 'mode-dark';

export const PRIMITIVES_COLLECTION_ID = 'collection-primitives';
export const BACKPACK_COLLECTION_ID = 'collection-backpack';

// Keys
export const KEY_COLOUR_PINK = 'key-colour-pink';
export const KEY_COLOUR_BERRY = 'key-colour-berry';
export const KEY_SPACING_MD = 'key-spacing-medium';
export const KEY_SEM_CANVAS_DEFAULT = 'key-semantic-canvas-default';
export const KEY_SEM_CANVAS_CONTRAST = 'key-semantic-canvas-contrast';
export const KEY_SEM_SURFACE = 'key-semantic-surface';
export const KEY_SEM_INTERNAL_SHORTCUT = 'key-semantic-internal-shortcut';
export const KEY_SEM_CYCLE_A = 'key-semantic-cycle-a';
export const KEY_SEM_CYCLE_B = 'key-semantic-cycle-b';
export const KEY_SEM_BROKEN = 'key-semantic-broken';

// Collections
export const primitivesCollection: LocalVariableCollection = makeCollection({
  id: PRIMITIVES_COLLECTION_ID,
  key: 'collection-key-primitives',
  name: 'Primitives',
  modes: [{ modeId: PRIMITIVES_MODE_HEX_ID, name: PRIMITIVES_MODE_HEX }],
  defaultModeId: PRIMITIVES_MODE_HEX_ID,
  remote: false,
});

export const backpackCollection: LocalVariableCollection = makeCollection({
  id: BACKPACK_COLLECTION_ID,
  key: 'collection-key-backpack',
  name: 'Backpack',
  modes: [
    { modeId: BACKPACK_MODE_LIGHT_ID, name: BACKPACK_MODE_LIGHT },
    { modeId: BACKPACK_MODE_DARK_ID, name: BACKPACK_MODE_DARK },
  ],
  defaultModeId: BACKPACK_MODE_LIGHT_ID,
  remote: false,
});

// Variables
export const primitiveColourPink: LocalVariable = makeVariable({
  id: 'variable-colour-pink',
  key: KEY_COLOUR_PINK,
  name: 'Colour/Pink',
  variableCollectionId: PRIMITIVES_COLLECTION_ID,
  resolvedType: 'COLOR',
  // Opaque RGBA → hex output
  valuesByMode: {
    [PRIMITIVES_MODE_HEX_ID]: { r: 1, g: 0.4, b: 0.7, a: 1 },
  },
  scopes: ['ALL_SCOPES'],
  remote: false,
});

export const primitiveColourBerry: LocalVariable = makeVariable({
  id: 'variable-colour-berry',
  key: KEY_COLOUR_BERRY,
  name: 'Colour/Berry',
  variableCollectionId: PRIMITIVES_COLLECTION_ID,
  resolvedType: 'COLOR',
  // Transparent RGBA → rgba() output
  valuesByMode: {
    [PRIMITIVES_MODE_HEX_ID]: { r: 0, g: 0, b: 0, a: 0.5 },
  },
  scopes: ['ALL_SCOPES'],
  remote: false,
});

export const primitiveSpacingMd: LocalVariable = makeVariable({
  id: 'variable-spacing-medium',
  key: KEY_SPACING_MD,
  name: 'Spacing/md',
  variableCollectionId: PRIMITIVES_COLLECTION_ID,
  resolvedType: 'FLOAT',
  valuesByMode: { [PRIMITIVES_MODE_HEX_ID]: 8 },
  scopes: ['GAP'],
  remote: false,
});

// Semantic token aliasing a primitive in another collection —
// should be preserved as `{Colour.Pink}` on Light, `{Colour.Berry}` on Dark.
export const semanticCanvasDefault: LocalVariable = makeVariable({
  id: 'variable-semantic-canvas-default',
  key: KEY_SEM_CANVAS_DEFAULT,
  name: 'Canvas/Default',
  variableCollectionId: BACKPACK_COLLECTION_ID,
  resolvedType: 'COLOR',
  valuesByMode: {
    [BACKPACK_MODE_LIGHT_ID]: { type: 'VARIABLE_ALIAS', id: 'variable-colour-pink' },
    [BACKPACK_MODE_DARK_ID]: { type: 'VARIABLE_ALIAS', id: 'variable-colour-berry' },
  },
  scopes: ['ALL_FILLS'],
  remote: false,
});

// Semantic token aliasing another semantic token in the SAME collection —
// should be inlined. Chains through `canvas-default` → `colour-pink` to
// exercise nested alias resolution.
export const semanticCanvasContrast: LocalVariable = makeVariable({
  id: 'variable-semantic-canvas-contrast',
  key: KEY_SEM_CANVAS_CONTRAST,
  name: 'Canvas/Contrast',
  variableCollectionId: BACKPACK_COLLECTION_ID,
  resolvedType: 'COLOR',
  valuesByMode: {
    [BACKPACK_MODE_LIGHT_ID]: { type: 'VARIABLE_ALIAS', id: 'variable-semantic-canvas-default' },
    [BACKPACK_MODE_DARK_ID]: { type: 'VARIABLE_ALIAS', id: 'variable-semantic-canvas-default' },
  },
  scopes: ['ALL_FILLS'],
  remote: false,
});

// Semantic token aliasing a primitive via a subscribed-id id form
// ("VariableID:<key>/<sub>") — exercises resolveAliasTarget's key fallback.
export const semanticSurface: LocalVariable = makeVariable({
  id: 'variable-semantic-surface',
  key: KEY_SEM_SURFACE,
  name: 'Surface/Default',
  variableCollectionId: BACKPACK_COLLECTION_ID,
  resolvedType: 'COLOR',
  valuesByMode: {
    [BACKPACK_MODE_LIGHT_ID]: {
      type: 'VARIABLE_ALIAS',
      id: `VariableID:${KEY_COLOUR_PINK}/abc123`,
    },
    [BACKPACK_MODE_DARK_ID]: {
      type: 'VARIABLE_ALIAS',
      id: `VariableID:${KEY_COLOUR_BERRY}/abc123`,
    },
  },
  scopes: ['ALL_FILLS'],
  remote: false,
});

// Cycle pair: a → b, b → a. Either direction should throw.
export const semanticCycleA: LocalVariable = makeVariable({
  id: 'variable-semantic-cycle-a',
  key: KEY_SEM_CYCLE_A,
  name: 'Cycle/A',
  variableCollectionId: BACKPACK_COLLECTION_ID,
  resolvedType: 'COLOR',
  valuesByMode: {
    [BACKPACK_MODE_LIGHT_ID]: { type: 'VARIABLE_ALIAS', id: 'variable-semantic-cycle-b' },
    [BACKPACK_MODE_DARK_ID]: { type: 'VARIABLE_ALIAS', id: 'variable-semantic-cycle-b' },
  },
  scopes: ['ALL_FILLS'],
  remote: false,
});

export const semanticCycleB: LocalVariable = makeVariable({
  id: 'variable-semantic-cycle-b',
  key: KEY_SEM_CYCLE_B,
  name: 'Cycle/B',
  variableCollectionId: BACKPACK_COLLECTION_ID,
  resolvedType: 'COLOR',
  valuesByMode: {
    [BACKPACK_MODE_LIGHT_ID]: { type: 'VARIABLE_ALIAS', id: 'variable-semantic-cycle-a' },
    [BACKPACK_MODE_DARK_ID]: { type: 'VARIABLE_ALIAS', id: 'variable-semantic-cycle-a' },
  },
  scopes: ['ALL_FILLS'],
  remote: false,
});

// Semantic token whose alias target does not exist in the local variable set.
export const semanticBroken: LocalVariable = makeVariable({
  id: 'variable-semantic-broken',
  key: KEY_SEM_BROKEN,
  name: 'Broken/Missing',
  variableCollectionId: BACKPACK_COLLECTION_ID,
  resolvedType: 'COLOR',
  valuesByMode: {
    [BACKPACK_MODE_LIGHT_ID]: { type: 'VARIABLE_ALIAS', id: 'variable-does-not-exist' },
    [BACKPACK_MODE_DARK_ID]: { type: 'VARIABLE_ALIAS', id: 'variable-does-not-exist' },
  },
  scopes: ['ALL_FILLS'],
  remote: false,
});

// Collection-less shorthand for wiring fixtures into a
// GetLocalVariablesResponse. Not exported — callers should compose their own.
function toRecord<T extends { id: string }>(items: T[]): Record<string, T> {
  return Object.fromEntries(items.map((item) => [item.id, item])) as Record<
    string,
    T
  >;
}

export interface FixtureOptions {
  includeCycle?: boolean;
  includeBroken?: boolean;
  includeSubscribedIdAlias?: boolean;
  extraCollections?: LocalVariableCollection[];
  extraVariables?: LocalVariable[];
}

// Build a GetLocalVariablesResponse containing the stable "happy path" set
// (primitives + semantic light/dark), with optional edge-case additions.
export function buildFixtureResponse(
  options: FixtureOptions = {},
): GetLocalVariablesResponse {
  const collections = [
    primitivesCollection,
    backpackCollection,
    ...(options.extraCollections ?? []),
  ];
  const variables: LocalVariable[] = [
    primitiveColourPink,
    primitiveColourBerry,
    primitiveSpacingMd,
    semanticCanvasDefault,
    semanticCanvasContrast,
    ...(options.includeSubscribedIdAlias ? [semanticSurface] : []),
    ...(options.includeCycle ? [semanticCycleA, semanticCycleB] : []),
    ...(options.includeBroken ? [semanticBroken] : []),
    ...(options.extraVariables ?? []),
  ];

  return {
    status: 200,
    error: false,
    meta: {
      variables: toRecord(variables),
      variableCollections: toRecord(collections),
    },
  } as unknown as GetLocalVariablesResponse;
}
