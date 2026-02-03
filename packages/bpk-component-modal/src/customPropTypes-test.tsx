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


import { titlePropType, onClosePropType } from './customPropTypes';

describe('titlePropType', () => {
  it('should fail if show header is true and there is no title', () => {
    const result = titlePropType(
      { showHeader: true },
      'title',
      'BpkModalInner',
    );

    expect(result).toEqual(expect.any(Error));
  });

  it('should return null for valid data', () => {
    const result = titlePropType(
      { title: 'Modal title', showHeader: true },
      'title',
      'BpkModalInner',
    );

    expect(result).toBeNull();
  });

  it('should be valid to pass no title if showHeader is false', () => {
    const result = titlePropType(
      { showHeader: false },
      'title',
      'BpkModalInner',
    );

    expect(result).toBeNull();
  });
});

describe('onClosePropType', () => {
  it('should fail if showHeader is true and there is onClose', () => {
    const result = onClosePropType(
      { showHeader: true },
      'onClose',
      'BpkModalInner',
    );

    expect(result).toEqual(expect.any(Error));
  });

  it('should return null for valid data', () => {
    const result = onClosePropType(
      { onClose: () => null, showHeader: true },
      'onClose',
      'BpkModalInner',
    );

    expect(result).toBeNull();
  });

  it('should be valid to pass no onClose if showHeader is false', () => {
    const result = onClosePropType(
      { showHeader: false },
      'onClose',
      'BpkModalInner',
    );

    expect(result).toBeNull();
  });
});
