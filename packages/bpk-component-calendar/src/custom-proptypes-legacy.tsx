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
// @ts-nocheck


import PropTypes from 'prop-types';

import { isBefore, isSameDay } from './date-utils';

const DateType = () => (props) => {
  const { endDate, startDate } = props;

  // No range selected
  if (!startDate && !endDate) {
    return null;
  }

  // End date without a start date is not allowed
  if (!startDate && endDate) {
    return new Error(`Cannot specify \`endDate\` without \`startDate\`.`);
  }

  // Start date without an end date is always valid
  if (startDate && !endDate) {
    return null;
  }

  // Start date cannot be after end date
  if (isBefore(endDate, startDate) && !isSameDay(endDate, startDate)) {
    return new Error(
      `Start date \`${startDate}\` cannot be after end date \`${endDate}\`.`,
    );
  }

  return null;
};

const CALENDAR_SELECTION_TYPE = {
  single: 'single',
  range: 'range',
};

export const SELECTION_TYPES = {
  none: 'none',
  single: 'single',
  start: 'start',
  middle: 'middle',
  end: 'end',
  sameDay: 'sameDay',
};

const SelectionConfigurationSingle = PropTypes.shape({
  type: PropTypes.oneOf([CALENDAR_SELECTION_TYPE.single]),
  date: PropTypes.instanceOf(Date),
});

const SelectionConfigurationRange = PropTypes.shape({
  type: PropTypes.oneOf([CALENDAR_SELECTION_TYPE.range]),
  startDate: DateType(),
  endDate: DateType(),
});

const SelectionConfiguration = PropTypes.oneOfType([
  SelectionConfigurationSingle,
  SelectionConfigurationRange,
]);

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

const BpkCalendarGridPropTypes = {
  // Required
  DateComponent: PropTypes.elementType.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  month: PropTypes.instanceOf(Date).isRequired,
  weekStartsOn: PropTypes.number.isRequired,
  // Optional
  className: PropTypes.string,
  cellClassName: PropTypes.string,
  dateModifiers: DateModifiers,
  focusedDate: PropTypes.instanceOf(Date),
  isKeyboardFocusable: PropTypes.bool,
  markOutsideDays: PropTypes.bool,
  markToday: PropTypes.bool,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onDateClick: PropTypes.func,
  onDateKeyDown: PropTypes.func,
  preventKeyboardFocus: PropTypes.bool,
  selectionConfiguration: SelectionConfiguration,
  ignoreOutsideDate: PropTypes.bool,
  dateProps: PropTypes.object,
};

const BpkCalendarDatePropTypes = {
  // Required
  date: PropTypes.instanceOf(Date).isRequired,
  // Optional
  className: PropTypes.string,
  isBlocked: PropTypes.bool,
  isFocused: PropTypes.bool,
  isKeyboardFocusable: PropTypes.bool,
  isOutside: PropTypes.bool,
  isSelected: PropTypes.bool,
  isToday: PropTypes.bool,
  modifiers: DateModifiers,
  onClick: PropTypes.func,
  onDateKeyDown: PropTypes.func,
  preventKeyboardFocus: PropTypes.bool,
  selectionType: PropTypes.oneOf(Object.keys(SELECTION_TYPES)),
  style: PropTypes.object,
};

export {
  CALENDAR_SELECTION_TYPE,
  BpkCalendarGridPropTypes,
  BpkCalendarDatePropTypes,
};

export default {
  SelectionConfiguration,
  DateModifiers,
  DaysOfWeek,
  ReactComponent,
  WeekDay,
  WeekDayKey,
};
