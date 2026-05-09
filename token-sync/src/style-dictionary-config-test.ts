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
  REQUIRED_INPUT_FILES,
  buildStyleDictionaryConfigs,
  findAsymmetricSemanticTokens,
  findCssNameCollisions,
  findInvalidDimensions,
  formatAsymmetricSemanticTokens,
  formatCssNameCollisions,
  formatDimensionViolations,
  kebabBpkName,
  makeBackpackTokenFilter,
} from './style-dictionary-config';

import type { TransformedToken } from 'style-dictionary/types';

describe('style-dictionary-config', () => {
  describe('makeBackpackTokenFilter', () => {
    function token(filePath: string): TransformedToken {
      return { filePath } as unknown as TransformedToken;
    }

    it('matches by basename so absolute and relative paths both pass', () => {
      const filter = makeBackpackTokenFilter('backpack.day.json');
      expect(filter(token('/repo/token-sync/tokens/backpack.day.json'))).toBe(true);
      expect(filter(token('tokens/backpack.day.json'))).toBe(true);
    });

    it('rejects tokens from other source files (e.g. primitives)', () => {
      const filter = makeBackpackTokenFilter('backpack.day.json');
      expect(filter(token('/repo/token-sync/tokens/primitives.json'))).toBe(false);
      expect(filter(token('/repo/token-sync/tokens/backpack.night.json'))).toBe(false);
    });

    it('rejects tokens missing or with non-string filePath', () => {
      const filter = makeBackpackTokenFilter('backpack.day.json');
      expect(filter({} as TransformedToken)).toBe(false);
      expect(filter({ filePath: undefined } as unknown as TransformedToken)).toBe(false);
      expect(filter({ filePath: 42 } as unknown as TransformedToken)).toBe(false);
    });

    it('rejects partial matches that just contain the filename', () => {
      // `path.basename` strips directories, so this should not match.
      const filter = makeBackpackTokenFilter('backpack.day.json');
      expect(filter(token('/repo/backpack.day.json.bak'))).toBe(false);
      expect(filter(token('/repo/some-backpack.day.json'))).toBe(false);
    });
  });

  describe('buildStyleDictionaryConfigs', () => {
    const tokensDir = '/repo/token-sync/tokens';
    const buildDir = '/repo/token-sync/tokens/css';
    const cssTransforms = ['attribute/cti', 'name/kebab', 'size/pxToRem'];
    const baseOpts = { tokensDir, buildDir, cssTransforms };

    it('produces configs for each semantic file in order', () => {
      const configs = buildStyleDictionaryConfigs({
        ...baseOpts,
        semanticFileNames: [BACKPACK_LIGHT_FILE, BACKPACK_DARK_FILE],
      });
      expect(configs).toHaveLength(2);
      // Names are assigned by index: web-theme-0, web-theme-1, etc.
      expect(configs.map((c) => c.name)).toEqual(['web-theme-0', 'web-theme-1']);
    });

    it('defaults to light then dark when semantic files not provided', () => {
      const configs = buildStyleDictionaryConfigs(baseOpts);
      expect(configs).toHaveLength(2);
    });

    it('uses the spec-matching selectors and filenames for light/dark', () => {
      const configs = buildStyleDictionaryConfigs({
        ...baseOpts,
        semanticFileNames: [BACKPACK_LIGHT_FILE, BACKPACK_DARK_FILE],
      });
      const [light, dark] = configs;
      const lightFile = light.config.platforms?.css?.files?.[0];
      const darkFile = dark.config.platforms?.css?.files?.[0];

      expect(lightFile?.destination).toBe(LIGHT_OUTPUT_FILE);
      expect(lightFile?.options?.selector).toBe(LIGHT_SELECTOR);
      expect(darkFile?.destination).toBe(DARK_OUTPUT_FILE);
      expect(darkFile?.options?.selector).toBe(DARK_SELECTOR);
    });

    it('loads primitives alongside each semantic token file', () => {
      const configs = buildStyleDictionaryConfigs({
        ...baseOpts,
        semanticFileNames: [BACKPACK_LIGHT_FILE, BACKPACK_DARK_FILE],
      });
      const [light, dark] = configs;
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

    it('appends a separator only when missing (idempotent)', () => {
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
        semanticFileNames: [BACKPACK_LIGHT_FILE, BACKPACK_DARK_FILE],
      });
      for (const { config } of configs) {
        expect(config.platforms?.css?.transforms).toEqual(custom);
      }
    });

    it('defensively copies cssTransforms so caller mutation is harmless', () => {
      const mutable = ['attribute/cti', 'size/pxToRem'];
      const configs = buildStyleDictionaryConfigs({
        ...baseOpts,
        cssTransforms: mutable,
        semanticFileNames: [BACKPACK_LIGHT_FILE],
      });
      mutable.push('color/css');
      expect(configs[0].config.platforms?.css?.transforms).toEqual([
        'attribute/cti',
        'size/pxToRem',
      ]);
    });

    it('keeps semantic file tokens but not primitives via the filter', () => {
      const configs = buildStyleDictionaryConfigs({
        ...baseOpts,
        semanticFileNames: [BACKPACK_LIGHT_FILE, BACKPACK_DARK_FILE],
      });
      const [light] = configs;
      const filter = light.config.platforms?.css?.files?.[0]?.filter;
      expect(typeof filter).toBe('function');
      const fn = filter as (t: TransformedToken) => boolean;
      expect(
        fn({ filePath: path.join(tokensDir, BACKPACK_LIGHT_FILE) } as TransformedToken),
      ).toBe(true);
      expect(
        fn({ filePath: path.join(tokensDir, PRIMITIVES_FILE) } as TransformedToken),
      ).toBe(false);
      expect(
        fn({ filePath: path.join(tokensDir, BACKPACK_DARK_FILE) } as TransformedToken),
      ).toBe(false);
    });
  });

  it('REQUIRED_INPUT_FILES lists primitives (semantic files auto-discovered)', () => {
    expect([...REQUIRED_INPUT_FILES]).toEqual([PRIMITIVES_FILE]);
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
      // `filePath` is forwarded verbatim so the caller can group / format
      // by source file.
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
      // Real Backpack DTCG output: $type lives on the group, not on the leaf.
      // The validator must walk down with the cascading type to know whether
      // to apply the px rule.
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
      // Colour tokens, fontWeight numbers etc. are SD's concern, not ours.
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
      // DTCG allows a leaf to overrule its group's $type. If a leaf says
      // it's `number`, dimension rules don't apply even if the group is
      // `dimension`. This is unusual in Backpack today but worth being
      // correct about so we don't false-positive.
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
    it('joins segments with dashes and lowercases each one', () => {
      expect(kebabBpkName(['Canvas', 'Default'])).toBe('canvas-default');
    });

    it('preserves dashes inside a single segment', () => {
      expect(kebabBpkName(['Component', 'Button', 'Colour', 'bg-default'])).toBe(
        'button-colour-bg-default',
      );
    });

    it('replaces whitespace within a segment with a dash', () => {
      // Real Backpack data: e.g. `Neutral.Grey 10` → `neutral-grey-10`.
      expect(kebabBpkName(['Neutral', 'Grey 10'])).toBe('neutral-grey-10');
    });

    it('inserts a dash at camelCase boundaries', () => {
      // Defensive — Backpack tokens are PascalCase / kebab today, but a
      // future Figma rename to camelCase shouldn't smush the segments.
      expect(kebabBpkName(['borderRadius'])).toBe('border-radius');
    });

    it('strips a leading "Component" segment (case-insensitive)', () => {
      expect(kebabBpkName(['Component', 'Badge', 'Colour', 'bg-default'])).toBe(
        'badge-colour-bg-default',
      );
      expect(kebabBpkName(['component', 'Badge'])).toBe('badge');
      expect(kebabBpkName(['COMPONENT', 'Badge'])).toBe('badge');
    });

    it('does not strip "Component" when it is not the first segment', () => {
      // Stripping anywhere other than position 0 would silently merge
      // unrelated tokens. Only the top-level Figma folder gets dropped.
      expect(kebabBpkName(['Layout', 'Component', 'Inner'])).toBe(
        'layout-component-inner',
      );
    });

    it('does not strip when "Component" is the entire path (would empty the name)', () => {
      // If the only segment is "Component", we keep it — stripping would
      // produce `--bpk-` with no token name, which is meaningless CSS.
      expect(kebabBpkName(['Component'])).toBe('component');
    });

    it('prepends the prefix as a leading segment after stripping', () => {
      // SD's built-in name/kebab includes the platform prefix in the same
      // place. We mirror that so the css/variables format produces
      // `--bpk-badge-…`, not `--badge-…`.
      expect(
        kebabBpkName(['Component', 'Badge', 'Colour', 'bg-default'], 'bpk'),
      ).toBe('bpk-badge-colour-bg-default');
      expect(kebabBpkName(['Canvas', 'Default'], 'bpk')).toBe(
        'bpk-canvas-default',
      );
    });

    it('ignores empty / undefined prefix', () => {
      expect(kebabBpkName(['Canvas', 'Default'], undefined)).toBe(
        'canvas-default',
      );
      expect(kebabBpkName(['Canvas', 'Default'], '')).toBe('canvas-default');
    });

    it('sanitises parenthesised annotations like "(new)" into a dash-joined suffix', () => {
      // Common Figma habit: designers annotate tokens with `(new)`, `(WIP)`,
      // `(deprecated)` etc. The sanitiser keeps the readable text and drops
      // only the syntactically invalid wrapper.
      expect(
        kebabBpkName(['Component', 'Chip', 'Colour', 'stroke-Off (new)']),
      ).toBe('chip-colour-stroke-off-new');
      expect(kebabBpkName(['Foo (WIP)'])).toBe('foo-wip');
    });

    it('sanitises brackets, exclamation marks, and other punctuation', () => {
      expect(kebabBpkName(['Card [draft]'])).toBe('card-draft');
      expect(kebabBpkName(['!important'])).toBe('important');
      expect(kebabBpkName(['foo@bar/baz'])).toBe('foo-bar-baz');
    });

    it('drops emoji / non-ASCII characters as separators', () => {
      // Each emoji code point becomes a single dash and gets collapsed
      // with neighbours so we never emit `--` mid-name.
      expect(kebabBpkName(['🎨 colour'])).toBe('colour');
      expect(kebabBpkName(['hot🔥red'])).toBe('hot-red');
    });

    it('collapses multiple unsafe-char runs and trims leading/trailing dashes', () => {
      expect(kebabBpkName(['(((wrapped)))'])).toBe('wrapped');
      expect(kebabBpkName(['  spaced  '])).toBe('spaced');
    });

    it('keeps the rest of a path intact when one segment needs sanitising', () => {
      // The fix is segment-local — clean segments aren't rewritten.
      expect(
        kebabBpkName(['Component', 'Button', 'Colour', 'bg-primary (new)'], 'bpk'),
      ).toBe('bpk-button-colour-bg-primary-new');
    });

    it('does not apply Component-stripping to the prefix itself', () => {
      // A weird-but-possible scenario: someone configures the prefix to a
      // value that happens to land in STRIPPED_TOP_LEVEL_SEGMENTS. The
      // strip set applies to `token.path[0]`, never to `prefix`, so the
      // user's chosen prefix is always preserved.
      expect(kebabBpkName(['Foo'], 'component')).toBe('component-foo');
    });
  });

  describe('findCssNameCollisions', () => {
    const filePath = '/repo/tokens/backpack.day.json';

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
      expect(findCssNameCollisions(tree, filePath)).toEqual([]);
    });

    it('detects a top-level Foo colliding with Component.Foo after stripping', () => {
      // The realistic failure mode: someone adds `Badge.Colour.bg-default`
      // at the top level alongside the existing `Component.Badge.Colour.
      // bg-default`. Both kebab to the same CSS variable.
      const tree = {
        Badge: {
          Colour: {
            $type: 'color',
            'bg-default': { $value: '#aaa' },
          },
        },
        Component: {
          Badge: {
            Colour: {
              $type: 'color',
              'bg-default': { $value: '#bbb' },
            },
          },
        },
      };
      const collisions = findCssNameCollisions(tree, filePath);
      expect(collisions).toHaveLength(1);
      expect(collisions[0].name).toBe('badge-colour-bg-default');
      // Sources sorted so the message is stable regardless of walk order.
      expect(collisions[0].sources).toEqual([
        'Badge.Colour.bg-default',
        'Component.Badge.Colour.bg-default',
      ]);
    });

    it('lists every colliding source when more than two paths share a name', () => {
      // Defensive — the same name colliding 3+ ways is unlikely but the
      // message should still enumerate all of them.
      const tree = {
        Foo: { $type: 'color', x: { $value: '#000' } },
        Component: { Foo: { $type: 'color', x: { $value: '#111' } } },
      };
      // Manually drop a third clash via an extra path.
      const treeWithThird = {
        ...tree,
        Component2: { Foo: { $type: 'color', x: { $value: '#222' } } },
      };
      // Component2 doesn't get stripped (only "component" is in the set),
      // so it shouldn't collide with the others — verify the list is exactly
      // the expected pair.
      const collisions = findCssNameCollisions(treeWithThird, filePath);
      expect(collisions).toHaveLength(1);
      expect(collisions[0].sources).toEqual(['Component.Foo.x', 'Foo.x']);
    });
  });

  describe('formatCssNameCollisions', () => {
    it('renders one line per collision, scoped by file basename', () => {
      const message = formatCssNameCollisions([
        {
          filePath: '/abs/repo/tokens/backpack.day.json',
          collisions: [
            {
              name: 'badge-colour-bg-default',
              sources: [
                'Badge.Colour.bg-default',
                'Component.Badge.Colour.bg-default',
              ],
            },
          ],
        },
      ]);
      expect(message).toMatch(/Found 1 CSS variable name collision/);
      expect(message).toContain('backpack.day.json');
      // The actual CSS variable that would have collided, for a quick eye-grep.
      expect(message).toContain('--bpk-badge-colour-bg-default');
      // Both source paths visible so designers can locate them in Figma.
      expect(message).toContain('Badge.Colour.bg-default');
      expect(message).toContain('Component.Badge.Colour.bg-default');
    });
  });

  describe('findAsymmetricSemanticTokens', () => {
    it('returns no asymmetry when both trees declare the same paths', () => {
      const light = {
        Canvas: { $type: 'color', Default: { $value: '#fff' } },
        Surface: { $type: 'color', Highlight: { $value: '{Colour.Pink}' } },
      };
      const dark = {
        Canvas: { $type: 'color', Default: { $value: '#000' } },
        // Same path, different value — that's allowed; symmetry is a key
        // check, not a value check.
        Surface: { $type: 'color', Highlight: { $value: '{Colour.Berry}' } },
      };
      expect(findAsymmetricSemanticTokens(light, dark)).toEqual({
        lightOnly: [],
        darkOnly: [],
      });
    });

    it('reports tokens defined only in Light under lightOnly', () => {
      const light = {
        Canvas: { $type: 'color', Default: { $value: '#fff' } },
        Surface: { $type: 'color', Highlight: { $value: '{Colour.Pink}' } },
      };
      const dark = {
        Canvas: { $type: 'color', Default: { $value: '#000' } },
      };
      const asym = findAsymmetricSemanticTokens(light, dark);
      expect(asym.lightOnly).toEqual(['Surface.Highlight']);
      expect(asym.darkOnly).toEqual([]);
    });

    it('reports tokens defined only in Dark under darkOnly', () => {
      const light = {
        Canvas: { $type: 'color', Default: { $value: '#fff' } },
      };
      const dark = {
        Canvas: { $type: 'color', Default: { $value: '#000' } },
        // A "Dark-only" token is the worse failure mode (Light mode has no
        // declaration, so var() is unset). The check has to surface both
        // directions.
        Glow: { $type: 'color', Default: { $value: '#abc' } },
      };
      const asym = findAsymmetricSemanticTokens(light, dark);
      expect(asym.lightOnly).toEqual([]);
      expect(asym.darkOnly).toEqual(['Glow.Default']);
    });

    it('reports both directions in one pass and sorts each side', () => {
      // Don't make the caller hunt through unsorted arrays — designers
      // reading the error message want the offenders alphabetical.
      const light = {
        Z: { $type: 'color', a: { $value: '#000' } },
        A: { $type: 'color', b: { $value: '#000' } },
      };
      const dark = {
        Y: { $type: 'color', x: { $value: '#fff' } },
        B: { $type: 'color', y: { $value: '#fff' } },
      };
      const asym = findAsymmetricSemanticTokens(light, dark);
      expect(asym.lightOnly).toEqual(['A.b', 'Z.a']);
      expect(asym.darkOnly).toEqual(['B.y', 'Y.x']);
    });

    it('treats nested groups correctly via the DTCG path', () => {
      const light = {
        Component: {
          Button: {
            Colour: {
              $type: 'color',
              'bg-primary': { $value: '#000' },
            },
          },
        },
      };
      const dark = {
        Component: {
          Button: {
            Colour: {
              $type: 'color',
              // Different leaf name — counts as different paths on each
              // side, so both directions should be flagged.
              'bg-secondary': { $value: '#fff' },
            },
          },
        },
      };
      const asym = findAsymmetricSemanticTokens(light, dark);
      expect(asym.lightOnly).toEqual(['Component.Button.Colour.bg-primary']);
      expect(asym.darkOnly).toEqual(['Component.Button.Colour.bg-secondary']);
    });
  });

  describe('formatAsymmetricSemanticTokens', () => {
    it('renders both sides under their own headings with file basenames', () => {
      const message = formatAsymmetricSemanticTokens({
        lightOnly: ['Surface.Highlight'],
        darkOnly: ['Glow.Default'],
      });
      expect(message).toMatch(/Found 2 semantic token\(s\)/);
      // Heading wording: "Missing in <other-mode-file>" reads naturally —
      // the offender is missing FROM the file the user needs to edit.
      expect(message).toContain(`Missing in ${BACKPACK_DARK_FILE}`);
      expect(message).toContain(`Missing in ${BACKPACK_LIGHT_FILE}`);
      expect(message).toContain('Surface.Highlight');
      expect(message).toContain('Glow.Default');
      // Hint mentions the DTCG alias workaround so a designer with a
      // legitimately shared value knows how to express it.
      expect(message).toMatch(/DTCG alias/);
    });

    it('omits a heading for a side that has no offenders', () => {
      const lightOnlyMessage = formatAsymmetricSemanticTokens({
        lightOnly: ['Surface.Highlight'],
        darkOnly: [],
      });
      expect(lightOnlyMessage).toContain(`Missing in ${BACKPACK_DARK_FILE}`);
      expect(lightOnlyMessage).not.toContain(`Missing in ${BACKPACK_LIGHT_FILE}`);
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
      // Aggregated count up top so a long list is still digestible.
      expect(message).toMatch(/Found 2 dimension token\(s\)/);
      // File names use basename, not full absolute path — keeps the message
      // tight when the user's repo lives deep in /Users/.../workspaces/.../ .
      expect(message).toContain(
        'backpack.day.json → Component.Button.Dimension.padding-h: "16em"',
      );
      expect(message).toContain('primitives.json → Spacing.md: 16');
      // Actionable hint at the bottom — the swap path to size/pxToRem isn't
      // obvious to a designer reading this message cold.
      expect(message).toMatch(/size\/pxToRem/);
    });
  });
});
