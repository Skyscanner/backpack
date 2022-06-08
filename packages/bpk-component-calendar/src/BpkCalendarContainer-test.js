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
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { weekDays, formatDateFull, formatMonth } from '../test-utils';

import BpkCalendarContainer from './BpkCalendarContainer';
import { CALENDAR_SELECTION_TYPE } from './custom-proptypes';

const createNodeMock = () => ({
  focus: () => null,
});

describe('BpkCalendarContainer', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkCalendarContainer
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        id="myCalendar"
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
      />,
      { createNodeMock },
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly in range mode', () => {
    const { asFragment } = render(
      <BpkCalendarContainer
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        id="myCalendar"
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.range,
          startDate: new Date(2010, 1, 16),
          endDate: new Date(2010, 1, 20),
        }}
      />,
      { createNodeMock },
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should focus the correct date when `initiallyFocusedDate` is set and selected date is not', () => {
    const { asFragment } = render(
      <BpkCalendarContainer
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        id="myCalendar"
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        initiallyFocusedDate={new Date(2010, 1, 28)}
      />,
      { createNodeMock },
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should change the month', async () => {
    render(
      <BpkCalendarContainer
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        id="myCalendar"
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
      />,
    );

    // dates in March are outside current month
    const outsideDate = screen.getByRole('button', {
      name: /1st March 2010/i,
    });
    expect(outsideDate.classList.contains('bpk-calendar-date--outside')).toBe(
      true,
    );

    // change month to March
    const inputField = screen.getByRole('combobox', { name: 'Change month' });
    await userEvent.selectOptions(inputField, 'March 2010');

    // dates in March are within current month
    const currentDate = screen.getByRole('button', {
      name: /1st March 2010/i,
    });
    expect(currentDate.classList.contains('bpk-calendar-date--outside')).toBe(
      false,
    );
  });

  it('should call the onDateSelect callback', async () => {
    const onDateSelect = jest.fn();

    render(
      <BpkCalendarContainer
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        id="myCalendar"
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
        onDateSelect={onDateSelect}
      />,
    );

    expect(onDateSelect.mock.calls.length).toBe(0);

    const date = screen.getByRole('button', {
      name: /20th February 2010/i,
    });
    await userEvent.click(date);

    expect(onDateSelect.mock.calls.length).toBe(1);
  });

  it('should account for focus state if selected date is set to null', async () => {
    const onDateSelect = jest.fn();
    const initialSelectedDate = new Date(2010, 1, 22);
    const minDate = new Date(2010, 1, 15);
    const maxDate = new Date(2010, 2, 15);

    const { rerender } = render(
      <BpkCalendarContainer
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        id="myCalendar"
        minDate={minDate}
        maxDate={maxDate}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: initialSelectedDate,
        }}
        onDateSelect={onDateSelect}
      />,
    );

    const initialSelectedDateButton = screen.getByRole('button', {
      name: /22nd February 2010/i,
    });
    expect(
      initialSelectedDateButton.classList.contains(
        'bpk-calendar-date--focused',
      ),
    ).toBe(true);

    rerender(
      <BpkCalendarContainer
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        id="myCalendar"
        minDate={minDate}
        maxDate={maxDate}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: null,
        }}
        onDateSelect={onDateSelect}
      />,
    );

    const minDateButton = screen.getByRole('button', {
      name: /15th February 2010/i,
    });
    expect(minDateButton.classList.contains('bpk-calendar-date--focused')).toBe(
      true,
    );
  });

  it('should set state only once on date selection', async () => {
    const setStateSpy = jest.fn();
    const oldSetState = BpkCalendarContainer.prototype.setState;
    BpkCalendarContainer.prototype.setState = setStateSpy;

    render(
      <BpkCalendarContainer
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        id="myCalendar"
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
        onDateSelect={null}
      />,
    );

    expect(setStateSpy.mock.calls.length).toBe(0);

    const date = screen.getByRole('button', {
      name: /20th February 2010/i,
    });

    await userEvent.click(date);
    expect(setStateSpy.mock.calls.length).toBe(1);

    BpkCalendarContainer.prototype.setState = oldSetState;
  });

  it('should move focus on keyboard input', async () => {
    const origin = new Date(2010, 2, 1);
    const originStr = 'Monday, 1st March 2010';

    const getDate = (name) => screen.getByRole('button', { name });

    render(
      <BpkCalendarContainer
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        id="myCalendar"
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: origin,
        }}
      />,
    );

    await fireEvent.keyDown(getDate(originStr), { key: 'S' });
    expect(
      getDate(originStr).classList.contains('bpk-calendar-date--focused'),
    ).toBe(true);

    await fireEvent.keyDown(getDate(originStr), { key: 'ArrowRight' });
    expect(
      getDate(/2nd March/).classList.contains('bpk-calendar-date--focused'),
    ).toBe(true);

    await fireEvent.keyDown(getDate(/2nd March/i), { key: 'ArrowDown' });
    expect(
      getDate(/9th March/i).classList.contains('bpk-calendar-date--focused'),
    ).toBe(true);

    await fireEvent.keyDown(getDate(/9th March/i), { key: 'ArrowLeft' });
    expect(
      getDate(/8th March/i).classList.contains('bpk-calendar-date--focused'),
    ).toBe(true);

    await fireEvent.keyDown(getDate(/8th March/i), { key: 'ArrowUp' });
    expect(
      getDate(originStr).classList.contains('bpk-calendar-date--focused'),
    ).toBe(true);

    await fireEvent.keyDown(getDate(originStr), { key: 'End' });
    expect(
      getDate(/15th March/i).classList.contains('bpk-calendar-date--focused'),
    ).toBe(true);

    await fireEvent.keyDown(getDate(/15th March/i), { key: 'Home' });
    expect(
      getDate(originStr).classList.contains('bpk-calendar-date--focused'),
    ).toBe(true);

    await fireEvent.keyDown(getDate(originStr), { key: 'PageDown' });
    expect(
      getDate(/15th March/i).classList.contains('bpk-calendar-date--focused'),
    ).toBe(true);

    await fireEvent.keyDown(getDate(/15th March/i), { key: 'PageUp' });
    expect(
      getDate(/15th February/i).classList.contains(
        'bpk-calendar-date--focused',
      ),
    ).toBe(true);
  });

  it('should change month on keyboard nav across month boundary', async () => {
    const onMonthChange = jest.fn();
    const origin = new Date(2010, 1, 27);
    const originStr = 'Saturday, 27th February 2010';

    const getDate = (name) => screen.getByRole('button', { name });

    render(
      <BpkCalendarContainer
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        id="myCalendar"
        minDate={new Date(2010, 1, 1)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: origin,
        }}
        onMonthChange={onMonthChange}
      />,
    );

    await fireEvent.keyDown(getDate(originStr), { key: 'ArrowRight' });
    expect(
      getDate(/28th February/i).classList.contains(
        'bpk-calendar-date--focused',
      ),
    ).toBe(true);

    await fireEvent.keyDown(getDate(/28th February/i), { key: 'ArrowRight' });
    expect(
      getDate(/1st March/i).classList.contains('bpk-calendar-date--focused'),
    ).toBe(true);
    expect(onMonthChange.mock.calls.length).toEqual(1);
    expect(onMonthChange.mock.calls[0][1]).toEqual({
      month: new Date(2010, 2, 1),
      source: 'GRID',
    });
  });
});
