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
  WeekStartsOnSix,
  WithFocusedDate,
  TallContainer,
  SingleMonth,
  NoWeekendSeparator,
  WeekStartsOnSunday,
  HonestWeekend,
  ArabicLocale,
  JapaneseLocale,
  DifferentMinMaxDates,
  DontMarkToday,
  ScrollableCalendarDate,
  ScrollableCalendarGrid,
  ScrollableCalendarGridList,
} from './examples';

storiesOf('bpk-component-scrollable-calendar', module)
  .add('Scrollable Calendar - default', DefaultExample)
  .add('Scrollable Calendar - week starts on 6', WeekStartsOnSix)
  .add('Scrollable Calendar - with focused date', WithFocusedDate)
  .add('Scrollable Calendar in a tall container', TallContainer)
  .add('Scrollable Calendar with a single month', SingleMonth)
  .add("Scrollable Calendar - Don't show weekend separator", NoWeekendSeparator)
  .add('Scrollable Calendar - Week starts on a Sunday', WeekStartsOnSunday)
  .add('Scrollable Calendar - Honest weekend', HonestWeekend)
  .add('Scrollable Calendar - ar-AE locale', ArabicLocale)
  .add('Scrollable Calendar - ja-JP locale', JapaneseLocale)
  .add('Scrollable Calendar - Different min/max date', DifferentMinMaxDates)
  .add("Scrollable Calendar - Don't mark today", DontMarkToday)
  .add('BpkScrollableCalendarDate', ScrollableCalendarDate)
  .add('BpkScrollableCalendarGrid', ScrollableCalendarGrid)
  .add('BpkScrollableCalendarGridList', ScrollableCalendarGridList);
