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
import BpkDialingCodeList from './BpkDialingCodeList';

const onPressFn = jest.fn();

const CODES = [
  {
    id: '0',
    dialingCode: '0',
    name: 'Zero',
  },
  {
    id: '1',
    dialingCode: '1',
    name: 'One',
  },
  {
    id: '2',
    dialingCode: '2',
    name: 'Two',
  },
];

const commonTests = () => {
  jest.mock('Image', () => 'Image');
  describe('BpkDialingCodeList', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkDialingCodeList
            codes={CODES}
            onItemPress={onPressFn}
            renderFlag={() => <Image />}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with "selectedId" set', () => {
      const tree = renderer
        .create(
          <BpkDialingCodeList
            codes={CODES}
            onItemPress={onPressFn}
            selectedId="0"
            renderFlag={() => <Image />}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

export default commonTests;
