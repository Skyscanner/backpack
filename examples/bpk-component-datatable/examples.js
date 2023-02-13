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

import {
  BpkDataTable,
  BpkDataTableColumn,
} from '../../packages/bpk-component-datatable';

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

const complexRows = [
  {
    name: 'Jose',
    description: 'Software Engineer',
    seat: { office: 'London', desk: 10 },
  },
  {
    name: 'Rolf',
    description: 'Manager',
    seat: { office: 'Barcelona', desk: 12 },
  },
  {
    name: 'John',
    description: 'Software Engineer',
    seat: { office: 'Barcelona', desk: 15 },
  },
];

// eslint-disable-next-line no-alert
const onRowClick = (row) => alert(JSON.stringify(row));

const sortFunc = (rowA, rowB) => {
  const deskA = rowA.values.seat.desk;
  const deskB = rowB.values.seat.desk;

  if (deskA === deskB) {
    return 0;
  }
  return deskA > deskB ? 1 : -1;
};

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

const NonHoverRowsExample = () => (
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

const FixedWidthExample = () => (
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

const DisabledSortExample = () => (
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

const CustomRowAndHeaderHeightsExample = () => (
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

const HeaderRendererExample = () => (
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
      headerRenderer={({ label }) => <div> This is a {label} </div>}
    />
  </BpkDataTable>
);

const CustomSortingExample = () => (
  <BpkDataTable
    rows={complexRows}
    height={400}
    onRowClick={onRowClick}
    sort={sortFunc}
    sortBy="seat"
    sortDirection="DESC"
  >
    <BpkDataTableColumn label="Name" dataKey="name" width={100} />
    <BpkDataTableColumn
      label="Description"
      dataKey="description"
      width={100}
      flexGrow={1}
    />
    <BpkDataTableColumn
      label="Seat"
      dataKey="seat"
      width={100}
      cellRenderer={({ cellData, rowData }) => {
        if (rowData.name === 'Jose') {
          return <div> Remote </div>;
        }
        return (
          <div>
            {cellData.office} - {cellData.desk}
          </div>
        );
      }}
    />
  </BpkDataTable>
);

export {
  AutowidthExample,
  NonHoverRowsExample,
  FixedWidthExample,
  DisabledSortExample,
  CustomRowAndHeaderHeightsExample,
  HeaderRendererExample,
  CustomSortingExample,
};
