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
/* @flow */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  BpkCalendarGridHeader,
  composeCalendar,
  DateUtils,
} from 'bpk-component-calendar';

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

const BpkCalendar = composeCalendar(
  null,
  BpkCalendarGridHeader,
  BpkScrollableCalendarGridList,
  BpkScrollableCalendarDate,
);

storiesOf('bpk-component-scrollable-calendar', module)
  .add('Default', () => <BpkScrollableCalendar />)
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
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ))
  .add('Calendar - default', () => (
    <BpkCalendar
      month={new Date()}
      weekStartsOn={1}
      daysOfWeek={weekDays}
      onDateClick={action('Clicked day')}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      DateComponent={BpkScrollableCalendarDate}
      showWeekendSeparator
      // Subtract one day from today's date to make today selectable by default
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ))
  .add("Calendar - Don't show weekend separator", () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      showWeekendSeparator={false}
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ))
  .add('Calendar - Week starts on a Sunday', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      weekStartsOn={0}
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ))
  .add('Calendar - Honest weekend', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDaysMoreWeekend}
      changeMonthLabel="Change month"
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ))
  .add('Calendar - ar-AE locale', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonthArabic}
      formatDateFull={formatDateFullArabic}
      daysOfWeek={weekDaysArabic}
      changeMonthLabel="Change month"
      weekStartsOn={6}
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ))
  .add('Calendar - ja-JP locale', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonthJapanese}
      formatDateFull={formatDateFullJapanese}
      daysOfWeek={weekDaysJapanese}
      changeMonthLabel="Change month"
      weekStartsOn={0}
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ))
  .add('Calendar - Different min/max date', () => (
    <BpkCalendar
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
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      markToday={false}
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  ));
