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

import getCustomStyles from './utils';
/* eslint-disable backpack/use-tokens */
describe('getCustomStyles', () => {
  it('returns custom styles for string width and height', () => {
    const customSize = { width: '50px', height: '100px' };
    const result = getCustomStyles(customSize);
    expect(result).toEqual({ width: '50px', height: '100px' });
  });

  it('returns custom styles for numeric width and height', () => {
    const customSize = { width: 50, height: 100 };
    const result = getCustomStyles(customSize);
    expect(result).toEqual({ width: '50rem', height: '100rem' });
  });

  it('returns custom styles for mixed width and height types', () => {
    const customSize = { width: '50px', height: 100 };
    const result = getCustomStyles(customSize);
    expect(result).toEqual({ width: '50px', height: '100rem' });
  });
});
/* eslint-enable backpack/use-tokens */
