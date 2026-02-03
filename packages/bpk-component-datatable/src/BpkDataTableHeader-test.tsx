// @ts-nocheck

// /*
//  * Backpack - Skyscanner's Design System
//  *
//  * Copyright 2016 Skyscanner Ltd
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *   http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */

import { render } from '@testing-library/react';

import BpkDataTableHeader from './BpkDataTableHeader';

const columnLabel = 'Name';
const sortDirection = 'ASC';

const mockColumnData = {
  defaultSortDirection: sortDirection,
  disableSortBy: false,
  flexGrow: 0,
  headerClassName: 'my-header-class',
  headerStyle: {},
  isSorted: false,
  isSortedDesc: false,
  label: columnLabel,
  minWidth: 0,
  sortDirection,
  width: '6.25rem',  
  getHeaderProps: jest.fn(() => ({})),
  render: jest.fn(() => columnLabel),
};

describe('BpkDataTableHeader', () => {
  it('renders sort icons', () => {
    const { asFragment } = render(
      <BpkDataTableHeader key="name" column={mockColumnData} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('does not render sort icons if sorting disabled', () => {
    const { asFragment } = render(
      <BpkDataTableHeader
        key="name"
        column={{ ...mockColumnData, disableSortBy: true }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders sort icon with down icon selected', () => {
    const { asFragment } = render(
      <BpkDataTableHeader
        key="name"
        column={{ ...mockColumnData, isSorted: true, isSortedDesc: true }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders sort icon with up icon selected', () => {
    const { asFragment } = render(
      <BpkDataTableHeader
        key="name"
        column={{ ...mockColumnData, isSorted: true }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
