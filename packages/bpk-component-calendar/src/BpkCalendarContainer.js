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

import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { deprecated, isRTL } from '../../bpk-react-utils';

import CustomPropTypes, { CALENDAR_SELECTION_TYPE } from './custom-proptypes';
import BpkCalendarNav from './BpkCalendarNav';
import { BpkCalendarGridWithTransition } from './BpkCalendarGrid';
import BpkCalendarGridHeader from './BpkCalendarGridHeader';
import BpkCalendarDate from './BpkCalendarDate';
import composeCalendar from './composeCalendar';
import {
  addDays,
  addMonths,
  dateToBoundaries,
  isAfter,
  isSameMonth,
  isSameDay,
  lastDayOfMonth,
  setMonthYear,
  startOfDay,
  startOfMonth,
} from './date-utils';

/**
 * Updates the current focused date
 * @param {Object} currentProps current input properties
 * @param {Object} nextProps next input properties when component changes
 * @returns {Boolean} if the selected date has changed
 */
const focusedDateHasChanged = (currentProps, nextProps) => {
  const currentSelectConfig = currentProps.selectionConfiguration;
  const nextSelectConfig = nextProps.selectionConfiguration;

  const rawNextSelectedDate =
    nextSelectConfig.date || nextSelectConfig.startDate;
  const rawSelectedDate =
    currentSelectConfig.date || currentSelectConfig.startDate;

  if (!rawSelectedDate && !rawNextSelectedDate) {
    return false;
  }

  if (
    (rawSelectedDate && !rawNextSelectedDate) ||
    (!rawSelectedDate && rawNextSelectedDate)
  ) {
    return true;
  }

  return !isSameDay(rawNextSelectedDate, rawSelectedDate);
};

/**
 * Determines the focused date on the calendar
 * @param {Date} rawSelectedDate the raw date provided to the calendar to be selected
 * @param {Date} initiallyFocusedDate inital date that was selected
 * @param {Date} minDate min available date to be selectable in the calendar
 * @param {Date} maxDate max available date to be selectable in the calendar
 * @returns {Date} which date to be focused on the calendar when it loads
 */
const determineFocusedDate = (
  rawSelectedDate,
  initiallyFocusedDate,
  minDate,
  maxDate,
) => {
  if (rawSelectedDate) {
    return dateToBoundaries(rawSelectedDate, minDate, maxDate);
  }

  if (initiallyFocusedDate) {
    return dateToBoundaries(initiallyFocusedDate, minDate, maxDate);
  }

  return minDate;
};

/**
 * Function that based on the configuration will return a single date or start and end date.
 * @param {Object} selectionConfig - The configuration of calendar to be used
 * @returns {Array} An array or single of multiple dates
 */
const getRawSelectedDate = (selectionConfig) => {
  let rawDate = [];

  switch (selectionConfig.type) {
    case CALENDAR_SELECTION_TYPE.single:
      rawDate = [selectionConfig.date];
      break;
    case CALENDAR_SELECTION_TYPE.range:
      rawDate = [selectionConfig.startDate, selectionConfig.endDate];
      break;
    default:
      rawDate = [null];
      break;
  }

  return rawDate;
};

