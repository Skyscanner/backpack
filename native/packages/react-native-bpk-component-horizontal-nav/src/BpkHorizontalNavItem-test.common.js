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
import BpkThemeProvider from 'react-native-bpk-theming';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';
import BpkHorizontalNavItem from './BpkHorizontalNavItem';

const commonTests = () => {
  const onPressFn = jest.fn();
  describe('BpkHorizontalNavItem', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkHorizontalNavItem id="0" title="Nav" onPress={onPressFn}>
            My nav content.
          </BpkHorizontalNavItem>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with "selected" prop', () => {
      const tree = renderer
        .create(
          <BpkHorizontalNavItem id="0" title="Nav" onPress={onPressFn} selected>
            My nav content.
          </BpkHorizontalNavItem>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with "spaceAround" prop', () => {
      const tree = renderer
        .create(
          <BpkHorizontalNavItem
            id="0"
            title="Nav"
            onPress={onPressFn}
            spaceAround
          >
            My nav content.
          </BpkHorizontalNavItem>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with "small" prop', () => {
      const tree = renderer
        .create(
          <BpkHorizontalNavItem id="0" title="Nav" onPress={onPressFn} small>
            My nav content.
          </BpkHorizontalNavItem>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with custom "style" prop', () => {
      const tree = renderer
        .create(
          <BpkHorizontalNavItem
            id="0"
            title="Nav"
            onPress={onPressFn}
            style={{ marginBottom: spacingSm }}
          >
            My nav content.
          </BpkHorizontalNavItem>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with arbitrary props', () => {
      const tree = renderer
        .create(
          <BpkHorizontalNavItem
            id="0"
            title="Nav"
            onPress={onPressFn}
            custom="custom-prop"
          >
            My nav content.
          </BpkHorizontalNavItem>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support theming', () => {
      const theme = {
        horizontalNavSelectedTextColor: 'red',
      };
      const tree = renderer
        .create(
          <BpkThemeProvider theme={theme}>
            <BpkHorizontalNavItem
              id="0"
              title="Nav"
              onPress={onPressFn}
              custom="custom-prop"
            >
              My nav content.
            </BpkHorizontalNavItem>
          </BpkThemeProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};
export default commonTests;
