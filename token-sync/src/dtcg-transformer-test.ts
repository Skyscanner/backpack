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

import {
  BACKPACK_COLLECTION_ID,
  BACKPACK_MODE_DAY,
  BACKPACK_MODE_NIGHT,
  KEY_COLOUR_BERRY,
  KEY_COLOUR_PINK,
  PRIMITIVES_COLLECTION_ID,
  PRIMITIVES_MODE_HEX,
  backpackCollection,
  buildFixtureResponse,
  primitiveColourBerry,
  primitiveColourPink,
  primitiveSpacingMd,
  primitivesCollection,
  semanticCanvasContrast,
  semanticCanvasDefault,
  semanticCycleA,
  semanticSurface,
} from './__fixtures__/figma-variable';
import {
  addGroupTypes,
  buildDTCGTreeForMode,
  buildLocalVariablesByKey,
  buildPreservedReferenceKeys,
  classifyCollections,
  describeInvalidVariableName,
  figmaColorToCss,
  inferDTCGType,
  isAliasValue,
  isColorValue,
  normalizeLiteralValue,
  DTCGTransformError,
  resolveAliasTarget,
  resolveVariableValue,
  setTokenAtPath,
  stripRedundantTypes,
} from './dtcg-transformer';

import type { LocalVariable } from './figma-api';
import type { DTCGTree, ResolveContext } from './types';


function makeContext(
  options: {
    includeCycle?: boolean;
    includeBroken?: boolean;
    includeSubscribedIdAlias?: boolean;
    preservedKeys?: Set<string>;
  } = {},
): ResolveContext {
  const response = buildFixtureResponse(options);
  const localVariables = response.meta.variables;
  return {
    localVariablesById: localVariables,
    localVariablesByKey: buildLocalVariablesByKey(localVariables),
    localCollectionsById: response.meta.variableCollections,
    preservedReferenceKeys: options.preservedKeys ?? new Set(),
  };
}

describe('type guards', () => {
  it('isAliasValue distinguishes aliases from other objects/primitives', () => {
    expect(isAliasValue({ type: 'VARIABLE_ALIAS', id: 'x' })).toBe(true);
    expect(isAliasValue({ type: 'OTHER', id: 'x' })).toBe(false);
    expect(isAliasValue({ type: 'VARIABLE_ALIAS' })).toBe(false);
    expect(isAliasValue({ r: 0, g: 0, b: 0 })).toBe(false);
    expect(isAliasValue(null)).toBe(false);
    expect(isAliasValue(42)).toBe(false);
  });

  it('isColorValue requires r/g/b numeric fields', () => {
    expect(isColorValue({ r: 0, g: 0, b: 0 })).toBe(true);
    expect(isColorValue({ r: 1, g: 1, b: 1, a: 0.5 })).toBe(true);
    expect(isColorValue({ r: 0, g: 0 })).toBe(false);
    expect(isColorValue('#000')).toBe(false);
    expect(isColorValue(null)).toBe(false);
  });
});

describe('figmaColorToCss', () => {
  it('returns a hex value when alpha is fully opaque', () => {
    expect(figmaColorToCss({ r: 1, g: 0, b: 0 })).toBe('#ff0000');
    expect(figmaColorToCss({ r: 1, g: 0, b: 0, a: 1 })).toBe('#ff0000');
  });

  it('returns an rgba() value when alpha is below 1', () => {
    expect(figmaColorToCss({ r: 0, g: 0, b: 0, a: 0.5 })).toBe(
      'rgba(0, 0, 0, 0.5)',
    );
  });

  it('rounds channel values to the nearest integer', () => {
    expect(figmaColorToCss({ r: 0.5, g: 0.2, b: 0.9 })).toBe('#8033e6');
  });

  it('trims alpha to three decimal places', () => {
    expect(
      figmaColorToCss({ r: 0, g: 0, b: 0, a: 0.123456789 }),
    ).toBe('rgba(0, 0, 0, 0.123)');
  });
});

