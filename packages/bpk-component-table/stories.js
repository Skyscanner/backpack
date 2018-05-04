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
import { storiesOf } from '@storybook/react';

import {
  BpkTable,
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
  BpkTableHeadCell,
} from './index';

storiesOf('bpk-component-table', module)
  .add('Default', () => (
    <BpkTable>
      <BpkTableHead>
        <BpkTableRow>
          <BpkTableHeadCell>Column 1</BpkTableHeadCell>
          <BpkTableHeadCell>Column 2</BpkTableHeadCell>
          <BpkTableHeadCell>Column 3</BpkTableHeadCell>
        </BpkTableRow>
      </BpkTableHead>
      <BpkTableBody>
        <BpkTableRow>
          <BpkTableCell>Entry 1</BpkTableCell>
          <BpkTableCell>Entry 2</BpkTableCell>
          <BpkTableCell>Entry 3</BpkTableCell>
        </BpkTableRow>
        <BpkTableRow>
          <BpkTableCell>Entry 4</BpkTableCell>
          <BpkTableCell>Entry 5</BpkTableCell>
          <BpkTableCell>Entry 6</BpkTableCell>
        </BpkTableRow>
        <BpkTableRow>
          <BpkTableCell>Entry 7</BpkTableCell>
          <BpkTableCell>Entry 8</BpkTableCell>
          <BpkTableCell>Entry 9</BpkTableCell>
        </BpkTableRow>
      </BpkTableBody>
    </BpkTable>
  ))
  .add('Alternate', () => (
    <BpkTable>
      <BpkTableHead>
        <BpkTableRow>
          <BpkTableHeadCell alternate>Column 1</BpkTableHeadCell>
          <BpkTableHeadCell alternate>Column 2</BpkTableHeadCell>
          <BpkTableHeadCell alternate>Column 3</BpkTableHeadCell>
        </BpkTableRow>
      </BpkTableHead>
      <BpkTableBody>
        <BpkTableRow>
          <BpkTableCell>Entry 1</BpkTableCell>
          <BpkTableCell>Entry 2</BpkTableCell>
          <BpkTableCell>Entry 3</BpkTableCell>
        </BpkTableRow>
        <BpkTableRow>
          <BpkTableCell>Entry 4</BpkTableCell>
          <BpkTableCell>Entry 5</BpkTableCell>
          <BpkTableCell>Entry 6</BpkTableCell>
        </BpkTableRow>
        <BpkTableRow>
          <BpkTableCell>Entry 7</BpkTableCell>
          <BpkTableCell>Entry 8</BpkTableCell>
          <BpkTableCell>Entry 9</BpkTableCell>
        </BpkTableRow>
      </BpkTableBody>
    </BpkTable>
  ));
