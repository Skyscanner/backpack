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
import { BpkList, BpkListItem } from 'bpk-component-list';
import readme from 'react-native-bpk-component-phone-input/readme.md';
import iosScreenshoDialingCodeList from 'react-native-bpk-component-phone-input/screenshots/ios/dialing-code-list.png';
import iosScreenshotPhoneNumberInput from 'react-native-bpk-component-phone-input/screenshots/ios/phone-number-input.png';
import androidScreenshotDialingCodeList from 'react-native-bpk-component-phone-input/screenshots/android/dialing-code-list.png';
import androidScreenshotPhoneNumberInput from 'react-native-bpk-component-phone-input/screenshots/android/phone-number-input.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const components = [
  {
    id: 'dialing-code-list',
    title: 'Dialing Code List',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshoDialingCodeList}`,
        altText: 'iOS Dialing Code List Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDialingCodeList}`,
        altText: 'Android Dialing Code List Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
  {
    id: 'phone-number-input',
    title: 'Phone Number Input',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotPhoneNumberInput}`,
        altText: 'iOS Dialing Code List Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotPhoneNumberInput}`,
        altText: 'Android Dialing Code List Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
];

const NativeInputPage = () => (
  <DocsPageBuilder
    title="Phone number input"
    blurb={[
      <Paragraph>
        The Backpack phone number input package contains two components that
        together enable the collection of phone numbers. <br />These are:
        <BpkList>
          <BpkListItem>A dialing code list component.</BpkListItem>
          <BpkListItem>A specialized text input field.</BpkListItem>
        </BpkList>
        Consumers are responsible for using these two components together. The
        accessory view in the text input shall present the dialing code list
        when tapped and a selection should update the dialing code set in the
        input component.
      </Paragraph>,
    ]}
    components={components}
    readme={readme}
    showMenu={false}
  />
);

export default NativeInputPage;
