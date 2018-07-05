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

import BpkNavigationBar from './BpkNavigationBar';
import BpkNavigationBarBackButtonIOS from './BpkNavigationBarBackButtonIOS';
import BpkNavigationBarTextButtonIOS from './BpkNavigationBarTextButtonIOS';

describe('ios', () => {
  describe('BpkNavigationBar', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkNavigationBar
            title="Backpack"
            leadingButton={
              <BpkNavigationBarBackButtonIOS
                title="Back"
                showTitle
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
              <BpkNavigationBarBackButtonIOS
                title="Back"
                showTitle
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
              <BpkNavigationBarTextButtonIOS
                title="Cancel"
                onPress={jest.fn()}
              />
            }
            trailingButton={
              <BpkNavigationBarTextButtonIOS
                title="Done"
                emphasize
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
              <BpkNavigationBarBackButtonIOS
                title="Back"
                showTitle
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
              <BpkNavigationBarBackButtonIOS
                title="Back"
                showTitle
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
              <BpkNavigationBarBackButtonIOS
                title="Back"
                showTitle
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
              <BpkNavigationBarBackButtonIOS
                title="Back"
                showTitle
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
