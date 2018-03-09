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
import TestRenderer from 'react-test-renderer';
import { StyleSheet } from 'react-native';
import BpkPicker from './BpkPicker';

const options = [
  {
    value: '1',
    label: 'Option 1',
    hint: null,
  },
  {
    value: '2',
    label: 'Option 2',
    hint: 'hint there',
  },
  {
    value: '3',
    label: 'Option 3',
    pickerLabel: 'Option 3 - has custom label',
    hint: null,
  },
];

const commonTests = () => {
  describe('BpkPicker', () => {
    it('should render correctly', () => {
      const testRenderer = TestRenderer.create(<BpkPicker />);

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with arbitrary props', () => {
      const testRenderer = TestRenderer.create(
        <BpkPicker
          label="Name"
          options={options}
          selectedOption={options[0]}
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with custom style', () => {
      const styles = StyleSheet.create({
        custom: {
          marginLeft: 10,
        },
      });

      const testRenderer = TestRenderer.create(
        <BpkPicker
          label="Name"
          options={options}
          selectedOption={options[0]}
          style={styles.custom}
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with hint value', () => {
      const testRenderer = TestRenderer.create(
        <BpkPicker
          label="Name"
          options={options}
          selectedOption={options[1]}
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with valid', () => {
      const testRenderer = TestRenderer.create(
        <BpkPicker
          label="Name"
          options={options}
          selectedOption={options[0]}
          valid
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with valid false', () => {
      const testRenderer = TestRenderer.create(
        <BpkPicker
          label="Name"
          options={options}
          selectedOption={options[0]}
          valid={false}
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with valid false and a validation message', () => {
      const testRenderer = TestRenderer.create(
        <BpkPicker
          label="Name"
          options={options}
          selectedOption={options[0]}
          valid={false}
          validationMessage="Some message"
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });
  });
};

export default commonTests;
