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

/* @flow */

import React from 'react';
import mobileScrollContainerReadme from 'bpk-component-mobile-scroll-container/readme.md';

import BlockExample from './BlockExample';
import IntroBlurb from './../../components/IntroBlurb';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/DocsPageWrapper';

const components = [
  {
    id: 'example',
    title: 'Example',
    examples: [<BlockExample />],
  },
];

const blurb = [
  <IntroBlurb>
    The mobile scroll container component will hide overflowing content in fixed
    with situations and will enable horizontal scrolling.
  </IntroBlurb>,
];

const MobileScrollContainerSubPage = ({ ...rest }: { [string]: any }) => (
  <DocsPageBuilder
    title="Mobile scroll container"
    components={components}
    readme={mobileScrollContainerReadme}
    {...rest}
  />
);

const MobileScrollContainerPage = () => (
  <DocsPageWrapper
    title="Mobile scroll container"
    blurb={blurb}
    webSubpage={<MobileScrollContainerSubPage wrapped />}
  />
);

export default MobileScrollContainerPage;
