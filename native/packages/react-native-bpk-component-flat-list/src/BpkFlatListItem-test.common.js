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
import { Image } from 'react-native';
import renderer from 'react-test-renderer';
import BpkFlatListItem from './BpkFlatListItem';

const onPressFn = jest.fn();

const commonTests = () => {
  jest.mock('Image', () => 'Image');
  describe('BpkListItem', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(<BpkFlatListItem title="List item" onPress={onPressFn} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support the "selected" property', () => {
      const tree = renderer
        .create(
          <BpkFlatListItem title="List item" onPress={onPressFn} selected />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support the "image" property', () => {
      const tree = renderer
        .create(
          <BpkFlatListItem
            title="List item"
            onPress={onPressFn}
            image={<Image />}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

export default commonTests;
