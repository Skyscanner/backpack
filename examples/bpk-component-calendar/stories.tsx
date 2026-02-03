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


import BpkCalendarDateComponent from '../../packages/bpk-component-calendar/src/BpkCalendarDate';
import BpkCalendarGridComponent from '../../packages/bpk-component-calendar/src/BpkCalendarGrid';
import BpkCalendarGridHeaderComponent from '../../packages/bpk-component-calendar/src/BpkCalendarGridHeader';
import BpkCalendarNavComponent from '../../packages/bpk-component-calendar/src/BpkCalendarNav';

import {
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
} from './examples';
import { BpkCalendarContainerMock } from './stories-utils';

export default {
  title: 'bpk-component-calendar',
  component: BpkCalendarGridComponent,
  subcomponents: {
    BpkCalendarNav: BpkCalendarNavComponent,
    BpkCalendarGridHeader: BpkCalendarGridHeaderComponent,
    BpkCalendarDate: BpkCalendarDateComponent,
    BpkCalendarContainer: BpkCalendarContainerMock
  },
};

export const BpkCalendarNav = CalendarNavExample;

export const BpkCalendarGridHeader = CalendarGridHeaderExample;

export const BpkCalendarGrid = CalendarGridExample;

export const BpkCalendarGridHeaderBpkCalendarGrid =
  CalendarGridAndHeaderExample;

export const CalendarDefault = DefaultExample;

export const CalendarMinDateInThePastFocusingToday = MinDateInThePastExample;

export const CalendarWeekStartsOnASunday = WeekStartsOnSundayExample;

export const CalendarHonestWeekend = HonestWeekendExample;

export const CalendarWeekDayKeyIsNameNarrow = WeekdayKeyIsNameNarrowExample;

export const CalendarArAeLocale = ArabicExample;

export const CalendarJaJpLocale = JapaneseExample;

export const CalendarSpecifyMinMaxDate = MinAndMaxDateExample;

export const CalendarDontMarkToday = MarkTodayFalseExample;

export const CalendarDontMarkOutsideDays = MarkOutsideDaysFalseExample;

export const CustomComposedCalendar = CustomComposedCalendarExample;

export const CustomComposedCalendarSafariDstBug =
  CustomComposedCalendarSafariBugExample;

export const Week = WeekExample;
export const VisualTest = FocusedDateInThePastExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};
export const VisualTestRange = RangeDateCalendarExample;
export const VisualTestRangeWithZoom = VisualTestRange.bind({});
VisualTestRangeWithZoom.args = {
  zoomEnabled: true
};