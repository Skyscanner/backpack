/**
 * @jest-environment node
 */
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

import path from 'node:path';

import {
  BACKPACK_DARK_FILE,
  BACKPACK_LIGHT_FILE,
  CSS_PREFIX,
  DARK_OUTPUT_FILE,
  DARK_SELECTOR,
  LIGHT_OUTPUT_FILE,
  LIGHT_SELECTOR,
  PRIMITIVES_FILE,
  PRIMITIVES_OUTPUT_FILE,
  PRIMITIVES_SELECTOR,
  buildStyleDictionaryConfigs,
  findAsymmetricSemanticTokens,
  findCrossFileCssNameCollisions,
  findCssNameCollisions,
  findInvalidDimensions,
  formatAsymmetricSemanticTokens,
  formatCssNameCollisions,
  formatDimensionViolations,
  isWebTokenPath,
  kebabBpkName,
  makeBackpackTokenFilter,
  makeWebPrimitivesTokenFilter,
} from './style-dictionary-config';

import type { TransformedToken } from 'style-dictionary/types';

describe('style-dictionary-config', () => {
  describe('makeBackpackTokenFilter', () => {
    const filter = makeBackpackTokenFilter('backpack.day.json');
    const tokenWithPath = (filePath: string) => ({ filePath }) as unknown as TransformedToken;

    it.each([
      ['/repo/token-sync/tokens/backpack.day.json'],
      ['tokens/backpack.day.json'], // relative path
    ])('accepts %s', (filePath) => {
      expect(filter(tokenWithPath(filePath))).toBe(true);
    });

    it.each([
      ['/repo/token-sync/tokens/primitives.json'],
      ['/repo/token-sync/tokens/backpack.night.json'],
      ['/repo/backpack.day.json.bak'],  // extension mismatch
      ['/repo/some-backpack.day.json'], // prefix mismatch
    ])('rejects %s', (filePath) => {
      expect(filter(tokenWithPath(filePath))).toBe(false);
    });

    it('rejects tokens with missing or non-string filePath', () => {
      expect(filter({} as TransformedToken)).toBe(false);
      expect(filter({ filePath: undefined } as unknown as TransformedToken)).toBe(false);
      expect(filter({ filePath: 42 } as unknown as TransformedToken)).toBe(false);
    });
  });

  describe('buildStyleDictionaryConfigs', () => {
    const tokensDir = '/repo/token-sync/tokens';
    const buildDir = '/repo/token-sync/tokens/css';
    const cssTransforms = ['attribute/cti', 'name/kebab', 'size/pxToRem'];
    const baseOpts = {
      tokensDir,
      buildDir,
      cssTransforms,
      semanticFileNames: [BACKPACK_LIGHT_FILE, BACKPACK_DARK_FILE],
    };

    it('emits a primitives config first, then one config per semantic file', () => {
      const configs = buildStyleDictionaryConfigs(baseOpts);
      const [primitives, light, dark] = configs;
      const primitivesFile = primitives.config.platforms?.css?.files?.[0];
      const lightFile = light.config.platforms?.css?.files?.[0];
      const darkFile = dark.config.platforms?.css?.files?.[0];

      expect(configs).toHaveLength(3);
      expect(configs.map((c) => c.name)).toEqual([
        'web-primitives',
        'web-theme-light',
        'web-theme-dark',
      ]);
      expect(primitivesFile?.destination).toBe(PRIMITIVES_OUTPUT_FILE);
      expect(primitivesFile?.options?.selector).toBe(PRIMITIVES_SELECTOR);
      expect(lightFile?.destination).toBe(LIGHT_OUTPUT_FILE);
      expect(lightFile?.options?.selector).toBe(LIGHT_SELECTOR);
      expect(darkFile?.destination).toBe(DARK_OUTPUT_FILE);
      expect(darkFile?.options?.selector).toBe(DARK_SELECTOR);
    });

    it('loads primitives alongside each semantic token file (and only primitives for the primitives config)', () => {
      const configs = buildStyleDictionaryConfigs(baseOpts);
      const [primitives, light, dark] = configs;
      expect(primitives.config.source).toEqual([
        path.join(tokensDir, PRIMITIVES_FILE),
      ]);
      expect(light.config.source).toEqual([
        path.join(tokensDir, PRIMITIVES_FILE),
        path.join(tokensDir, BACKPACK_LIGHT_FILE),
      ]);
      expect(dark.config.source).toEqual([
        path.join(tokensDir, PRIMITIVES_FILE),
        path.join(tokensDir, BACKPACK_DARK_FILE),
      ]);
    });

    it('shares the bpk prefix and a buildPath ending in a separator', () => {
      const configs = buildStyleDictionaryConfigs(baseOpts);
      for (const { config } of configs) {
        expect(config.platforms?.css?.prefix).toBe(CSS_PREFIX);
        expect(config.platforms?.css?.buildPath?.endsWith(path.sep)).toBe(true);
      }
    });

    it('appends a separator only when missing', () => {
      const trailingSep = `${buildDir}${path.sep}`;
      const configs = buildStyleDictionaryConfigs({
        ...baseOpts,
        buildDir: trailingSep,
      });
      for (const { config } of configs) {
        expect(config.platforms?.css?.buildPath).toBe(trailingSep);
      }
    });

    it('passes the caller-supplied cssTransforms through to every platform', () => {
      const custom = ['attribute/cti', 'name/kebab', 'size/pxToRem', 'color/css'];
      const configs = buildStyleDictionaryConfigs({
        ...baseOpts,
        cssTransforms: custom,
      });
      for (const { config } of configs) {
        expect(config.platforms?.css?.transforms).toEqual(custom);
      }
    });

    it('keeps semantic file tokens but not primitives or non-web tokens via the filter', () => {
      const configs = buildStyleDictionaryConfigs(baseOpts);
      const light = configs.find((c) => c.name === 'web-theme-light');
      expect(light).toBeDefined();
      const tokenFilter = light!.config.platforms?.css?.files?.[0]?.filter;
      expect(typeof tokenFilter).toBe('function');
      const shouldEmit = tokenFilter as (t: TransformedToken) => boolean;
      const lightFilePath = path.join(tokensDir, BACKPACK_LIGHT_FILE);
      expect(
        shouldEmit({ filePath: lightFilePath, path: ['Canvas', 'Default'] } as TransformedToken),
      ).toBe(true);
      expect(
        shouldEmit({ filePath: path.join(tokensDir, PRIMITIVES_FILE), path: ['Colour', 'Pink'] } as TransformedToken),
      ).toBe(false);
      expect(
        shouldEmit({ filePath: path.join(tokensDir, BACKPACK_DARK_FILE), path: ['Canvas', 'Default'] } as TransformedToken),
      ).toBe(false);
      // Non-web (ios/android) paths are dropped even when the source file matches.
      expect(
        shouldEmit({
          filePath: lightFilePath,
          path: ['Component', 'Switch', 'ios-switch-default-off'],
        } as TransformedToken),
      ).toBe(false);
      expect(
        shouldEmit({
          filePath: lightFilePath,
          path: ['Component', 'iOS Tab-bar-fill'],
        } as TransformedToken),
      ).toBe(false);
    });
  });

  describe('makeWebPrimitivesTokenFilter', () => {
    const filter = makeWebPrimitivesTokenFilter();
    const primitivesPath = '/repo/token-sync/tokens/primitives.json';
    const semanticPath = '/repo/token-sync/tokens/backpack.light.json';

    it.each<[string, object, boolean]>([
      ['Spacing (dimension, $type)', { filePath: primitivesPath, path: ['Spacing', 'md'], $type: 'dimension' }, true],
      ['Radius (dimension, legacy type)', { filePath: primitivesPath, path: ['Radius', 'md'], type: 'dimension' }, true],
      // dropped
      ['color primitive', { filePath: primitivesPath, path: ['Colour', 'Pink'], $type: 'color' }, false],
      ['Heights primitive', { filePath: primitivesPath, path: ['Heights', '36'], $type: 'dimension' }, false],
      ['semantic theme file', { filePath: semanticPath, path: ['Spacing', 'md'], $type: 'dimension' }, false],
      ['non-web path', { filePath: primitivesPath, path: ['Spacing', 'ios-only'], $type: 'dimension' }, false],
    ])('%s → %s', (_label, token, expected) => {
      expect(filter(token as unknown as TransformedToken)).toBe(expected);
    });
  });

  describe('isWebTokenPath', () => {
    it.each<[string[], boolean]>([
      // Non-web paths: ios/android segments are excluded.
      [['Component', 'Switch', 'android-switch-default-disabled'], false],
      [['Component', 'Switch', 'ios-switch-default-off'], false],
      [['Component', 'iOS Tab-bar-fill'], false],
      [['Component', 'Switch', 'IOS-Switch'], false], // case-insensitive
      // Word-boundary safety: substrings inside other words still emit.
      [['Component', 'Audio', 'audios'], true],
      [['Component', 'Meander'], true],
      [['Canvas', 'Default'], true],
      [['Component', 'Button', 'Colour', 'bg-primary'], true],
    ])('path %j → %p', (tokenPath, expected) => {
      expect(isWebTokenPath(tokenPath)).toBe(expected);
    });
  });

  describe('findInvalidDimensions', () => {
    const filePath = '/repo/tokens/primitives.json';

    it('returns no violations for an empty tree', () => {
      expect(findInvalidDimensions({}, filePath)).toEqual([]);
    });

    it('accepts every form of px literal: zero, integer, decimal, negative', () => {
      const tree = {
        Spacing: {
          $type: 'dimension',
          zero: { $value: '0px' },
          one: { $value: '16px' },
          half: { $value: '1.5px' },
          neg: { $value: '-1px' },
        },
      };
      expect(findInvalidDimensions(tree, filePath)).toEqual([]);
    });

    it('accepts DTCG alias values (resolved later by SD)', () => {
      const tree = {
        Spacing: {
          $type: 'dimension',
          md: { $value: '{Heights.32}' },
        },
      };
      expect(findInvalidDimensions(tree, filePath)).toEqual([]);
    });

    it('flags non-px units (em, %, rem) and reports the dotted token path', () => {
      const tree = {
        Component: {
          $type: 'dimension',
          Button: {
            'padding-em': { $value: '16em' },
            'width-pct': { $value: '50%' },
            'gap-rem': { $value: '1.5rem' },
          },
        },
      };
      const violations = findInvalidDimensions(tree, filePath);
      expect(violations).toHaveLength(3);
      const map = Object.fromEntries(
        violations.map((v) => [v.tokenPath, v.value]),
      );
      expect(map).toEqual({
        'Component.Button.padding-em': '16em',
        'Component.Button.width-pct': '50%',
        'Component.Button.gap-rem': '1.5rem',
      });
      expect(violations.every((v) => v.filePath === filePath)).toBe(true);
    });

    it('flags bare numeric $value for dimensions (no unit at all)', () => {
      const tree = {
        Spacing: { $type: 'dimension', md: { $value: 16 } },
      };
      const violations = findInvalidDimensions(tree, filePath);
      expect(violations).toHaveLength(1);
      expect(violations[0]).toMatchObject({ tokenPath: 'Spacing.md', value: 16 });
    });

    it('inherits $type from the closest ancestor group (DTCG cascade)', () => {
      const tree = {
        Component: {
          Button: {
            Dimension: {
              $type: 'dimension',
              'padding-h': { $value: '16em' }, // bad — inherited dimension
            },
          },
        },
      };
      const violations = findInvalidDimensions(tree, filePath);
      expect(violations).toHaveLength(1);
      expect(violations[0].tokenPath).toBe(
        'Component.Button.Dimension.padding-h',
      );
    });

    it('does not flag tokens of other types even with weird strings', () => {
      const tree = {
        Colour: {
          $type: 'color',
          weird: { $value: '50%' }, // not our problem
        },
        Weight: {
          $type: 'fontWeight',
          bold: { $value: 700 },
        },
        Family: {
          $type: 'fontFamily',
          sans: { $value: 'Skyscanner Relative' },
        },
      };
      expect(findInvalidDimensions(tree, filePath)).toEqual([]);
    });

    it('handles deeply nested mixed-type groups without false positives', () => {
      const tree = {
        Component: {
          Card: {
            Colour: {
              $type: 'color',
              bg: { $value: '#fff' },
            },
            Dimension: {
              $type: 'dimension',
              good: { $value: '8px' },
              bad: { $value: '8em' },
            },
          },
        },
      };
      const violations = findInvalidDimensions(tree, filePath);
      expect(violations).toHaveLength(1);
      expect(violations[0].tokenPath).toBe(
        'Component.Card.Dimension.bad',
      );
    });

    it('honours a leaf-level $type override of the inherited group type', () => {
      const tree = {
        Spacing: {
          $type: 'dimension',
          opacity: { $type: 'number', $value: 0.5 },
          width: { $value: '8em' }, // still dimension via inheritance → bad
        },
      };
      const violations = findInvalidDimensions(tree, filePath);
      expect(violations).toHaveLength(1);
      expect(violations[0].tokenPath).toBe('Spacing.width');
    });
  });

  describe('kebabBpkName', () => {
    it.each<[string[], string]>([
      // basic joining and casing
      [['Canvas', 'Default'], 'canvas-default'],
      [['Component', 'Button', 'Colour', 'bg-default'], 'private-button-colour-bg-default'],
      [['Neutral', 'Grey 10'], 'neutral-grey-10'],
      [['borderRadius'], 'border-radius'],
      // Component → private rename (case-insensitive, first segment only)
      [['Component', 'Badge', 'Colour', 'bg-default'], 'private-badge-colour-bg-default'],
      [['component', 'Badge'], 'private-badge'],
      [['COMPONENT', 'Badge'], 'private-badge'],
      [['Layout', 'Component', 'Inner'], 'layout-component-inner'],
      [['Component'], 'private'],
      // sanitisation: parens, brackets, punctuation, emoji
      [['Component', 'Chip', 'Colour', 'stroke-Off (new)'], 'private-chip-colour-stroke-off-new'],
      [['Foo (WIP)'], 'foo-wip'],
      [['Card [draft]'], 'card-draft'],
      [['!important'], 'important'],
      [['foo@bar/baz'], 'foo-bar-baz'],
      [['🎨 colour'], 'colour'],
      [['hot🔥red'], 'hot-red'],
      [['(((wrapped)))'], 'wrapped'],
      [['  spaced  '], 'spaced'],
    ])('path %j → "%s"', (tokenPath, expected) => {
      expect(kebabBpkName(tokenPath)).toBe(expected);
    });

    it.each<[string[], string | undefined, string]>([
      [['Component', 'Badge', 'Colour', 'bg-default'], 'bpk', 'bpk-private-badge-colour-bg-default'],
      [['Canvas', 'Default'], 'bpk', 'bpk-canvas-default'],
      [['Canvas', 'Default'], undefined, 'canvas-default'],
      [['Canvas', 'Default'], '', 'canvas-default'],
      [['Component', 'Button', 'Colour', 'bg-primary (new)'], 'bpk', 'bpk-private-button-colour-bg-primary-new'],
    ])('path %j with prefix %j → "%s"', (tokenPath, prefix, expected) => {
      expect(kebabBpkName(tokenPath, prefix)).toBe(expected);
    });

    // Guard against silently emitting `--bpk-: <value>;` (invalid CSS that
    // browsers ignore) when every path segment kebabs to "".
    it.each<[string[], string | undefined]>([
      [['💎'], undefined],
      [['!@#'], undefined],
      [['💎', '🔥'], 'bpk'],
      [[''], 'bpk'],
    ])('throws on degenerate path %j with prefix %j', (tokenPath, prefix) => {
      expect(() => kebabBpkName(tokenPath, prefix)).toThrow(
        /produced an empty CSS name/,
      );
    });
  });

  describe('findCssNameCollisions', () => {
    it('returns no collisions for a clean tree', () => {
      const tree = {
        Canvas: { $type: 'color', Default: { $value: '#fff' } },
        Component: {
          Badge: {
            Colour: {
              $type: 'color',
              'bg-default': { $value: '#eee' },
            },
          },
        },
      };
      expect(findCssNameCollisions(tree)).toEqual([]);
    });

    it('detects two paths that kebab to the same name (casing variants under same parent)', () => {
      const tree = {
        Component: {
          Badge: {
            Colour: { $type: 'color', 'bg-default': { $value: '#aaa' } },
          },
          badge: {
            Colour: { $type: 'color', 'bg-default': { $value: '#bbb' } },
          },
        },
      };
      const collisions = findCssNameCollisions(tree);
      expect(collisions).toHaveLength(1);
      expect(collisions[0].name).toBe('private-badge-colour-bg-default');
      expect(collisions[0].sources).toEqual([
        'Component.Badge.Colour.bg-default',
        'Component.badge.Colour.bg-default',
      ]);
    });
  });

  describe('findCrossFileCssNameCollisions', () => {
    it.each([
      [
        'no collision when CSS names are disjoint',
        { Spacing: { $type: 'dimension', base: { $value: '16px' } } },
        { Canvas: { $type: 'color', Default: { $value: '#fff' } } },
        [],
      ],
      [
        'collision when the same CSS name appears in both files',
        { Spacing: { $type: 'dimension', base: { $value: '16px' } } },
        { Spacing: { $type: 'dimension', base: { $value: '{Spacing.base}' } } },
        [{ name: 'spacing-base', sources: ['backpack.light.json: Spacing.base', 'primitives.json: Spacing.base'] }],
      ],
    ] as const)('%s', (_label, primitives, semantic, expected) => {
      expect(
        findCrossFileCssNameCollisions([
          { filePath: '/repo/tokens/primitives.json', tree: primitives },
          { filePath: '/repo/tokens/backpack.light.json', tree: semantic },
        ]),
      ).toEqual(expected);
    });
  });

  describe('formatCssNameCollisions', () => {
    it('renders one line per collision, scoped by file basename', () => {
      const message = formatCssNameCollisions([
        {
          filePath: '/abs/repo/tokens/backpack.day.json',
          collisions: [
            {
              name: 'private-badge-colour-bg-default',
              sources: [
                'Component.Badge.Colour.bg-default',
                'Component.badge.Colour.bg-default',
              ],
            },
          ],
        },
      ]);
      expect(message).toMatch(/Found 1 CSS variable name collision/);
      expect(message).toContain('backpack.day.json');
      // The actual CSS variable that would have collided, for a quick eye-grep.
      expect(message).toContain('--bpk-private-badge-colour-bg-default');
      // Both source paths visible so designers can locate them in Figma.
      expect(message).toContain('Component.Badge.Colour.bg-default');
      expect(message).toContain('Component.badge.Colour.bg-default');
    });
  });

  describe('findAsymmetricSemanticTokens', () => {
    it('returns no asymmetry when both trees declare the same paths', () => {
      const first = {
        Canvas: { $type: 'color', Default: { $value: '#fff' } },
        Surface: { $type: 'color', Highlight: { $value: '{Colour.Pink}' } },
      };
      const second = {
        Canvas: { $type: 'color', Default: { $value: '#000' } },
        Surface: { $type: 'color', Highlight: { $value: '{Colour.Berry}' } }, // different value is fine
      };
      expect(findAsymmetricSemanticTokens(first, second)).toEqual({
        onlyInFirst: [],
        onlyInSecond: [],
      });
    });

    it('reports tokens defined only in the first tree under onlyInFirst', () => {
      const first = {
        Canvas: { $type: 'color', Default: { $value: '#fff' } },
        Surface: { $type: 'color', Highlight: { $value: '{Colour.Pink}' } },
      };
      const second = {
        Canvas: { $type: 'color', Default: { $value: '#000' } },
      };
      const asymmetry = findAsymmetricSemanticTokens(first, second);
      expect(asymmetry.onlyInFirst).toEqual(['Surface.Highlight']);
      expect(asymmetry.onlyInSecond).toEqual([]);
    });

    it('reports tokens defined only in the second tree under onlyInSecond', () => {
      const first = {
        Canvas: { $type: 'color', Default: { $value: '#fff' } },
      };
      const second = {
        Canvas: { $type: 'color', Default: { $value: '#000' } },
        Glow: { $type: 'color', Default: { $value: '#abc' } },
      };
      const asymmetry = findAsymmetricSemanticTokens(first, second);
      expect(asymmetry.onlyInFirst).toEqual([]);
      expect(asymmetry.onlyInSecond).toEqual(['Glow.Default']);
    });

    it('reports both directions in one pass and sorts each side', () => {
      const first = {
        Z: { $type: 'color', a: { $value: '#000' } },
        A: { $type: 'color', b: { $value: '#000' } },
      };
      const second = {
        Y: { $type: 'color', x: { $value: '#fff' } },
        B: { $type: 'color', y: { $value: '#fff' } },
      };
      const asymmetry = findAsymmetricSemanticTokens(first, second);
      expect(asymmetry.onlyInFirst).toEqual(['A.b', 'Z.a']);
      expect(asymmetry.onlyInSecond).toEqual(['B.y', 'Y.x']);
    });
  });

  describe('formatAsymmetricSemanticTokens', () => {
    it('renders both sides under their own headings with the supplied file names', () => {
      const message = formatAsymmetricSemanticTokens(
        { onlyInFirst: ['Surface.Highlight'], onlyInSecond: ['Glow.Default'] },
        BACKPACK_LIGHT_FILE,
        BACKPACK_DARK_FILE,
      );
      expect(message).toMatch(/Found 2 semantic token\(s\)/);
      expect(message).toContain(`Missing in ${BACKPACK_DARK_FILE}`);
      expect(message).toContain(`Missing in ${BACKPACK_LIGHT_FILE}`);
      expect(message).toContain('Surface.Highlight');
      expect(message).toContain('Glow.Default');
      expect(message).toMatch(/DTCG alias/);
    });

    it('omits a heading for a side that has no offenders', () => {
      const message = formatAsymmetricSemanticTokens(
        {
          onlyInFirst: ['Surface.Highlight'],
          onlyInSecond: [],
        },
        BACKPACK_LIGHT_FILE,
        BACKPACK_DARK_FILE,
      );
      expect(message).toContain(`Missing in ${BACKPACK_DARK_FILE}`);
      expect(message).not.toContain(`Missing in ${BACKPACK_LIGHT_FILE}`);
    });

    it('uses the supplied file names verbatim, supporting any theme pair', () => {
      const message = formatAsymmetricSemanticTokens(
        {
          onlyInFirst: ['Surface.Highlight'],
          onlyInSecond: [],
        },
        'backpack.dark.json',
        'backpack.sepia.json',
      );
      expect(message).toContain('Missing in backpack.sepia.json');
      expect(message).toContain('only in backpack.dark.json');
      expect(message).toContain('{backpack.dark.json, backpack.sepia.json}');
    });
  });

  describe('formatDimensionViolations', () => {
    it('renders one line per violation with file basename and JSON-stringified value', () => {
      const message = formatDimensionViolations([
        {
          filePath: '/abs/repo/token-sync/tokens/backpack.day.json',
          tokenPath: 'Component.Button.Dimension.padding-h',
          value: '16em',
        },
        {
          filePath: '/abs/repo/token-sync/tokens/primitives.json',
          tokenPath: 'Spacing.md',
          value: 16,
        },
      ]);
      expect(message).toMatch(/Found 2 dimension token\(s\)/);
      expect(message).toContain(
        'backpack.day.json → Component.Button.Dimension.padding-h: "16em"',
      );
      expect(message).toContain('primitives.json → Spacing.md: 16');
      expect(message).toMatch(/size\/pxToRem/);
    });
  });
});
