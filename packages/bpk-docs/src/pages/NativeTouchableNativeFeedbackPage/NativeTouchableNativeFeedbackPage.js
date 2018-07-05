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
import BpkLink from 'bpk-component-link';
import BpkText from 'bpk-component-text';
import BpkBlockquote from 'bpk-component-blockquote';
import readme from 'react-native-bpk-component-touchable-native-feedback/readme.md';

import androidScreenshotDefault from 'react-native-bpk-component-touchable-native-feedback/screenshots/default.png';

import IntroBlurb from '../../components/IntroBlurb';
import DocsPageBuilder from '../../components/DocsPageBuilder';
import DocsPageWrapper from '../../components/DocsPageWrapper';

const touchableOverlay = '/components/native/touchable-overlay';
const RNTouchableNativeFeedback =
  'https://facebook.github.io/react-native/docs/touchablenativefeedback.html';

const components = [
  {
    id: 'touchablenativefeedback',
    title: 'Touchable native feedback',
    screenshots: [
      {
        title: 'Touchable native feedback',
        width: 750,
        height: 1334,
        src: `/${androidScreenshotDefault}`,
        altText: 'Backpack touchable native feedback component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const blurb = [
  <IntroBlurb>
    React Native{"'"}s{' '}
    <BpkLink href={RNTouchableNativeFeedback} blank>
      Touchable Native Feedback{' '}
    </BpkLink>{' '}
    allows the use of <em>SelectableBackgroundBorderless</em> for the ripple
    effect. However, this is only supported only on Android API level 21 and
    higher. BpkTouchableNativeFeedback checks the API level first, to prevent
    your app from crashing on unsupported devices.
  </IntroBlurb>,
  <BpkBlockquote>
    <BpkText bold>Note:</BpkText> This component is Android only, for iOS please
    use the{' '}
    <BpkLink href={touchableOverlay} blank>
      BpkTouchableOverlay{' '}
    </BpkLink>{' '}
    component.
  </BpkBlockquote>,
];

const NativeTouchableNativeFeedbackSubPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Touchable Native Feedback"
    components={components}
    readme={readme}
    showMenu={false}
    {...rest}
  />
);

const NativeTouchableNativeFeedbackPage = () => (
  <DocsPageWrapper
    title="Touchable native feedback"
    blurb={blurb}
    nativeSubpage={<NativeTouchableNativeFeedbackSubPage wrapped />}
  />
);

export default NativeTouchableNativeFeedbackPage;
