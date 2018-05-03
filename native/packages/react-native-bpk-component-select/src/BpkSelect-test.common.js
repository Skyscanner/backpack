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
import { View } from 'react-native';
import TestRenderer from 'react-test-renderer';
import BpkSelect from './BpkSelect';

const commonTests = () => {
  describe('BpkSelect', () => {
    const emptyFn = () => null;
    it('should render correctly', () => {
      const testRenderer = TestRenderer.create(<BpkSelect onPress={emptyFn} />);
      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with a text label', () => {
      const testRenderer = TestRenderer.create(
        <BpkSelect label="label" onPress={emptyFn} />,
      );
      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with an element label', () => {
      const testRenderer = TestRenderer.create(
        <BpkSelect label={<View />} onPress={emptyFn} />,
      );
      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with the disabled prop', () => {
      const testRenderer = TestRenderer.create(
        <BpkSelect disabled label="label" onPress={emptyFn} />,
      );
      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with custom styles', () => {
      const testRenderer = TestRenderer.create(
        <BpkSelect label="label" onPress={emptyFn} style={{ marginTop: 10 }} />,
      );
      expect(testRenderer.toJSON()).toMatchSnapshot();
    });
  });
};

export default commonTests;
