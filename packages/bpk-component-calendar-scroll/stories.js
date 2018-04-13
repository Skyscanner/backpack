/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  formatMonth,
  formatDateFull,
  formatMonthArabic,
  formatDateFullArabic,
  formatMonthJapanese,
  formatDateFullJapanese,
  weekDaysMoreWeekend,
  weekDaysArabic,
  weekDaysJapanese,
  weekDays,
} from './test-utils';

import BpkCalendarScroll, {
  BpkCalendarScrollGrid,
  BpkCalendarScrollGridHeader,
  BpkCalendarScrollDate,
} from './index';

import MonthViewCalendar from './stories-components';

class CalendarContainer extends Component {
  constructor(props) {
    super(props);

    const date = this.props.selectTodaysDate ? new Date() : null;

    this.state = {
      date,
    };
  }
  render() {
    return (
      <BpkCalendarScroll
        {...this.props}
        selectedDate={this.state.date}
        onDateSelect={date => {
          this.setState({ date });
          action('Selected day')(date);
        }}
        onMonthChange={action('Changed month')}
      />
    );
  }
}

CalendarContainer.propTypes = {
  selectTodaysDate: PropTypes.bool,
};

CalendarContainer.defaultProps = {
  selectTodaysDate: true,
};

storiesOf('bpk-component-calendar-scroll', module)
  .add('BpkCalendarScrollGridHeader', () => (
    <BpkCalendarScrollGridHeader
      weekStartsOn={1}
      daysOfWeek={weekDays}
      showWeekendSeparator
    />
  ))
  .add('BpkCalendarScrollGrid', () => (
    <BpkCalendarScrollGrid
      month={new Date()}
      weekStartsOn={1}
      daysOfWeek={weekDays}
      onDateClick={action('Clicked day')}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      DateComponent={BpkCalendarScrollDate}
      showWeekendSeparator
      preventKeyboardFocus
    />
  ))
  .add('Calendar - default', () => (
    <CalendarContainer
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
    />
  ))
  .add('Calendar - min date in the past, focusing today', () => (
    <CalendarContainer
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      minDate={new Date(2011, 1, 1)}
      selectTodaysDate={false}
      initiallyFocusedDate={new Date()}
    />
  ))
  .add("Calendar - Don't show weekend separator", () => (
    <CalendarContainer
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      showWeekendSeparator={false}
    />
  ))
  .add('Calendar - Week starts on a Sunday', () => (
    <CalendarContainer
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      weekStartsOn={0}
    />
  ))
  .add('Calendar - Honest weekend', () => (
    <CalendarContainer
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDaysMoreWeekend}
      changeMonthLabel="Change month"
    />
  ))
  .add('Calendar - ar-AE locale', () => (
    <CalendarContainer
      id="myCalendar"
      formatMonth={formatMonthArabic}
      formatDateFull={formatDateFullArabic}
      daysOfWeek={weekDaysArabic}
      changeMonthLabel="Change month"
      weekStartsOn={6}
    />
  ))
  .add('Calendar - ja-JP locale', () => (
    <CalendarContainer
      id="myCalendar"
      formatMonth={formatMonthJapanese}
      formatDateFull={formatDateFullJapanese}
      daysOfWeek={weekDaysJapanese}
      changeMonthLabel="Change month"
      weekStartsOn={0}
    />
  ))
  .add('Calendar - Specify min/max date', () => (
    <CalendarContainer
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      minDate={new Date(2020, 4, 15)}
      maxDate={new Date(2020, 5, 15)}
    />
  ))
  .add("Calendar - Don't mark today", () => (
    <CalendarContainer
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      markToday={false}
    />
  ))
  .add("Calendar - Don't mark outside days", () => (
    <CalendarContainer
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      markOutsideDays={false}
    />
  ))
  .add('Custom composed calendar', () => <MonthViewCalendar />);
