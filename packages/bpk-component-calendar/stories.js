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

import { storiesOf } from '@storybook/react';

import {
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
  WeekExample,
  FocusedDateInThePastExample,
} from './examples';

storiesOf('bpk-component-calendar', module)
  .add('BpkCalendarNav', CalendarNavExample)
  .add('BpkCalendarGridHeader', CalendarGridHeaderExample)
  .add('BpkCalendarGrid', CalendarGridExample)
  .add('BpkCalendarGridHeader + BpkCalendarGrid', CalendarGridAndHeaderExample)
  .add('Calendar - default', DefaultExample)
  .add(
    'Calendar - min date in the past, focusing today',
    MinDateInThePastExample,
  )
  .add("Calendar - Don't show weekend separator", NoWeekendSeparatorExample)
  .add('Calendar - Week starts on a Sunday', WeekStartsOnSundayExample)
  .add('Calendar - Honest weekend', HonestWeekendExample)
  .add('Calendar - weekDayKey is nameNarrow', WeekdayKeyIsNameNarrow)
  .add('Calendar - ar-AE locale', ArabicExample)
  .add('Calendar - ja-JP locale', JapaneseExample)
  .add('Calendar - Specify min/max date', MinAndMaxDate)
  .add("Calendar - Don't mark today", MarkTodayFalseExample)
  .add("Calendar - Don't mark outside days", MarkOutsideDaysFalseExample)
  .add('Custom composed calendar', CustomComposedCalendar)
  .add(
    'Custom composed calendar (Safari DST bug)',
    CustomComposedCalendarSafariBug,
  )
  .add('Custom colours', CustomColors)
  .add('Week', WeekExample)
  .add('Visual test', FocusedDateInThePastExample);
