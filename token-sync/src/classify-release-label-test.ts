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
  formatChangedTokenValuesMarkdown,
  formatDeletedOrRenamedTokensMarkdown,
  summariseTokenReleaseChanges,
} from './classify-release-label';

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
        'The following token values changed while the path stayed the same. Treat them as potentially breaking — visuals or behaviour driven by these tokens may shift.',
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
