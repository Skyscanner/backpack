import React, { Component, PropTypes } from 'react';

import objectAssign from 'object-assign';
import BpkCalendarGrid from './BpkCalendarGrid';
import BpkCalendarNav from './BpkCalendarNav';
import BpkCalendarDate from './BpkCalendarDate';
import {
  isToday,
  addMonths,
  isWithinRange,
  getMonthRange,
  startOfMonth,
  startOfToday,
  formatIsoDate,
  isSameMonth,
} from './utils';
import CustomPropTypes from './custom-proptypes';
import './bpk-calendar.scss';

const getDateComponent = modifiers => props => <BpkCalendarDate modifiers={modifiers} {...props} />;

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
          id={`${this.props.id}__bpk_calendar_nav`}
          month={this.state.currentMonth}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          formatMonth={this.props.formatMonth}
          onChangeMonth={this.onChangeMonth}
          changeMonthLabel={this.props.changeMonthLabel}
        />
        <BpkCalendarGrid
          month={this.state.currentMonth}
          dateModifiers={modifiers}
          showWeekendSeparator={this.props.showWeekendSeparator}
          onDateClick={this.onDateSelect}
          weekStartsOn={this.props.weekStartsOn}
          daysOfWeek={this.props.daysOfWeek}
          getDateComponent={this.props.getDateComponent}
        />
      </div>
    );
  }
}

BpkCalendar.propTypes = {
  id: PropTypes.string.isRequired,
  changeMonthLabel: PropTypes.string.isRequired,
  formatMonth: PropTypes.func.isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  onDateSelect: PropTypes.func,
  markToday: PropTypes.bool,
  markOutsideDays: PropTypes.bool,
  showWeekendSeparator: PropTypes.bool,
  initialMonth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  weekStartsOn: PropTypes.number,
  dateModifiers: PropTypes.objectOf(React.PropTypes.func),
  getDateComponent: PropTypes.func,
};

BpkCalendar.defaultProps = {
  onDateSelect: null,
  markToday: true,
  markOutsideDays: true,
  showWeekendSeparator: true,
  initialMonth: new Date(),
  minDate: startOfToday(),
  maxDate: addMonths(startOfToday(), 12),
  weekStartsOn: 1,
  dateModifiers: {},
  getDateComponent,
};

export default BpkCalendar;
