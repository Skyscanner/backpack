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
import Paragraph from './../../components/Paragraph';
import PresentationBlock from './../../components/PresentationBlock';

const blurb = [
  <Paragraph>
    The table component enables you to easily create tables, responsive by
    default.
  </Paragraph>,
  <PresentationBlock>
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
    </BpkTable>
  </PresentationBlock>,
];

const isNeo = process.env.BPK_NEO;

const TablesPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Tables"
    showMenu={false}
    readme={tablesReadme}
    blurb={isNeo ? null : blurb}
    {...rest}
  />
);

const NeoTablePage = () => (
  <DocsPageWrapper
    title="Table"
    blurb={blurb}
    webSubpage={<TablesPage wrapped />}
  />
);

export default (isNeo ? NeoTablePage : TablesPage);
