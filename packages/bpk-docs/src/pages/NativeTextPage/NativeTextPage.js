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

import React from 'react';

import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import readme from 'react-native-bpk-component-text/readme.md';
import defaultScreenshot from 'react-native-bpk-component-text/screenshots/default.png';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const Image = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        TODO
      </Paragraph>,
    ],
    examples: [
      <Image
        src={`/${defaultScreenshot}`}
        width={375}
        height={667}
        style={{ width: '50%' }}
        altText="Default"
      />,
    ],
  },
];

const NativeTextPage = () => <DocsPageBuilder
  title="Text"
  blurb={[
    <Paragraph>
      TODO
    </Paragraph>,
  ]}
  components={components}
  readme={readme}
/>;

export default NativeTextPage;
