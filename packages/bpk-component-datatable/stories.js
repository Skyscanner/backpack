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
import { storiesOf } from '@storybook/react';

import { BpkDataTable, BpkColumn } from './index';

const rows = [
  { name: 'Albert', description: 'Reaching the end of the alphabet', bla: 'Bla' },
  { name: 'Rolf', description: 'At the beginning of the alphabet', bla: 'Alb' },
];

// eslint-disable-next-line no-alert
const onRowClick = row => alert(JSON.stringify(row));

storiesOf('bpk-component-datatable', module)
  .add('Autowidth Example', () => (
    <BpkDataTable
      rows={rows}
      height={300}
      onRowClick={onRowClick}
    >
      <BpkColumn
        label="Name"
        dataKey="name"
        width={100}
      />
      <BpkColumn
        label="Description"
        dataKey="description"
        width={100}
        flexGrow={1}
      />
      <BpkColumn
        label="Bla"
        dataKey="bla"
        width={100}
      />
    </BpkDataTable>
  ))
  .add('Fixed Width Example', () => (
    <BpkDataTable
      rows={rows}
      height={300}
      width={400}
      onRowClick={onRowClick}
    >
      <BpkColumn
        label="Name"
        dataKey="name"
        width={100}
      />
      <BpkColumn
        label="Description"
        dataKey="description"
        width={100}
        flexGrow={1}
      />
      <BpkColumn
        label="Bla"
        dataKey="bla"
        width={100}
      />
    </BpkDataTable>
  ))
  .add('Disabled Sort Example', () => (
    <BpkDataTable
      rows={rows}
      height={300}
      onRowClick={onRowClick}
    >
      <BpkColumn
        label="Name"
        dataKey="name"
        width={100}
      />
      <BpkColumn
        label="Description (Disabled Sorting)"
        dataKey="description"
        width={100}
        flexGrow={1}
        disableSort
      />
      <BpkColumn
        label="Bla"
        dataKey="bla"
        width={100}
      />
    </BpkDataTable>
  ));
