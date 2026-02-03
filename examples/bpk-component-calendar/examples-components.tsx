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
import { Component } from 'react';

import { addMonths } from 'date-fns/addMonths';

import {
  colorWhite,
  colorPanjin,
  colorSkyGrayTint06,
  colorSkyGrayTint04,
  colorMonteverde,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkButton from '../../packages/bpk-component-button';
import BpkCalendar, {
  BpkCalendarGrid,
  BpkCalendarGridHeader,
  withCalendarState,
  composeCalendar,
  CustomPropTypes,
  CALENDAR_SELECTION_TYPE,
} from '../../packages/bpk-component-calendar';
import {
  dateToBoundaries,
  startOfDay,
  addDays,
} from '../../packages/bpk-component-calendar/src/date-utils';
import {
  withButtonAlignment,
  withRtlSupport,
} from '../../packages/bpk-component-icon';
import SmallLongArrowLeftIcon from '../../packages/bpk-component-icon/sm/long-arrow-left';
import SmallLongArrowRightIcon from '../../packages/bpk-component-icon/sm/long-arrow-right';
import { action } from '../bpk-storybook-utils';

import { formatMonth, formatDateFull, weekDays } from './test-utils';

const LeftIcon = withButtonAlignment(withRtlSupport(SmallLongArrowLeftIcon));
const RightIcon = withButtonAlignment(withRtlSupport(SmallLongArrowRightIcon));
const withDirection = (Nav, direction) => (props) => (
  <Nav {...props} direction={direction} />
);
const withPrices = (DateComponent, prices) => (props) => (
  <DateComponent {...props} prices={prices} />
);

const prices = [
  125, 56, 75, 57, 78, 92, 133, 90, 148, 80, 122, 67, 70, 123, 77, 66, 64, 56,
  105, 138, 52, 70, 106, 139, 88, 97, 73, 114, 119, 141, 118,
];

const MyCalendarNav = ({ direction, month, onMonthChange }) => (
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
        onClick={(event) =>
          onMonthChange(event, { month: addMonths(month, -1), source: 'PREV' })
        }
      >
        <LeftIcon fill={colorWhite} />
      </BpkButton>
      &nbsp;
      <BpkButton
        iconOnly
        onClick={(event) =>
          onMonthChange(event, { month: addMonths(month, 1), source: 'NEXT' })
        }
      >
        <RightIcon fill={colorWhite} />
      </BpkButton>
    </div>
  </div>
);

const MyCalendarDate = (props) => {
  const cx = {
    textAlign: 'center',
    fontSize: '0.8em',
    color: props.isOutside || props.isBlocked ? colorSkyGrayTint06 : 'inherit',
    backgroundColor: props.isSelected ? colorSkyGrayTint04 : 'inherit',
  };
  const priceCx = {
    color: colorPanjin,
  };
  const day = props.date.getDate();
  const price = props.prices[day - 1];
  if (price < 100) {
    priceCx.color = colorMonteverde;
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
          previousMonthLabel="Go to previous month"
          nextMonthLabel="Go to next month"
          date={this.state.departDate}
          fixedWidth={false}
          onDateSelect={(departDate) => {
            this.setState((prevState) => ({
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
            borderRight: `1px solid ${colorSkyGrayTint06}`,
          }}
        />
        <MyReturnCalendar
          id="myCalendar"
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          daysOfWeek={weekDays}
          changeMonthLabel="Change month"
          previousMonthLabel="Go to previous month"
          nextMonthLabel="Go to next month"
          date={this.state.returnDate}
          fixedWidth={false}
          onDateSelect={(returnDate) => {
            this.setState((prevState) => ({
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

class CalendarContainer extends Component {
  constructor(props) {
    super(props);

    if (this.props.selectionConfiguration.type === 'range') {
      this.state = {
        selectionConfiguration: {
          type: this.props.selectionConfiguration.type,
          startDate: this.props.selectionConfiguration.startDate,
          endDate: this.props.selectionConfiguration.endDate,
        },
      };
    } else {
      this.state = {
        selectionConfiguration: {
          type: this.props.selectionConfiguration.type,
          date: this.props.selectionConfiguration.date,
        },
      };
    }
  }

  render() {
    return (
      <BpkCalendar
        {...this.props}
        onDateSelect={(startDate, endDate = null) => {
          if (this.props.selectionConfiguration.type === 'range') {
            if (startDate && !endDate) {
              this.setState({
                selectionConfiguration: {
                  type: this.props.selectionConfiguration.type,
                  startDate,
                  endDate: null,
                },
              });
              action('Selected day')(startDate);
            }
            if (startDate && endDate) {
              this.setState({
                selectionConfiguration: {
                  type: this.props.selectionConfiguration.type,
                  startDate,
                  endDate,
                },
              });
              action('Selected end day')(endDate);
            }
          } else {
            this.setState({
              selectionConfiguration: {
                type: this.props.selectionConfiguration.type,
                date: startDate,
              },
            });
            action('Selected day')(startDate);
          }
        }}
        selectionConfiguration={this.state.selectionConfiguration}
        onMonthChange={action('Changed month')}
      />
    );
  }
}

CalendarContainer.propTypes = {
  selectionConfiguration: CustomPropTypes.SelectionConfiguration,
};

CalendarContainer.defaultProps = {
  selectionConfiguration: {
    type: CALENDAR_SELECTION_TYPE.single,
    date: null,
  },
};

export default CalendarContainer;
export { MonthViewCalendar };