describe('inferDTCGType', () => {
  function fakeVariable(partial: Partial<LocalVariable>): LocalVariable {
    return {
      scopes: [],
      ...partial,
    } as unknown as LocalVariable;
  }

  it('maps COLOR to color', () => {
    expect(inferDTCGType(fakeVariable({ resolvedType: 'COLOR' }))).toBe('color');
  });

  it('maps BOOLEAN to boolean', () => {
    expect(inferDTCGType(fakeVariable({ resolvedType: 'BOOLEAN' }))).toBe(
      'boolean',
    );
  });

  it('maps STRING to fontFamily when FONT_FAMILY is in scope', () => {
    expect(
      inferDTCGType(
        fakeVariable({ resolvedType: 'STRING', scopes: ['FONT_FAMILY'] }),
      ),
    ).toBe('fontFamily');
    expect(
      inferDTCGType(fakeVariable({ resolvedType: 'STRING', scopes: [] })),
    ).toBe('string');
  });

  it('maps FLOAT to fontWeight when FONT_STYLE is in scope, else dimension', () => {
    expect(
      inferDTCGType(
        fakeVariable({ resolvedType: 'FLOAT', scopes: ['FONT_STYLE'] }),
      ),
    ).toBe('fontWeight');
    expect(
      inferDTCGType(fakeVariable({ resolvedType: 'FLOAT', scopes: ['GAP'] })),
    ).toBe('dimension');
  });

  it('maps FLOAT with OPACITY or LINE_HEIGHT scope to number (not dimension)', () => {
    expect(
      inferDTCGType(
        fakeVariable({ resolvedType: 'FLOAT', scopes: ['OPACITY'] }),
      ),
    ).toBe('number');
    expect(
      inferDTCGType(
        fakeVariable({ resolvedType: 'FLOAT', scopes: ['LINE_HEIGHT'] }),
      ),
    ).toBe('number');
  });

  it('recognises common pixel-dimension scopes explicitly', () => {
    const dimensionScopes = [
      'CORNER_RADIUS',
      'FONT_SIZE',
      'PARAGRAPH_SPACING',
      'STROKE_FLOAT',
      'WIDTH_HEIGHT',
    ] as unknown as LocalVariable['scopes'];
    for (const scope of dimensionScopes) {
      expect(
        inferDTCGType(
          fakeVariable({ resolvedType: 'FLOAT', scopes: [scope] }),
        ),
      ).toBe('dimension');
    }
  });

  it('falls back to dimension for ALL_SCOPES / empty / unknown FLOAT scopes', () => {
    expect(
      inferDTCGType(
        fakeVariable({ resolvedType: 'FLOAT', scopes: ['ALL_SCOPES'] }),
      ),
    ).toBe('dimension');
    expect(
      inferDTCGType(fakeVariable({ resolvedType: 'FLOAT', scopes: [] })),
    ).toBe('dimension');
  });
});

describe('normalizeLiteralValue', () => {
  it('converts colour objects via figmaColorToCss', () => {
    expect(normalizeLiteralValue({ r: 0, g: 0, b: 0 }, 'color')).toBe('#000000');
  });

  it('appends px to numbers for dimension type, otherwise keeps them numeric', () => {
    expect(normalizeLiteralValue(8, 'dimension')).toBe('8px');
    expect(normalizeLiteralValue(400, 'fontWeight')).toBe(400);
    expect(normalizeLiteralValue(0.5, 'number')).toBe(0.5);
    expect(normalizeLiteralValue(1.5, 'number')).toBe(1.5);
  });

  it('passes strings and booleans through unchanged', () => {
    expect(normalizeLiteralValue('Arial', 'fontFamily')).toBe('Arial');
    expect(normalizeLiteralValue(true, 'boolean')).toBe(true);
  });

  it('throws for unsupported shapes', () => {
    expect(() => normalizeLiteralValue({ foo: 1 }, 'color')).toThrow(
      /Unsupported literal value/,
    );
  });

  it('throws on NaN or Infinity (JSON.stringify would silently emit null)', () => {
    expect(() => normalizeLiteralValue(NaN, 'dimension')).toThrow(/Non-finite/);
    expect(() => normalizeLiteralValue(Infinity, 'number')).toThrow(/Non-finite/);
    expect(() => normalizeLiteralValue(-Infinity, 'fontWeight')).toThrow(
      /Non-finite/,
    );
  });
});

