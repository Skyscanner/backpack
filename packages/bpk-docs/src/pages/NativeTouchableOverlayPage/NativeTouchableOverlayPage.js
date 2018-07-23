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
import readme from 'react-native-bpk-component-touchable-overlay/README.md';

import iosScreenshotDefault from 'react-native-bpk-component-touchable-overlay/screenshots/default.png';
import iosScreenshotTouchableHighlight from 'react-native-bpk-component-touchable-overlay/screenshots/touchable-highlight.png';

import IntroBlurb from '../../components/IntroBlurb';
import DocsPageBuilder from '../../components/DocsPageBuilder';
import DocsPageWrapper from '../../components/DocsPageWrapper';

const touchableNativeFeedbackUrl =
  '/components/native/touchable-native-feedback';

const components = [
  {
    id: 'touchableoverlay-vs-touchablehighlight',
    title: "Touchable overlay vs React Native's touchable highlight",
    screenshots: [
      {
        title: 'Touchable overlay',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDefault}`,
        altText: 'Backpack Touchable overlay component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: "React Native's touchable highlight",
        width: 750,
        height: 1334,
        src: `/${iosScreenshotTouchableHighlight}`,
        altText: "React Native's touchable highlight component",
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
];

const blurb = [
  <IntroBlurb>
    This component is a replacement for the default React Native Touchable
    Highlight component. The default Touchable Highlight component works by
    decreasing the opacity of the wrapped view to show an underlay colour. When
    views are nested within a Touchable Highlight wrapped view, their opacity is
    unchanged which produces an undesirable result. Have a look at the example
    below to see them both in action.
  </IntroBlurb>,
  <BpkBlockquote>
    <BpkText bold>Note:</BpkText> This component is iOS only, for Android please
    use BpkTouchableNativeFeedback{' '}
    <BpkLink href={touchableNativeFeedbackUrl} blank>
      Touchable native <em>feedback</em>
    </BpkLink>{' '}
    component.
  </BpkBlockquote>,
];

const NativeTouchableOverlaySubPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Touchable overlay"
    components={components}
    readme={readme}
    showMenu={false}
    {...rest}
  />
);

const NativeTouchableOverlayPage = () => (
  <DocsPageWrapper
    title="Touchable overlay"
    blurb={blurb}
    nativeSubpage={<NativeTouchableOverlaySubPage wrapped />}
  />
);

export default NativeTouchableOverlayPage;
