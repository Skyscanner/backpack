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

import React from 'react';
import renderer from 'react-test-renderer';

import BpkText from './BpkText';
import commonTests from './BpkText-test.common';

describe('iOS', () => {
  commonTests();

  it('should not apply `emphasize` for textStyle="xxl"', () => {
    jest.spyOn(console, 'error').mockImplementation(() => null);
    const tree = renderer
      .create(
        <BpkText emphasize textStyle="xxl">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkText>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