describe('classifyCollections', () => {
  it('assigns primitive and semantic roles to the target collections', () => {
    const classified = classifyCollections([
      primitivesCollection,
      backpackCollection,
    ]);
    expect(classified).toEqual([
      { collection: primitivesCollection, role: 'primitive' },
      { collection: backpackCollection, role: 'semantic' },
    ]);
  });

  it('throws on an unknown collection name', () => {
    const bogus = { ...primitivesCollection, name: 'VDL' };
    expect(() => classifyCollections([bogus as typeof primitivesCollection]))
      .toThrow(/Unknown target collection "VDL"/);
  });
});

describe('resolveAliasTarget', () => {
  it('returns the variable by canonical id when present', () => {
    const context = makeContext();
    expect(resolveAliasTarget('v-colour-pink', context)?.name).toBe(
      'Colour/Pink',
    );
  });

  it('falls back to matching by variable key for subscribed ids', () => {
    const context = makeContext({ includeSubscribedIdAlias: true });
    const subscribed = `VariableID:${KEY_COLOUR_PINK}/anything`;
    expect(resolveAliasTarget(subscribed, context)?.key).toBe(KEY_COLOUR_PINK);
  });

  it('returns undefined when neither id nor key resolves', () => {
    const context = makeContext();
    expect(resolveAliasTarget('v-missing', context)).toBeUndefined();
  });
});

describe('resolveVariableValue', () => {
  it('returns the literal value for a non-alias variable', () => {
    const context = makeContext();
    const result = resolveVariableValue(
      primitiveColourPink,
      'Hex',
      context,
    );
    expect(result).toEqual({ value: '#ff66b3' });
  });

  it('normalizes dimension literals with px', () => {
    const context = makeContext();
    const result = resolveVariableValue(primitiveSpacingMd, 'Hex', context);
    expect(result).toEqual({ value: '8px' });
  });

  it('preserves aliases as {Group.Token} references when the target key is preserved', () => {
    const context = makeContext({ preservedKeys: new Set([KEY_COLOUR_PINK]) });
    const result = resolveVariableValue(
      semanticCanvasDefault,
      'Day',
      context,
    );
    expect(result).toEqual({
      value: '{Colour.Pink}',
      preservedAliasTo: 'Colour.Pink',
    });
  });

  it('inlines aliases to same-collection variables', () => {
    const context = makeContext({ preservedKeys: new Set([KEY_COLOUR_PINK]) });
    // Canvas/Contrast -> Canvas/Default -> primitive Colour/Pink (preserved).
    // Since the intermediate target is NOT preserved, we walk through it;
    // the terminal target IS preserved, so we end on a {Colour.Pink} ref.
    const result = resolveVariableValue(
      semanticCanvasContrast,
      'Day',
      context,
    );
    expect(result.value).toBe('{Colour.Pink}');
    expect(result.inlinedFrom).toBe('Canvas.Default');
  });

  it('throws an unresolved-alias DTCGTransformError for a missing target', () => {
    const response = buildFixtureResponse({ includeBroken: true });
    const context: ResolveContext = {
      localVariablesById: response.meta.variables,
      localVariablesByKey: buildLocalVariablesByKey(response.meta.variables),
      localCollectionsById: response.meta.variableCollections,
      preservedReferenceKeys: new Set(),
    };
    const broken = response.meta.variables['v-sem-broken'];
    expect(() => resolveVariableValue(broken, 'Day', context)).toThrow(
      DTCGTransformError,
    );
    expect(() => resolveVariableValue(broken, 'Day', context)).toThrow(
      /Could not resolve alias target/,
    );
  });

  it('throws an alias-cycle DTCGTransformError when variables alias each other', () => {
    const context = makeContext({ includeCycle: true });
    expect(() => resolveVariableValue(semanticCycleA, 'Day', context)).toThrow(
      DTCGTransformError,
    );
  });

  it('throws when the collection is missing', () => {
    const context = makeContext();
    const orphan = {
      ...primitiveColourPink,
      variableCollectionId: 'ghost',
    } as LocalVariable;
    expect(() => resolveVariableValue(orphan, 'Hex', context)).toThrow(
      /Missing local collection/,
    );
  });

  it('throws a missing-mode-value DTCGTransformError when the variable has no value for the requested mode', () => {
    const context = makeContext();
    const emptyModes = {
      ...primitiveColourPink,
      valuesByMode: {},
    } as LocalVariable;
    expect(() => resolveVariableValue(emptyModes, 'Hex', context)).toThrow(
      DTCGTransformError,
    );
  });
});

