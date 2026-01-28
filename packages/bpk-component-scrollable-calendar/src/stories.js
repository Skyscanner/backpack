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

import BpkScrollableCalendarDateComponent from './BpkScrollableCalendarDate';
import BpkScrollableCalendarGridComponent from './BpkScrollableCalendarGrid';
import BpkScrollableCalendarGridListComponent from './BpkScrollableCalendarGridList';
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
  DefaultExampleWithCustomHeight,
} from './examples';
import { BpkScrollableCalendarMock } from './stories-utils';

export default {
  title: 'bpk-component-scrollable-calendar',
  component: BpkScrollableCalendarGridListComponent,
  subcomponents: {
    BpkScrollableCalendarDate: BpkScrollableCalendarDateComponent,
    BpkScrollableCalendarGrid: BpkScrollableCalendarGridComponent,
    BpkScrollableCalendar: BpkScrollableCalendarMock,
  },
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
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};

export const VisualTestWithCustomHeight = DefaultExampleWithCustomHeight;
export const VisualTestWithCustomHeightWithZoom = VisualTestWithCustomHeight.bind({});
VisualTestWithCustomHeightWithZoom.args = {
  zoomEnabled: true
};

export const VisualTestRange = RangeExample;
export const VisualTestRangeWithZoom = VisualTestRange.bind({});
VisualTestRangeWithZoom.args = {
  zoomEnabled: true
};

