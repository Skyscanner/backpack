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
import ShallowRenderer from 'react-test-renderer/shallow';
import BpkText from 'react-native-bpk-component-text';

import BpkCard from './BpkCard';
import withDivider from './withDivider';

const BpkCardWithDivider = withDivider(BpkCard);

const commonTests = () => {
  const onPress = jest.fn();
  let renderer;

  beforeAll(() => {
    renderer = new ShallowRenderer();
  });

  describe('withDivider', () => {
    const content = (
      <BpkText>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkText>
    );

    it('should render correctly', () => {
      renderer.render(
        <BpkCardWithDivider
          onPress={onPress}
          accessibilityLabel="Example Card"
          stub={content}
        >
          {content}
        </BpkCardWithDivider>,
      );

      const tree = renderer.getRenderOutput();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly without padding', () => {
      renderer.render(
        <BpkCardWithDivider
          onPress={onPress}
          accessibilityLabel="Example Card"
          stub={content}
          padded={false}
        >
          {content}
        </BpkCardWithDivider>,
      );

      const tree = renderer.getRenderOutput();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with arbitrary props', () => {
      renderer.render(
        <BpkCardWithDivider
          onPress={onPress}
          accessibilityLabel="Example Card"
          stub={content}
          testID="arbitrary value" // <-- arbitrary prop
        >
          {content}
        </BpkCardWithDivider>,
      );

      const tree = renderer.getRenderOutput();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with custom main style', () => {
      const styles = StyleSheet.create({
        main: {
          flex: 2,
        },
      });

      renderer.render(
        <BpkCardWithDivider
          onPress={onPress}
          accessibilityLabel="Example Card"
          stub={content}
          mainStyle={styles.main}
        >
          {content}
        </BpkCardWithDivider>,
      );

      const tree = renderer.getRenderOutput();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with custom stub style', () => {
      const styles = StyleSheet.create({
        stub: {
          flex: 3,
        },
      });

      renderer.render(
        <BpkCardWithDivider
          onPress={onPress}
          accessibilityLabel="Example Card"
          stub={content}
          stubStyle={styles.stub}
        >
          {content}
        </BpkCardWithDivider>,
      );

      const tree = renderer.getRenderOutput();
      expect(tree).toMatchSnapshot();
    });
  });
};
export default commonTests;
