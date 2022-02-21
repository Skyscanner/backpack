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
import React from 'react';
import { action } from 'bpk-storybook-utils';
import addMonths from 'date-fns/addMonths';
import BpkText from 'bpk-component-text';
import startOfDay from 'date-fns/startOfDay';
import parseDate from 'date-fns/parse';

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
import CalendarContainer, { MonthViewCalendar } from './examples-components';
import ColoredCalendar from './coloured-calendar-example';
import Week from './src/Week';
import { CALENDAR_SELECTION_TYPE } from './src/custom-proptypes';

import {
  BpkCalendarGrid,
  BpkCalendarGridHeader,
  BpkCalendarNav,
  BpkCalendarDate,
} from './index';

const CalendarNavExample = () => (
  <BpkCalendarNav
    month={new Date()}
    changeMonthLabel="Change month"
    previousMonthLabel="Go to previous month"
    nextMonthLabel="Go to next month"
    onMonthChange={action('Changed month')}
    minDate={new Date()}
    maxDate={addMonths(new Date(), 12)}
    formatMonth={formatMonth}
    id="myCalendarNav"
  />
);

const CalendarGridHeaderExample = () => (
  <BpkCalendarGridHeader weekStartsOn={1} daysOfWeek={weekDays} />
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
    previousMonthLabel="Go to previous month"
    nextMonthLabel="Go to next month"
    selectionConfiguration={{
      type: CALENDAR_SELECTION_TYPE.single,
      date: new Date(),
    }}
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
    previousMonthLabel="Go to previous month"
    nextMonthLabel="Go to next month"
    minDate={new Date(2011, 1, 1)}
    selectTodaysDate={false}
    initiallyFocusedDate={new Date()}
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
    previousMonthLabel="Go to previous month"
    nextMonthLabel="Go to next month"
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
    previousMonthLabel="Go to previous month"
    nextMonthLabel="Go to next month"
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
    previousMonthLabel="Go to previous month"
    nextMonthLabel="Go to next month"
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
    previousMonthLabel="Go to previous month"
    nextMonthLabel="Go to next month"
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
    previousMonthLabel="Go to previous month"
    nextMonthLabel="Go to next month"
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
    previousMonthLabel="Go to previous month"
    nextMonthLabel="Go to next month"
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
    previousMonthLabel="Go to previous month"
    nextMonthLabel="Go to next month"
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
    onDateSelect={(date) => {
      // TODO we shouldn't do this but as it's only for demo purposes and works I guess it's fine
      // eslint-disable-next-line react/no-this-in-sfc
      this.setState({ date });
      action('Selected day')(date);
    }}
  />
);

const WeekExample = () => {
  // eslint-disable-next-line react/prop-types
  const DummyDateComponent = ({ date }) => <div>{date.toString()}</div>;

  const weekProps = {
    ...Week.defaultProps,
    DateComponent: DummyDateComponent,
    dateModifiers: {},
    dates: [
      new Date(1980, 5, 10),
      new Date(1980, 5, 11),
      new Date(1980, 5, 12),
      new Date(1980, 5, 13),
      new Date(1980, 5, 14),
      new Date(1980, 5, 15),
      new Date(1980, 5, 16),
    ].map(startOfDay),
    daysOfWeek: weekDays,
    formatDateFull: (d) => d.toString(),
    preventKeyboardFocus: false,
    markToday: true,
    markOutsideDays: true,
    isKeyboardFocusable: true,
    month: new Date(1980, 5, 1),
    weekStartsOn: 0,
  };

  return (
    <div>
      <p>
        This is an internal-only component, it&apos;s not exported to consumers.
      </p>
      <table>
        <tbody>
          <Week
            {...weekProps}
            selectionStart={parseDate(`19800611`, 'yyyyMMdd', new Date())}
            selectionEnd={parseDate(`19800616`, 'yyyyMMdd', new Date())}
          />
          <Week
            {...weekProps}
            selectionStart={parseDate(`19800601`, 'yyyyMMdd', new Date())}
            selectionEnd={parseDate(`19800607`, 'yyyyMMdd', new Date())}
          />
        </tbody>
      </table>
    </div>
  );
};

const FocusedDateInThePastExample = () => (
  <CalendarContainer
    minDate={new Date(2020, 3, 1)}
    selectTodaysDate={false}
    initiallyFocusedDate={new Date(2020, 3, 19)}
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={1}
    changeMonthLabel="Change month"
    previousMonthLabel="Go to previous month"
    nextMonthLabel="Go to next month"
  />
);

const RangeDateCalendar = () => (
  <CalendarContainer
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={1}
    changeMonthLabel="Change month"
    previousMonthLabel="Go to previous month"
    nextMonthLabel="Go to next month"
    selectionConfiguration={{
      type: 'range',
      startDate: new Date(2022, 9, 6),
      endDate: new Date(2022, 9, 15),
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
  WeekExample,
  FocusedDateInThePastExample,
  RangeDateCalendar,
};
