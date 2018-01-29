/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

/* @flow */

import { onClosePropType } from './customPropTypes';

describe('onClosePropType', () => {
  it('should fail if closeOnScrimClick is true and there is no onClose', () => {
    const result = onClosePropType(
      { closeOnScrimClick: true },
      'onClose',
      'BpkScrim',
    );

    expect(result).toEqual(expect.any(Error));
  });

  it('should return null for valid data', () => {
    const result = onClosePropType(
      { onClose: () => null, closeOnScrimClick: true },
      'onClose',
      'BpkScrim',
    );

    expect(result).toBeNull();
  });

  it('should be valid to pass no title if closeOnScrimClick is false', () => {
    const result = onClosePropType(
      { closeOnScrimClick: false },
      'onClose',
      'BpkScrim',
    );

    expect(result).toBeNull();
  });
});
