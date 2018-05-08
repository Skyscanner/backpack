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
import readme from 'react-native-bpk-component-touchable-overlay/readme.md';

import iosScreenshotDefault from 'react-native-bpk-component-touchable-overlay/screenshots/default.png';
import iosScreenshotTouchableHighlight from 'react-native-bpk-component-touchable-overlay/screenshots/touchable-highlight.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';

const touchableNativeFeedbackUrl =
  '/components/native/touchable-native-feedback';

const components = [
  {
    id: 'touchableoverlay-vs-touchablehighlight',
    title: "Touchable Overlay vs React Native's Touchable Highlight",
    screenshots: [
      {
        title: 'Touchable Overlay',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDefault}`,
        altText: 'Backpack Touchable Overlay Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: "React Native's Touchable Highlight",
        width: 750,
        height: 1334,
        src: `/${iosScreenshotTouchableHighlight}`,
        altText: "React Native's Touchable Highlight Component",
        subText: '(iPhone 8 Simulator)',
      },
    ],
  },
];

const isNeo = process.env.BPK_NEO;

const blurb = [
  <Paragraph>
    This component is a replacement for the default React Native Touchable
    Highlight component. The default Touchable Highlight component works by
    decreasing the opacity of the wrapped view to show an underlay colour. When
    views are nested within a Touchable Highlight wrapped view, their opacity is
    unchanged which produces an undesirable result. Have a look at the example
    below to see them both in action.
  </Paragraph>,
  <BpkBlockquote>
    <BpkText bold>Note:</BpkText> This component is iOS only, for Android please
    use BpkTouchableNativeFeedback{' '}
    <BpkLink href={touchableNativeFeedbackUrl} blank>
      Touchable Native <em>Feedback</em>
    </BpkLink>{' '}
    component.
  </BpkBlockquote>,
];

const NativeTouchableOverlayPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Touchable Overlay"
    blurb={isNeo ? null : blurb}
    components={components}
    readme={readme}
    showMenu={false}
    {...rest}
  />
);

const NeoNativeTouchableOverlayPage = () => (
  <DocsPageWrapper
    title="Touchable overlay"
    blurb={blurb}
    nativeSubpage={<NativeTouchableOverlayPage wrapped />}
  />
);

export default (isNeo
  ? NeoNativeTouchableOverlayPage
  : NativeTouchableOverlayPage);
