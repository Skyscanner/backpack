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

import commonTests from './BpkCard-test.common';

jest.mock('react-native', () => {
  const reactNative = require.requireActual('react-native');
  jest
    .spyOn(reactNative.Platform, 'select')
    .mockImplementation(obj => obj.android || obj.default);
  reactNative.Platform.OS = 'android';
  reactNative.TouchableNativeFeedback.SelectableBackgroundBorderless = jest.fn();
  return reactNative;
});

jest.mock('./BpkCard', () => require.requireActual('./BpkCard.android'));

jest.mock('bpk-tokens/tokens/base.react.native',
  () => require.requireActual('bpk-tokens/tokens/base.react.native.android.js'));

jest.mock('TouchableNativeFeedback', () => ({ children, ...rest }) => {
  const { cloneElement } = require.requireActual('react');

  return cloneElement(children, rest);
});

describe('Android', () => {
  commonTests();
});
