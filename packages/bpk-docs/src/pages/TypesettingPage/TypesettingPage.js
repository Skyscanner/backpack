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
import TOKENS from 'bpk-tokens/tokens/base.raw.json';
import IOS_TOKENS from 'bpk-tokens/tokens/base.raw.ios.json';
import ANDROID_TOKENS from 'bpk-tokens/tokens/base.raw.android.json';
import BpkBlockquote from 'bpk-component-blockquote';
import { BpkList, BpkListItem } from 'bpk-component-list';
import { BpkCode } from 'bpk-component-code';

import IntroBlurb from '../../components/IntroBlurb';
import DocsPageBuilder, { Paragraph } from '../../components/DocsPageBuilder';
import { getPlatformTokens } from '../../helpers/tokens-helper';

const blurb = [
  <IntroBlurb>
    Typography values including font families, sizes, and line heights for use
    in web, iOS and Android projects.
  </IntroBlurb>,
  <BpkBlockquote>Note: These change per platform.</BpkBlockquote>,
];

const components = [
  {
    id: 'font-family',
    title: 'Font family',
    tokenMap: getPlatformTokens(
      TOKENS,
      IOS_TOKENS,
      ANDROID_TOKENS,
      ({ name }) => name === 'FONT_FAMILY_BASE',
    ),
  },
  {
    id: 'font-weight',
    title: 'Font weight',
    platformSwitchingContent: {
      ios: (
        <section>
          <Paragraph>
            When designing for iOS, use <strong>SF Pro Text</strong>.
          </Paragraph>
          <BpkList>
            <BpkListItem>Regular</BpkListItem>
            <BpkListItem>Semi-bold (for emphasised text)</BpkListItem>
            <BpkListItem>
              Heavy (for <BpkCode>font-size-xxl</BpkCode> only)
            </BpkListItem>
          </BpkList>
        </section>
      ),
      android: (
        <section>
          <Paragraph>
            When designing for Android, use <strong>Roboto</strong>.
          </Paragraph>
          <BpkList>
            <BpkListItem>Regular</BpkListItem>
            <BpkListItem>Medium (for emphasised text)</BpkListItem>
          </BpkList>
        </section>
      ),
      web: (
        <section>
          <Paragraph>
            When designing for web, use <strong>SF UI Text</strong>.
          </Paragraph>
          <BpkList>
            <BpkListItem>Regular</BpkListItem>
            <BpkListItem>Bold (for emphasised text)</BpkListItem>
          </BpkList>
        </section>
      ),
    },
  },
  {
    id: 'font-size',
    title: 'Font size',
    tokenMap: getPlatformTokens(
      TOKENS,
      IOS_TOKENS,
      ANDROID_TOKENS,
      ({ name, category }) =>
        category === 'typesettings' && name.indexOf('FONT_SIZE') === 0,
    ),
  },
  {
    id: 'line-heights',
    title: 'Line height',
    tokenMap: getPlatformTokens(
      TOKENS,
      IOS_TOKENS,
      ANDROID_TOKENS,
      ({ name, category }) =>
        category === 'typesettings' && name.indexOf('LINE_HEIGHT') === 0,
    ),
  },
];

const TypesettingPage = () => (
  <DocsPageBuilder title="Typesetting" blurb={blurb} components={components} />
);

export default TypesettingPage;
