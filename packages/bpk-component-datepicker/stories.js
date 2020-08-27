/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

/* @flow strict */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { memoize } from 'lodash';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  colorSagano,
  colorBagan,
  colorPetra,
  colorSkyGray,
} from 'bpk-tokens/tokens/base.es6';
import {
  weekDays,
  formatMonth,
  formatDateFull,
} from 'bpk-component-calendar/test-utils';
import {
  format,
  dateToBoundaries,
  addMonths,
  addDays,
  startOfDay,
} from 'bpk-component-calendar/src/date-utils';
import {
  BpkCalendarNav,
  BpkCalendarGridHeader,
  BpkCalendarGridWithTransition,
  BpkCalendarDate,
  withCalendarState,
  composeCalendar,
} from 'bpk-component-calendar';

import BpkDatepicker, { type DatePickerProps } from './index';

const formatDate = date => format(date, 'DD/MM/YYYY');

const inputProps = {
  onChange: () => null,
  placeholder: 'placeholder',
  large: true,
  docked: true,
};

const inputPropsWithEventHandlers = {
  onClick: action('input onClick'),
  onFocus: action('input onFocus'),
  onBlur: action('input onBlur'),
  onTouchEnd: action('input onTouchEnd'),
  onKeyDown: action('input onKeyDown'),
  onKeyUp: action('input onKeyUp'),
  onChange: () => null,
  placeholder: 'placeholder',
  large: true,
};

type ContainerState = {
  date: ?Date,
};

class CalendarContainer extends Component<DatePickerProps, ContainerState> {
  static defaultProps = {
    date: null,
  };

  constructor(props: DatePickerProps) {
    super(props);

    this.state = {
      date: props.date,
    };
  }

  render() {
    return (
      <div id="datepicker-element">
        <div id="application-element">
          <BpkDatepicker
            {...this.props}
            date={this.state.date}
            onDateSelect={date => {
              this.setState({ date });
              action('Selected date')(date);
            }}
            onMonthChange={action('Changed month')}
            getApplicationElement={() =>
              document.getElementById('application-element')
            }
            renderTarget={() => document.getElementById('datepicker-element')}
          />
        </div>
      </div>
    );
  }
}

CalendarContainer.propTypes = {
  date: PropTypes.instanceOf(Date),
};

const getBackgroundForDate = memoize(
  () => [colorSagano, colorBagan, colorPetra][parseInt(Math.random() * 3, 10)],
);

const ColoredCalendarDate = props => {
  let style = {};

  if (!props.isFocused && !props.isOutside && !props.isBlocked) {
    style = {
      backgroundColor: getBackgroundForDate(props.date.getTime()), // stylelint-disable
      color: colorSkyGray,
    };
  }

  return <BpkCalendarDate {...props} style={style} />;
};

ColoredCalendarDate.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  isOutside: PropTypes.bool.isRequired,
  isBlocked: PropTypes.bool.isRequired,
  date: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

type ReturnDatepickerState = {
  departDate: Date,
  returnDate: Date,
};

class ReturnDatepicker extends Component<{}, ReturnDatepickerState> {
  minDate: Date;

  maxDate: Date;

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
      <div id="datepicker-element">
        <div style={{ display: 'flex' }} id="application-element">
          <BpkDatepicker
            id="depart"
            closeButtonText="Close"
            daysOfWeek={weekDays}
            weekStartsOn={1}
            changeMonthLabel="Change month"
            title="Departure date"
            getApplicationElement={() =>
              document.getElementById('application-element')
            }
            renderTarget={() => document.getElementById('datepicker-element')}
            formatDate={formatDate}
            formatMonth={formatMonth}
            formatDateFull={formatDateFull}
            inputProps={inputProps}
            date={this.state.departDate}
            onDateSelect={departDate => {
              this.setState(prevState => ({
                departDate,
                returnDate: dateToBoundaries(
                  prevState.returnDate,
                  departDate,
                  this.maxDate,
                ),
              }));
              action('Selected departure date')(departDate);
            }}
            onMonthChange={action('Changed month')}
          />
          <BpkDatepicker
            id="return"
            closeButtonText="Close"
            daysOfWeek={weekDays}
            weekStartsOn={1}
            changeMonthLabel="Change month"
            title="Return date"
            getApplicationElement={() =>
              document.getElementById('application-element')
            }
            renderTarget={() => document.getElementById('datepicker-element')}
            formatDate={formatDate}
            formatMonth={formatMonth}
            formatDateFull={formatDateFull}
            inputProps={inputProps}
            date={this.state.returnDate}
            onDateSelect={returnDate => {
              this.setState(prevState => ({
                returnDate,
                departDate: dateToBoundaries(
                  prevState.departDate,
                  this.minDate,
                  returnDate,
                ),
              }));
              action('Selected return date')(returnDate);
            }}
            onMonthChange={action('Changed month')}
          />
        </div>
      </div>
    );
  }
}

storiesOf('bpk-component-datepicker', module)
  .add('Default', () => (
    <div id="application-element">
      <CalendarContainer
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        title="Departure date"
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        date={new Date()}
      />
    </div>
  ))
  .add('Open on first render', () => (
    <div id="application-element">
      <CalendarContainer
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        title="Departure date"
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        date={new Date()}
        isOpen
      />
    </div>
  ))
  .add('Min date in the past', () => (
    <div id="application-element">
      <CalendarContainer
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        title="Departure date"
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        minDate={new Date(2011, 1, 2)}
        initiallyFocusedDate={new Date()}
      />
    </div>
  ))
  .add('Without date set', () => (
    <div id="application-element">
      <CalendarContainer
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        title="Departure date"
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
      />
    </div>
  ))
  .add('Passing through props to underlying input', () => (
    <div id="application-element">
      <CalendarContainer
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        title="Departure date"
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputPropsWithEventHandlers}
      />
    </div>
  ))
  .add('Depart & Return', () => <ReturnDatepicker />)
  .add('Custon calendar component', () => {
    const CalendarWithColoredDates = withCalendarState(
      composeCalendar(
        BpkCalendarNav,
        BpkCalendarGridHeader,
        BpkCalendarGridWithTransition,
        ColoredCalendarDate,
      ),
    );

    return (
      <div id="application-element">
        <CalendarContainer
          id="myDatepicker"
          closeButtonText="Close"
          daysOfWeek={weekDays}
          weekStartsOn={1}
          changeMonthLabel="Change month"
          title="Departure date"
          formatDate={formatDate}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          calendarComponent={CalendarWithColoredDates}
        />
      </div>
    );
  })
  .add('Invalid', () => (
    <div id="application-element">
      <CalendarContainer
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        title="Departure date"
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        date={new Date()}
        valid={false}
      />
    </div>
  ));
