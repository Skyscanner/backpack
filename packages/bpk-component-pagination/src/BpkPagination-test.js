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
import { mount } from 'enzyme';
import BpkPagination from './BpkPagination';

describe('BpkPagination', () => {
  it('should display forward nudger', () => {
    const pagination = mount(<BpkPagination
      pageCount={20}
      selectedPageIndex={0}
      previousLabel="previous"
      nextLabel="next"
    />);

    expect(pagination.find({ label: 'next' }).length).toBe(1);
    expect(pagination.find({ label: 'previous' }).length).toBe(0);
  });

  it('should display backward nudger when not on the first page', () => {
    const pagination = mount(<BpkPagination
      pageCount={20}
      selectedPageIndex={1}
      previousLabel="previous"
      nextLabel="next"
    />);

    expect(pagination.find({ label: 'next' }).length).toBe(1);
    expect(pagination.find({ label: 'previous' }).length).toBe(1);
  });

  it('should not display forward nudger when on last page', () => {
    const pagination = mount(<BpkPagination
      pageCount={2}
      selectedPageIndex={1}
      previousLabel="previous"
      nextLabel="next"
    />);

    expect(pagination.find({ label: 'next' }).length).toBe(0);
    expect(pagination.find({ label: 'previous' }).length).toBe(1);
  });

  it('should call the \'onPageChange\' callback when page is selected', () => {
    const onPageChange = jest.fn();
    const pagination = mount(<BpkPagination
      pageCount={20}
      selectedPageIndex={0}
      previousLabel="previous"
      nextLabel="next"
      onPageChange={onPageChange}
    />);

    const page = pagination.find('ul');
    expect(onPageChange.mock.calls.length).toBe(0);

    page.find('li').at(4).find('button').simulate('click');

    expect(onPageChange.mock.calls.length).toBe(1);
    expect(onPageChange.mock.calls[0][0]).toEqual(19);
  });

  it('should call the \'onPageChange\' callback when nudger is clicked', () => {
    const onPageChange = jest.fn();
    const pagination = mount(<BpkPagination
      pageCount={20}
      selectedPageIndex={0}
      previousLabel="previous"
      nextLabel="next"
      onPageChange={onPageChange}
    />);

    const forwardNudger = pagination.find('BpkPaginationNudger');
    const page = pagination.find('BpkPaginationList');
    expect(page.prop('selectedPageIndex')).toEqual(0);
    expect(onPageChange.mock.calls.length).toBe(0);

    forwardNudger.find('button').simulate('click');

    expect(onPageChange.mock.calls.length).toBe(1);
    expect(onPageChange.mock.calls[0][0]).toEqual(1);
  });
});
