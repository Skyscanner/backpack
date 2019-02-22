/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 - 2019 Skyscanner Ltd
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

import readme from '../../../../../backpack-react-native/packages/react-native-bpk-component-switch/README.md';
import iosVideo from '../../../../../backpack-react-native/packages/react-native-bpk-component-switch/videos/ios/all-types-react-native-bpk-component-switch.mp4';
import androidVideo from '../../../../../backpack-react-native/packages/react-native-bpk-component-switch/videos/android/all-types-react-native-bpk-component-switch.mp4';
import DocsPageBuilder from '../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    videos: [
      {
        title: 'iOS',
        width: 750,
        src: `/${iosVideo}`,
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 750,
        src: `/${androidVideo}`,
        subText: '(Google Pixel emualtor)',
      },
    ],
  },
];

const NativeSwitchPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Switch"
    components={components}
    readme={readme}
    showMenu={false}
    {...rest}
  />
);

export default NativeSwitchPage;
