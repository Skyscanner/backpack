/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import { BpkDataTable, BpkDataTableColumn } from './index';

const rows = [
  {
    name: 'Abikso',
    description:
      'A village in northern Sweden, home to the Climate Impacts Research Centre.',
    location: 'Sweden',
    numericValue: 1,
  },
  {
    name: 'Nara',
    description: 'A city in Japan famous for its deer population.',
    location: 'Japan',
    numericValue: 2,
  },
  {
    name: 'Erfoud',
    description:
      'A Moroccan oasis town that has been used as a location for many films.',
    location: 'Morocco',
    numericValue: 3,
  },
  {
    name: 'Panjin',
    description: 'A Chinese city famed for its vividly-coloured red seabeach.',
    location: 'China',
    numericValue: 4,
  },
];

// eslint-disable-next-line no-alert
const onRowClick = (row) => alert(JSON.stringify(row));

const AutowidthExample = () => (
  <BpkDataTable rows={rows} height={400} onRowClick={onRowClick}>
    <BpkDataTableColumn label="Name" dataKey="name" width={100} />
    <BpkDataTableColumn
      label="Description"
      dataKey="description"
      width={100}
      flexGrow={1}
    />
    <BpkDataTableColumn label="Location" dataKey="location" width={100} />
    <BpkDataTableColumn
      label="Numeric value"
      dataKey="numericValue"
      width={100}
    />
  </BpkDataTable>
);

const NonHoverRows = () => (
  <BpkDataTable rows={rows} height={300}>
    <BpkDataTableColumn label="Name" dataKey="name" width={100} />
    <BpkDataTableColumn
      label="Description"
      dataKey="description"
      width={100}
      flexGrow={1}
    />
    <BpkDataTableColumn label="Location" dataKey="location" width={100} />
  </BpkDataTable>
);

const FixedWidth = () => (
  <BpkDataTable rows={rows} height={300} width={400} onRowClick={onRowClick}>
    <BpkDataTableColumn label="Name" dataKey="name" width={100} />
    <BpkDataTableColumn
      label="Description"
      dataKey="description"
      width={100}
      flexGrow={1}
    />
    <BpkDataTableColumn label="Location" dataKey="location" width={100} />
  </BpkDataTable>
);

const DisabledSort = () => (
  <BpkDataTable rows={rows} height={300} onRowClick={onRowClick}>
    <BpkDataTableColumn label="Name" dataKey="name" width={100} />
    <BpkDataTableColumn
      label="Description (Disabled Sorting)"
      dataKey="description"
      width={100}
      flexGrow={1}
      disableSort
    />
    <BpkDataTableColumn label="Location" dataKey="location" width={100} />
  </BpkDataTable>
);

const CustomRowAndHeaderHeights = () => (
  <BpkDataTable
    rows={rows}
    height={300}
    headerHeight={80}
    rowHeight={30}
    onRowClick={onRowClick}
  >
    <BpkDataTableColumn label="Name" dataKey="name" width={100} />
    <BpkDataTableColumn
      label="Description"
      dataKey="description"
      width={100}
      flexGrow={1}
    />
    <BpkDataTableColumn label="Location" dataKey="location" width={100} />
  </BpkDataTable>
);

export {
  AutowidthExample,
  NonHoverRows,
  FixedWidth,
  DisabledSort,
  CustomRowAndHeaderHeights,
};
