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
import BpkCalendarGrid, {
  propTypes as BpkCalendarGridPropTypes,
  BpkCalendarGridWithTransition,
} from './src/BpkCalendarGrid';
import BpkCalendarGridHeader from './src/BpkCalendarGridHeader';
import BpkCalendarNav from './src/BpkCalendarNav';
import BpkCalendarDate, {
  ROW_TYPES,
  SELECTION_TYPES,
  propTypes as BpkCalendarDatePropTypes,
} from './src/BpkCalendarDate';
import composeCalendar from './src/composeCalendar';
import CustomPropTypes, {
  CALENDAR_SELECTION_TYPE,
} from './src/custom-proptypes';
import * as DateUtils from './src/date-utils';
import themeAttributes from './src/themeAttributes';

export default BpkCalendarContainer;

export {
  BpkCalendarGrid,
  BpkCalendarGridHeader,
  BpkCalendarNav,
  BpkCalendarDate,
  CustomPropTypes,
  DateUtils,
  CALENDAR_SELECTION_TYPE,
  ROW_TYPES,
  SELECTION_TYPES,
  composeCalendar,
  withCalendarState,
  themeAttributes,
  BpkCalendarDatePropTypes,
  BpkCalendarGridPropTypes,
  BpkCalendarGridWithTransition,
};
