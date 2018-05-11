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
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';
import IntroBlurb from './../../components/neo/IntroBlurb';

import Web from '../TextPage';
import Native from '../NativeTextPage';

const Page = () => (
  <DocsPageWrapper
    title="Text"
    blurb={[
      <IntroBlurb>
        The text component enables you to use Backpack defined text styles. On
        web, you can combine these with any of the heading tags, a span or a
        paragraph. You can mix different text styles with the appropriate tag to
        achieve semantic markup while retaining control over how the text looks.
      </IntroBlurb>,
    ]}
    webSubpage={<Web wrapped />}
    nativeSubpage={<Native wrapped />}
  />
);

export default Page;
