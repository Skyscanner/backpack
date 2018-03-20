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

import commonTests from './BpkPicker-test.common';

jest.mock('react-native', () => {
  const reactNative = require.requireActual('react-native');
  jest
    .spyOn(reactNative.Platform, 'select')
    .mockImplementation(obj => obj.android || obj.default);
  reactNative.Platform.OS = 'android';

  return reactNative;
});

jest.mock('TouchableNativeFeedback', () =>
  jest.requireActual(
    'react-native/Libraries/Components/Touchable/TouchableNativeFeedback.android.js',
  ),
);

jest.mock(
  './../node_modules/react-native-bpk-component-text/node_modules/bpk-tokens/tokens/base.react.native',
  () => require.requireActual('bpk-tokens/tokens/base.react.native.android.js'),
);

jest.mock('bpk-tokens/tokens/base.react.native', () =>
  require.requireActual('bpk-tokens/tokens/base.react.native.android.js'),
);

jest.mock('./BpkPickerMenu', () =>
  jest.requireActual('./BpkPickerMenu.android.js'),
);

jest.mock('./BpkPickerItem', () =>
  jest.requireActual('./BpkPickerItem.android.js'),
);

describe('Android', () => {
  commonTests();
});
