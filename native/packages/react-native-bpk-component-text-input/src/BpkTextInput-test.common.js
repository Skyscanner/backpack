/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import { StyleSheet, TextInput } from 'react-native';

import BpkTextInput from './BpkTextInput';

const commonTests = () => {
  describe('BpkTextInput', () => {
    it('should render correctly', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput
          label="Name"
          value=""
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with arbitrary props', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput
          label="Name"
          value=""
          testId="arbitrary"
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
        <BpkTextInput
          label="Name"
          value=""
          style={styles.custom}
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with value', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput
          label="Name"
          value="Joe"
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with valid', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput
          label="Name"
          value=""
          valid
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with valid false', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput
          label="Name"
          value=""
          valid={false}
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with disabled', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput
          label="Name"
          value=""
          disabled
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });
  });
};

export default commonTests;
