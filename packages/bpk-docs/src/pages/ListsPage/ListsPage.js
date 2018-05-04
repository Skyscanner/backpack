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
import { BpkList, BpkListItem } from 'bpk-component-list';

import listReadme from 'bpk-component-list/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';
import Paragraph from './../../components/Paragraph';

const blurb = [
  <Paragraph>
    The list component enables you to easily create ordered or unordered lists.
  </Paragraph>,
];

const components = [
  {
    id: 'default',
    title: 'Default',
    examples: [
      <div>
        <BpkList>
          <BpkListItem>Apples</BpkListItem>
          <BpkListItem>
            Oranges
            <BpkList>
              <BpkListItem>Tangerines</BpkListItem>
              <BpkListItem>Mandarins</BpkListItem>
              <BpkListItem>Satsumas</BpkListItem>
            </BpkList>
          </BpkListItem>
          <BpkListItem>Pears</BpkListItem>
        </BpkList>
        <BpkList ordered>
          <BpkListItem>First</BpkListItem>
          <BpkListItem>Second</BpkListItem>
          <BpkListItem>Third</BpkListItem>
        </BpkList>
      </div>,
    ],
  },
];

const isNeo = process.env.BPK_NEO;

const ListPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Lists"
    readme={listReadme}
    components={components}
    blurb={isNeo ? null : blurb}
    {...rest}
  />
);

const NeoListPage = () => (
  <DocsPageWrapper
    title="List"
    blurb={blurb}
    webSubpage={<ListPage wrapped />}
  />
);

export default (isNeo ? NeoListPage : ListPage);
