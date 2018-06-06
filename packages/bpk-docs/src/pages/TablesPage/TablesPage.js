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
import {
  BpkTable,
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableHeadCell,
  BpkTableCell,
} from 'bpk-component-table';

import tablesReadme from 'bpk-component-table/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';
import IntroBlurb from './../../components/neo/IntroBlurb';

const blurb = [
  <IntroBlurb>
    A simple table component for displaying data in a tabular form.
  </IntroBlurb>,
];

const components = [
  {
    id: 'default',
    title: 'Default',
    examples: [
      <BpkTable>
        <BpkTableHead>
          <BpkTableRow>
            <BpkTableHeadCell>Heading 1</BpkTableHeadCell>
            <BpkTableHeadCell>Heading 2</BpkTableHeadCell>
            <BpkTableHeadCell>Heading 3</BpkTableHeadCell>
            <BpkTableHeadCell>Heading 4</BpkTableHeadCell>
          </BpkTableRow>
        </BpkTableHead>
        <BpkTableBody>
          <BpkTableRow>
            <BpkTableCell>Row 1, Data 1</BpkTableCell>
            <BpkTableCell>Row 1, Data 2</BpkTableCell>
            <BpkTableCell>Row 1, Data 3</BpkTableCell>
            <BpkTableCell>Row 1, Data 4</BpkTableCell>
          </BpkTableRow>
          <BpkTableRow>
            <BpkTableCell>Row 2, Data 1</BpkTableCell>
            <BpkTableCell>Row 2, Data 2</BpkTableCell>
            <BpkTableCell>Row 2, Data 3</BpkTableCell>
            <BpkTableCell>Row 2, Data 4</BpkTableCell>
          </BpkTableRow>
        </BpkTableBody>
      </BpkTable>,
    ],
  },
];

const TablesSubPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Table"
    readme={tablesReadme}
    components={components}
    {...rest}
  />
);

const TablesPage = () => (
  <DocsPageWrapper
    title="Table"
    blurb={blurb}
    components={components}
    webSubpage={<TablesSubPage wrapped />}
  />
);

export default TablesPage;
