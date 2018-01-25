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

import { titlePropType } from './customPropTypes';

const goodData = { title: 'Dialog title', dismissible: true };
const goodData2 = { dismissible: false };
const badData = { dismissible: true };

describe('titlePropType', () => {
  it('should fail if dismissible is true and there is no title', () => {
    const result = titlePropType(badData, 'title', 'BpkDialog');

    expect(result).not.toBeFalsy();
    expect(result).toEqual(expect.any(Error));
  });

  it('should return null for valid data', () => {
    const result = titlePropType(goodData, 'title', 'BpkDialog');

    expect(result).toBeNull();
  });

  it('should be valid to pass no title if dismissible is false', () => {
    const result = titlePropType(goodData2, 'title', 'BpkDialog');

    expect(result).toBeNull();
  });
});
