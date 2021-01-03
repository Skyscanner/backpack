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

import setOpacity from './setOpacity';

describe('setOpacity', () => {
  it('should set opacity on rgb', () => {
    expect(setOpacity('rgb(119, 67, 206)', 0.7)).toEqual(
      'rgba(119, 67, 206, 0.7)',
    );
  });

  it('should set opacity on hex', () => {
    expect(setOpacity('#7743CE', 0.7)).toEqual('rgba(119, 67, 206, 0.7)');
  });

  it('should error if opacity > 1', () => {
    expect(() => setOpacity('rgb(119, 67, 206)', 47)).toThrow(
      'Invalid arg `opacity` of value `47` supplied to `setOpacity`, expected a value between 0.0 and 1.0.',
    );
  });

  it('should error if opacity < 0', () => {
    expect(() => setOpacity('rgb(119, 67, 206)', -12)).toThrow(
      'Invalid arg `opacity` of value `-12` supplied to `setOpacity`, expected a value between 0.0 and 1.0.',
    );
  });

  it('should error if opacity is wrong type', () => {
    expect(() => setOpacity('rgb(119, 67, 206)', { opacity: 0.4 })).toThrow(
      'Invalid arg `opacity` of type `object` supplied to `setOpacity`, expected a numeric value between 0.0 and 1.0.',
    );
  });

  it('should error if opacity is null', () => {
    expect(() => setOpacity('rgb(119, 67, 206)', null)).toThrow(
      'Invalid arg `opacity` of type `object` supplied to `setOpacity`, expected a numeric value between 0.0 and 1.0.',
    );
  });

  it('should error if color token is invalid', () => {
    expect(() => setOpacity('ASDFG', 0.5)).toThrow(
      'Unable to parse color from string: ASDFG',
    );
  });

  it('should not error if opacity is 0', () => {
    expect(() => setOpacity('#7743CE', 0)).not.toThrow();
  });

  it('should default if color token is null', () => {
    expect(setOpacity(null, 0.5)).toEqual('rgba(0, 0, 0, 0.5)');
  });
});
