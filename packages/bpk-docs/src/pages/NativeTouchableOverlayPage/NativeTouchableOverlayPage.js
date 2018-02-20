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

const touchableHighlightUrl =
  'https://facebook.github.io/react-native/docs/0.52/touchablehighlight.html';

const touchableNativeFeedbackUrl =
  'https://facebook.github.io/react-native/docs/0.52/touchablenativefeedback.html';

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

const NativeTouchableOverlayPage = () => (
  <DocsPageBuilder
    title="Touchable Overlay"
    blurb={[
      <Paragraph>
        The Backpack Touchable <em>Overlay</em> component is to be used instead
        of the default{' '}
        <BpkLink href={touchableHighlightUrl} blank>
          React Native Touchable <em>Highlight</em>
        </BpkLink>{' '}
        component. The default Touchable <em>Highlight</em> component works by
        decreasing the opacity of the wrapped view to show an underlay colour.
        When views are nested within a Touchable <em>Highlight</em> wrapped
        view, their opacity is unchanged which produces an undesirable result.
        Have a look at the example below to see them both in action.
      </Paragraph>,
      <BpkBlockquote>
        <BpkText tag="span" bold>
          Note:
        </BpkText>{' '}
        This component is iOS only, for Android please stick to the default
        React Native{' '}
        <BpkLink href={touchableNativeFeedbackUrl} blank>
          Touchable Native <em>Feedback</em>
        </BpkLink>{' '}
        component.
      </BpkBlockquote>,
    ]}
    components={components}
    readme={readme}
    showMenu={false}
  />
);

export default NativeTouchableOverlayPage;
