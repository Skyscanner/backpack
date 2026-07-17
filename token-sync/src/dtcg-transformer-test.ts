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
  BACKPACK_MODE_DARK,
  BACKPACK_MODE_DARK_ID,
  BACKPACK_MODE_LIGHT,
  KEY_COLOUR_BERRY,
  KEY_COLOUR_PINK,
  PRIMITIVES_COLLECTION_ID,
  PRIMITIVES_MODE_HEX,
  PRIMITIVES_MODE_HEX_ID,
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
  isUnconstrainedFloatScope,
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
    expect(figmaColorToCss({ r: 0, g: 0, b: 0, a: 0.123456789 })).toBe(
      'rgba(0, 0, 0, 0.123)',
    );
  });
});

describe('inferDTCGType', () => {
  function fakeVariable(partial: Partial<LocalVariable>): LocalVariable {
    return { scopes: [], ...partial } as unknown as LocalVariable;
  }

  it.each<[LocalVariable['resolvedType'], string[], string]>([
    ['COLOR', [], 'color'],
    ['BOOLEAN', [], 'boolean'],
    ['STRING', ['FONT_FAMILY'], 'fontFamily'],
    ['STRING', [], 'string'],
    ['FLOAT', ['FONT_STYLE'], 'fontWeight'],
    ['FLOAT', ['OPACITY'], 'number'],
    ['FLOAT', ['LINE_HEIGHT'], 'number'],
    ['FLOAT', ['CORNER_RADIUS'], 'dimension'],
    ['FLOAT', ['FONT_SIZE'], 'dimension'],
    ['FLOAT', ['PARAGRAPH_SPACING'], 'dimension'],
    ['FLOAT', ['STROKE_FLOAT'], 'dimension'],
    ['FLOAT', ['WIDTH_HEIGHT'], 'dimension'],
    ['FLOAT', ['GAP'], 'dimension'],
    ['FLOAT', ['ALL_SCOPES'], 'dimension'],
    ['FLOAT', [], 'dimension'],
  ])('maps %s with scopes %j to %s', (resolvedType, scopes, expected) => {
    expect(
      inferDTCGType(
        fakeVariable({
          resolvedType,
          scopes: scopes as unknown as LocalVariable['scopes'],
        }),
      ),
    ).toBe(expected);
  });
});

describe('isUnconstrainedFloatScope', () => {
  it.each<[string[], boolean]>([
    [[], true],
    [['ALL_SCOPES'], true],
    [['ALL_SCOPES', 'ALL_SCOPES'], true],
    [['FONT_STYLE'], false],
    [['ALL_SCOPES', 'FONT_STYLE'], false],
    [['GAP'], false],
  ])('treats %j as unconstrained=%s', (scopes, expected) => {
    expect(isUnconstrainedFloatScope(scopes)).toBe(expected);
  });
});

describe('normalizeLiteralValue', () => {
  it('converts colour objects via figmaColorToCss', () => {
    expect(normalizeLiteralValue({ r: 0, g: 0, b: 0 }, 'color')).toBe(
      '#000000',
    );
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
    expect(() => normalizeLiteralValue(Infinity, 'number')).toThrow(
      /Non-finite/,
    );
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
    expect(() =>
      classifyCollections([bogus as typeof primitivesCollection]),
    ).toThrow(/Unknown target collection "VDL"/);
  });
});

