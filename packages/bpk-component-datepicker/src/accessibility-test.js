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
import {
  weekDays,
  formatMonth,
  formatDateFull,
} from 'bpk-component-calendar/test-utils';
import { format } from 'bpk-component-calendar/src/date-utils';
import { CALENDAR_SELECTION_TYPE } from 'bpk-component-calendar';
import { axe } from 'jest-axe';

jest.mock(
  './../node_modules/bpk-component-popover/node_modules/@skyscanner/popper.js',
  () =>
    class Popper {
      scheduleUpdate = () => {};

      destroy = () => {};
    },
);

// eslint-disable-next-line import/first
import BpkDatepicker from './BpkDatepicker';

const formatDate = (date) => format(date, 'dd/MM/yyyy');

const inputProps = {
  onChange: () => null,
  placeholder: 'placeholder',
  large: true,
};

describe('BpkDatepicker accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
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
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues when used in range configuration', async () => {
    const { container } = render(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
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
          type: CALENDAR_SELECTION_TYPE.range,
          startDate: new Date(2010, 1, 17),
          endDate: new Date(2020, 1, 20),
        }}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
