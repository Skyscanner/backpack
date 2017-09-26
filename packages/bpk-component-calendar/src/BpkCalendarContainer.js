/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import BpkCalendarNav from './BpkCalendarNav';
import BpkCalendarGrid from './BpkCalendarGrid';
import { addCalendarGridTransition } from './BpkCalendarGridTransition';
import BpkCalendarGridHeader from './BpkCalendarGridHeader';
import BpkCalendarDate from './BpkCalendarDate';
import composeCalendar from './composeCalendar';
import {
  addDays,
  addMonths,
  dateToBoundaries,
  isSameMonth,
  isSameDay,
  lastDayOfMonth,
  setMonthYear,
  startOfDay,
  startOfMonth,
} from './date-utils';
import { getScriptDirection } from './utils';

const TransitioningBpkCalendarGrid = addCalendarGridTransition(BpkCalendarGrid);

const focusedDateHasChanged = (currentProps, nextProps) => {
  const rawNextSelectedDate = nextProps.selectedDate || nextProps.date;
  const rawSelectedDate = currentProps.selectedDate || currentProps.date;

  return rawNextSelectedDate && !isSameDay(rawNextSelectedDate, rawSelectedDate);
};

const determineFocusedDate = (rawSelectedDate, initiallyFocusedDate, minDate, maxDate) => {
  if (rawSelectedDate) {
    return dateToBoundaries(rawSelectedDate, minDate, maxDate);
  }

  if (initiallyFocusedDate) {
    return dateToBoundaries(initiallyFocusedDate, minDate, maxDate);
  }

  return minDate;
};

