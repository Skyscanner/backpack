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
import { StyleSheet } from 'react-native';
import renderer from 'react-test-renderer';
import BpkProgress from './BpkProgress';

// Manually triggers the onLayout callback with the value provided
const renderWithLayout = (component: any, layout: { width?: number }) => {
  const rendered = renderer.create(component);
  const mockNativeEvent = {
    nativeEvent: {
      layout,
    },
  };
  rendered.toJSON().props.onLayout(mockNativeEvent);
  return rendered;
};

const commonTests = () => {
  describe('BpkProgress', () => {
    it('should render correctly', () => {
      const tree = renderWithLayout(
        <BpkProgress min={0} max={100} value={10} />,
        {
          width: 200,
        },
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with "min" and "max" attributes', () => {
      const tree = renderWithLayout(
        <BpkProgress min={0} max={1} value={0.2} />,
        { width: 100 },
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with a "type" attribute', () => {
      const tree = renderer
        .create(<BpkProgress min={0} max={100} value={10} type="bar" />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with a "style" attribute', () => {
      const styles = StyleSheet.create({ container: { width: '80%' } });
      const tree = renderer
        .create(
          <BpkProgress min={0} max={100} value={10} style={styles.container} />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with a "fillStyle" attribute', () => {
      const styles = StyleSheet.create({
        fill: { backgroundColor: 'red' },
      });
      const tree = renderer
        .create(
          <BpkProgress min={0} max={100} value={10} fillStyle={styles.fill} />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should not go over the max bound', () => {
      const tree = renderWithLayout(<BpkProgress min={0} max={1} value={2} />, {
        width: 1,
      }).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should not go bellow the min bound', () => {
      const tree = renderWithLayout(
        <BpkProgress min={1} max={2} value={-1} />,
        {
          width: 1,
        },
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

export default commonTests;
