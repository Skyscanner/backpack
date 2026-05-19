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

import { classifyTokenReleaseLabel } from './classify-release-label';

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
