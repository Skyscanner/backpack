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

import BpkCalendarContainer, {
  withCalendarState,
} from './src/BpkCalendarContainer';
import BpkCalendarDate, {
  ROW_TYPES,
  SELECTION_TYPES,
} from './src/BpkCalendarDate';
import BpkCalendarGrid, {
  BpkCalendarGridWithTransition,
} from './src/BpkCalendarGrid';
import BpkCalendarGridHeader from './src/BpkCalendarGridHeader';
import BpkCalendarNav from './src/BpkCalendarNav';
import composeCalendar from './src/composeCalendar';
import { CALENDAR_SELECTION_TYPE } from './src/custom-proptypes';
import CustomPropTypes, {
  BpkCalendarGridPropTypes,
  BpkCalendarDatePropTypes, // @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
} from './src/custom-proptypes-legacy';
import * as DateUtils from './src/date-utils';
import themeAttributes from './src/themeAttributes';

import type { Props as BpkCalendarDateProps } from './src/BpkCalendarDate';
import type { Props as BpkCalendarGridProps } from './src/BpkCalendarGrid';
import type {
  DaysOfWeek,
  ReactComponent,
  WeekDay,
  WeekDayKey,
  SelectionConfiguration,
} from './src/custom-proptypes';

export default BpkCalendarContainer;

export {
  BpkCalendarGrid,
  BpkCalendarGridHeader,
  BpkCalendarNav,
  BpkCalendarDate,
  DateUtils,
  CALENDAR_SELECTION_TYPE,
  DaysOfWeek,
  ReactComponent,
  WeekDay,
  WeekDayKey,
  SelectionConfiguration,
  ROW_TYPES,
  SELECTION_TYPES,
  composeCalendar,
  withCalendarState,
  themeAttributes,
  BpkCalendarGridWithTransition,
  CustomPropTypes,
  BpkCalendarGridPropTypes,
  BpkCalendarDatePropTypes,
  BpkCalendarDateProps,
  BpkCalendarGridProps,
};
