/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { SortDirection } from 'react-virtualized/dist/commonjs/Table';

import BpkDataTable from './BpkDataTable';
import BpkDataTableColumn from './BpkDataTableColumn';

jest.mock('react-dom', () => ({
  findDOMNode: () => ({}),
}));

const rows = [
  { name: 'Jose', description: 'Software Engineer', bla: 'Bla' },
  { name: 'Rolf', description: 'Some guy', bla: 'Bla' },
];

describe('BpkDataTable', () => {
  it('should render correctly with multiple columns', () => {
    const tree = renderer
      .create(
        <BpkDataTable rows={rows} height={200}>
          <BpkDataTableColumn label="Name" dataKey="name" width={100} />
          <BpkDataTableColumn
            label="Description"
            dataKey="description"
            width={100}
            flexGrow={1}
          />
          <BpkDataTableColumn label="Bla" dataKey="bla" width={100} />
        </BpkDataTable>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with no data; only headers', () => {
    const tree = renderer
      .create(
        <BpkDataTable rows={[]} height={200}>
          <BpkDataTableColumn label="Name" dataKey="name" width={100} />
          <BpkDataTableColumn
            label="Description"
            dataKey="description"
            width={100}
            flexGrow={1}
          />
          <BpkDataTableColumn label="Bla" dataKey="bla" width={100} />
        </BpkDataTable>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a specified width', () => {
    const tree = renderer
      .create(
        <BpkDataTable rows={rows} height={200} width={400}>
          <BpkDataTableColumn label="Name" dataKey="name" width={100} />
          <BpkDataTableColumn
            label="Description"
            dataKey="description"
            width={100}
            flexGrow={1}
          />
          <BpkDataTableColumn label="Bla" dataKey="bla" width={100} />
        </BpkDataTable>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a custom className', () => {
    const tree = renderer
      .create(
        <BpkDataTable rows={rows} height={200} className="custom-data-table">
          <BpkDataTableColumn label="Name" dataKey="name" width={100} />
          <BpkDataTableColumn
            label="Description"
            dataKey="description"
            width={100}
            flexGrow={1}
          />
          <BpkDataTableColumn label="Bla" dataKey="bla" width={100} />
        </BpkDataTable>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should sort rows if header is clicked', () => {
    const wrapper = mount(
      <BpkDataTable rows={rows} height={200} width={400}>
        <BpkDataTableColumn label="Name" dataKey="name" width={100} />
        <BpkDataTableColumn
          label="Description"
          dataKey="description"
          width={100}
        />
      </BpkDataTable>,
    );

    let cell = wrapper
      .find('.bpk-data-table__row .bpk-data-table-column')
      .last();
    expect(cell.text()).toBe('Some guy');

    wrapper
      .find('.bpk-data-table-column__header[title="Name"]')
      .simulate('click');

    cell = wrapper.find('.bpk-data-table__row .bpk-data-table-column').last();
    expect(cell.text()).toBe('Software Engineer');
  });

  it('should not sort rows if header with disableSort is clicked', () => {
    const wrapper = mount(
      <BpkDataTable rows={rows} height={200} width={400}>
        <BpkDataTableColumn
          label="Name"
          dataKey="name"
          width={100}
          disableSort
        />
        <BpkDataTableColumn
          label="Description"
          dataKey="description"
          width={100}
        />
      </BpkDataTable>,
    );

    let cell = wrapper
      .find('.bpk-data-table__row .bpk-data-table-column')
      .last();
    expect(cell.text()).toBe('Some guy');

    wrapper
      .find('.bpk-data-table-column__header[title="Name"]')
      .simulate('click');

    cell = wrapper.find('.bpk-data-table__row .bpk-data-table-column').last();
    expect(cell.text()).toBe('Some guy');
  });

  it('should call the onRowClick callback when a row is clicked', () => {
    const onRowClick = jest.fn();
    const wrapper = mount(
      <BpkDataTable
        rows={rows}
        height={200}
        width={400}
        onRowClick={onRowClick}
      >
        <BpkDataTableColumn label="Name" dataKey="name" width={100} />
        <BpkDataTableColumn
          label="Description"
          dataKey="description"
          width={100}
        />
      </BpkDataTable>,
    );

    wrapper
      .find('.bpk-data-table__row')
      .last()
      .simulate('click');

    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick).toHaveBeenCalledWith(rows[1]);
  });

  it('onRowClick/bug: ensure handler is applied to the right element after sorting', () => {
    const abcRows = [{ letter: 'Z' }, { letter: 'P' }, { letter: 'A' }];
    const onRowClick = jest.fn();
    const wrapper = mount(
      <BpkDataTable
        rows={abcRows}
        height={200}
        width={400}
        onRowClick={onRowClick}
      >
        <BpkDataTableColumn label="Letter" dataKey="letter" width={100} />
        <BpkDataTableColumn label="Letter" dataKey="letter" width={100} />
      </BpkDataTable>,
    );

    // Select the last element in the table, which after sorting
    // it will be letter Z so index 0.
    wrapper
      .find('.bpk-data-table__row')
      .last()
      .simulate('click');

    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick).toHaveBeenCalledWith(abcRows[0]);
  });

  it('should re-render when rows prop is updated', () => {
    const wrapper = mount(
      <BpkDataTable rows={rows} height={200} width={400}>
        <BpkDataTableColumn label="Name" dataKey="name" width={100} />
        <BpkDataTableColumn
          label="Description"
          dataKey="description"
          width={100}
        />
      </BpkDataTable>,
    );

    wrapper.setProps({ rows: [] });
    expect(wrapper.find('.bpk-data-table__row')).toHaveLength(1);

    wrapper.setProps({ rows: [rows[0]] });
    expect(wrapper.find('.bpk-data-table__row')).toHaveLength(2);
  });

  it('Default table is sorted by the column specified in the index', () => {
    const abcRows = [
      { letter: 'A', number: 1 },
      { letter: 'B', number: 2 },
      { letter: 'C', number: 3 },
    ];
    const wrapper = mount(
      <BpkDataTable
        rows={abcRows}
        height={200}
        width={400}
        defaultColumnSortIndex={1}
      >
        <BpkDataTableColumn label="Letter" dataKey="letter" width={100} />
        <BpkDataTableColumn
          label="Number"
          dataKey="number"
          width={100}
          defaultSortDirection={SortDirection.DESC}
        />
      </BpkDataTable>,
    );

    // Select the last element in the table, when sorting by default on 2nd
    // column it will be A1.
    const firstRow = wrapper.find('.bpk-data-table__row').at(1);
    expect(firstRow.text()).toBe('C3');
  });
});
