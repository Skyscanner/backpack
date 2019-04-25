/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

import React from 'react';
import renderer from 'react-test-renderer';

import BpkTooltip from './BpkTooltip';

describe('BpkTooltip', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<BpkTooltip id="my-popover">My tooltip content</BpkTooltip>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "padded" attribute equal to false', () => {
    const tree = renderer
      .create(
        <BpkTooltip id="my-tooltip" padded={false}>
          My tooltip content
        </BpkTooltip>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "className" attribute', () => {
    const tree = renderer
      .create(
        <BpkTooltip id="my-tooltip" className="my-custom-class">
          My tooltip content
        </BpkTooltip>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
