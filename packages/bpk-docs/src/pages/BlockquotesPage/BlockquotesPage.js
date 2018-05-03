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
import BpkBlockquote from 'bpk-component-blockquote';

import blockquotesReadme from 'bpk-component-blockquote/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';
import Paragraph from './../../components/Paragraph';

const components = [
  {
    id: 'default',
    title: 'Default',
    examples: [
      <BpkBlockquote>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </BpkBlockquote>,
    ],
  },
];

const isNeo = process.env.BPK_NEO;

const blurb = [
  <Paragraph>
    The blockquote component allows the creation of a section that is quoted
    from another source.
  </Paragraph>,
];

const BlockquotesPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Blockquote"
    components={components}
    readme={blockquotesReadme}
    blurb={isNeo ? null : blurb}
    {...rest}
  />
);

const NeoBlockquotePage = () => (
  <DocsPageWrapper
    title="Blockquote"
    blurb={blurb}
    webSubpage={<BlockquotesPage wrapped />}
  />
);

export default (isNeo ? NeoBlockquotePage : BlockquotesPage);
