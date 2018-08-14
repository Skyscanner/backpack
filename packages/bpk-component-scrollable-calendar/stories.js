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
import { DateUtils } from 'bpk-component-calendar';

import {
  formatDateFull,
  formatDateFullArabic,
  formatDateFullJapanese,
  formatMonth,
  formatMonthArabic,
  formatMonthJapanese,
  weekDays,
  weekDaysMoreWeekend,
  weekDaysArabic,
  weekDaysJapanese,
} from './test-utils';
import BpkScrollableCalendar, {
  BpkScrollableCalendarDate,
  BpkScrollableCalendarGrid,
  BpkScrollableCalendarGridList,
} from './index';

export default class ScrollableCal extends Component {
  constructor(props) {
    super(props);

    const selectedDate = this.props.selectTodaysDate ? new Date() : null;

    this.state = {
      selectedDate,
    };
  }

  handleDateSelect = date => {
    this.setState({
      selectedDate: date,
    });
  };

  render() {
    return (
      <BpkScrollableCalendar
        id="calendar"
        {...this.props}
        onDateSelect={selectedDate => {
          this.setState({ selectedDate });
          action('Selected day')(selectedDate);
        }}
        date={this.state.selectedDate}
      />
    );
  }
}
ScrollableCal.propTypes = {
  selectTodaysDate: PropTypes.bool,
};

ScrollableCal.defaultProps = {
  selectTodaysDate: true,
};

storiesOf('bpk-component-scrollable-calendar', module)
  .add('Scrollable Calendar - default', () => (
    <ScrollableCal
      weekStartsOn={1}
      daysOfWeek={weekDays}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      DateComponent={BpkScrollableCalendarDate}
      showWeekendSeparator
      selectTodaysDate
      // Subtract one day from today's date to make today selectable by default
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ))
  .add('BpkScrollableCalendarDate', () => (
    <BpkScrollableCalendarDate
      date={new Date()}
      onDateClick={action('Clicked day')}
    />
  ))
  .add('BpkScrollableCalendarGrid', () => (
    <BpkScrollableCalendarGrid
      month={new Date(2019, 1, 0)}
      weekStartsOn={1}
      daysOfWeek={weekDays}
      onDateClick={action('Clicked day')}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      DateComponent={BpkScrollableCalendarDate}
      showWeekendSeparator
    />
  ))
  .add('BpkScrollableCalendarGridList', () => (
    <BpkScrollableCalendarGridList
      month={new Date()}
      weekStartsOn={1}
      daysOfWeek={weekDays}
      onDateClick={action('Clicked day')}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      DateComponent={BpkScrollableCalendarDate}
      showWeekendSeparator
      selectTodaysDate
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ))
  .add("Scrollable Calendar - Don't show weekend separator", () => (
    <ScrollableCal
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      showWeekendSeparator={false}
      selectTodaysDate
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ))
  .add('Scrollable Calendar - Week starts on a Sunday', () => (
    <ScrollableCal
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      weekStartsOn={0}
      selectTodaysDate
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ))
  .add('Scrollable Calendar - Honest weekend', () => (
    <ScrollableCal
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDaysMoreWeekend}
      selectTodaysDate
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ))
  .add('Scrollable Calendar - ar-AE locale', () => (
    <ScrollableCal
      id="myCalendar"
      formatMonth={formatMonthArabic}
      formatDateFull={formatDateFullArabic}
      daysOfWeek={weekDaysArabic}
      weekStartsOn={6}
      selectTodaysDate
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ))
  .add('Scrollable Calendar - ja-JP locale', () => (
    <ScrollableCal
      id="myCalendar"
      formatMonth={formatMonthJapanese}
      formatDateFull={formatDateFullJapanese}
      daysOfWeek={weekDaysJapanese}
      weekStartsOn={0}
      selectTodaysDate
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ))
  .add('Scrollable Calendar - Different min/max date', () => (
    <ScrollableCal
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      selectTodaysDate
      minDate={new Date(2020, 4, 15)}
      maxDate={new Date(2020, 5, 15)}
    />
  ))
  .add("Scrollable Calendar - Don't mark today", () => (
    <ScrollableCal
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      markToday={false}
      selectTodaysDate
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ));
