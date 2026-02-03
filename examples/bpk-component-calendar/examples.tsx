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
// @ts-nocheck


import { addMonths } from 'date-fns/addMonths';
import { startOfDay } from 'date-fns/startOfDay';

import {
  BpkCalendarGrid,
  BpkCalendarGridHeader,
  BpkCalendarNav,
  BpkCalendarDate,
} from '../../packages/bpk-component-calendar';
import BpkCalendarWeek from '../../packages/bpk-component-calendar/src/BpkCalendarWeek';
import { CALENDAR_SELECTION_TYPE } from '../../packages/bpk-component-calendar/src/custom-proptypes';
import BpkText from '../../packages/bpk-component-text';
import { action } from '../bpk-storybook-utils';

import CalendarContainer, { MonthViewCalendar } from './examples-components';
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

const DummyDateComponent = ({ date }) => <div>{date.toString()}</div>;

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
    onDateClick={action('Clicked day')}
    formatDateFull={formatDateFull}
    formatMonth={formatMonth}
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

const WeekdayKeyIsNameNarrowExample = () => (
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

const MinAndMaxDateExample = () => (
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

const CustomComposedCalendarSafariBugExample = () => (
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

const CustomComposedCalendarExample = () => (
  <MonthViewCalendar weekStartsOn={1} />
);

const WeekExample = () => {
  const weekProps = {
    ...BpkCalendarWeek.defaultProps,
    DateComponent: DummyDateComponent,
    dateModifiers: {},
    dates: [
      {
        val: startOfDay(new Date(1980, 5, 10)),
        customLabel: 'Saturday, 10 May 1980',
        isoLabel: '1980-05-10',
      },
      {
        val: startOfDay(new Date(1980, 5, 11)),
        customLabel: 'Sunday, 11 May 1980',
        isoLabel: '1980-05-11',
      },
      {
        val: startOfDay(new Date(1980, 5, 12)),
        customLabel: 'Monday, 12 May 1980',
        isoLabel: '1980-05-12',
      },
      {
        val: startOfDay(new Date(1980, 5, 13)),
        customLabel: 'Tuesday, 13 May 1980',
        isoLabel: '1980-05-13',
      },
      {
        val: startOfDay(new Date(1980, 5, 14)),
        customLabel: 'Wednesday, 14 May 1980',
        isoLabel: '1980-05-14',
      },
      {
        val: startOfDay(new Date(1980, 5, 15)),
        customLabel: 'Thursday, 15 May 1980',
        isoLabel: '1980-05-15',
      },
      {
        val: startOfDay(new Date(1980, 5, 16)),
        customLabel: 'Friday, 16 May 1980',
        isoLabel: '1980-05-16',
      },
    ],
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
          <BpkCalendarWeek {...weekProps} />
          <BpkCalendarWeek {...weekProps} />
        </tbody>
      </table>
    </div>
  );
};

const FocusedDateInThePastExample = () => (
  <CalendarContainer
    minDate={new Date(2020, 3, 1)}
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

const RangeDateCalendarExample = () => (
  <CalendarContainer
    minDate={new Date(2020, 3, 1)}
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
      startDate: new Date(2020, 3, 19),
      endDate: new Date(2020, 3, 25),
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
  WeekdayKeyIsNameNarrowExample,
  ArabicExample,
  JapaneseExample,
  MinAndMaxDateExample,
  MarkTodayFalseExample,
  MarkOutsideDaysFalseExample,
  CustomComposedCalendarExample,
  CustomComposedCalendarSafariBugExample,
  WeekExample,
  FocusedDateInThePastExample,
  RangeDateCalendarExample,
};
