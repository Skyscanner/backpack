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
import { View } from 'react-native';

import BpkNavigationBar from './BpkNavigationBar.android';
import BpkNavigationBarButtonAndroid from './BpkNavigationBarButtonAndroid.android';

jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  jest
    .spyOn(reactNative.Platform, 'select')
    .mockImplementation(obj => obj.android || obj.default);
  reactNative.Platform.OS = 'android';
  reactNative.TouchableNativeFeedback.SelectableBackground = jest.fn();

  return reactNative;
});

jest.mock('TouchableNativeFeedback', () =>
  jest.requireActual(
    'react-native/Libraries/Components/Touchable/TouchableNativeFeedback.android.js',
  ),
);

jest.mock('./BpkNavigationBarButtonAndroid.android', () =>
  jest.requireActual('./BpkNavigationBarButtonAndroid.android.js'),
);

jest.mock(
  './../node_modules/react-native-bpk-component-text/node_modules/bpk-tokens/tokens/base.react.native',
  () => jest.requireActual('bpk-tokens/tokens/base.react.native.android.js'),
);

jest.mock('bpk-tokens/tokens/base.react.native', () =>
  jest.requireActual('bpk-tokens/tokens/base.react.native.android.js'),
);

describe('android', () => {
  describe('BpkNavigationBar', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkNavigationBar
            title="Backpack"
            leadingButton={
              <BpkNavigationBarButtonAndroid
                title="Back"
                icon="long-arrow-left"
                onPress={jest.fn()}
              />
            }
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with custom style', () => {
      const tree = renderer
        .create(
          <BpkNavigationBar
            title="Backpack"
            leadingButton={
              <BpkNavigationBarButtonAndroid
                title="Back"
                icon="long-arrow-left"
                onPress={jest.fn()}
              />
            }
            style={{ zIndex: 5 }}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with trailing button', () => {
      const tree = renderer
        .create(
          <BpkNavigationBar
            title="Backpack"
            leadingButton={
              <BpkNavigationBarButtonAndroid
                title="Close"
                icon="close"
                onPress={jest.fn()}
              />
            }
            trailingButton={
              <BpkNavigationBarButtonAndroid
                title="Done"
                icon="tick"
                onPress={jest.fn()}
              />
            }
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with a title view', () => {
      const tree = renderer
        .create(
          <BpkNavigationBar
            title={<View testID="title-view" />}
            leadingButton={
              <BpkNavigationBarButtonAndroid
                title="Back"
                icon="long-arrow-left"
                onPress={jest.fn()}
              />
            }
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly when title is null', () => {
      const tree = renderer
        .create(
          <BpkNavigationBar
            title={null}
            leadingButton={
              <BpkNavigationBarButtonAndroid
                title="Back"
                icon="long-arrow-left"
                onPress={jest.fn()}
              />
            }
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with a subtitle view', () => {
      const tree = renderer
        .create(
          <BpkNavigationBar
            title="Backpack"
            subtitleView={<View testID="subtitle-view" />}
            leadingButton={
              <BpkNavigationBarButtonAndroid
                title="Back"
                icon="long-arrow-left"
                onPress={jest.fn()}
              />
            }
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with an icon in the title', () => {
      const tree = renderer
        .create(
          <BpkNavigationBar
            title={{ value: 'Checkout', icon: 'lock', iconPosition: 'leading' }}
            leadingButton={
              <BpkNavigationBarButtonAndroid
                title="Back"
                icon="long-arrow-left"
                onPress={jest.fn()}
              />
            }
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
