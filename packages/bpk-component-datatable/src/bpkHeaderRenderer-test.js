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
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { SortDirection } from 'react-virtualized';
import bpkHeaderRenderer, { getSortIconDirection } from './bpkHeaderRenderer';

jest.mock('./utils', () => ({
  hasClassName: (element, className) => element && element.hasClass(className),
}));

describe('bpkHeaderRenderer', () => {
  it('renders sort icons', () => {
    const header = bpkHeaderRenderer({ dataKey: 'dataKey', label: 'Label' });
    const tree = renderer.create(<div>{header}</div>);
    expect(tree).toMatchSnapshot();
  });
  it('does not render sort icons if sorting disabled', () => {
    const header = bpkHeaderRenderer({
      dataKey: 'dataKey',
      label: 'Label',
      disableSort: true,
    });
    const tree = renderer.create(<div>{header}</div>);
    expect(tree).toMatchSnapshot();
  });
  it('renders sort icon with down icon selected', () => {
    const header = bpkHeaderRenderer({
      dataKey: 'dataKey',
      label: 'Label',
      sortBy: 'dataKey',
      sortDirection: SortDirection.ASC,
    });
    const tree = renderer.create(<div>{header}</div>);
    expect(tree).toMatchSnapshot();
  });
  it('renders sort icon with up icon selected', () => {
    const header = bpkHeaderRenderer({
      dataKey: 'dataKey',
      label: 'Label',
      sortBy: 'dataKey',
      sortDirection: SortDirection.DESC,
    });
    const tree = renderer.create(<div>{header}</div>);
    expect(tree).toMatchSnapshot();
  });
  describe('getSortIconDirection', () => {
    let mounted;
    beforeEach(() => {
      mounted = mount(
        <div>
          {bpkHeaderRenderer({
            dataKey: 'data',
            label: 'Label',
            sortBy: 'datax',
          })}
        </div>,
      );
    });

    it('returns DESC for the up icon element', () => {
      const upIcon = mounted
        .find('svg')
        .find('.bpk-data-table-column__sort-icon--up');
      const sortDirection = getSortIconDirection(upIcon);
      expect(sortDirection).toBe(SortDirection.DESC);
    });
    it('returns ASC for the down path element', () => {
      const downIcon = mounted
        .find('svg')
        .find('.bpk-data-table-column__sort-icon--down');
      const sortDirection = getSortIconDirection(downIcon);
      expect(sortDirection).toBe(SortDirection.ASC);
    });
    it('returns null other things', () => {
      const headerLabel = mounted
        .find('span')
        .find('.bpk-data-table-column__header');
      const sortDirection = getSortIconDirection(headerLabel);
      expect(sortDirection).toBeNull();
    });
  });
});
