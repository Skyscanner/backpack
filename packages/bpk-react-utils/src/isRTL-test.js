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

/* @flow strict */

import isRTL from './isRTL';

describe('isRTL undefined', () => {
  it('should return a boolean', () => {
    expect(typeof isRTL()).toBe('boolean');
  });

  it('should return false by default', () => {
    expect(isRTL()).toBe(false);
  });
});

describe('isRTL document defined', () => {
  Object.defineProperty(document, `documentElement`, {
    value: {
      getAttribute: jest.fn(),
    },
    writable: false,
  });
  it('should return true when documentElement direction attribute is `ltr`', () => {
    // eslint-disable-next-line prefer-destructuring
    const documentElement: ?HTMLElement = document.documentElement;
    if (documentElement) {
      documentElement.getAttribute.mockReturnValue('ltr');
    }
    expect(isRTL()).toBe(false);
  });

  it('should return true when documentElement direction attribute is `rtl`', () => {
    // eslint-disable-next-line prefer-destructuring
    const documentElement: ?HTMLElement = document.documentElement;
    if (documentElement) {
      documentElement.getAttribute.mockReturnValue('rtl');
    }
    expect(isRTL()).toBe(true);
  });
});
