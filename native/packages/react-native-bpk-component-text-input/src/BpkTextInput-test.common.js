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
import { StyleSheet, View } from 'react-native';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';

import BpkTextInput from './BpkTextInput';

const commonTests = () => {
  describe('BpkTextInput', () => {
    it('should render correctly', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput label="Name" value="" />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with arbitrary props', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput label="Name" value="" testId="arbitrary" />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with custom style', () => {
      const styles = StyleSheet.create({
        custom: {
          marginLeft: spacingSm,
        },
      });

      const testRenderer = TestRenderer.create(
        <BpkTextInput label="Name" value="" style={styles.custom} />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with value', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput label="Name" value="Joe" />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with description', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput
          label="Name"
          description="Who loves orange soda?"
          value="Kel loves orange soda"
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with description, valid=false and a validationMessage', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput
          label="Name"
          description="Who loves orange soda?"
          value="Somebody other than Kel loves orange soda"
          valid={false}
          validationMessage="Nope"
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with valid', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput label="Name" value="" valid />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with valid false', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput label="Name" value="" valid={false} />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with valid false and a validation message', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput
          label="Name"
          value=""
          valid={false}
          validationMessage="Nope"
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with editable=false', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput label="Name" value="" editable={false} />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with inputRef set', () => {
      let inputRef = null; // eslint-disable-line no-unused-vars
      const testRenderer = TestRenderer.create(
        <BpkTextInput
          label="Name"
          value=""
          inputRef={ref => {
            inputRef = ref;
          }}
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should ignore when placeholder is provided, as element is not focused', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput label="Name" value="" placeholder="Placeholder" />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with `accessoryView`', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput label="Name" value="" accessoryView={<View />} />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with mask="99/99"', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput label="Name" value="1234" mask="99/99" />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with mask="9999-9999-9999-9999"', () => {
      const testRenderer = TestRenderer.create(
        <BpkTextInput
          label="Name"
          value="1234123412341234"
          mask="9999-9999-9999-9999"
        />,
      );

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });
  });
};

export default commonTests;
