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

/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import addMonths from 'date-fns/add_months';
import { withButtonAlignment, withRtlSupport } from '../bpk-component-icon';
import SmallLongArrowRightIcon from '../bpk-component-icon/sm/long-arrow-right';
import SmallLongArrowLeftIcon from '../bpk-component-icon/sm/long-arrow-left';
import {
  dateToBoundaries,
  startOfDay,
  addDays,
} from './src/date-utils';
import {
  formatMonth,
  formatDateFull,
  weekDays,
} from './test-utils';
import {
  BpkCalendarGrid,
  BpkCalendarGridHeader,
  withCalendarState,
  composeCalendar,
} from './index';

const LeftIcon = withButtonAlignment(withRtlSupport(SmallLongArrowLeftIcon));
const RightIcon = withButtonAlignment(withRtlSupport(SmallLongArrowRightIcon));
const withDirection = (Nav, direction) => props => <Nav {...props} direction={direction} />;
const withPrices = (DateComponent, prices) => props => <DateComponent {...props} prices={prices} />;

const prices = [
  125, 56, 75, 57, 78,
  92, 133, 90, 148, 80,
  122, 67, 70, 123, 77,
  66, 64, 56, 105, 138,
  52, 70, 106, 139, 88,
  97, 73, 114, 119, 141,
  118,
];

const MyCalendarNav = ({
  month,
  onMonthChange,
  direction,
}) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <strong>{ direction }</strong>
    <div>
      <BpkButton
        iconOnly
        onClick={event => onMonthChange(event, { month: addMonths(month, -1), source: 'PREV' })}
      ><LeftIcon fill="white" /></BpkButton>&nbsp;
      <BpkButton
        iconOnly
        onClick={event => onMonthChange(event, { month: addMonths(month, 1), source: 'NEXT' })}
      ><RightIcon fill="white" /></BpkButton>
    </div>
  </div>
);

const MyCalendarDate = (props) => {
  const cx = {
    textAlign: 'center',
    fontSize: '0.8em',
    color: props.isOutside || props.isBlocked ? 'lightgrey' : 'inherit',
    backgroundColor: props.isSelected ? '#eee' : 'inherit',

  };
  const priceCx = {
    color: 'rgb(255, 84, 82)',
  };
  const day = props.date.getDate();
  const price = props.prices[day - 1];
  if (price < 100) { priceCx.color = 'rgb(0, 215, 117)'; }
  return (
    <div style={cx}>
      <div>{ day }</div>
      {
        props.isOutside || props.isBlocked
        ? null
        : <div style={priceCx}>£{ price }</div>
      }
    </div>
  );
};

const MyDepartCalendar = withCalendarState(
  composeCalendar(
    withDirection(MyCalendarNav, 'Depart'),
    BpkCalendarGridHeader,
    BpkCalendarGrid,
    withPrices(MyCalendarDate, prices),
  ),
);

const MyReturnCalendar = withCalendarState(
  composeCalendar(
    withDirection(MyCalendarNav, 'Return'),
    BpkCalendarGridHeader,
    BpkCalendarGrid,
    withPrices(MyCalendarDate, prices),
  ),
);

class MonthViewCalendar extends Component {
  constructor() {
    super();

    this.minDate = startOfDay(new Date());
    this.maxDate = startOfDay(addMonths(new Date(), 12));
    this.state = {
      departDate: startOfDay(addDays(new Date(), 1)),
      returnDate: startOfDay(addDays(new Date(), 4)),
    };
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <MyDepartCalendar
          id="myCalendar"
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          daysOfWeek={weekDays}
          changeMonthLabel="Change month"
          date={this.state.departDate}
          fixedWidth={false}
          onDateSelect={(departDate) => {
            this.setState({
              departDate,
              returnDate: dateToBoundaries(this.state.returnDate, departDate, this.maxDate),
            });
          }}
        />
        <div style={{ flexShrink: 1, margin: '0 2rem', borderRight: '1px solid #e6e4eb' }} />
        <MyReturnCalendar
          id="myCalendar"
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          daysOfWeek={weekDays}
          changeMonthLabel="Change month"
          date={this.state.returnDate}
          fixedWidth={false}
          onDateSelect={(returnDate) => {
            this.setState({
              returnDate,
              departDate: dateToBoundaries(this.state.departDate, this.minDate, returnDate),
            });
          }}
        />
      </div>
    );
  }
}


export default MonthViewCalendar;