const withCalendarState = (Calendar) => {
  class BpkCalendarContainer extends Component {
    constructor(props) {
      super(props);

      const minDate = startOfDay(this.props.minDate);
      const maxDate = startOfDay(this.props.maxDate);

      const rawSelectedDate = getRawSelectedDate(
        this.props.selectionConfiguration,
      );

      const { initiallyFocusedDate } = this.props;

      this.state = {
        preventKeyboardFocus: true,
        focusedDate: determineFocusedDate(
          rawSelectedDate[0],
          initiallyFocusedDate,
          minDate,
          maxDate,
        ),
      };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      const rawNextSelectedDate = getRawSelectedDate(
        nextProps.selectionConfiguration,
      );

      const minDate = startOfDay(nextProps.minDate);
      const maxDate = startOfDay(nextProps.maxDate);
      if (focusedDateHasChanged(this.props, nextProps)) {
        this.setState({
          focusedDate: dateToBoundaries(
            rawNextSelectedDate[0],
            minDate,
            maxDate,
          ),
        });
      }
    }

    handleDateFocus = (event, { date, source }) => {
      const { onMonthChange } = this.props;
      const focusedDate = dateToBoundaries(
        date,
        startOfDay(this.props.minDate),
        startOfDay(this.props.maxDate),
      );
      const didMonthChange = !isSameMonth(this.state.focusedDate, focusedDate);

      this.setState(
        {
          preventKeyboardFocus: false,
          focusedDate,
        },
        () => {
          if (onMonthChange && didMonthChange) {
            onMonthChange(event, { month: startOfMonth(focusedDate), source });
          }
        },
      );
    };

    handleDateSelect = (date) => {
      const { onDateSelect, selectionConfiguration } = this.props;
      const keyboardFocusState = { preventKeyboardFocus: false };

      if (onDateSelect) {
        const newDate = dateToBoundaries(
          date,
          startOfDay(this.props.minDate),
          startOfDay(this.props.maxDate),
        );

        if (
          selectionConfiguration.type === CALENDAR_SELECTION_TYPE.range &&
          selectionConfiguration.startDate &&
          !selectionConfiguration.endDate &&
          (isAfter(newDate, selectionConfiguration.startDate) ||
            isSameDay(newDate, selectionConfiguration.startDate))
        ) {
          onDateSelect(selectionConfiguration.startDate, newDate);
        } else {
          onDateSelect(newDate);
        }
      } else {
        this.setState(keyboardFocusState);
      }
    };

    handleMonthChange = (event, { month, source }) => {
      this.handleDateFocus(event, {
        date: setMonthYear(
          this.state.focusedDate,
          month.getMonth(),
          month.getFullYear(),
        ),
        source,
      });
    };

    handleDateKeyDown = (event) => {
      event.persist();
      const reverse = isRTL() ? -1 : 1;
      const { focusedDate } = this.state;
      const source = 'GRID';
      let preventDefault = true;

      switch (event.key) {
        case 'ArrowRight':
          this.handleDateFocus(event, {
            date: addDays(focusedDate, reverse * 1),
            source,
          });
          break;
        case 'ArrowLeft':
          this.handleDateFocus(event, {
            date: addDays(focusedDate, reverse * -1),
            source,
          });
          break;
        case 'ArrowUp':
          this.handleDateFocus(event, {
            date: addDays(focusedDate, -7),
            source,
          });
          break;
        case 'ArrowDown':
          this.handleDateFocus(event, {
            date: addDays(focusedDate, 7),
            source,
          });
          break;
        case 'PageUp':
          this.handleDateFocus(event, {
            date: addMonths(focusedDate, -1),
            source,
          });
          break;
        case 'PageDown':
          this.handleDateFocus(event, {
            date: addMonths(focusedDate, 1),
            source,
          });
          break;
        case 'Home':
          this.handleDateFocus(event, {
            date: startOfMonth(focusedDate),
            source,
          });
          break;
        case 'End':
          this.handleDateFocus(event, {
            date: lastDayOfMonth(focusedDate),
            source,
          });
          break;
        default:
          preventDefault = false;
          break;
      }

      if (preventDefault) {
        event.preventDefault();
      }
    };

    render() {
      const {
        date,
        maxDate,
        minDate,
        selectionConfiguration,
        ...calendarProps
      } = this.props;

      delete calendarProps.onDateSelect;
      delete calendarProps.onMonthChange;

      const sanitisedMinDate = startOfDay(minDate);
      const sanitisedMaxDate = startOfDay(maxDate);

      const sanitisedFocusedDate = dateToBoundaries(
        this.state.focusedDate,
        sanitisedMinDate,
        sanitisedMaxDate,
      );
      const month = startOfMonth(sanitisedFocusedDate);

      return (
        <Calendar
          onDateClick={this.handleDateSelect}
          onDateKeyDown={this.handleDateKeyDown}
          onMonthChange={this.handleMonthChange}
          month={month}
          preventKeyboardFocus={this.state.preventKeyboardFocus}
          focusedDate={sanitisedFocusedDate}
          {...calendarProps}
          minDate={sanitisedMinDate}
          maxDate={sanitisedMaxDate}
          selectionConfiguration={selectionConfiguration}
        />
      );
    }
  }

  BpkCalendarContainer.propTypes = {
    date: deprecated(
      PropTypes.instanceOf(Date),
      'Use selectionConfiguration to set selectedDate',
    ),
    fixedWidth: PropTypes.bool,
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    onDateSelect: PropTypes.func,
    onMonthChange: PropTypes.func,
    selectionConfiguration: CustomPropTypes.SelectionConfiguration,
    selectedDate: deprecated(
      PropTypes.instanceOf(Date),
      'Use selectionConfiguration to set selectedDate',
    ),
    initiallyFocusedDate: PropTypes.instanceOf(Date),
  };

  BpkCalendarContainer.defaultProps = {
    date: null,
    fixedWidth: true,
    maxDate: addMonths(new Date(), 12),
    minDate: new Date(),
    onDateSelect: null,
    onMonthChange: null,
    selectionConfiguration: {
      type: CALENDAR_SELECTION_TYPE.single,
      date: null,
    },
    selectedDate: null,
    initiallyFocusedDate: null,
  };

  return BpkCalendarContainer;
};

export default withCalendarState(
  composeCalendar(
    BpkCalendarNav,
    BpkCalendarGridHeader,
    BpkCalendarGridWithTransition,
    BpkCalendarDate,
  ),
);
export { withCalendarState };
