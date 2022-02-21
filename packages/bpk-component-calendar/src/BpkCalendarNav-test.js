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
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import format from 'date-fns/format';

import BpkCalendarNav from './BpkCalendarNav';

const formatMonth = (date) => format(date, 'MMMM yyyy');

describe('BpkCalendarNav', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkCalendarNav
        month={new Date(2010, 1, 1)}
        minDate={new Date(2010, 1, 1)}
        maxDate={new Date(2010, 2, 1)}
        formatMonth={formatMonth}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        id="myCalendarNav"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should disable inputs when disabled', () => {
    const { asFragment } = render(
      <BpkCalendarNav
        month={new Date(2010, 1, 1)}
        minDate={new Date(2010, 1, 1)}
        maxDate={new Date(2010, 2, 1)}
        formatMonth={formatMonth}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        disabled
        id="myCalendarNav"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should use given previousMonth and nextMonth labels correctly', () => {
    const { asFragment } = render(
      <BpkCalendarNav
        month={new Date(2010, 1, 1)}
        minDate={new Date(2010, 1, 1)}
        maxDate={new Date(2010, 2, 1)}
        formatMonth={formatMonth}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        disabled
        id="myCalendarNav"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call the onMonthChange callback when nudging/selecting month', () => {
    const onMonthChange = jest.fn();

    const nav = shallow(
      <BpkCalendarNav
        month={new Date(2010, 1, 1)}
        minDate={new Date(2010, 0, 1)}
        maxDate={new Date(2010, 2, 1)}
        formatMonth={formatMonth}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        onMonthChange={onMonthChange}
        id="myCalendarNav"
      />,
    );

    expect(onMonthChange.mock.calls.length).toBe(0);

    // Previous month
    const prevEventStub = { persist: jest.fn() };
    nav.find('button').at(0).simulate('click', prevEventStub);
    expect(onMonthChange.mock.calls.length).toBe(1);
    expect(onMonthChange.mock.calls[0][0]).toEqual(prevEventStub);
    expect(onMonthChange.mock.calls[0][1]).toEqual({
      month: new Date(2010, 0, 1),
      source: 'PREV',
    });

    // Next month
    const nextEventStub = { persist: jest.fn() };
    nav.find('button').at(1).simulate('click', nextEventStub);
    expect(onMonthChange.mock.calls.length).toBe(2);
    expect(onMonthChange.mock.calls[1][0]).toEqual(nextEventStub);
    expect(onMonthChange.mock.calls[1][1]).toEqual({
      month: new Date(2010, 2, 1),
      source: 'NEXT',
    });

    // Select month
    const selectEventStub = {
      target: { value: '2010-03-01' },
      persist: jest.fn(),
    };
    nav.find('BpkSelect').simulate('change', selectEventStub);
    expect(onMonthChange.mock.calls.length).toBe(3);
    expect(onMonthChange.mock.calls[2][0]).toEqual(selectEventStub);
    expect(onMonthChange.mock.calls[2][1]).toEqual({
      month: new Date(2010, 2, 1),
      source: 'SELECT',
    });
  });
});
