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

import { storiesOf } from '@storybook/react';

import {
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
  WeekExample,
  FocusedDateInThePastExample,
  RangeDateCalendar,
} from './examples';

export default {
  title: 'bpk-component-calendar',
};

export const BpkCalendarNav = CalendarNavExample;

BpkCalendarNav.storyName = 'BpkCalendarNav';

export const BpkCalendarGridHeader = CalendarGridHeaderExample;

BpkCalendarGridHeader.storyName = 'BpkCalendarGridHeader';

export const BpkCalendarGrid = CalendarGridExample;

BpkCalendarGrid.storyName = 'BpkCalendarGrid';

export const BpkCalendarGridHeaderBpkCalendarGrid =
  CalendarGridAndHeaderExample;

BpkCalendarGridHeaderBpkCalendarGrid.storyName = 'BpkCalendarGridHeader + BpkCalendarGrid';

export const CalendarDefault = DefaultExample;

CalendarDefault.storyName = 'Calendar - default';

export const CalendarMinDateInThePastFocusingToday = MinDateInThePastExample;

CalendarMinDateInThePastFocusingToday.storyName = 'Calendar - min date in the past, focusing today';

export const CalendarWeekStartsOnASunday = WeekStartsOnSundayExample;

CalendarWeekStartsOnASunday.storyName = 'Calendar - Week starts on a Sunday';

export const CalendarHonestWeekend = HonestWeekendExample;

CalendarHonestWeekend.storyName = 'Calendar - Honest weekend';

export const CalendarWeekDayKeyIsNameNarrow = WeekdayKeyIsNameNarrow;

CalendarWeekDayKeyIsNameNarrow.storyName = 'Calendar - weekDayKey is nameNarrow';

export const CalendarArAeLocale = ArabicExample;

CalendarArAeLocale.storyName = 'Calendar - ar-AE locale';

export const CalendarJaJpLocale = JapaneseExample;

CalendarJaJpLocale.storyName = 'Calendar - ja-JP locale';

export const CalendarSpecifyMinMaxDate = MinAndMaxDate;

CalendarSpecifyMinMaxDate.storyName = 'Calendar - Specify min/max date';

export const CalendarDontMarkToday = MarkTodayFalseExample;

CalendarDontMarkToday.storyName = "Calendar - Don't mark today";

export const CalendarDontMarkOutsideDays = MarkOutsideDaysFalseExample;

CalendarDontMarkOutsideDays.storyName = "Calendar - Don't mark outside days";

export const _CustomComposedCalendar = CustomComposedCalendar;

_CustomComposedCalendar.storyName = 'Custom composed calendar';

export const CustomComposedCalendarSafariDstBug =
  CustomComposedCalendarSafariBug;

CustomComposedCalendarSafariDstBug.storyName = 'Custom composed calendar (Safari DST bug)';

export const Week = WeekExample;
export const VisualTest = FocusedDateInThePastExample;

VisualTest.storyName = 'Visual test';

export const VisualTestRange = RangeDateCalendar;

VisualTestRange.storyName = 'Visual test range';
