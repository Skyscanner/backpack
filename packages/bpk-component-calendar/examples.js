/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import { action } from 'bpk-storybook-utils';
import addMonths from 'date-fns/add_months';
import BpkText from 'bpk-component-text';

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
import MonthViewCalendar from './examples-components';
import ColoredCalendar from './coloured-calendar-example';

import BpkCalendar, {
  // BpkCalendarView,
  BpkCalendarGrid,
  BpkCalendarGridHeader,
  BpkCalendarNav,
  BpkCalendarDate,
} from './index';

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
      <BpkCalendar
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

const CalendarNavExample = () => (
  <BpkCalendarNav
    month={new Date()}
    changeMonthLabel="Change month"
    onMonthChange={action('Changed month')}
    minDate={new Date()}
    maxDate={addMonths(new Date(), 12)}
    formatMonth={formatMonth}
    id="myCalendarNav"
  />
);

const CalendarGridHeaderExample = () => (
  <BpkCalendarGridHeader
    weekStartsOn={1}
    daysOfWeek={weekDays}
    showWeekendSeparator
  />
);

const CalendarGridExample = () => (
  <BpkCalendarGrid
    month={new Date()}
    weekStartsOn={1}
    daysOfWeek={weekDays}
    onDateClick={action('Clicked day')}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    DateComponent={BpkCalendarDate}
    showWeekendSeparator
    preventKeyboardFocus
  />
);

const CalendarGridAndHeaderExample = () => (
  <div>
    <CalendarGridHeaderExample />
    <CalendarGridExample />
  </div>
);

const DefaultExample = () => (
  <CalendarContainer
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={1}
    changeMonthLabel="Change month"
  />
);

const MinDateInThePastExample = () => (
  <CalendarContainer
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={1}
    changeMonthLabel="Change month"
    minDate={new Date(2011, 1, 1)}
    selectTodaysDate={false}
    initiallyFocusedDate={new Date()}
  />
);

const NoWeekendSeparatorExample = () => (
  <CalendarContainer
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={1}
    changeMonthLabel="Change month"
    showWeekendSeparator={false}
  />
);

const WeekStartsOnSundayExample = () => (
  <CalendarContainer
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={0}
    changeMonthLabel="Change month"
  />
);

const HonestWeekendExample = () => (
  <CalendarContainer
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDaysMoreWeekend}
    weekStartsOn={1}
    changeMonthLabel="Change month"
  />
);

const WeekdayKeyIsNameNarrow = () => (
  <CalendarContainer
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={0}
    changeMonthLabel="Change month"
    weekDayKey="nameNarrow"
  />
);

const ArabicExample = () => (
  <CalendarContainer
    id="myCalendar"
    formatMonth={formatMonthArabic}
    formatDateFull={formatDateFullArabic}
    daysOfWeek={weekDaysArabic}
    weekStartsOn={6}
    changeMonthLabel="Change month"
  />
);

const JapaneseExample = () => (
  <CalendarContainer
    id="myCalendar"
    formatMonth={formatMonthJapanese}
    formatDateFull={formatDateFullJapanese}
    daysOfWeek={weekDaysJapanese}
    weekStartsOn={0}
    changeMonthLabel="Change month"
  />
);

const MinAndMaxDate = () => (
  <CalendarContainer
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={1}
    changeMonthLabel="Change month"
    minDate={new Date(2020, 4, 15)}
    maxDate={new Date(2020, 5, 15)}
  />
);

const MarkTodayFalseExample = () => (
  <CalendarContainer
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={1}
    changeMonthLabel="Change month"
    markToday={false}
  />
);

const MarkOutsideDaysFalseExample = () => (
  <CalendarContainer
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={1}
    changeMonthLabel="Change month"
    markOutsideDays={false}
  />
);

const CustomComposedCalendarSafariBug = () => (
  <div>
    <p>
      <BpkText>Set your timezone to BRT (Brasilia)</BpkText>
    </p>
    <p>
      <BpkText>Departure date should be Nov 3 and return Nov 4</BpkText>
    </p>
    <MonthViewCalendar
      minDate={new Date(2018, 10, 1)}
      maxDate={new Date(2018, 10, 20)}
      departureDate={new Date(2018, 10, 3)}
      returnDate={new Date(2018, 10, 4, 1, 0, 0, 0)}
      weekStartsOn={0}
    />
  </div>
);

const CustomComposedCalendar = () => <MonthViewCalendar weekStartsOn={1} />;

const CustomColors = () => (
  <ColoredCalendar
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    month={new Date()}
    weekStartsOn={1}
    showWeekendSeparator
    onDateSelect={date => {
      // TODO we shouldn't do this but as it's only for demo purposes and works I guess it's fine
      // eslint-disable-next-line react/no-this-in-sfc
      this.setState({ date });
      action('Selected day')(date);
    }}
  />
);

export {
  DefaultExample,
  CalendarNavExample,
  CalendarGridHeaderExample,
  CalendarGridExample,
  CalendarGridAndHeaderExample,
  MinDateInThePastExample,
  NoWeekendSeparatorExample,
  WeekStartsOnSundayExample,
  HonestWeekendExample,
  WeekdayKeyIsNameNarrow,
  ArabicExample,
  JapaneseExample,
  MinAndMaxDate,
  MarkTodayFalseExample,
  MarkOutsideDaysFalseExample,
  CustomComposedCalendar,
  CustomComposedCalendarSafariBug,
  CustomColors,
};
