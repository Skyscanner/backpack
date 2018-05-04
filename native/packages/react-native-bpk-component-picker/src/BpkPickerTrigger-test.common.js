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
import ShallowRenderer from 'react-test-renderer/shallow';
import BpkPickerTrigger from './BpkPickerTrigger';

const commonTests = () => {
  describe('BpkPickerTrigger', () => {
    let renderer;
    const emptyFn = () => null;

    beforeEach(() => {
      renderer = new ShallowRenderer();
    });

    it('should render correctly', () => {
      renderer.render(<BpkPickerTrigger onPress={emptyFn} />);

      const tree = renderer.getRenderOutput();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with a text label', () => {
      renderer.render(<BpkPickerTrigger label="label" onPress={emptyFn} />);

      const tree = renderer.getRenderOutput();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with an element label', () => {
      renderer.render(<BpkPickerTrigger label={<View />} onPress={emptyFn} />);

      const tree = renderer.getRenderOutput();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with the disabled prop', () => {
      renderer.render(
        <BpkPickerTrigger disabled label="label" onPress={emptyFn} />,
      );

      const tree = renderer.getRenderOutput();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with custom styles', () => {
      renderer.render(
        <BpkPickerTrigger
          label="label"
          onPress={emptyFn}
          style={{ marginTop: 10 }}
        />,
      );

      const tree = renderer.getRenderOutput();
      expect(tree).toMatchSnapshot();
    });
  });
};

export default commonTests;
