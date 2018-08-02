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

import BpkCalendarContainer, {
  withCalendarState,
} from './src/BpkCalendarContainer';
import BpkCalendarGrid from './src/BpkCalendarGrid';
import BpkCalendarGridHeader from './src/BpkCalendarGridHeader';
import BpkCalendarNav from './src/BpkCalendarNav';
import BpkCalendarDate, { propTypes } from './src/BpkCalendarDate';
import composeCalendar from './src/composeCalendar';
import CustomPropTypes from './src/custom-proptypes';
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
  composeCalendar,
  withCalendarState,
  themeAttributes,
  propTypes,
};
