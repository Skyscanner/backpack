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

/* @flow */

import React from 'react';

import DocsPageWrapper from '../../components/DocsPageWrapper';
import Paragraph from '../../components/Paragraph';
import IntroBlurb from '../../components/IntroBlurb';
import AndroidCard from '../AndroidCardPage';
import IOSCard from '../IOSCardPage';
import WebCard from '../WebCardsPage';
import NativeCard from '../NativeCardsPage';

const Page = () => (
  <DocsPageWrapper
    title="Card"
    blurb={[
      <IntroBlurb>
        Cards are used to group related items. They allow complex datasets to be
        broken down into individual, distinct areas for easy consumption.
      </IntroBlurb>,
      <Paragraph>
        Cards are used as a signifier to give affordance to a clickable set of
        elements.
      </Paragraph>,
    ]}
    androidSubpage={<AndroidCard wrapped />}
    iosSubpage={<IOSCard wrapped />}
    webSubpage={<WebCard wrapped />}
    nativeSubpage={<NativeCard wrapped />}
  />
);

export default Page;
