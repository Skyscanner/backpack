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
} from '../index';

type Person = {
  name: string;
  description: string;
  location: string;
  numericValue: number;
}
const rows: Person[] = [
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

type Employee = {
  name: string;
  description: string;
  seat: {
    office: string;
    desk: number;
  }
}
const complexRows: Employee[] = [
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
const onRowClick = (row: {}) => alert(JSON.stringify(row));

const sortFunc = (rowA: Employee, rowB: Employee) => {
  const deskA = rowA.seat.desk;
  const deskB = rowB.seat.desk;

  if (deskA === deskB) {
    return 0;
  }
  return deskA > deskB ? 1 : -1;
};

const LabelComponent = ({ label }: {label: string}) => <div> This is a {label} </div>;

const CellRenderer = ({ cellData, rowData }: {cellData: Employee["seat"], rowData: Employee}) => {
  if (rowData.name === 'Jose') {
    return <div> Remote </div>;
  }
  return (
    <div>
      {cellData.office} - {cellData.desk}
    </div>
  );
};

const AutowidthExample = () => (
  <BpkDataTable rows={rows} height="25rem" onRowClick={onRowClick}
    columns={[
      {
        label: 'Name',
        accessor: 'name',
        width: '6.25rem',
      },
      {
        label: 'Description',
        accessor: 'description',
        width: '6.25rem',
        flexGrow: 1,
      },
      {
        label: 'Location',
        accessor: 'location',
        width: '6.25rem',
      },
      {
        label: 'Numeric value',
        accessor: 'numericValue',
        width: '6.25rem',
      }
    ]} />
);

const NonClickNonHoverRowsExample = () => (
  <BpkDataTable rows={rows} height="18.75rem" columns={[
    {
      label: 'Name',
      accessor: 'name',
      width: '6.25rem',
    },
    {
      label: 'Description',
      accessor: 'description',
      width: '6.25rem',
      flexGrow: 1,
    },
    {
      label: 'Location',
      accessor: 'location',
      width: '6.25rem',
    }
  ]} />
);

const FixedWidthExample = () => (
  <BpkDataTable rows={rows} height="18.75rem" width="25rem" onRowClick={onRowClick}
    columns={[
      {
        label: 'Name',
        accessor: 'name',
        width: '6.25rem',
      },
      {
        label: 'Description',
        accessor: 'description',
        width: '6.25rem',
        flexGrow: 1,
      },
      {
        label: 'Location',
        accessor: 'location',
        width: '6.25rem',
      }
    ]} />
);

const DisabledSortExample = () => (
  <BpkDataTable rows={rows} height="18.75rem" onRowClick={onRowClick} columns={[
    {
      label: 'Name',
      accessor: 'name',
      width: '6.25rem',
    },
    {
      label: 'Description (Disabled Sorting)',
      accessor: 'description',
      width: '6.25rem',
      flexGrow: 1,
      disableSortBy: true,
    },
    {
      label: 'Location',
      accessor: 'location',
      width: '6.25rem',
    }
  ]} />
);

const CustomRowAndHeaderHeightsExample = () => (
  <BpkDataTable
    rows={rows}
    height="18.75rem"
    headerHeight="5rem"
    rowHeight="1.875rem"
    onRowClick={onRowClick}
    columns={
      [
        {
          label: 'Name',
          accessor: 'name',
          width: '18.75rem',
        },
        {
          label: 'Description',
          accessor: 'description',
          width: '6.25rem',
          flexGrow: 1,
        },
        {
          label: 'Location',
          accessor: 'location',
          width: '6.25rem',
        }
      ]
    }
  />
);

const HeaderRendererExample = () => (
  <BpkDataTable rows={rows} height="25rem" onRowClick={onRowClick}
  columns={[
    {
      label: 'Name',
      accessor: 'name',
      width: '6.25rem',
    },
    {
      label: 'Description',
      accessor: 'description',
      width: '6.25rem',
      flexGrow: 1,
    },
    {
      label: 'Location',
      accessor: 'location',
      width: '6.25rem',
    },
    {
      label: 'Numeric value',
      accessor: 'numericValue',
      width: '6.25rem',
      Header: LabelComponent,
    }
  ]} />
);

const CustomSortingExample = () => (
  <BpkDataTable
    rows={complexRows}
    columns={[
      {
        label: 'Name',
        accessor: 'name',
        width: '6.25rem',
      },
      {
        label: 'Description',
        accessor: 'description',
        width: '6.25rem',
        flexGrow: 1,
        Header: LabelComponent,
      },
      {
        label: 'Seat',
        accessor: 'seat',
        width: '6.25rem',
        Cell: CellRenderer,
      },
    ]}
    height="25rem"
    onRowClick={onRowClick}
    sort={sortFunc}
    sortBy="seat"
    sortDirection="DESC"
  />   
);

const WithColumnArrayExample = () => (
  <BpkDataTable rows={complexRows} height="25rem" onRowClick={onRowClick} columns={
    [
      {
        label: 'Name',
        accessor: 'name',
        width: '6.25rem',
      },
      {
        label: 'Description',
        accessor: 'description',
        width: '6.25rem',
        flexGrow: 1,
        Header: LabelComponent,
      },
      {
        label: 'Seat',
        accessor: 'seat',
        width: '6.25rem',
        Cell: CellRenderer,
      },
    ]}
  />
);

export {
  AutowidthExample,
  NonClickNonHoverRowsExample,
  FixedWidthExample,
  DisabledSortExample,
  CustomRowAndHeaderHeightsExample,
  HeaderRendererExample,
  CustomSortingExample,
  WithColumnArrayExample,
};
