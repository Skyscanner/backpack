/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

/* @flow strict */

/* eslint-disable backpack/use-tokens */

import { widthHeightAspectRatioPropType } from './customPropTypes';

describe('widthHeightAspectRatioPropType', () => {
  it('should fail if width but not height specified', () => {
    const result = widthHeightAspectRatioPropType(
      { width: 40 },
      'height',
      'BpkImage',
    );

    expect(result).toEqual(expect.any(Error));
  });

  it('should fail if height but not width specified', () => {
    const result = widthHeightAspectRatioPropType(
      { height: 40 },
      'height',
      'BpkImage',
    );

    expect(result).toEqual(expect.any(Error));
  });

  it('should fail if height, width and aspectRatio not specified', () => {
    const result = widthHeightAspectRatioPropType({}, 'height', 'BpkImage');

    expect(result).toEqual(expect.any(Error));
  });

  it('should be valid if height and width specified', () => {
    const result = widthHeightAspectRatioPropType(
      { height: 20, width: 40 },
      'height',
      'BpkImage',
    );

    expect(result).toBeNull();
  });

  it('should be valid if aspectRatio specified', () => {
    const result = widthHeightAspectRatioPropType(
      { aspectRatio: 2 },
      'aspectRatio',
      'BpkImage',
    );

    expect(result).toBeNull();
  });
});
