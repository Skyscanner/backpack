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
import BpkLink, { BpkButtonLink } from 'bpk-component-link';

import linkReadme from 'bpk-component-link/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';
import IntroBlurb from './../../components/neo/IntroBlurb';

const isNeo = process.env.BPK_NEO;

const blurb = [
  <IntroBlurb>
    This component enables you to link the user to other resources or pages.
  </IntroBlurb>,
];

const components = [
  {
    id: 'default',
    title: 'Default',
    examples: [
      <Paragraph>
        Links can be both <BpkLink href="#">anchor tags</BpkLink> as well as{' '}
        <BpkButtonLink onClick={() => null}>button tags</BpkButtonLink>.
      </Paragraph>,
    ],
  },
];

const LinkPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Links"
    readme={linkReadme}
    components={components}
    blurb={isNeo ? null : blurb}
    {...rest}
  />
);

export default LinkPage;
