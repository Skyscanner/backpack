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

import React from 'react';
import renderer from 'react-test-renderer';

import BpkButton from './BpkButton';
import commonTests from './BpkButton-test.common';

jest.mock('react-native-linear-gradient', () => 'View');

describe('iOS', () => {
  commonTests();

  it('should support the "large" property', () => {
    const onPressFn = jest.fn();

    const tree = renderer
      .create(<BpkButton large title="Lorem ipsum" onPress={onPressFn} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should support the "large" and secondary property', () => {
    const onPressFn = jest.fn();

    const tree = renderer
      .create(
        <BpkButton
          large
          title="Lorem ipsum"
          type="secondary"
          onPress={onPressFn}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should support the "iconOnly" property', () => {
    const onPressFn = jest.fn();

    const tree = renderer
      .create(
        <BpkButton
          iconOnly
          icon="baggage"
          title="Lorem ipsum"
          onPress={onPressFn}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should support the "iconOnly" and "large" property', () => {
    const onPressFn = jest.fn();

    const tree = renderer
      .create(
        <BpkButton
          iconOnly
          large
          icon="baggage"
          title="Lorem ipsum"
          onPress={onPressFn}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should support the "icon" and "large" property', () => {
    const onPressFn = jest.fn();

    const tree = renderer
      .create(
        <BpkButton
          icon="baggage"
          large
          title="Lorem ipsum"
          onPress={onPressFn}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
