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
import { StyleSheet } from 'react-native';
import renderer from 'react-test-renderer';

import BpkDismissibleChip from './BpkDismissibleChip';

const commonTests = () => {
  const onPress = jest.fn();

  describe('BpkDismissibleChip', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkDismissibleChip
            label="Label"
            accessibilityLabel="Dismiss"
            onPress={onPress}
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with custom style', () => {
      const styles = StyleSheet.create({
        custom: {
          flex: 1,
        },
      });

      const tree = renderer
        .create(
          <BpkDismissibleChip
            accessibilityLabel="Dismiss"
            onPress={onPress}
            label="Label"
            style={styles.custom}
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with arbitrary props', () => {
      const tree = renderer
        .create(
          <BpkDismissibleChip
            onPress={onPress}
            label="Label"
            accessibilityLabel="Dismiss"
            testID="123" // <- Arbitrary prop.
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
};
export default commonTests;