describe('describeInvalidVariableName', () => {
  it('accepts well-formed slash paths', () => {
    expect(describeInvalidVariableName('Colour/Pink')).toBeUndefined();
    expect(describeInvalidVariableName('single')).toBeUndefined();
  });

  it('rejects empty, slash-only, or malformed names', () => {
    expect(describeInvalidVariableName('')).toMatch(/empty/);
    expect(describeInvalidVariableName('/')).toMatch(/empty path segment/);
    expect(describeInvalidVariableName('/Pink')).toMatch(/empty path segment/);
    expect(describeInvalidVariableName('Pink/')).toMatch(/empty path segment/);
    expect(describeInvalidVariableName('A//B')).toMatch(/empty path segment/);
  });
});

describe('setTokenAtPath', () => {
  it('creates nested groups for slash-separated names', () => {
    const tree: DTCGTree = {};
    setTokenAtPath(tree, 'Colour/Brand/Pink', {
      $value: '#ff0',
      $type: 'color',
    });
    expect(tree).toEqual({
      Colour: {
        Brand: {
          Pink: { $value: '#ff0', $type: 'color' },
        },
      },
    });
  });

  it('replaces non-object segments in the middle of a path', () => {
    const tree: DTCGTree = { Colour: 'oops' as unknown as DTCGTree };
    setTokenAtPath(tree, 'Colour/Pink', { $value: '#ff0', $type: 'color' });
    expect(tree).toEqual({ Colour: { Pink: { $value: '#ff0', $type: 'color' } } });
  });

  it('throws a path-collision DTCGTransformError when a prefix is already a leaf token', () => {
    const tree: DTCGTree = {};
    setTokenAtPath(tree, 'Colour/Brand', { $value: '#f00', $type: 'color' });
    expect(() =>
      setTokenAtPath(tree, 'Colour/Brand/Pink', {
        $value: '#ff0',
        $type: 'color',
      }),
    ).toThrow(DTCGTransformError);
  });

  it('throws a path-collision DTCGTransformError when the leaf position already holds a group', () => {
    const tree: DTCGTree = {};
    setTokenAtPath(tree, 'Colour/Brand/Pink', {
      $value: '#ff0',
      $type: 'color',
    });
    expect(() =>
      setTokenAtPath(tree, 'Colour/Brand', { $value: '#f00', $type: 'color' }),
    ).toThrow(DTCGTransformError);
  });
});

describe('addGroupTypes + stripRedundantTypes', () => {
  it('hoists $type to a group when every descendant shares the same type', () => {
    const tree: DTCGTree = {};
    setTokenAtPath(tree, 'Colour/Pink', { $value: '#ff0', $type: 'color' });
    setTokenAtPath(tree, 'Colour/Blue', { $value: '#00f', $type: 'color' });

    addGroupTypes(tree, [
      primitiveColourPink,
      { ...primitiveColourPink, name: 'Colour/Blue' } as LocalVariable,
    ]);
    stripRedundantTypes(tree);

    expect(tree).toEqual({
      Colour: {
        $type: 'color',
        Pink: { $value: '#ff0' },
        Blue: { $value: '#00f' },
      },
    });
  });

  it('keeps $type on leaves when the group is mixed-type', () => {
    const tree: DTCGTree = {};
    setTokenAtPath(tree, 'Mixed/Pink', { $value: '#ff0', $type: 'color' });
    setTokenAtPath(tree, 'Mixed/Size', { $value: '8px', $type: 'dimension' });

    addGroupTypes(tree, [
      { ...primitiveColourPink, name: 'Mixed/Pink' } as LocalVariable,
      { ...primitiveSpacingMd, name: 'Mixed/Size' } as LocalVariable,
    ]);
    stripRedundantTypes(tree);

    expect(tree).toEqual({
      Mixed: {
        Pink: { $value: '#ff0', $type: 'color' },
        Size: { $value: '8px', $type: 'dimension' },
      },
    });
  });
});

