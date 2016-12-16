import React, { Component, PropTypes } from 'react';

import objectAssign from 'object-assign';
import BpkCalendarGrid from './BpkCalendarGrid';
import BpkCalendarNav from './BpkCalendarNav';
import { isToday, addMonths, isWithinRange, getMonthRange, startOfMonth, startOfToday, isSameDay } from './utils';
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
      // set state
      this.setState({ selectedDate: date });
      // call callback
      this.props.onDateSelect(date);
    }
  }

  render() {
    const classNames = ['bpk-calendar'];
    const modifiers = {};

    // add all from this.props.dateModifiers

    if (this.props.highlightToday) { modifiers.today = isToday; }
    if (this.props.minDate && this.props.maxDate) {
      modifiers.disabled = date => !isWithinRange(date, this.props.minDate, this.props.maxDate);
    }

    objectAssign(modifiers, this.props.dateModifiers);

    return (
      <div className={classNames.join(' ')}>
        <BpkCalendarNav
          month={this.state.currentMonth}
          onChangeMonth={this.onChangeMonth}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          formatMonth={this.props.formatMonth}
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
  highlightToday: PropTypes.bool,
  showWeekendSeparator: PropTypes.bool,
  initialMonth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  formatMonth: PropTypes.func.isRequired,
  onDateSelect: PropTypes.func,
  weekDays: BpkCalendarGrid.propTypes.weekDays,
  weekStartsOn: BpkCalendarGrid.propTypes.weekStartsOn,
  dateModifiers: BpkCalendarGrid.propTypes.dateModifiers,
  getDateComponent: BpkCalendarGrid.propTypes.getDateComponent,
};

BpkCalendar.defaultProps = {
  highlightToday: false,
  showWeekendSeparator: false,
  initialMonth: new Date(),
  minDate: startOfToday(),
  maxDate: addMonths(startOfToday(), 12),
  dateModifiers: {},
  weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

export default BpkCalendar;
