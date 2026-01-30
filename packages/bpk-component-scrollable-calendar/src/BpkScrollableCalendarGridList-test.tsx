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

import { render } from '@testing-library/react';
import { isWeekend } from 'date-fns/isWeekend';

import { colorPanjin } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { formatDateFull, formatMonth } from '../test-utils';

import BpkCalendarScrollDate from './BpkScrollableCalendarDate';
import BpkScrollableCalendarGridList from './BpkScrollableCalendarGridList';

import { DateUtils } from '@backpack/bpk-component-calendar';

const testDate = new Date(2010, 1, 15);

describe('BpkCalendarScrollGridList', () => {
  it('should render correctly with no optional props set', () => {
    const { asFragment } = render(
      <BpkScrollableCalendarGridList
        minDate={DateUtils.addDays(testDate, -1)}
        maxDate={DateUtils.addMonths(testDate, 12)}
        month={testDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarScrollDate}
        weekStartsOn={0}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a different "weekStartsOn" attribute', () => {
    const { asFragment } = render(
      <BpkScrollableCalendarGridList
        minDate={DateUtils.addDays(testDate, -1)}
        maxDate={DateUtils.addMonths(testDate, 12)}
        month={testDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarScrollDate}
        weekStartsOn={3}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "dateModifiers" attribute', () => {
    const modifiers = {
      someClass: () => true,
    };
    const { asFragment } = render(
      <BpkScrollableCalendarGridList
        minDate={DateUtils.addDays(testDate, -1)}
        maxDate={DateUtils.addMonths(testDate, 12)}
        month={testDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarScrollDate}
        weekStartsOn={1}
        dateModifiers={modifiers}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom "customRowHeight" attribute', () => {
    const { asFragment } = render(
      <BpkScrollableCalendarGridList
        minDate={DateUtils.addDays(testDate, -1)}
        maxDate={DateUtils.addMonths(testDate, 12)}
        month={testDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarScrollDate}
        weekStartsOn={0}
        customRowHeight={3}
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
      <BpkScrollableCalendarGridList
        minDate={DateUtils.addDays(testDate, -1)}
        maxDate={DateUtils.addMonths(testDate, 12)}
        month={testDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={MyCustomDate}
        weekStartsOn={1}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
