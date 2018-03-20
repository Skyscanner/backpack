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
import BpkPicker from './BpkPicker';
import BpkPickerItem from './BpkPickerItem';

const commonTests = () => {
  describe('BpkPicker', () => {
    const emptyFn = () => null;

    it('should render correctly', () => {
      const testRenderer = TestRenderer.create(
        <BpkPicker onValueChange={emptyFn} onClose={emptyFn} doneLabel="Done">
          <BpkPickerItem label="foo" value="foo" />
          <BpkPickerItem label="bar" value="bar" />
        </BpkPicker>,
      );
      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should render correctly with a selected value', () => {
      const testRenderer = TestRenderer.create(
        <BpkPicker
          onValueChange={emptyFn}
          onClose={emptyFn}
          doneLabel="Done"
          selectedValue="foo"
        >
          <BpkPickerItem label="foo" value="foo" />
          <BpkPickerItem label="bar" value="bar" />
        </BpkPicker>,
      );
      expect(testRenderer.toJSON()).toMatchSnapshot();
    });
  });
};

export default commonTests;
