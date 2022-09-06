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

import {
  DefaultExample,
  WeekStartsOnSixExample,
  WithFocusedDateExample,
  TallContainerExample,
  SingleMonthExample,
  WeekStartsOnSundayExample,
  HonestWeekendExample,
  ArabicLocaleExample,
  JapaneseLocaleExample,
  DifferentMinMaxDatesExample,
  DontMarkTodayExample,
  ScrollableCalendarDateExample,
  ScrollableCalendarGridExample,
  ScrollableCalendarGridListExample,
  PastCalendarExample,
  RangeExample,
  SplitWeekRangeExample,
} from './examples';

export default {
  title: 'bpk-component-scrollable-calendar',
};

export const ScrollableCalendarDefault = DefaultExample;

export const ScrollableCalendarRange = RangeExample;

export const ScrollableCalendarWeekSplitAcross2MonthsRange =
  SplitWeekRangeExample;

export const ScrollableCalendarWeekStartsOn6 = WeekStartsOnSixExample;

export const ScrollableCalendarWithFocusedDate = WithFocusedDateExample;

export const ScrollableCalendarInATallContainer = TallContainerExample;

export const ScrollableCalendarWithASingleMonth = SingleMonthExample;

export const ScrollableCalendarWeekStartsOnASunday = WeekStartsOnSundayExample;

export const ScrollableCalendarHonestWeekend = HonestWeekendExample;

export const ScrollableCalendarArAeLocale = ArabicLocaleExample;

export const ScrollableCalendarJaJpLocale = JapaneseLocaleExample;

export const ScrollableCalendarDifferentMinMaxDate =
  DifferentMinMaxDatesExample;

export const ScrollableCalendarDontMarkToday = DontMarkTodayExample;

export const PastCalendar = PastCalendarExample;
export const BpkScrollableCalendarDate = ScrollableCalendarDateExample;

export const BpkScrollableCalendarGrid = ScrollableCalendarGridExample;

export const BpkScrollableCalendarGridList = ScrollableCalendarGridListExample;

export const VisualTest = DefaultExample;

export const VisualTestRange = RangeExample;
