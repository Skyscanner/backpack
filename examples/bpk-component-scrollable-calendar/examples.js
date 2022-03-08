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
import React, { Component } from 'react';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';

import { action } from '../../packages/bpk-storybook-utils';
import {
  DateUtils,
  CustomPropTypes,
  CALENDAR_SELECTION_TYPE,
} from '../../packages/bpk-component-calendar';
import BpkScrollableCalendar, {
  BpkScrollableCalendarDate,
  BpkScrollableCalendarGrid,
  BpkScrollableCalendarGridList,
} from '../../packages/bpk-component-scrollable-calendar';

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

export default class ScrollableCal extends Component {
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
      <BpkScrollableCalendar
        id="calendar"
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
      />
    );
  }
}
ScrollableCal.propTypes = {
  selectTodaysDate: PropTypes.bool,
  selectionConfiguration: CustomPropTypes.SelectionConfiguration,
};

ScrollableCal.defaultProps = {
  selectTodaysDate: true,
  selectionConfiguration: {
    type: CALENDAR_SELECTION_TYPE.single,
    date: new Date(),
  },
};

const DefaultExample = () => (
  <ScrollableCal
    weekStartsOn={1}
    daysOfWeek={weekDays}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    DateComponent={BpkScrollableCalendarDate}
    selectTodaysDate
    // Subtract one day from today's date to make today selectable by default
    minDate={DateUtils.addDays(new Date(), -1)}
    maxDate={DateUtils.addMonths(new Date(), 12)}
  />
);

const RangeExample = () => (
  <ScrollableCal
    weekStartsOn={1}
    daysOfWeek={weekDays}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    DateComponent={BpkScrollableCalendarDate}
    markToday={false}
    selectTodaysDate={false}
    minDate={new Date(2020, 3, 1)}
    maxDate={new Date(2020, 6, 1)}
    selectionConfiguration={{
      type: 'range',
      startDate: new Date(2020, 5, 7),
      endDate: new Date(2020, 5, 15),
    }}
  />
);

const SplitWeekRangeExample = () => (
  <ScrollableCal
    DateComponent={BpkScrollableCalendarDate}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={0}
    selectTodaysDate={false}
    minDate={new Date(2020, 3, 1)}
    maxDate={new Date(2020, 6, 1)}
    selectionConfiguration={{
      type: 'range',
      startDate: new Date(2020, 3, 29),
      endDate: new Date(2020, 4, 4),
    }}
  />
);

const WeekStartsOnSix = () => (
  <ScrollableCal
    weekStartsOn={6}
    daysOfWeek={weekDays}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    DateComponent={BpkScrollableCalendarDate}
    selectTodaysDate
    // Subtract one day from today's date to make today selectable by default
    minDate={DateUtils.addDays(new Date(), -1)}
    maxDate={DateUtils.addMonths(new Date(), 12)}
  />
);

const WithFocusedDate = () => (
  <ScrollableCal
    weekStartsOn={1}
    daysOfWeek={weekDays}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    DateComponent={BpkScrollableCalendarDate}
    selectTodaysDate
    // Subtract one day from today's date to make today selectable by default
    minDate={DateUtils.addDays(new Date(), -1)}
    focusedDate={DateUtils.addMonths(new Date(), 11)}
    maxDate={DateUtils.addMonths(new Date(), 12)}
  />
);

const TallContainer = () => (
  <div style={{ height: '500px', display: 'flex' }}>
    <ScrollableCal
      weekStartsOn={1}
      daysOfWeek={weekDays}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      DateComponent={BpkScrollableCalendarDate}
      selectTodaysDate
      // Subtract one day from today's date to make today selectable by default
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  </div>
);

const SingleMonth = () => (
  <div style={{ height: '500px', display: 'flex' }}>
    <ScrollableCal
      weekStartsOn={1}
      daysOfWeek={weekDays}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      DateComponent={BpkScrollableCalendarDate}
      selectTodaysDate
      // Subtract one day from today's date to make today selectable by default
      minDate={startOfMonth(new Date())}
      maxDate={endOfMonth(new Date())}
    />
  </div>
);

const ScrollableCalendarDate = () => (
  <BpkScrollableCalendarDate
    date={new Date()}
    onDateClick={action('Clicked day')}
  />
);

const ScrollableCalendarGrid = () => (
  <BpkScrollableCalendarGrid
    month={new Date(2019, 1, 0)}
    weekStartsOn={1}
    daysOfWeek={weekDays}
    onDateClick={action('Clicked day')}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    DateComponent={BpkScrollableCalendarDate}
  />
);

const ScrollableCalendarGridList = () => (
  <BpkScrollableCalendarGridList
    month={new Date()}
    weekStartsOn={1}
    daysOfWeek={weekDays}
    onDateClick={action('Clicked day')}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    DateComponent={BpkScrollableCalendarDate}
    selectTodaysDate
    minDate={DateUtils.addDays(new Date(), -1)}
    maxDate={DateUtils.addMonths(new Date(), 12)}
  />
);

const WeekStartsOnSunday = () => (
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
);

const HonestWeekend = () => (
  <ScrollableCal
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDaysMoreWeekend}
    weekStartsOn={1}
    selectTodaysDate
    minDate={DateUtils.addDays(new Date(), -1)}
    maxDate={DateUtils.addMonths(new Date(), 12)}
  />
);

const ArabicLocale = () => (
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
);

const JapaneseLocale = () => (
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
);

const DifferentMinMaxDates = () => (
  <ScrollableCal
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={1}
    selectTodaysDate
    minDate={new Date(2020, 4, 15)}
    maxDate={new Date(2020, 5, 15)}
  />
);

const DontMarkToday = () => (
  <ScrollableCal
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={1}
    markToday={false}
    selectTodaysDate
    minDate={DateUtils.addDays(new Date(), -1)}
    maxDate={DateUtils.addMonths(new Date(), 12)}
  />
);

const PastCalendar = () => (
  <ScrollableCal
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={1}
    markToday={false}
    selectTodaysDate={false}
    minDate={new Date(2020, 3, 1)}
    maxDate={new Date(2020, 6, 1)}
  />
);

export {
  DefaultExample,
  RangeExample,
  SplitWeekRangeExample,
  WeekStartsOnSix,
  WithFocusedDate,
  TallContainer,
  SingleMonth,
  WeekStartsOnSunday,
  HonestWeekend,
  ArabicLocale,
  JapaneseLocale,
  DifferentMinMaxDates,
  DontMarkToday,
  ScrollableCalendarDate,
  ScrollableCalendarGrid,
  ScrollableCalendarGridList,
  PastCalendar,
};
