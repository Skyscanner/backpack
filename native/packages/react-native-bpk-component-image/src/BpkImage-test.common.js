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

import BpkImage from './BpkImage';

const requiredProps = {
  alt: 'test',
  source: {
    uri:
      'https://images.unsplash.com/photo-1518225853900-cc01b1092211?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d75dd482ea9e2ed4d53017c326497143&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb',
  },
};

const commonTests = () => {
  describe('BpkImage', () => {
    it('should render correctly', () => {
      const tree = renderer.create(<BpkImage {...requiredProps} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with custom style', () => {
      const styles = StyleSheet.create({
        custom: {
          flex: 1,
        },
      });

      const tree = renderer
        .create(<BpkImage style={styles.custom} {...requiredProps} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with arbitrary props', () => {
      const tree = renderer
        .create(<BpkImage testID="123" {...requiredProps} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly when not loaded', () => {
      const tree = renderer
        .create(<BpkImage loaded={false} {...requiredProps} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly without border radius', () => {
      const tree = renderer
        .create(<BpkImage rounded={false} {...requiredProps} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly when unloaded and out of view', () => {
      const tree = renderer
        .create(<BpkImage inView={false} loaded={false} {...requiredProps} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
};
export default commonTests;
