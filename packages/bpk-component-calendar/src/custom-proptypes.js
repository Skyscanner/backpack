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

import PropTypes from 'prop-types';

const CalendarConfigurationSingle = PropTypes.shape({
  type: 'single',
  date: PropTypes.instanceOf(Date),
});

const CalendarConfigurationRange = PropTypes.shape({
  type: 'range',
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
});

const CalendarConfiguration = PropTypes.oneOf(
  CalendarConfigurationSingle,
  CalendarConfigurationRange,
);

const WeekDay = PropTypes.shape({
  name: PropTypes.string,
  nameAbbr: PropTypes.string,
  index: PropTypes.number,
  isWeekend: PropTypes.bool,
});

const WeekDayKey = PropTypes.string;
const DaysOfWeek = PropTypes.arrayOf(WeekDay);
const DateModifiers = PropTypes.objectOf(PropTypes.func);
const ReactComponent = PropTypes.oneOfType([PropTypes.string, PropTypes.func]);

export default {
  CalendarConfiguration,
  DateModifiers,
  DaysOfWeek,
  ReactComponent,
  WeekDay,
  WeekDayKey,
};
