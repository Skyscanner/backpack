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

import BpkTouchableNativeFeedback from './BpkTouchableNativeFeedback';

const mockPlatform = (platform, version) => {
  const reactNative = jest.requireActual('react-native');
  jest
    .spyOn(reactNative.Platform, 'select')
    .mockImplementation(obj => obj.platform || obj.default);
  reactNative.Platform.OS = platform;
  // $FlowFixMe
  Object.defineProperty(reactNative.Platform, 'Version', {
    get: () => version,
  });
  return reactNative;
};

jest.mock('TouchableNativeFeedback', () =>
  jest.requireActual(
    'react-native/Libraries/Components/Touchable/TouchableNativeFeedback.android.js',
  ),
);

const FakeComponent = 'FakeComponent';

describe('BpkTouchableNativeFeedback', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  const styles = () => {
    const { StyleSheet } = jest.requireActual('react-native');
    return StyleSheet.create({
      custom: {
        width: '300em',
      },
    });
  };

  it('should render correctly on API < 21', () => {
    mockPlatform('android', 19);

    const tree = renderer
      .create(
        <BpkTouchableNativeFeedback>
          <FakeComponent />
        </BpkTouchableNativeFeedback>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly on API >= 21', () => {
    mockPlatform('android', 21);

    const tree = renderer
      .create(
        <BpkTouchableNativeFeedback>
          <FakeComponent />
        </BpkTouchableNativeFeedback>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with custom style prop', () => {
    mockPlatform('android', 21);
    const tree = renderer
      .create(
        <BpkTouchableNativeFeedback style={styles().custom}>
          <FakeComponent />
        </BpkTouchableNativeFeedback>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    mockPlatform('android', 21);
    const tree = renderer
      .create(
        <BpkTouchableNativeFeedback testID="arbitrary value">
          <FakeComponent />
        </BpkTouchableNativeFeedback>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
