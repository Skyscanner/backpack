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
import { render, screen } from '@testing-library/react';
import format from 'date-fns/format';
import userEvent from '@testing-library/user-event';

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

  it('should call the onMonthChange callback when nudging/selecting month', async () => {
    const onMonthChange = jest.fn();

    render(
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
    const prevMonthButton = screen.getByRole('button', {
      name: 'Go to previous month',
    });
    await userEvent.click(prevMonthButton);
    expect(onMonthChange.mock.calls.length).toBe(1);

    // Next month
    const nextMonthButton = screen.getByRole('button', {
      name: 'Go to next month',
    });
    await userEvent.click(nextMonthButton);
    expect(onMonthChange.mock.calls.length).toBe(2);

    // Select month
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'March 2010');
    expect(onMonthChange.mock.calls.length).toBe(3);
  });
});
