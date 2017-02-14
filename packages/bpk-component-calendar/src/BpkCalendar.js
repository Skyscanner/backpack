import React, { Component, PropTypes } from 'react';
import BpkCalendarDate from './BpkCalendarDate';
import BpkCalendarView from './BpkCalendarView';
import {
  addDays,
  addMonths,
  dateToBoundaries,
  lastDayOfMonth,
  setMonthYear,
  startOfMonth,
  startOfDay,
} from './date-utils';
import CustomPropTypes from './custom-proptypes';

const getDirection = () => {
  const html = document.querySelector('html');
  return window.getComputedStyle(html, null).getPropertyValue('direction');
};

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
      minDate,
      maxDate,
      ...calendarProps
    } = this.props;

    delete calendarProps.onDateSelect;

    const sanitisedMinDate = startOfDay(minDate);
    const sanitisedMaxDate = startOfDay(maxDate);

    const selectedDate = this.props.date ? dateToBoundaries(this.props.date, sanitisedMinDate, sanitisedMaxDate)
                                         : null;
    const focusedDate = dateToBoundaries(this.state.focusedDate, sanitisedMinDate, sanitisedMaxDate);

    return (
      <BpkCalendarView
        onDateClick={this.handleDateSelect}
        onDateFocus={this.handleDateFocus}
        onDateKeyDown={this.handleDateKeyDown}
        onChangeMonth={this.handleChangeMonth}

        month={startOfMonth(focusedDate)}
        preventKeyboardFocus={this.state.preventKeyboardFocus}
        selectedDate={selectedDate}
        focusedDate={focusedDate}

        {...calendarProps}

        minDate={sanitisedMinDate}
        maxDate={sanitisedMaxDate}
      />
    );
  }
}

BpkCalendar.propTypes = {
  // Required
  changeMonthLabel: PropTypes.string.isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  formatMonth: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  // Optional
  date: PropTypes.instanceOf(Date),
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
  date: null,
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
