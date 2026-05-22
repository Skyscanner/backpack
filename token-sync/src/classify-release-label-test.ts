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

import {
  classifyTokenReleaseLabel,
  formatAddedTokensMarkdown,
  formatChangedTokenValuesMarkdown,
  formatDeletedTokensMarkdown,
  formatDeletedOrRenamedTokensMarkdown,
  formatRenamedTokensMarkdown,
  summariseTokenReleaseChanges,
} from './classify-release-label';

function token(value: unknown, key: string) {
  return {
    $value: value,
    $extensions: {
      figma: {
        id: `id-${key}`,
        key,
      },
    },
  };
}

describe('classifyTokenReleaseLabel', () => {
  it('returns minor when the diff only adds tokens', () => {
    expect(
      classifyTokenReleaseLabel([
        {
          previous: {
            Spacing: { $type: 'dimension', Base: { $value: '8px' } },
          },
          current: {
            Spacing: {
              $type: 'dimension',
              Base: { $value: '8px' },
              Large: { $value: '16px' },
            },
          },
        },
      ]),
    ).toBe('minor');
  });

  it('returns major when an existing token value changes', () => {
    expect(
      classifyTokenReleaseLabel([
        {
          previous: {
            Spacing: { $type: 'dimension', Base: { $value: '8px' } },
          },
          current: {
            Spacing: { $type: 'dimension', Base: { $value: '12px' } },
          },
        },
      ]),
    ).toBe('major');
  });

  it('returns major when token values change alongside new token paths', () => {
    expect(
      classifyTokenReleaseLabel([
        {
          previous: {
            Spacing: { $type: 'dimension', Base: { $value: '8px' } },
          },
          current: {
            Spacing: {
              $type: 'dimension',
              Base: { $value: '12px' },
              Large: { $value: '16px' },
            },
          },
        },
      ]),
    ).toBe('major');
  });

  it('returns major when an existing token is removed or renamed', () => {
    expect(
      classifyTokenReleaseLabel([
        {
          previous: {
            Spacing: { $type: 'dimension', Base: { $value: '8px' } },
          },
          current: {
            Spacing: { $type: 'dimension', Default: { $value: '8px' } },
          },
        },
      ]),
    ).toBe('major');
  });

  it('reports token paths that were deleted or renamed', () => {
    expect(
      summariseTokenReleaseChanges([
        {
          fileName: 'token-sync/tokens/backpack.light.json',
          previous: {
            Spacing: {
              $type: 'dimension',
              Base: { $value: '8px' },
              Default: { $value: '12px' },
            },
          },
          current: {
            Spacing: { $type: 'dimension', Default: { $value: '12px' } },
          },
        },
      ]).deletedOrRenamedTokens,
    ).toEqual([{ fileName: 'backpack.light.json', tokenPath: 'Spacing/Base' }]);
  });

  it('uses Figma keys to distinguish renamed tokens from deletes and adds', () => {
    const summary = summariseTokenReleaseChanges([
      {
        fileName: 'token-sync/tokens/backpack.light.json',
        previous: {
          Spacing: {
            $type: 'dimension',
            Base: token('8px', 'spacing-base'),
          },
        },
        current: {
          Spacing: {
            $type: 'dimension',
            Default: token('8px', 'spacing-base'),
          },
        },
      },
    ]);

    expect(summary).toMatchObject({
      addedTokens: [],
      changedTokens: [],
      classificationMethod: 'figma-key',
      deletedTokens: [],
      label: 'major',
      renamedTokens: [
        {
          currentTokenPath: 'Spacing/Default',
          fileName: 'backpack.light.json',
          previousTokenPath: 'Spacing/Base',
        },
      ],
    });
  });

  it('does not report renamed tokens as value changes', () => {
    const summary = summariseTokenReleaseChanges([
      {
        fileName: 'token-sync/tokens/backpack.light.json',
        previous: {
          Spacing: {
            $type: 'dimension',
            Base: token('8px', 'spacing-base'),
          },
        },
        current: {
          Spacing: {
            $type: 'dimension',
            Default: token('12px', 'spacing-base'),
          },
        },
      },
    ]);

    expect(summary).toMatchObject({
      addedTokens: [],
      changedTokens: [],
      deletedTokens: [],
      renamedTokens: [
        {
          currentTokenPath: 'Spacing/Default',
          fileName: 'backpack.light.json',
          previousTokenPath: 'Spacing/Base',
        },
      ],
    });
  });

  it('uses Figma keys to report added, deleted, and changed tokens', () => {
    const summary = summariseTokenReleaseChanges([
      {
        fileName: 'token-sync/tokens/backpack.light.json',
        previous: {
          Spacing: {
            $type: 'dimension',
            Base: token('8px', 'spacing-base'),
            Removed: token('4px', 'spacing-removed'),
          },
        },
        current: {
          Spacing: {
            $type: 'dimension',
            Base: token('12px', 'spacing-base'),
            Large: token('16px', 'spacing-large'),
          },
        },
      },
    ]);

    expect(summary).toMatchObject({
      addedTokens: [
        { fileName: 'backpack.light.json', tokenPath: 'Spacing/Large' },
      ],
      changedTokens: [
        { fileName: 'backpack.light.json', tokenPath: 'Spacing/Base' },
      ],
      classificationMethod: 'figma-key',
      deletedTokens: [
        { fileName: 'backpack.light.json', tokenPath: 'Spacing/Removed' },
      ],
      label: 'major',
      renamedTokens: [],
    });
  });

  it('ignores Figma metadata when comparing token values', () => {
    expect(
      summariseTokenReleaseChanges([
        {
          previous: {
            Spacing: { $type: 'dimension', Base: token('8px', 'spacing-base') },
          },
          current: {
            Spacing: {
              $type: 'dimension',
              Base: {
                ...token('8px', 'spacing-base'),
                $extensions: {
                  figma: {
                    id: 'new-id',
                    key: 'spacing-base',
                  },
                },
              },
            },
          },
        },
      ]).label,
    ).toBe('minor');
  });

  it('formats deleted or renamed token paths for pull request bodies', () => {
    expect(
      formatDeletedOrRenamedTokensMarkdown([
        { fileName: 'backpack.light.json', tokenPath: 'Spacing/Base' },
        { fileName: 'backpack.light.json', tokenPath: 'Spacing/Small' },
        { fileName: 'backpack.dark.json', tokenPath: 'Spacing/Base' },
      ]),
    ).toBe(
      [
        '## Deleted or renamed tokens',
        '',
        'The following token paths existed in the previous commit but are missing from the fetched tokens. Treat them as breaking changes and verify usages have been migrated.',
        '',
        '### backpack.light.json',
        '',
        '- `Spacing/Base`',
        '- `Spacing/Small`',
        '',
        '### backpack.dark.json',
        '',
        '- `Spacing/Base`',
      ].join('\n'),
    );
  });

  it('formats deleted token paths for pull request bodies', () => {
    expect(
      formatDeletedTokensMarkdown([
        { fileName: 'backpack.light.json', tokenPath: 'Spacing/Base' },
        { fileName: 'backpack.dark.json', tokenPath: 'Spacing/Base' },
      ]),
    ).toBe(
      [
        '## Deleted tokens',
        '',
        'The following Figma variable keys existed in the previous commit but are missing from the fetched tokens. Treat them as breaking changes and verify usages have been migrated.',
        '',
        '### backpack.light.json',
        '',
        '- `Spacing/Base`',
        '',
        '### backpack.dark.json',
        '',
        '- `Spacing/Base`',
      ].join('\n'),
    );
  });

  it('formats renamed token paths for pull request bodies', () => {
    expect(
      formatRenamedTokensMarkdown([
        {
          currentTokenPath: 'Spacing/Default',
          fileName: 'backpack.light.json',
          previousTokenPath: 'Spacing/Base',
        },
        {
          currentTokenPath: 'Spacing/Default',
          fileName: 'backpack.dark.json',
          previousTokenPath: 'Spacing/Base',
        },
      ]),
    ).toBe(
      [
        '## Renamed tokens',
        '',
        'The following token paths changed while the Figma variable key stayed the same. Treat them as breaking changes and verify usages have been migrated.',
        '',
        '### backpack.light.json',
        '',
        '- `Spacing/Base` -> `Spacing/Default`',
        '',
        '### backpack.dark.json',
        '',
        '- `Spacing/Base` -> `Spacing/Default`',
      ].join('\n'),
    );
  });

  it('formats changed token paths for pull request bodies', () => {
    expect(
      formatChangedTokenValuesMarkdown([
        { fileName: 'backpack.light.json', tokenPath: 'Spacing/Base' },
        { fileName: 'backpack.light.json', tokenPath: 'Spacing/Default' },
        { fileName: 'backpack.dark.json', tokenPath: 'Spacing/Base' },
      ]),
    ).toBe(
      [
        '## Changed token values',
        '',
        'The following token values changed while the token path stayed the same. Treat them as potentially breaking — visuals or behaviour driven by these tokens may shift.',
        '',
        '### backpack.light.json',
        '',
        '- `Spacing/Base`',
        '- `Spacing/Default`',
        '',
        '### backpack.dark.json',
        '',
        '- `Spacing/Base`',
      ].join('\n'),
    );
  });

  it('formats added token paths for pull request bodies', () => {
    expect(
      formatAddedTokensMarkdown([
        { fileName: 'backpack.light.json', tokenPath: 'Spacing/Large' },
        { fileName: 'backpack.light.json', tokenPath: 'Spacing/XLarge' },
        { fileName: 'backpack.dark.json', tokenPath: 'Spacing/Large' },
      ]),
    ).toBe(
      [
        '## Added tokens',
        '',
        'The following token paths are new in this sync. When Figma key metadata is available, these are variables whose keys were not present in the previous generated tokens.',
        '',
        '### backpack.light.json',
        '',
        '- `Spacing/Large`',
        '- `Spacing/XLarge`',
        '',
        '### backpack.dark.json',
        '',
        '- `Spacing/Large`',
      ].join('\n'),
    );
  });

  it('normalises object key order before comparing token values', () => {
    expect(
      classifyTokenReleaseLabel([
        {
          previous: {
            Shadow: {
              Raised: {
                $type: 'shadow',
                $value: { first: '1', second: '2' },
              },
            },
          },
          current: {
            Shadow: {
              Raised: {
                $type: 'shadow',
                $value: { second: '2', first: '1' },
              },
            },
          },
        },
      ]),
    ).toBe('minor');
  });
});