describe('resolveAliasTarget', () => {
  it('returns the variable by canonical id when present', () => {
    const context = makeContext();
    expect(resolveAliasTarget('variable-colour-pink', context)?.name).toBe(
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
    expect(resolveAliasTarget('variable-missing', context)).toBeUndefined();
  });
});

describe('resolveVariableValue', () => {
  it('returns the correct literal value for non-alias variables', () => {
    const context = makeContext();
    expect(resolveVariableValue(primitiveColourPink, PRIMITIVES_MODE_HEX, context)).toEqual({
      value: '#ff66b3',
    });
    expect(resolveVariableValue(primitiveSpacingMd, PRIMITIVES_MODE_HEX, context)).toEqual({
      value: '8px',
    });
  });

  it('preserves aliases as {Group.Token} references when the target key is preserved', () => {
    const context = makeContext({
      preservedKeys: new Set([KEY_COLOUR_PINK, KEY_COLOUR_BERRY]),
    });
    expect(resolveVariableValue(semanticCanvasDefault, BACKPACK_MODE_LIGHT, context)).toEqual(
      {
        value: '{Colour.Pink}',
        preservedAliasTo: 'Colour.Pink',
      },
    );
    expect(
      resolveVariableValue(semanticCanvasDefault, BACKPACK_MODE_DARK, context).value,
    ).toBe('{Colour.Berry}');
  });

  it('inlines aliases to same-collection variables', () => {
    const context = makeContext({ preservedKeys: new Set([KEY_COLOUR_PINK]) });
    // Canvas/Contrast -> Canvas/Default -> primitive Colour/Pink (preserved).
    // Since the intermediate target is NOT preserved, we walk through it;
    // the terminal target IS preserved, so we end on a {Colour.Pink} ref.
    const result = resolveVariableValue(semanticCanvasContrast, BACKPACK_MODE_LIGHT, context);
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
    const broken = response.meta.variables['variable-semantic-broken'];
    expect(() => resolveVariableValue(broken, BACKPACK_MODE_LIGHT, context)).toThrow(
      DTCGTransformError,
    );
    expect(() => resolveVariableValue(broken, BACKPACK_MODE_LIGHT, context)).toThrow(
      /Could not resolve alias target/,
    );
  });

  it('throws an alias-cycle DTCGTransformError when variables alias each other', () => {
    const context = makeContext({ includeCycle: true });
    expect(() => resolveVariableValue(semanticCycleA, BACKPACK_MODE_LIGHT, context)).toThrow(
      DTCGTransformError,
    );
    expect(() => resolveVariableValue(semanticCycleA, BACKPACK_MODE_LIGHT, context)).toThrow(
      /Alias cycle detected/,
    );
  });

  it('throws when the collection is missing', () => {
    const context = makeContext();
    const detachedVariable = {
      ...primitiveColourPink,
      variableCollectionId: 'nonexistent-collection',
    } as LocalVariable;
    expect(() =>
      resolveVariableValue(detachedVariable, PRIMITIVES_MODE_HEX, context),
    ).toThrow(/Missing local collection/);
  });

  it('throws a missing-mode-value DTCGTransformError when the variable has no value for the requested mode', () => {
    const context = makeContext();
    const emptyModes = {
      ...primitiveColourPink,
      valuesByMode: {},
    } as LocalVariable;
    expect(() => resolveVariableValue(emptyModes, PRIMITIVES_MODE_HEX, context)).toThrow(
      DTCGTransformError,
    );
    expect(() => resolveVariableValue(emptyModes, PRIMITIVES_MODE_HEX, context)).toThrow(
      /has no value for mode/,
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
    expect(tree).toEqual({
      Colour: { Pink: { $value: '#ff0', $type: 'color' } },
    });
  });

  it('throws a path-collision DTCGTransformError in both collision directions', () => {
    const token = { $value: '#f00', $type: 'color' } as const;
    const child = { $value: '#ff0', $type: 'color' } as const;

    const tree1: DTCGTree = {};
    setTokenAtPath(tree1, 'Colour/Brand', token);
    expect(() => setTokenAtPath(tree1, 'Colour/Brand/Pink', child)).toThrow(
      /DTCG path collision/,
    );
    const tree2: DTCGTree = {};
    setTokenAtPath(tree2, 'Colour/Brand/Pink', child);
    expect(() => setTokenAtPath(tree2, 'Colour/Brand', token)).toThrow(
      /DTCG path collision/,
    );
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
    expect(keysForBackpack.has('key-semantic-canvas-default')).toBe(false);
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
      PRIMITIVES_MODE_HEX,
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
      ambiguousFloatVariables: [],
    });
  });

  it('flags FLOAT variables with unconstrained Figma scope as ambiguous', () => {
    const ambiguousWeight = {
      id: 'variable-weight-bold',
      key: 'key-weight-bold',
      name: 'Typography/Weight/Bold',
      variableCollectionId: PRIMITIVES_COLLECTION_ID,
      resolvedType: 'FLOAT',
      valuesByMode: { [PRIMITIVES_MODE_HEX_ID]: 700 },
      // Designer left scopes unconstrained — type inference falls through to
      // `dimension` and the value gets a misleading "px" suffix.
      scopes: ['ALL_SCOPES'],
      remote: false,
    } as unknown as LocalVariable;
    const context = makeContext();
    const output = buildDTCGTreeForMode(
      { collection: primitivesCollection, role: 'primitive' },
      PRIMITIVES_MODE_HEX,
      [ambiguousWeight, primitiveSpacingMd],
      context,
    );
    // primitiveSpacingMd has scope `['GAP']` — should not be flagged.
    expect(output.stats.ambiguousFloatVariables).toEqual([
      {
        variableName: 'Typography/Weight/Bold',
        variableId: 'variable-weight-bold',
        variableKey: 'key-weight-bold',
        scopes: ['ALL_SCOPES'],
        inferredType: 'dimension',
      },
    ]);
    expect(output.stats.tokenCount).toBe(2);
  });

  it('preserves cross-collection aliases as {ref} and counts them', () => {
    const context = makeContext({
      preservedKeys: new Set([KEY_COLOUR_PINK, KEY_COLOUR_BERRY]),
    });
    const lightOutput = buildDTCGTreeForMode(
      { collection: backpackCollection, role: 'semantic' },
      BACKPACK_MODE_LIGHT,
      [semanticCanvasDefault],
      context,
    );
    expect(lightOutput.tree).toEqual({
      Canvas: {
        $type: 'color',
        Default: { $value: '{Colour.Pink}' },
      },
    });
    expect(lightOutput.stats.preservedAliasCount).toBe(1);
    expect(lightOutput.stats.inlinedAliasCount).toBe(0);

    const darkOutput = buildDTCGTreeForMode(
      { collection: backpackCollection, role: 'semantic' },
      BACKPACK_MODE_DARK,
      [semanticCanvasDefault],
      context,
    );
    expect(darkOutput.tree).toEqual({
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
      BACKPACK_MODE_LIGHT,
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

  // Each case must skip with `skipUnresolvedAliases: true` and throw without it.
  // Returns the recorded skip + a thunk that re-runs without the option, so
  // each `it` block does its own assertions (lint can see them, and the test
  // body documents what's being verified).
  function setupSkipOrThrow(
    classified: Parameters<typeof buildDTCGTreeForMode>[0],
    modeName: string,
    variables: LocalVariable[],
    context: ResolveContext,
  ) {
    const output = buildDTCGTreeForMode(
      classified,
      modeName,
      variables,
      context,
      {
        skipUnresolvedAliases: true,
      },
    );
    return {
      skipped: output.stats.skippedVariables[0],
      skippedCount: output.stats.skippedVariableCount,
      throwingCall: () =>
        buildDTCGTreeForMode(classified, modeName, variables, context),
    };
  }

  it('skips or throws on unresolved aliases', () => {
    const response = buildFixtureResponse({ includeBroken: true });
    const broken = response.meta.variables['variable-semantic-broken'];
    const { skipped, skippedCount, throwingCall } = setupSkipOrThrow(
      { collection: backpackCollection, role: 'semantic' },
      BACKPACK_MODE_LIGHT,
      [broken],
      {
        localVariablesById: response.meta.variables,
        localVariablesByKey: buildLocalVariablesByKey(response.meta.variables),
        localCollectionsById: response.meta.variableCollections,
        preservedReferenceKeys: new Set(),
      },
    );
    expect(skippedCount).toBe(1);
    expect(skipped).toMatchObject({
      reason: 'unresolved-alias',
      variableName: 'Broken/Missing',
      unresolvedAliasId: 'variable-does-not-exist',
    });
    expect(throwingCall).toThrow(DTCGTransformError);
  });

  it('skips or throws on missing-mode-value', () => {
    const noLight = {
      id: 'variable-no-light',
      key: 'key-no-light',
      name: 'Opacity/Hover',
      variableCollectionId: BACKPACK_COLLECTION_ID,
      resolvedType: 'FLOAT',
      valuesByMode: { [BACKPACK_MODE_DARK_ID]: 0.8 },
      scopes: ['OPACITY'],
      remote: false,
    } as unknown as LocalVariable;
    const { skipped, skippedCount, throwingCall } = setupSkipOrThrow(
      { collection: backpackCollection, role: 'semantic' },
      BACKPACK_MODE_LIGHT,
      [noLight],
      makeContext(),
    );
    expect(skippedCount).toBe(1);
    expect(skipped).toMatchObject({
      reason: 'missing-mode-value',
      variableName: 'Opacity/Hover',
      missingModeName: BACKPACK_MODE_LIGHT,
    });
    expect(throwingCall).toThrow(DTCGTransformError);
  });

  it('skips or throws on invalid variable name', () => {
    const bad = {
      ...primitiveColourPink,
      id: 'variable-bad-name',
      key: 'key-bad-name',
      name: 'Colour//Pink',
    } as LocalVariable;
    const { skipped, skippedCount, throwingCall } = setupSkipOrThrow(
      { collection: primitivesCollection, role: 'primitive' },
      PRIMITIVES_MODE_HEX,
      [bad],
      makeContext(),
    );
    expect(skippedCount).toBe(1);
    expect(skipped).toMatchObject({
      reason: 'invalid-name',
      variableName: 'Colour//Pink',
    });
    expect(throwingCall).toThrow(/Invalid variable name/);
  });

  it('skips or throws on path collision', () => {
    const parent = {
      id: 'variable-collide-parent',
      key: 'key-collide-parent',
      name: 'Colour/Brand',
      variableCollectionId: PRIMITIVES_COLLECTION_ID,
      resolvedType: 'COLOR',
      valuesByMode: { [PRIMITIVES_MODE_HEX_ID]: { r: 1, g: 0, b: 0, a: 1 } },
      scopes: ['ALL_SCOPES'],
      remote: false,
    } as unknown as LocalVariable;
    const child = {
      ...parent,
      id: 'variable-collide-child',
      key: 'key-collide-child',
      name: 'Colour/Brand/Pink',
      valuesByMode: { [PRIMITIVES_MODE_HEX_ID]: { r: 1, g: 0.4, b: 0.7, a: 1 } },
    } as unknown as LocalVariable;
    // Parent writes first (sorted: "Colour/Brand" < "Colour/Brand/Pink"); child collides.
    const { skipped, skippedCount, throwingCall } = setupSkipOrThrow(
      { collection: primitivesCollection, role: 'primitive' },
      PRIMITIVES_MODE_HEX,
      [parent, child],
      makeContext(),
    );
    expect(skippedCount).toBe(1);
    expect(skipped).toMatchObject({
      reason: 'path-collision',
      variableName: 'Colour/Brand/Pink',
      collidingVariableName: 'Colour/Brand',
    });
    expect(throwingCall).toThrow(DTCGTransformError);
  });

  it('produces output that is independent of input ordering', () => {
    const context = makeContext();
    const first = buildDTCGTreeForMode(
      { collection: primitivesCollection, role: 'primitive' },
      PRIMITIVES_MODE_HEX,
      [primitiveColourPink, primitiveColourBerry, primitiveSpacingMd],
      context,
    );
    const second = buildDTCGTreeForMode(
      { collection: primitivesCollection, role: 'primitive' },
      PRIMITIVES_MODE_HEX,
      [primitiveSpacingMd, primitiveColourBerry, primitiveColourPink],
      context,
    );
    expect(JSON.stringify(first.tree)).toBe(JSON.stringify(second.tree));
  });
});
