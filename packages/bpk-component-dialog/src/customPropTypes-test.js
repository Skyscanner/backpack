/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 - 2019 Skyscanner Ltd
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
  it('should fail if dismissible is true and there is no onClose', () => {
    const result = onClosePropType(
      { dismissible: true },
      'onClose',
      'BpkDialog',
    );

    expect(result).toEqual(expect.any(Error));
  });

  it('should return null for valid data', () => {
    const result = onClosePropType(
      { onClose: () => null, dismissible: true },
      'onClose',
      'BpkDialog',
    );

    expect(result).toBeNull();
  });

  it('should be valid to pass no onClose if dismissible is false', () => {
    const result = onClosePropType(
      { dismissible: false },
      'onClose',
      'BpkDialog',
    );

    expect(result).toBeNull();
  });
});