describe('buildPreservedReferenceKeys', () => {
  it('collects keys from every OTHER selected collection', () => {
    const response = buildFixtureResponse();
    const classified = classifyCollections([
      primitivesCollection,
      backpackCollection,
    ]);
    const keysForBackpack = buildPreservedReferenceKeys(
      classified,
      BACKPACK_COLLECTION_ID,
      response.meta.variables,
    );
    // Primitives keys should be preserved when building Backpack outputs.
    expect(keysForBackpack.has(KEY_COLOUR_PINK)).toBe(true);
    expect(keysForBackpack.has(KEY_COLOUR_BERRY)).toBe(true);
    // Backpack keys should not preserve themselves.
    expect(keysForBackpack.has('k-sem-canvas-default')).toBe(false);
  });

  it('returns an empty set when there is only one collection', () => {
    const classified = classifyCollections([primitivesCollection]);
    const response = buildFixtureResponse();
    expect(
      buildPreservedReferenceKeys(
        classified,
        PRIMITIVES_COLLECTION_ID,
        response.meta.variables,
      ).size,
    ).toBe(0);
  });
});

describe('buildDTCGTreeForMode', () => {
  it('builds a single-mode primitive tree with literal values and a hoisted $type', () => {
    const context = makeContext();
    const output = buildDTCGTreeForMode(
      { collection: primitivesCollection, role: 'primitive' },
      'Hex',
      [primitiveColourPink, primitiveColourBerry],
      context,
    );
    expect(output.tree).toEqual({
      Colour: {
        $type: 'color',
        Berry: { $value: 'rgba(0, 0, 0, 0.5)' },
        Pink: { $value: '#ff66b3' },
      },
    });
    expect(output.stats).toEqual({
      tokenCount: 2,
      preservedAliasCount: 0,
      inlinedAliasCount: 0,
      skippedVariableCount: 0,
      skippedVariables: [],
    });
  });

  it('preserves cross-collection aliases as {ref} and counts them', () => {
    const context = makeContext({
      preservedKeys: new Set([KEY_COLOUR_PINK, KEY_COLOUR_BERRY]),
    });
    const dayOutput = buildDTCGTreeForMode(
      { collection: backpackCollection, role: 'semantic' },
      'Day',
      [semanticCanvasDefault],
      context,
    );
    expect(dayOutput.tree).toEqual({
      Canvas: {
        $type: 'color',
        Default: { $value: '{Colour.Pink}' },
      },
    });
    expect(dayOutput.stats.preservedAliasCount).toBe(1);
    expect(dayOutput.stats.inlinedAliasCount).toBe(0);

    const nightOutput = buildDTCGTreeForMode(
      { collection: backpackCollection, role: 'semantic' },
      'Night',
      [semanticCanvasDefault],
      context,
    );
    expect(nightOutput.tree).toEqual({
      Canvas: {
        $type: 'color',
        Default: { $value: '{Colour.Berry}' },
      },
    });
  });

  it('resolves subscribed-id aliases through the key fallback', () => {
    const context = makeContext({
      includeSubscribedIdAlias: true,
      preservedKeys: new Set([KEY_COLOUR_PINK, KEY_COLOUR_BERRY]),
    });
    const output = buildDTCGTreeForMode(
      { collection: backpackCollection, role: 'semantic' },
      'Day',
      [semanticSurface],
      context,
    );
    expect(output.tree).toEqual({
      Surface: {
        $type: 'color',
        Default: { $value: '{Colour.Pink}' },
      },
    });
  });

  it('skips unresolved aliases when skipUnresolvedAliases is enabled', () => {
    const response = buildFixtureResponse({ includeBroken: true });
    const context: ResolveContext = {
      localVariablesById: response.meta.variables,
      localVariablesByKey: buildLocalVariablesByKey(response.meta.variables),
      localCollectionsById: response.meta.variableCollections,
      preservedReferenceKeys: new Set(),
    };
    const broken = response.meta.variables['v-sem-broken'];
    const output = buildDTCGTreeForMode(
      { collection: backpackCollection, role: 'semantic' },
      'Day',
      [broken],
      context,
      { skipUnresolvedAliases: true },
    );
    expect(output.stats.skippedVariableCount).toBe(1);
    expect(output.stats.skippedVariables).toEqual([
      {
        variableName: 'Broken/Missing',
        variableId: 'v-sem-broken',
        variableKey: 'k-sem-broken',
        reason: 'unresolved-alias',
        unresolvedAliasId: 'v-does-not-exist',
      },
    ]);
    expect(output.tree).toEqual({});
  });

  it('skips missing-mode-value variables when skipUnresolvedAliases is enabled', () => {
    // Inline fixture: a variable that has no value for Day mode.
    const noDay = {
      id: 'v-no-day',
      key: 'k-no-day',
      name: 'Opacity/Hover',
      variableCollectionId: BACKPACK_COLLECTION_ID,
      resolvedType: 'FLOAT',
      valuesByMode: { [BACKPACK_MODE_NIGHT]: 0.8 },
      scopes: ['OPACITY'],
      remote: false,
    } as unknown as LocalVariable;
    const context = makeContext();
    const output = buildDTCGTreeForMode(
      { collection: backpackCollection, role: 'semantic' },
      'Day',
      [noDay],
      context,
      { skipUnresolvedAliases: true },
    );
    expect(output.tree).toEqual({});
    expect(output.stats.skippedVariableCount).toBe(1);
    expect(output.stats.skippedVariables[0]).toMatchObject({
      reason: 'missing-mode-value',
      variableName: 'Opacity/Hover',
      missingModeName: 'Day',
    });
  });

  it('propagates missing-mode-value errors by default', () => {
    const noDay = {
      id: 'v-no-day',
      key: 'k-no-day',
      name: 'Opacity/Hover',
      variableCollectionId: BACKPACK_COLLECTION_ID,
      resolvedType: 'FLOAT',
      valuesByMode: { [BACKPACK_MODE_NIGHT]: 0.8 },
      scopes: ['OPACITY'],
      remote: false,
    } as unknown as LocalVariable;
    const context = makeContext();
    expect(() =>
      buildDTCGTreeForMode(
        { collection: backpackCollection, role: 'semantic' },
        'Day',
        [noDay],
        context,
      ),
    ).toThrow(DTCGTransformError);
  });

  it('skips invalid-name variables when skipUnresolvedAliases is enabled', () => {
    const bad = {
      ...primitiveColourPink,
      id: 'v-bad-name',
      key: 'k-bad-name',
      name: 'Colour//Pink',
    } as LocalVariable;
    const context = makeContext();
    const output = buildDTCGTreeForMode(
      { collection: primitivesCollection, role: 'primitive' },
      'Hex',
      [bad],
      context,
      { skipUnresolvedAliases: true },
    );
    expect(output.tree).toEqual({});
    expect(output.stats.skippedVariableCount).toBe(1);
    expect(output.stats.skippedVariables[0]).toMatchObject({
      reason: 'invalid-name',
      variableName: 'Colour//Pink',
    });
  });

  it('propagates invalid-name errors by default', () => {
    const bad = {
      ...primitiveColourPink,
      name: '/Pink',
    } as LocalVariable;
    const context = makeContext();
    expect(() =>
      buildDTCGTreeForMode(
        { collection: primitivesCollection, role: 'primitive' },
        'Hex',
        [bad],
        context,
      ),
    ).toThrow(/Invalid variable name/);
  });

  it('skips path-collision variables and emits the colliding name', () => {
    const parent = {
      id: 'v-collide-parent',
      key: 'k-collide-parent',
      name: 'Colour/Brand',
      variableCollectionId: PRIMITIVES_COLLECTION_ID,
      resolvedType: 'COLOR',
      valuesByMode: {
        [PRIMITIVES_MODE_HEX]: { r: 1, g: 0, b: 0, a: 1 },
      },
      scopes: ['ALL_SCOPES'],
      remote: false,
    } as unknown as LocalVariable;
    const child = {
      ...parent,
      id: 'v-collide-child',
      key: 'k-collide-child',
      name: 'Colour/Brand/Pink',
      valuesByMode: {
        [PRIMITIVES_MODE_HEX]: { r: 1, g: 0.4, b: 0.7, a: 1 },
      },
    } as unknown as LocalVariable;
    const context = makeContext();
    const output = buildDTCGTreeForMode(
      { collection: primitivesCollection, role: 'primitive' },
      'Hex',
      [parent, child],
      context,
      { skipUnresolvedAliases: true },
    );
    // Parent writes first (sorted alphabetically: "Colour/Brand" < "Colour/Brand/Pink");
    // child then collides and is skipped.
    expect(output.stats.skippedVariableCount).toBe(1);
    expect(output.stats.skippedVariables[0]).toMatchObject({
      reason: 'path-collision',
      variableName: 'Colour/Brand/Pink',
      collidingVariableName: 'Colour/Brand',
    });
    // The written parent is still present and well-formed.
    expect(output.tree).toEqual({
      Colour: {
        $type: 'color',
        Brand: { $value: '#ff0000' },
      },
    });
  });

  it('propagates path-collision errors by default', () => {
    const parent = {
      id: 'v-collide-parent',
      key: 'k-collide-parent',
      name: 'Colour/Brand',
      variableCollectionId: PRIMITIVES_COLLECTION_ID,
      resolvedType: 'COLOR',
      valuesByMode: {
        [PRIMITIVES_MODE_HEX]: { r: 1, g: 0, b: 0, a: 1 },
      },
      scopes: ['ALL_SCOPES'],
      remote: false,
    } as unknown as LocalVariable;
    const child = {
      ...parent,
      id: 'v-collide-child',
      key: 'k-collide-child',
      name: 'Colour/Brand/Pink',
    } as unknown as LocalVariable;
    const context = makeContext();
    expect(() =>
      buildDTCGTreeForMode(
        { collection: primitivesCollection, role: 'primitive' },
        'Hex',
        [parent, child],
        context,
      ),
    ).toThrow(DTCGTransformError);
  });

  it('propagates unresolved alias errors by default', () => {
    const response = buildFixtureResponse({ includeBroken: true });
    const context: ResolveContext = {
      localVariablesById: response.meta.variables,
      localVariablesByKey: buildLocalVariablesByKey(response.meta.variables),
      localCollectionsById: response.meta.variableCollections,
      preservedReferenceKeys: new Set(),
    };
    const broken = response.meta.variables['v-sem-broken'];
    expect(() =>
      buildDTCGTreeForMode(
        { collection: backpackCollection, role: 'semantic' },
        'Day',
        [broken],
        context,
      ),
    ).toThrow(DTCGTransformError);
  });

  it('produces output that is independent of input ordering', () => {
    const context = makeContext();
    const first = buildDTCGTreeForMode(
      { collection: primitivesCollection, role: 'primitive' },
      'Hex',
      [primitiveColourPink, primitiveColourBerry, primitiveSpacingMd],
      context,
    );
    const second = buildDTCGTreeForMode(
      { collection: primitivesCollection, role: 'primitive' },
      'Hex',
      [primitiveSpacingMd, primitiveColourBerry, primitiveColourPink],
      context,
    );
    expect(JSON.stringify(first.tree)).toBe(JSON.stringify(second.tree));
  });
});

describe('mode selection through valuesByMode keys', () => {
  it('uses the collection mode name to look up the right value', () => {
    const context = makeContext({
      preservedKeys: new Set([KEY_COLOUR_PINK, KEY_COLOUR_BERRY]),
    });
    // Day mode references pink; Night references berry.
    expect(
      resolveVariableValue(semanticCanvasDefault, 'Day', context).value,
    ).toBe('{Colour.Pink}');
    expect(
      resolveVariableValue(semanticCanvasDefault, 'Night', context).value,
    ).toBe('{Colour.Berry}');

    // Confirm the raw mode ids exist as expected.
    expect(semanticCanvasDefault.valuesByMode[BACKPACK_MODE_DAY]).toBeDefined();
    expect(semanticCanvasDefault.valuesByMode[BACKPACK_MODE_NIGHT]).toBeDefined();
    expect(primitiveColourPink.valuesByMode[PRIMITIVES_MODE_HEX]).toBeDefined();
  });
});
