/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
import PropTypes from 'prop-types';
import BpkButton from 'bpk-component-button';
import addMonths from 'date-fns/add_months';
import {
  colorWhite,
  colorRed500,
  colorGray100,
  colorGray300,
  colorGreen500,
} from 'bpk-tokens/tokens/base.es6';

import { withButtonAlignment, withRtlSupport } from '../bpk-component-icon';
import SmallLongArrowRightIcon from '../bpk-component-icon/sm/long-arrow-right';
import SmallLongArrowLeftIcon from '../bpk-component-icon/sm/long-arrow-left';

import { dateToBoundaries, startOfDay, addDays } from './src/date-utils';
import { formatMonth, formatDateFull, weekDays } from './test-utils';

import {
  BpkCalendarGrid,
  BpkCalendarGridHeader,
  withCalendarState,
  composeCalendar,
} from './index';

const LeftIcon = withButtonAlignment(withRtlSupport(SmallLongArrowLeftIcon));
const RightIcon = withButtonAlignment(withRtlSupport(SmallLongArrowRightIcon));
const withDirection = (Nav, direction) => props => (
  <Nav {...props} direction={direction} />
);
const withPrices = (DateComponent, prices) => props => (
  <DateComponent {...props} prices={prices} />
);

const prices = [
  125,
  56,
  75,
  57,
  78,
  92,
  133,
  90,
  148,
  80,
  122,
  67,
  70,
  123,
  77,
  66,
  64,
  56,
  105,
  138,
  52,
  70,
  106,
  139,
  88,
  97,
  73,
  114,
  119,
  141,
  118,
];

const MyCalendarNav = ({ month, onMonthChange, direction }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <strong>{direction}</strong>
    <div>
      <BpkButton
        iconOnly
        onClick={event =>
          onMonthChange(event, { month: addMonths(month, -1), source: 'PREV' })
        }
      >
        <LeftIcon fill={colorWhite} />
      </BpkButton>
      &nbsp;
      <BpkButton
        iconOnly
        onClick={event =>
          onMonthChange(event, { month: addMonths(month, 1), source: 'NEXT' })
        }
      >
        <RightIcon fill={colorWhite} />
      </BpkButton>
    </div>
  </div>
);

const MyCalendarDate = props => {
  const cx = {
    textAlign: 'center',
    fontSize: '0.8em',
    color: props.isOutside || props.isBlocked ? colorGray100 : 'inherit',
    backgroundColor: props.isSelected ? colorGray300 : 'inherit',
  };
  const priceCx = {
    color: colorRed500,
  };
  const day = props.date.getDate();
  const price = props.prices[day - 1];
  if (price < 100) {
    priceCx.color = colorGreen500;
  }
  return (
    <div style={cx}>
      <div>{day}</div>
      {props.isOutside || props.isBlocked ? null : (
        <div style={priceCx}>£{price}</div>
      )}
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
  constructor(props) {
    super(props);
    this.state = {
      departDate: props.departureDate,
      returnDate: props.returnDate,
    };
  }

  render() {
    const { maxDate, minDate, ...rest } = this.props;
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
          onDateSelect={departDate => {
            this.setState(prevState => ({
              departDate,
              returnDate: dateToBoundaries(
                prevState.returnDate,
                departDate,
                maxDate,
              ),
            }));
          }}
          {...rest}
        />
        <div
          style={{
            flexShrink: 1,
            margin: '0 2rem',
            borderRight: `1px solid ${colorGray100}`,
          }}
        />
        <MyReturnCalendar
          id="myCalendar"
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          daysOfWeek={weekDays}
          changeMonthLabel="Change month"
          date={this.state.returnDate}
          fixedWidth={false}
          onDateSelect={returnDate => {
            this.setState(prevState => ({
              returnDate,
              departDate: dateToBoundaries(
                prevState.departDate,
                minDate,
                returnDate,
              ),
            }));
          }}
          {...rest}
        />
      </div>
    );
  }
}

MonthViewCalendar.propTypes = {
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  departureDate: PropTypes.instanceOf(Date),
  returnDate: PropTypes.instanceOf(Date),
  weekStartsOn: PropTypes.number.isRequired,
};

MonthViewCalendar.defaultProps = {
  minDate: startOfDay(new Date()),
  maxDate: startOfDay(addMonths(new Date(), 12)),
  departureDate: startOfDay(addDays(new Date(), 1)),
  returnDate: startOfDay(addDays(new Date(), 4)),
};

export default MonthViewCalendar;
