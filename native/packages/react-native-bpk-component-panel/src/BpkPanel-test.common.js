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
import BpkText from 'react-native-bpk-component-text';

import BpkPanel from './BpkPanel';

const commonTests = () => {
  describe('BpkPanel', () => {
    const content = (
      <BpkText>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkText>
    );

    it('should render correctly', () => {
      const tree = renderer.create(<BpkPanel>{content}</BpkPanel>).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly without padding', () => {
      const tree = renderer
        .create(<BpkPanel padded={false}>{content}</BpkPanel>)
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
        .create(<BpkPanel style={styles.custom}>{content}</BpkPanel>)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with arbitrary props', () => {
      const tree = renderer
        .create(
          <BpkPanel
            testID="arbitrary value" // <-- arbitrary prop
          >
            {content}
          </BpkPanel>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
};
export default commonTests;
