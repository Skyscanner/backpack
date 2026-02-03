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
// @ts-nocheck

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { CALENDAR_SELECTION_TYPE } from '../../bpk-component-calendar';
import { format } from '../../bpk-component-calendar/src/date-utils';
import {
  weekDays,
  formatMonth,
  formatDateFull,
} from '../../bpk-component-calendar/test-utils';

import BpkDatepicker from './BpkDatepicker';

// mock breakpoint to always match
jest.mock('../../bpk-component-breakpoint/src/useMediaQuery', () => jest.fn(() => true));
jest.mock('@popperjs/core', () => {
  const PopperJS = jest.requireActual('@popperjs/core');
  return {
    __esModule: true,
    ...PopperJS,
    createPopper: jest.fn(() => ({
      update: jest.fn(),
      destroy: jest.fn(),
    })),
  };
});

const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');

const inputProps = {
  onChange: () => null,
  placeholder: 'placeholder',
  large: true,
};

describe('BpkDatepicker', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render range correctly', () => {
    const { asFragment } = render(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: 'range',
          startDate: new Date(2010, 1, 15),
          endDate: new Date(2010, 1, 20),
        }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when not valid', () => {
    const { asFragment } = render(
      <BpkDatepicker
        valid={false}
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with datepicker open', () => {
    render(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
        isOpen
      />,
    );

    const calendarDialog = screen.queryByRole('dialog', {
      name: 'Departure date',
    });
    expect(calendarDialog).toBeInTheDocument();
  });

  it('"readOnly" can be overriden in "inputProps"', () => {
    const noReadOnlyInputProps = { ...inputProps, readOnly: false };
    const { asFragment } = render(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={noReadOnlyInputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should open on click', async () => {
    render(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
      />,
    );

    const inputField = screen.getByRole('textbox', {
      name: /15th February 2010/i,
    });
    await userEvent.click(inputField);

    const calendarDialog = screen.getByRole('dialog', {
      name: 'Departure date',
    });
    expect(calendarDialog).toBeInTheDocument();
  });

  it('should open on focus', () => {
    render(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
        weekStartsOn={1}
      />,
    );

    const inputField = screen.getByRole('textbox', {
      name: /15th February 2010/i,
    });
    fireEvent.focus(inputField);

    const calendarDialog = screen.getByRole('dialog', {
      name: 'Departure date',
    });
    expect(calendarDialog).toBeInTheDocument();
  });

  it('should open when the isOpen prop is changed from the outside', () => {
    const getDatepicker = (isOpen: boolean) => (
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
        weekStartsOn={1}
        isOpen={isOpen}
      />
    );

    const { rerender } = render(getDatepicker(false));

    rerender(getDatepicker(true));

    const calendarDialog = screen.getByRole('dialog', {
      name: 'Departure date',
    });
    expect(calendarDialog).toBeInTheDocument();
  });

  it('should call onOpenChange when a date is selected', async () => {
    const onOpenChangeMock = jest.fn();

    render(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        weekStartsOn={1}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
        onOpenChange={onOpenChangeMock}
      />,
    );

    const inputField = screen.getByRole('textbox', {
      name: /15th February 2010/i,
    });
    await userEvent.click(inputField);

    const calendarDialog = screen.queryByRole('dialog', {
      name: 'Departure date',
    });
    expect(calendarDialog).toBeInTheDocument();
    expect(onOpenChangeMock).toHaveBeenCalledWith(true);

    const dateButton = screen.getByRole('button', {
      name: /15th February 2010/i,
    });
    await userEvent.click(dateButton);
    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
  });

  it('should close when `onClose` is called', async () => {
    const onOpenChangeMock = jest.fn();

    render(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
        onOpenChange={onOpenChangeMock}
        isOpen
      />,
    );

    const calendarDialog = screen.queryByRole('dialog', {
      name: 'Departure date',
    });
    expect(calendarDialog).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'Close' });
    await userEvent.click(closeButton);
    expect(calendarDialog).not.toBeInTheDocument();
    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
  });
});
