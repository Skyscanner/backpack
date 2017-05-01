import React, { Component, PropTypes } from 'react';
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
  lastDayOfMonth,
  setMonthYear,
  startOfDay,
  startOfMonth,
} from './date-utils';
import { getScriptDirection } from './utils';

const TransitioningBpkCalendarGrid = addCalendarGridTransition(BpkCalendarGrid);

const withCalendarState = (Calendar) => {
  class BpkCalendarContainer extends Component {
    constructor(props) {
      super(props);

      const minDate = startOfDay(this.props.minDate);
      const maxDate = startOfDay(this.props.maxDate);

      this.state = {
        preventKeyboardFocus: true,
        focusedDate: this.props.date ? dateToBoundaries(this.props.date, minDate, maxDate)
                                     : minDate,
      };

      this.handleDateSelect = this.handleDateSelect.bind(this);
      this.handleDateFocus = this.handleDateFocus.bind(this);
      this.handleDateKeyDown = this.handleDateKeyDown.bind(this);
      this.handleMonthChange = this.handleMonthChange.bind(this);
    }

    handleDateFocus(date) {
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
          onMonthChange(startOfMonth(focusedDate));
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

        const newState = { focusedDate: newDate, ...keyboardFocusState };

        this.setState(newState, () => onDateSelect(newDate));
      } else {
        this.setState(keyboardFocusState);
      }
    }

    handleMonthChange(month) {
      this.handleDateFocus(setMonthYear(this.state.focusedDate, month.getMonth(), month.getFullYear()));
    }

    handleDateKeyDown(event) {
      const reverse = getScriptDirection() === 'rtl' ? -1 : 1;
      const { focusedDate } = this.state;
      let preventDefault = true;

      switch (event.key) {
        case 'ArrowRight':
          this.handleDateFocus(addDays(focusedDate, reverse * 1));
          break;
        case 'ArrowLeft':
          this.handleDateFocus(addDays(focusedDate, reverse * -1));
          break;
        case 'ArrowUp':
          this.handleDateFocus(addDays(focusedDate, -7));
          break;
        case 'ArrowDown':
          this.handleDateFocus(addDays(focusedDate, 7));
          break;
        case 'PageUp':
          this.handleDateFocus(addMonths(focusedDate, -1));
          break;
        case 'PageDown':
          this.handleDateFocus(addMonths(focusedDate, 1));
          break;
        case 'Home':
          this.handleDateFocus(startOfMonth(focusedDate));
          break;
        case 'End':
          this.handleDateFocus(lastDayOfMonth(focusedDate));
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

      const sanitisedMinDate = startOfDay(minDate);
      const sanitisedMaxDate = startOfDay(maxDate);

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

      return (
        <Calendar
          onDateClick={this.handleDateSelect}
          onDateFocus={this.handleDateFocus}
          onDateKeyDown={this.handleDateKeyDown}
          onMonthChange={this.handleMonthChange}

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
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    onDateSelect: PropTypes.func,
    onMonthChange: PropTypes.func,
    selectedDate: PropTypes.instanceOf(Date),
  };

  BpkCalendarContainer.defaultProps = {
    date: null,
    maxDate: addMonths(new Date(), 12),
    minDate: new Date(),
    onDateSelect: null,
    onMonthChange: null,
    selectedDate: null,
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