const withCalendarState = (Calendar) => {
  class BpkCalendarContainer extends Component {
    constructor(props) {
      super(props);

      const minDate = startOfDay(this.props.minDate);
      const maxDate = startOfDay(this.props.maxDate);

      // `date` is to be DEPRECATED in favour of `selectedDate`
      const rawSelectedDate = this.props.selectedDate || this.props.date;
      const initiallyFocusedDate = this.props.initiallyFocusedDate;

      this.state = {
        preventKeyboardFocus: true,
        focusedDate: determineFocusedDate(rawSelectedDate, initiallyFocusedDate, minDate, maxDate),
      };


      this.handleDateSelect = this.handleDateSelect.bind(this);
      this.handleDateFocus = this.handleDateFocus.bind(this);
      this.handleDateKeyDown = this.handleDateKeyDown.bind(this);
      this.handleMonthChange = this.handleMonthChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      // `date` is to be DEPRECATED in favour of `selectedDate`
      const rawNextSelectedDate = nextProps.selectedDate || nextProps.date;

      const minDate = startOfDay(nextProps.minDate);
      const maxDate = startOfDay(nextProps.maxDate);
      if (focusedDateHasChanged(this.props, nextProps)) {
        this.setState({
          focusedDate: dateToBoundaries(rawNextSelectedDate, minDate, maxDate),
        });
      }
    }

    handleDateFocus(event, { date, source }) {
      const { onMonthChange } = this.props;
      const focusedDate = dateToBoundaries(
        date,
        startOfDay(this.props.minDate),
        startOfDay(this.props.maxDate),
      );
      const didMonthChange = !isSameMonth(this.state.focusedDate, focusedDate);

      this.setState({
        preventKeyboardFocus: false,
        focusedDate,
      }, () => {
        if (onMonthChange && didMonthChange) {
          onMonthChange(event, { month: startOfMonth(focusedDate), source });
        }
      });
    }

    handleDateSelect(date) {
      const { onDateSelect } = this.props;
      const keyboardFocusState = { preventKeyboardFocus: false };

      if (onDateSelect) {
        const newDate = dateToBoundaries(
          date,
          startOfDay(this.props.minDate),
          startOfDay(this.props.maxDate),
        );

        onDateSelect(newDate);
      } else {
        this.setState(keyboardFocusState);
      }
    }

    handleMonthChange(event, { month, source }) {
      this.handleDateFocus(event, {
        date: setMonthYear(this.state.focusedDate, month.getMonth(), month.getFullYear()),
        source,
      });
    }

    handleDateKeyDown(event) {
      event.persist();
      const reverse = getScriptDirection() === 'rtl' ? -1 : 1;
      const { focusedDate } = this.state;
      const source = 'GRID';
      let preventDefault = true;

      switch (event.key) {
        case 'ArrowRight':
          this.handleDateFocus(event, { date: addDays(focusedDate, reverse * 1), source });
          break;
        case 'ArrowLeft':
          this.handleDateFocus(event, { date: addDays(focusedDate, reverse * -1), source });
          break;
        case 'ArrowUp':
          this.handleDateFocus(event, { date: addDays(focusedDate, -7), source });
          break;
        case 'ArrowDown':
          this.handleDateFocus(event, { date: addDays(focusedDate, 7), source });
          break;
        case 'PageUp':
          this.handleDateFocus(event, { date: addMonths(focusedDate, -1), source });
          break;
        case 'PageDown':
          this.handleDateFocus(event, { date: addMonths(focusedDate, 1), source });
          break;
        case 'Home':
          this.handleDateFocus(event, { date: startOfMonth(focusedDate), source });
          break;
        case 'End':
          this.handleDateFocus(event, { date: lastDayOfMonth(focusedDate), source });
          break;
        default:
          preventDefault = false;
          break;
      }

      if (preventDefault) {
        event.preventDefault();
      }
    }

    render() {
      const {
        minDate,
        maxDate,
        date,
        selectedDate,
        ...calendarProps
      } = this.props;

      delete calendarProps.onDateSelect;
      delete calendarProps.onMonthChange;

      const sanitisedMinDate = startOfDay(minDate);
      const sanitisedMaxDate = startOfDay(maxDate);

      // `date` is to be DEPRECATED in favour of `selectedDate`
      const rawSelectedDate = selectedDate || date;

      const sanitisedSelectedDate = rawSelectedDate
        ? dateToBoundaries(
            rawSelectedDate,
            sanitisedMinDate,
            sanitisedMaxDate,
          )
        : null;
      const sanitisedFocusedDate = dateToBoundaries(
        this.state.focusedDate,
        sanitisedMinDate,
        sanitisedMaxDate,
      );
      const month = startOfMonth(sanitisedFocusedDate);

      return (
        <Calendar
          onDateClick={this.handleDateSelect}
          onDateMouseDown={this.handleDateFocus}
          onDateKeyDown={this.handleDateKeyDown}
          onMonthChange={this.handleMonthChange}

          month={month}
          preventKeyboardFocus={this.state.preventKeyboardFocus}
          selectedDate={sanitisedSelectedDate}
          focusedDate={sanitisedFocusedDate}

          {...calendarProps}

          minDate={sanitisedMinDate}
          maxDate={sanitisedMaxDate}
        />
      );
    }
  }

  BpkCalendarContainer.propTypes = {
    // `date` is to be DEPRECATED in favour of `selectedDate`
    date: PropTypes.instanceOf(Date),
    fixedWidth: PropTypes.bool,
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    onDateSelect: PropTypes.func,
    onMonthChange: PropTypes.func,
    selectedDate: PropTypes.instanceOf(Date),
    initiallyFocusedDate: PropTypes.instanceOf(Date),
  };

  BpkCalendarContainer.defaultProps = {
    date: null,
    fixedWidth: true,
    maxDate: addMonths(new Date(), 12),
    minDate: new Date(),
    onDateSelect: null,
    onMonthChange: null,
    selectedDate: null,
    initiallyFocusedDate: null,
  };

  return BpkCalendarContainer;
};

export default withCalendarState(composeCalendar(
  BpkCalendarNav,
  BpkCalendarGridHeader,
  TransitioningBpkCalendarGrid,
  BpkCalendarDate,
));
export { withCalendarState };
