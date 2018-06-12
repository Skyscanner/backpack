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

/* @flow */

import React from 'react';
import DocsPageWrapper from './../../components/DocsPageWrapper';
import IntroBlurb from './../../components/IntroBlurb';

import Web from '../WebHorizontalNavPage';
import Native from '../NativeHorizontalNavPage';

const blurb = [
  <IntroBlurb>
    A simple navigation component, ideal for representing a section of a page
    that links to other pages or views within the page.
  </IntroBlurb>,
];

const Page = () => (
  <DocsPageWrapper
    title="Horizontal navigation"
    blurb={blurb}
    webSubpage={<Web wrapped />}
    nativeSubpage={<Native wrapped />}
  />
);

export default Page;
