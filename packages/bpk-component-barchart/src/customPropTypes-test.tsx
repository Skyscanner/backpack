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
// @ts-nocheck



import chartDataProp from './customPropTypes';

const goodData = [
  {
    day: 'mon',
    price: 123,
  },
];

const badData = [
  {
    day: 'mon',
    value: 123,
  },
];

describe('chartDataProp', () => {
  it('should fail if data is not an array', () => {
    const result = chartDataProp(
      { data: {}, xScaleDataKey: 'day', yScaleDataKey: 'price' },
      'data',
      'BpkBarchart',
    );

    expect(result).not.toBeNull();
    expect(result).toEqual(expect.any(Error));
  });

  it('should fail if on object is missing a scale key', () => {
    const result = chartDataProp(
      { data: badData, xScaleDataKey: 'day', yScaleDataKey: 'price' },
      'data',
      'BpkBarchart',
    );

    expect(result).not.toBeNull();
    expect(result).toEqual(expect.any(Error));
  });

  it('should return null for valid data', () => {
    const result = chartDataProp(
      { data: goodData, xScaleDataKey: 'day', yScaleDataKey: 'price' },
      'data',
      'BpkBarchart',
    );

    expect(result).toBeNull();
  });
});
