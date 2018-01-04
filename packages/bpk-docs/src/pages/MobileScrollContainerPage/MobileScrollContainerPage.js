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
import BpkRouterLink from 'bpk-component-router-link';
import mobileScrollContainerReadme from 'bpk-component-mobile-scroll-container/readme.md';

import BlockExample from './BlockExample';
import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import { BARCHARTS, HORIZONTAL_NAV } from './../../constants/routes';

const components = [
  {
    id: 'example',
    title: 'Example',
    examples: [<BlockExample />],
  },
];

const MobileScrollContainerPage = () => (
  <DocsPageBuilder
    title="Mobile scroll container"
    blurb={[
      <Paragraph>
        In the majority of cases, components and content should be designed with
        viewport and container fluidity in mind i.e. horizontal list items
        should stack on top of each other and overflowing text should wrap on to
        the next line. There are some cases where it is desireable to maintain a
        fixed width on certain content (see{' '}
        <BpkRouterLink to={BARCHARTS}>bar charts</BpkRouterLink> and{' '}
        <BpkRouterLink to={HORIZONTAL_NAV}>horizontal navigation</BpkRouterLink>).
        Mobile scroll containers will hide overflowing content and display a
        fading indicator to let the user know that the content is scrollable.
      </Paragraph>,
    ]}
    components={components}
    readme={mobileScrollContainerReadme}
    showMenu={false}
  />
);

export default MobileScrollContainerPage;
