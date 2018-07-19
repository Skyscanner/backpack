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
import renderer from 'react-test-renderer';
import { Image } from 'react-native';
import BpkPhoneNumberInput from './BpkPhoneNumberInput';

const onPressFn = jest.fn();

const commonTests = () => {
  jest.mock('Image', () => 'Image');
  describe('BpkPhoneNumberInput', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkPhoneNumberInput
            label="Phone number"
            value=""
            dialingCode={{
              id: 'UK',
              dialingCode: '+44',
              name: 'United Kingdom',
            }}
            onDialingCodePress={onPressFn}
            renderFlag={() => <Image />} // eslint-disable-line backpack/use-components
            editable
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with `editable` false', () => {
      const tree = renderer
        .create(
          <BpkPhoneNumberInput
            label="Phone number"
            value=""
            dialingCode={{
              id: 'UK',
              dialingCode: '+44',
              name: 'United Kingdom',
            }}
            onDialingCodePress={onPressFn}
            renderFlag={() => <Image />} // eslint-disable-line backpack/use-components
            editable={false}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

export default commonTests;
