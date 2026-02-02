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

import { Fragment } from 'react';

import { render, screen, fireEvent, within } from '@testing-library/react';

import '@testing-library/jest-dom';
import BpkDataTable from './BpkDataTable';
import { SORT_DIRECTION_TYPES } from './common-types';

const rows = [
  { name: 'Jose', description: 'Software Engineer', bla: 'Bla' },
  { name: 'Rolf', description: 'Some guy', bla: 'Bla' },
];

describe('BpkDataTable', () => {
  let warningSpy: any;
  let oldWarning: any;

  beforeEach(() => {
    warningSpy = jest.fn();
    oldWarning = window.console.warn;
    window.console.warn = warningSpy;
  });

  afterEach(() => {
    window.console.warn = oldWarning;
  });

  it('should render correctly with multiple columns', () => {
    const { asFragment } = render(
      <BpkDataTable
        rows={rows}
        height="12.5rem"
        columns={[
          { label: 'Name', accessor: 'name', width: '6.25rem' },
          {
            label: 'Description',
            accessor: 'description',
            width: '6.25rem',
            flexGrow: 1,
          },
          { label: 'Bla', accessor: 'bla', width: '6.25rem' },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when "onRowClick" is set', () => {
    const { asFragment } = render(
      <BpkDataTable
        rows={rows}
        height="12.5rem"
        onRowClick={() => {}}
        columns={[
          { label: 'Name', accessor: 'name', width: '6.25rem' },
          {
            label: 'Description',
            accessor: 'description',
            width: '6.25rem',
            flexGrow: 1,
          },
          { label: 'Bla', accessor: 'bla', width: '6.25rem' },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with no data; only headers', () => {
    const { asFragment } = render(
      <BpkDataTable
        rows={[]}
        height="12.5rem"
        columns={[
          { label: 'Name', accessor: 'name', width: '6.25rem' },
          {
            label: 'Description',
            accessor: 'description',
            width: '6.25rem',
            flexGrow: 1,
          },
          { label: 'Bla', accessor: 'bla', width: '6.25rem' },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a specified width', () => {
    const { asFragment } = render(
      <BpkDataTable
        rows={rows}
        height="12.5rem"
        width="25rem"
        columns={[
          { label: 'Name', accessor: 'name', width: '6.25rem' },
          {
            label: 'Description',
            accessor: 'description',
            width: '6.25rem',
            flexGrow: 1,
          },
          { label: 'Bla', accessor: 'bla', width: '6.25rem' },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom rowClassName string', () => {
    const { asFragment } = render(
      <BpkDataTable
        rows={rows}
        height="12.5rem"
        rowClassName="custom-data-table__row"
        columns={[
          { label: 'Name', accessor: 'name', width: '6.25rem' },
          {
            label: 'Description',
            accessor: 'description',
            width: '6.25rem',
            flexGrow: 1,
          },
          { label: 'Bla', accessor: 'bla', width: '6.25rem' },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom rowClassName function', () => {
    const { asFragment } = render(
      <BpkDataTable
        rows={rows}
        height="12.5rem"
        rowClassName={({ index }: { index: number }): string =>
          index % 2 === 0
            ? 'custom-data-table__row_even'
            : 'custom-data-table__row_odd'
        }
        columns={[
          { label: 'Name', accessor: 'name', width: '6.25rem' },
          {
            label: 'Description',
            accessor: 'description',
            width: '6.25rem',
            flexGrow: 1,
          },
          { label: 'Bla', accessor: 'bla', width: '6.25rem' },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom headerClassName', () => {
    const { asFragment } = render(
      <BpkDataTable
        rows={rows}
        height="12.5rem"
        headerClassName="custom-data-table__header"
        columns={[
          { label: 'Name', accessor: 'name', width: '6.25rem' },
          {
            label: 'Description',
            accessor: 'description',
            width: '6.25rem',
            flexGrow: 1,
          },
          { label: 'Bla', accessor: 'bla', width: '6.25rem' },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render correctly with a custom className', () => {
    const { asFragment } = render(
      <BpkDataTable
        rows={rows}
        height="12.5rem"
        className="custom-data-table"
        columns={[
          { label: 'Name', accessor: 'name', width: '6.25rem' },
          {
            label: 'Description',
            accessor: 'description',
            width: '6.25rem',
            flexGrow: 1,
          },
          { label: 'Bla', accessor: 'bla', width: '6.25rem' },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should sort rows if header is clicked', async () => {
    render(
      <BpkDataTable
        rows={rows}
        height="12.5rem"
        width="25rem"
        columns={[
          { label: 'Name', accessor: 'name', width: '6.25rem' },
          { label: 'Description', accessor: 'description', width: '6.25rem' },
        ]}
      />,
    );

    const firstRow = within(screen.getAllByRole('rowgroup')[0]).getAllByRole(
      'row',
    )[0];
    expect(firstRow).toHaveTextContent(/Software Engineer/i);

    const header = screen.getByRole('button', { name: 'Name' });
    await fireEvent.click(header);

    const firstRowNameSorted = within(
      screen.getAllByRole('rowgroup')[0],
    ).getAllByRole('row')[0];

    expect(firstRowNameSorted).toHaveTextContent(/Some guy/i);
  });

  it('should sort rows ascending if the UpIcon in the header is clicked', async () => {
    const abcRows = [
      { name: 'Bruno', letter: 'A' },
      { name: 'Daniela', letter: 'B' },
      { name: 'Ana', letter: 'C' },
      { name: 'Carla', letter: 'D' },
    ];
    render(
      <BpkDataTable
        rows={abcRows}
        height="12.5rem"
        width="25rem"
        defaultColumnSortIndex={1}
        columns={[
          { label: 'Name', accessor: 'name', width: '6.25rem' },
          { label: 'Letter', accessor: 'letter', width: '6.25rem' },
        ]}
      />,
    );

    const firstRow = within(screen.getAllByRole('rowgroup')[0]).getAllByRole(
      'row',
    )[0];
    expect(firstRow).toHaveTextContent(/Bruno/i);

    const sortIconUp = document.getElementsByClassName(
      'bpk-data-table-column__sort-icon--up',
    )[0];
    const clickArrow = sortIconUp.querySelector('svg') as SVGSVGElement;
    await fireEvent.click(clickArrow);

    const firstRowNameSorted = within(
      screen.getAllByRole('rowgroup')[0],
    ).getAllByRole('row')[0];
    expect(firstRowNameSorted).toHaveTextContent(/Ana/i);
  });

  it('should sort rows descending if the DownIcon in the header is clicked', async () => {
    const abcRows = [
      { name: 'Bruno', letter: 'A' },
      { name: 'Daniela', letter: 'B' },
      { name: 'Ana', letter: 'C' },
      { name: 'Carla', letter: 'D' },
    ];
    render(
      <BpkDataTable
        rows={abcRows}
        height="12.5rem"
        width="25rem"
        defaultColumnSortIndex={1}
        columns={[
          { label: 'Name', accessor: 'name', width: '6.25rem' },
          { label: 'Letter', accessor: 'letter', width: '6.25rem' },
        ]}
      />,
    );

    const firstRow = within(screen.getAllByRole('rowgroup')[0]).getAllByRole(
      'row',
    )[0];
    expect(firstRow).toHaveTextContent(/Bruno/i);

    const sortIconDown = document.getElementsByClassName(
      'bpk-data-table-column__sort-icon--down',
    )[0];
    const clickArrow = sortIconDown.querySelector('svg') as SVGSVGElement;
    await fireEvent.click(clickArrow);

    const firstRowNameSorted = within(
      screen.getAllByRole('rowgroup')[0],
    ).getAllByRole('row')[0];
    expect(firstRowNameSorted).toHaveTextContent(/Daniela/i);
  });

  it('should not sort rows if header with disableSort is clicked', async () => {
    render(
      <BpkDataTable
        rows={rows}
        height="12.5rem"
        width="25rem"
        columns={[
          {
            label: 'Name',
            accessor: 'name',
            width: '6.25rem',
            disableSortBy: true,
          },
          { label: 'Description', accessor: 'description', width: '6.25rem' },
        ]}
      />,
    );

    const firstRow = within(screen.getAllByRole('row')[1]).getAllByRole(
      'cell',
    )[1];
    expect(firstRow).toHaveTextContent('Software Engineer');

    const header = screen.getByRole('button', { name: 'Name' });
    await fireEvent.click(header);

    const firstRowDescriptionSorted = within(
      screen.getAllByRole('row')[1],
    ).getAllByRole('cell')[1];
    expect(firstRowDescriptionSorted).toHaveTextContent('Software Engineer');
  });

  it('should sort rows using custom sort when it is passed', async () => {
    const complexRows = [
      {
        name: 'Jose',
        description: 'Software Engineer',
        seat: { office: 'London', desk: 10 },
      },
      {
        name: 'Rolf',
        description: 'Some guy',
        seat: { office: 'Barcelona', desk: 12 },
      },
      {
        name: 'John',
        description: 'Some other guy',
        seat: { office: 'Barcelona', desk: 15 },
      },
    ];
    const sortByValue = 'seat';
    const sortDirectionValue = 'DESC';
    const sortFunction = (
      rowA: { [key: string]: any },
      rowB: { [key: string]: any },
    ) => {
      const deskA = rowA.seat.desk;
      const deskB = rowB.seat.desk;

      if (deskA === deskB) {
        return 0;
      }
      return deskA > deskB ? 1 : -1;
    };

    const getBpkDataTable = (
      rowsData: { [key: string]: any },
      sortBy: string,
      sortDirection: (typeof SORT_DIRECTION_TYPES)[keyof typeof SORT_DIRECTION_TYPES],
    ) => (
      <BpkDataTable
        rows={rowsData}
        height="12.5rem"
        width="25rem"
        sort={sortFunction}
        sortBy={sortBy}
        sortDirection={sortDirection}
        columns={[
          {
            label: 'Name',
            accessor: 'name',
            width: '6.25rem',
            disableSortBy: true,
          },
          { label: 'Description', accessor: 'description', width: '6.25rem' },
          {
            label: 'Seat',
            accessor: 'seat',
            width: '6.25rem',
            flexGrow: 1,
            Cell: ({ cellData }: { cellData: { [key: string]: any } }) => (
              <Fragment>
                {cellData.office} - {cellData.desk}
              </Fragment>
            ),
          },
        ]}
      />
    );
    const { rerender } = render(
      getBpkDataTable(complexRows, sortByValue, sortDirectionValue),
    );

    expect(
      within(screen.getAllByRole('rowgroup')[0]).getAllByRole('row')[2],
    ).toHaveTextContent('Barcelona - 15');

    const header = screen.getByRole('button', { name: 'Seat' });
    await fireEvent.click(header);

    rerender(getBpkDataTable(complexRows, sortByValue, sortDirectionValue));

    expect(
      within(screen.getAllByRole('rowgroup')[0]).getAllByRole('row')[0],
    ).toHaveTextContent(/Barcelona - 15/i);
    expect(
      within(screen.getAllByRole('rowgroup')[0]).getAllByRole('row')[1],
    ).toHaveTextContent(/Barcelona - 12/i);
    expect(
      within(screen.getAllByRole('rowgroup')[0]).getAllByRole('row')[2],
    ).toHaveTextContent(/London - 10/i);
  });

  it('should call the onRowClick callback when a row is clicked', async () => {
    const onRowClick = jest.fn();
    render(
      <BpkDataTable
        rows={rows}
        height="12.5rem"
        width="25rem"
        onRowClick={onRowClick}
        columns={[
          { label: 'Name', accessor: 'name', width: '6.25rem' },
          { label: 'Description', accessor: 'description', width: '6.25rem' },
        ]}
      />,
    );

    const firstRow = within(screen.getAllByRole('rowgroup')[0]).getAllByRole(
      'row',
    )[0];
    await fireEvent.click(firstRow);

    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick).toHaveBeenCalledWith(rows[0]);
  });

  it('onRowClick/bug: ensure handler is applied to the right element after sorting', async () => {
    const abcRows = [
      { letter: 'Z', number: 0 },
      { letter: 'P', number: 1 },
      { letter: 'A', number: 2 },
    ];
    const onRowClick = jest.fn();
    render(
      <BpkDataTable
        rows={abcRows}
        height="12.5rem"
        width="25rem"
        onRowClick={onRowClick}
        columns={[
          { label: 'Letter', accessor: 'letter', width: '6.25rem' },
          { label: 'Number', accessor: 'number', width: '6.25rem' },
        ]}
      />,
    );

    await fireEvent.click(
      within(screen.getAllByRole('rowgroup')[0]).getAllByRole('row')[2],
    );

    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick).toHaveBeenCalledWith(abcRows[0]);
  });

  it('should re-render when rows prop is updated', () => {
    const { rerender } = render(
      <BpkDataTable
        rows={rows}
        height="12.5rem"
        width="25rem"
        columns={[
          { label: 'Name', accessor: 'name', width: '6.25rem' },
          { label: 'Description', accessor: 'description', width: '6.25rem' },
        ]}
      />,
    );
    expect(
      within(screen.getAllByRole('rowgroup')[0]).getAllByRole('row'),
    ).toHaveLength(2);

    rerender(
      <BpkDataTable
        rows={[]}
        height="12.5rem"
        width="25rem"
        columns={[
          { label: 'Name', accessor: 'name', width: '6.25rem' },
          { label: 'Description', accessor: 'description', width: '6.25rem' },
        ]}
      />,
    );
    expect(
      within(screen.getAllByRole('rowgroup')[0]).queryAllByRole('row'),
    ).toHaveLength(0);

    rerender(
      <BpkDataTable
        rows={[rows[0]]}
        height="12.5rem"
        width="25rem"
        columns={[
          { label: 'Name', accessor: 'name', width: '6.25rem' },
          { label: 'Description', accessor: 'description', width: '6.25rem' },
        ]}
      />,
    );
    expect(
      within(screen.getAllByRole('rowgroup')[0]).getAllByRole('row'),
    ).toHaveLength(1);
  });

  it('Default table is sorted by the column specified in the index', () => {
    const abcRows = [
      { letter: 'C', number: 1 },
      { letter: 'B', number: 2 },
      { letter: 'A', number: 3 },
    ];
    render(
      <BpkDataTable
        rows={abcRows}
        height="12.5rem"
        width="25rem"
        defaultColumnSortIndex={1}
        columns={[
          { label: 'Letter', accessor: 'letter', width: '6.25rem' },
          {
            label: 'Number',
            accessor: 'number',
            width: '6.25rem',
            defaultSortDirection: SORT_DIRECTION_TYPES.DESC,
          },
        ]}
      />,
    );

    expect(
      within(screen.getAllByRole('rowgroup')[0]).getAllByRole('row')[0],
    ).toHaveTextContent('A3');
  });
});
