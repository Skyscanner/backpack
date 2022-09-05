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
  RangeExample,
  SplitWeekRangeExample,
} from './examples';

export default {
  title: 'bpk-component-scrollable-calendar',
};

export const ScrollableCalendarDefault = DefaultExample;

ScrollableCalendarDefault.storyName = 'Scrollable Calendar - default';

export const ScrollableCalendarRange = RangeExample;

ScrollableCalendarRange.storyName = 'Scrollable Calendar - range';

export const ScrollableCalendarWeekSplitAcross2MonthsRange =
  SplitWeekRangeExample;

ScrollableCalendarWeekSplitAcross2MonthsRange.storyName = 'Scrollable Calendar - Week split across 2 months range';

export const ScrollableCalendarWeekStartsOn6 = WeekStartsOnSix;

ScrollableCalendarWeekStartsOn6.storyName = 'Scrollable Calendar - week starts on 6';

export const ScrollableCalendarWithFocusedDate = WithFocusedDate;

ScrollableCalendarWithFocusedDate.storyName = 'Scrollable Calendar - with focused date';

export const ScrollableCalendarInATallContainer = TallContainer;

ScrollableCalendarInATallContainer.storyName = 'Scrollable Calendar in a tall container';

export const ScrollableCalendarWithASingleMonth = SingleMonth;

ScrollableCalendarWithASingleMonth.storyName = 'Scrollable Calendar with a single month';

export const ScrollableCalendarWeekStartsOnASunday = WeekStartsOnSunday;

ScrollableCalendarWeekStartsOnASunday.storyName = 'Scrollable Calendar - Week starts on a Sunday';

export const ScrollableCalendarHonestWeekend = HonestWeekend;

ScrollableCalendarHonestWeekend.storyName = 'Scrollable Calendar - Honest weekend';

export const ScrollableCalendarArAeLocale = ArabicLocale;

ScrollableCalendarArAeLocale.storyName = 'Scrollable Calendar - ar-AE locale';

export const ScrollableCalendarJaJpLocale = JapaneseLocale;

ScrollableCalendarJaJpLocale.storyName = 'Scrollable Calendar - ja-JP locale';

export const ScrollableCalendarDifferentMinMaxDate = DifferentMinMaxDates;

ScrollableCalendarDifferentMinMaxDate.storyName = 'Scrollable Calendar - Different min/max date';

export const ScrollableCalendarDontMarkToday = DontMarkToday;

ScrollableCalendarDontMarkToday.storyName = "Scrollable Calendar - Don't mark today";

export const _PastCalendar = PastCalendar;
export const BpkScrollableCalendarDate = ScrollableCalendarDate;

BpkScrollableCalendarDate.storyName = 'BpkScrollableCalendarDate';

export const BpkScrollableCalendarGrid = ScrollableCalendarGrid;

BpkScrollableCalendarGrid.storyName = 'BpkScrollableCalendarGrid';

export const BpkScrollableCalendarGridList = ScrollableCalendarGridList;

BpkScrollableCalendarGridList.storyName = 'BpkScrollableCalendarGridList';

export const VisualTest = DefaultExample;

VisualTest.storyName = 'Visual test';

export const VisualTestRange = RangeExample;

VisualTestRange.storyName = 'Visual test range';
