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

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import BpkInput from './BpkInput';

jest.mock('react-native', () => {
  const reactNative = require.requireActual('react-native');
  jest
    .spyOn(reactNative.Platform, 'select')
    .mockImplementation(obj => obj.android || obj.default);
  reactNative.Platform.OS = 'android';

  return reactNative;
});


describe('Android', () => {
  describe('BpkInput', () => {
    it('should render correctly', () => {
      const tree = renderer.create(
        <BpkInput />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
