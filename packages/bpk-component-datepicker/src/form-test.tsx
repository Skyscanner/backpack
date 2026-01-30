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


import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkDatepicker from './BpkDatepicker';

import { CALENDAR_SELECTION_TYPE } from '@backpack/bpk-component-calendar';
import { format } from '@backpack/bpk-component-calendar/src/date-utils';
import {
  weekDays,
  formatMonth,
  formatDateFull,
} from '@backpack/bpk-component-calendar/test-utils';


const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');

const inputProps = {
  onChange: () => null,
  placeholder: 'placeholder',
  large: true,
};

describe('BpkDatepicker form test', () => {
  it('should work as a form component in a form', async () => {
    const Wrap = () => (
        <form data-testid="form">
          <BpkDatepicker
            id="datepicker"
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
            selectionConfiguration={{
              type: CALENDAR_SELECTION_TYPE.single,
              date: new Date(2020, 2, 19),
            }}
            data-testid="myDatepicker"
          />
        </form>
      );
    render(<Wrap />);

    const inputField = screen.getByRole('textbox', {
      name: /19th March 2020/i,
    });
    await userEvent.click(inputField);

    const formData = new FormData(
      screen.getByTestId('form') as HTMLFormElement,
  );
    expect(Object.fromEntries(formData.entries())).toEqual({ datepicker_input: '19/03/2020' });
  });

  it('should work as a form component in a form for two way trip', async () => {
    const Wrap = () => (
      <form data-testid="form">
        <BpkDatepicker
          id="datepicker"
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
          selectionConfiguration={{
            type: CALENDAR_SELECTION_TYPE.range,
            startDate: new Date(2020, 2, 19),
            endDate: new Date(2020, 3, 19),
          }}
          data-testid="myDatepicker"
        />
      </form>
    );
    render(<Wrap />);

    const inputField = screen.getByRole('textbox', {
      name: /19th March 2020/i,
    });
    await userEvent.click(inputField);

    const formData = new FormData(
      screen.getByTestId('form') as HTMLFormElement,
    );
    expect(Object.fromEntries(formData.entries())).toEqual({ datepicker_input: '19/03/2020 - 19/04/2020' });
  });

  it('should emit a change event when input is changed', async () => {
    const formValidation = jest.fn();
    const Wrap = () => {
      const [calendarDate, setCalendarDate] = useState(new Date(2020, 2, 19));
      return (
        <form data-testid="form">
          <BpkDatepicker
            id="datepicker"
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
            minDate={new Date(2020, 2, 1)}
            maxDate={new Date(2020, 2, 31)}
            onDateSelect={(date1, date2) => {
              setCalendarDate(date1);
            }}
            selectionConfiguration={{
              type: CALENDAR_SELECTION_TYPE.single,
              date: calendarDate,
            }}
            data-testid="myDatepicker"
          />
        </form>
      );
    };

    render(<Wrap />);
    document.addEventListener('change', formValidation);

    const inputField = screen.getByRole('textbox', {
      name: /Thursday, 19th March 2020/i,
    });

    await userEvent.click(inputField);

    const calendarDialog = screen.getByRole('dialog', {
      name: 'Departure date',
    });

    expect(calendarDialog).toBeInTheDocument();

    const dateButton = screen.getByRole('button', {
      name: /30/i,
    });

    await userEvent.click(dateButton);

    expect(inputField.getAttribute('value')).toEqual('30/03/2020');
    expect(formValidation).toHaveBeenCalledTimes(1);
  });
});

