import React, { Component, PropTypes } from 'react';

import objectAssign from 'object-assign';
import BpkCalendarGrid from './BpkCalendarGrid';
import BpkCalendarNav from './BpkCalendarNav';
import { isToday, addMonths, isWithinRange, getMonthRange, startOfMonth, startOfToday, formatIsoDate, isSameMonth } from './utils';
import './bpk-calendar.scss';

class BpkCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMonth: startOfMonth(this.props.initialMonth),
      selectedDate: null,
    };

    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onDateSelect = this.onDateSelect.bind(this);
  }

  onChangeMonth(newMonth) {
    const { min, max } = getMonthRange(this.props.minDate, this.props.maxDate);
    if (isWithinRange(newMonth, min, max)) {
      this.setState({ currentMonth: newMonth });
    }
  }

  onDateSelect(date) {
    if (isWithinRange(date, this.props.minDate, this.props.maxDate)) {
      this.setState({ selectedDate: date });
      this.props.onDateSelect(
        formatIsoDate(date),
      );
    }
  }

  render() {
    const classNames = ['bpk-calendar'];
    const builtinModifiers = {};

    if (this.props.markToday) { builtinModifiers.today = isToday; }
    if (this.props.minDate && this.props.maxDate) {
      builtinModifiers.disabled = date => !isWithinRange(date, this.props.minDate, this.props.maxDate);
    }
    if (this.props.markOutsideDays) {
      builtinModifiers.outside = date => !isSameMonth(date, this.state.currentMonth);
    }

    const modifiers = objectAssign({}, builtinModifiers, this.props.dateModifiers);

    return (
      <div className={classNames.join(' ')}>
        <BpkCalendarNav
          month={this.state.currentMonth}
          onChangeMonth={this.onChangeMonth}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          formatMonth={this.props.formatMonth}
          id={`${this.props.id}__bpk_calendar_nav`}
        />
        <BpkCalendarGrid
          month={this.state.currentMonth}
          dateModifiers={modifiers}
          showWeekendSeparator={this.props.showWeekendSeparator}
          onDateClick={this.onDateSelect}
          weekDays={this.props.weekDays}
          weekStartsOn={this.props.weekStartsOn}
          getDateComponent={this.props.getDateComponent}
        />
      </div>
    );
  }
}

BpkCalendar.propTypes = {
  markToday: PropTypes.bool,
  showWeekendSeparator: PropTypes.bool,
  initialMonth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  formatMonth: PropTypes.func.isRequired,
  onDateSelect: PropTypes.func,
  weekDays: PropTypes.arrayOf(PropTypes.string),
  weekStartsOn: PropTypes.number,
  dateModifiers: PropTypes.objectOf(React.PropTypes.func),
  getDateComponent: PropTypes.func,
  id: PropTypes.string.isRequired,
};

BpkCalendar.defaultProps = {
  markToday: true,
  markOutsideDays: true,
  showWeekendSeparator: true,
  initialMonth: new Date(),
  minDate: startOfToday(),
  maxDate: addMonths(startOfToday(), 12),
  dateModifiers: {},
};

export default BpkCalendar;
