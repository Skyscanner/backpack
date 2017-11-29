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
import { shallow } from 'enzyme';
import BpkPaginationList from './BpkPaginationList';
import BpkPaginationBreak from './BpkPaginationBreak';

describe('BpkPaginationList', () => {
  it('should display first 3 pages when the first page is selected', () => {
    const paginationList = shallow(<BpkPaginationList
      pageCount={20}
      selectedPageIndex={0}
      visibleRange={3}
    />);

    const list = paginationList.find('li');

    expect(list.length).toBe(5);
    expect(list.at(3).contains(<BpkPaginationBreak />)).toBe(true);
    expect(list.at(4).find('BpkPaginationPage').prop('label')).toBe(20);
  });

  it('should display two ellipses when the 6th page is selected', () => {
    const paginationList = shallow(<BpkPaginationList
      pageCount={20}
      selectedPageIndex={5}
      visibleRange={3}
    />);

    const list = paginationList.find('li');

    expect(list.length).toBe(7);
    expect(list.at(1).contains(<BpkPaginationBreak />)).toBe(true);
    expect(list.at(5).contains(<BpkPaginationBreak />)).toBe(true);
    expect(list.at(4).find('BpkPaginationPage').prop('label')).toBe(7);
  });


  it('should display all pages when there are only 4 pages', () => {
    const paginationList = shallow(<BpkPaginationList
      pageCount={4}
      selectedPageIndex={0}
      visibleRange={3}
    />);

    const list = paginationList.find('li');

    expect(list.length).toBe(4);
    expect(list.at(0).find('BpkPaginationPage').prop('label')).toBe(1);
    expect(list.at(1).find('BpkPaginationPage').prop('label')).toBe(2);
    expect(list.at(2).find('BpkPaginationPage').prop('label')).toBe(3);
    expect(list.at(3).find('BpkPaginationPage').prop('label')).toBe(4);
  });
});
