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

import PropTypes from 'prop-types';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addMonths, isWeekend } from 'date-fns';

import { colorPanjin } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { formatDateFull, formatMonth } from '../test-utils';

import BpkCalendarScrollDate from './BpkScrollableCalendarDate';
import BpkCalendarScrollGrid from './BpkScrollableCalendarGrid';

describe('BpkCalendarScrollGrid', () => {
  it('should render correctly with no optional props set', () => {
    const { asFragment } = render(
      <BpkCalendarScrollGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarScrollDate}
        weekStartsOn={1}
        minDate={new Date('2016-01')}
        maxDate={addMonths(new Date('2016-01'), 12)}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a different "weekStartsOn" attribute', () => {
    const { asFragment } = render(
      <BpkCalendarScrollGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarScrollDate}
        weekStartsOn={5}
        minDate={new Date('2016-01')}
        maxDate={addMonths(new Date('2016-01'), 12)}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "dateModifiers" attribute', () => {
    const modifiers = {
      someClass: () => true,
    };
    const { asFragment } = render(
      <BpkCalendarScrollGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarScrollDate}
        weekStartsOn={1}
        dateModifiers={modifiers}
        minDate={new Date('2016-01')}
        maxDate={addMonths(new Date('2016-01'), 12)}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom date component', () => {
    const MyCustomDate = (props: any) => {
      const cx = {
        backgroundColor: (colorPanjin as string),
        width: '50%',
        height: '50%',
        borderRadius: '5rem',
        margin: '25%',
      };
      if (isWeekend(props.date)) {
        cx.backgroundColor = 'rgb(0, 215, 117)';
      }
      return <div style={cx} />;
    };
    MyCustomDate.propTypes = {
      date: PropTypes.instanceOf(Date).isRequired,
    };
    const { asFragment } = render(
      <BpkCalendarScrollGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={MyCustomDate}
        weekStartsOn={1}
        minDate={new Date('2016-01')}
        maxDate={addMonths(new Date('2016-01'), 12)}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call the onDateClick callback', async () => {
    const onDateClick = jest.fn();

    render(
      <BpkCalendarScrollGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarScrollDate}
        weekStartsOn={0}
        onDateClick={onDateClick}
        minDate={new Date('2016-01')}
        maxDate={addMonths(new Date('2016-01'), 12)}
      />,
    );

    expect(onDateClick.mock.calls.length).toBe(0);

    const date1 = screen.getByRole('button', { name: /11th October/i });
    await userEvent.click(date1);

    expect(onDateClick.mock.calls.length).toBe(1);
    expect(onDateClick.mock.calls[0][0]).toEqual(new Date(2016, 9, 11));

    const date2 = screen.getByRole('button', { name: /12th October/i });
    await userEvent.click(date2);

    expect(onDateClick.mock.calls.length).toBe(2);
    expect(onDateClick.mock.calls[1][0]).toEqual(new Date(2016, 9, 12));
  });
});
