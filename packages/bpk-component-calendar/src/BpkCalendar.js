import React, { Component, PropTypes } from 'react';
import objectAssign from 'object-assign';
import BpkCalendarDate from './BpkCalendarDate';
import BpkCalendarView from './BpkCalendarView';
import {
  addDays,
  addMonths,
  dateToBoundaries,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinRange,
  lastDayOfMonth,
  setMonth,
  setYear,
  startOfMonth,
  startOfDay,
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

class BpkCalendar extends Component {
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
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
  }

  handleDateFocus(date) {
    this.setState({
      preventKeyboardFocus: false,
      focusedDate: dateToBoundaries(
        date,
        startOfDay(this.props.minDate),
        startOfDay(this.props.maxDate),
      ),
    });
  }

  handleDateSelect(date) {
    this.setState({ preventKeyboardFocus: false });
    if (this.props.onDateSelect) {
      const newDate = dateToBoundaries(
        date,
        startOfDay(this.props.minDate),
        startOfDay(this.props.maxDate),
      );
      this.props.onDateSelect(newDate);
      this.setState({ focusedDate: newDate });
    }
  }

  handleChangeMonth(month) {
    this.handleDateFocus(setMonthYear(this.state.focusedDate, month.getMonth(), month.getFullYear()));
  }

  handleDateKeyDown(event) {
    const reverse = getDirection() === 'rtl' ? -1 : 1;
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
      markToday,
      markOutsideDays,
      enableSelection,
      dateModifiers,
      ...calendarProps
    } = this.props;

    delete calendarProps.onDateSelect;

    const builtinModifiers = {};
    const minDate = startOfDay(this.props.minDate);
    const maxDate = startOfDay(this.props.maxDate);

    const selectedDate = this.props.date ? dateToBoundaries(this.props.date, minDate, maxDate)
                                         : null;
    const focusedDate = dateToBoundaries(this.state.focusedDate, minDate, maxDate);

    if (markToday) { builtinModifiers.today = isToday; }
    if (markOutsideDays) {
      builtinModifiers.outside = date => !isSameMonth(date, focusedDate);
    }
    if (enableSelection) {
      builtinModifiers.selected = date => isSameDay(date, selectedDate);
      builtinModifiers.focused = date => isSameDay(date, focusedDate);
    }
    builtinModifiers.disabled = date => !isWithinRange(date, minDate, maxDate);

    const modifiers = objectAssign({}, builtinModifiers, dateModifiers);

    return (
      <BpkCalendarView
        onDateClick={this.handleDateSelect}
        onDateFocus={this.handleDateFocus}
        onDateKeyDown={this.handleDateKeyDown}
        onChangeMonth={this.handleChangeMonth}

        dateModifiers={modifiers}
        month={startOfMonth(focusedDate)}
        selectedDate={selectedDate}
        preventKeyboardFocus={this.state.preventKeyboardFocus}

        {...calendarProps}
      />
    );
  }
}

BpkCalendar.propTypes = {
  // Required
  changeMonthLabel: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  formatMonth: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  // Optional
  DateComponent: PropTypes.func,
  dateModifiers: CustomPropTypes.DateModifiers,
  enableSelection: PropTypes.bool,
  markOutsideDays: PropTypes.bool,
  markToday: PropTypes.bool,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onDateSelect: PropTypes.func,
  showWeekendSeparator: PropTypes.bool,
  weekStartsOn: PropTypes.number,
};

BpkCalendar.defaultProps = {
  DateComponent: BpkCalendarDate,
  dateModifiers: {},
  enableSelection: true,
  markOutsideDays: true,
  markToday: true,
  maxDate: addMonths(new Date(), 12),
  minDate: new Date(),
  onDateSelect: null,
  showWeekendSeparator: true,
  weekStartsOn: 1,
};

export default BpkCalendar;
