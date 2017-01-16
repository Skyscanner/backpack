import React, { Component, PropTypes } from 'react';
import objectAssign from 'object-assign';
import BpkCalendarView from './BpkCalendarView';
import {
  addDays,
  addMonths,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinRange,
  lastDayOfMonth,
  setMonth,
  setYear,
  startOfMonth,
  startOfToday,
} from './date-utils';
import CustomPropTypes from './custom-proptypes';

const getDirection = () => {
  const html = document.querySelector('html');
  return window.getComputedStyle(html, null).getPropertyValue('direction');
};

const setMonthYear = (date, newMonth, newYear) => setYear(
  setMonth(date, newMonth),
  newYear,
);

const dateToBoundaries = (date, minDate, maxDate) => {
  if (isWithinRange(date, minDate, maxDate)) {
    return date;
  } else if (isBefore(date, minDate)) {
    return minDate;
  }
  return maxDate;
};

class BpkCalendar extends Component {
  constructor(props) {
    super(props);

    if (props.enableSelection) {
      const initialDate = dateToBoundaries(
        this.props.initialSelectedDate,
        this.props.minDate,
        this.props.maxDate,
      );

      this.state = {
        selectedDate: initialDate,
        focusedDate: initialDate,
      };
    } else {
      const initialFocused = dateToBoundaries(
        this.props.initialMonth,
        this.props.minDate,
        this.props.maxDate,
      );

      this.state = {
        selectedDate: null,
        focusedDate: initialFocused,
      };
    }

    this.onDateSelect = this.onDateSelect.bind(this);
    this.onDateFocus = this.onDateFocus.bind(this);
    this.onDateKeyDown = this.onDateKeyDown.bind(this);
    this.onChangeMonth = this.onChangeMonth.bind(this);
  }

  onDateFocus(date) {
    if (isWithinRange(date, this.props.minDate, this.props.maxDate)) {
      this.setState({ focusedDate: date });
    } else if (isBefore(date, this.props.minDate)) {
      this.setState({ focusedDate: this.props.minDate });
    } else if (isBefore(this.props.maxDate, date)) {
      this.setState({ focusedDate: this.props.maxDate });
    }
  }

  onDateSelect(date) {
    if (isWithinRange(date, this.props.minDate, this.props.maxDate)) {
      this.setState({ selectedDate: date });
      this.setState({ focusedDate: date });
      if (this.props.onDateSelect) {
        this.props.onDateSelect(date);
      }
    }
  }

  onChangeMonth(month) {
    this.onDateFocus(setMonthYear(this.state.focusedDate, month.getMonth(), month.getFullYear()));
  }

  onDateKeyDown(event) {
    const reverse = getDirection() === 'rtl' ? -1 : 1;
    let preventDefault = true;

    switch (event.key) {
      case 'ArrowRight':
        this.onDateFocus(addDays(this.state.focusedDate, reverse * 1));
        break;
      case 'ArrowLeft':
        this.onDateFocus(addDays(this.state.focusedDate, reverse * -1));
        break;
      case 'ArrowUp':
        this.onDateFocus(addDays(this.state.focusedDate, -7));
        break;
      case 'ArrowDown':
        this.onDateFocus(addDays(this.state.focusedDate, 7));
        break;
      case 'PageUp':
        this.onDateFocus(addMonths(this.state.focusedDate, -1));
        break;
      case 'PageDown':
        this.onDateFocus(addMonths(this.state.focusedDate, 1));
        break;
      case 'Home':
        this.onDateFocus(startOfMonth(this.state.focusedDate));
        break;
      case 'End':
        this.onDateFocus(lastDayOfMonth(this.state.focusedDate));
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
      markToday,
      markOutsideDays,
      enableSelection,
      dateModifiers,
      ...calendarProps
    } = this.props;

    delete calendarProps.onDateSelect;

    const builtinModifiers = {};

    if (markToday) { builtinModifiers.today = isToday; }
    if (this.props.minDate && this.props.maxDate) {
      builtinModifiers.disabled = date => !isWithinRange(date, this.props.minDate, this.props.maxDate);
    }
    if (markOutsideDays) {
      builtinModifiers.outside = date => !isSameMonth(date, this.state.focusedDate);
    }
    if (enableSelection) {
      builtinModifiers.selected = date => isSameDay(date, this.state.selectedDate);
      builtinModifiers.focused = date => isSameDay(date, this.state.focusedDate);
    }

    const modifiers = objectAssign({}, builtinModifiers, dateModifiers);

    return (
      <BpkCalendarView
        onDateClick={this.onDateSelect}
        onDateFocus={this.onDateFocus}
        onDateKeyDown={this.onDateKeyDown}
        onChangeMonth={this.onChangeMonth}

        dateModifiers={modifiers}
        month={startOfMonth(this.state.focusedDate)}
        selectedDate={this.state.focusedDate}
        {...calendarProps}
      />
    );
  }
}

BpkCalendar.propTypes = {
  id: PropTypes.string.isRequired,
  dateModifiers: CustomPropTypes.DateModifiers,
  enableSelection: PropTypes.bool,
  initialMonth: PropTypes.instanceOf(Date),
  initialSelectedDate: PropTypes.instanceOf(Date),
  markOutsideDays: PropTypes.bool,
  markToday: PropTypes.bool,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onDateSelect: PropTypes.func,
};

BpkCalendar.defaultProps = {
  dateModifiers: {},
  enableSelection: true,
  initialMonth: new Date(),
  initialSelectedDate: new Date(),
  markOutsideDays: true,
  markToday: true,
  maxDate: addMonths(startOfToday(), 12),
  minDate: startOfToday(),
  onDateSelect: null,
};

export default BpkCalendar;
