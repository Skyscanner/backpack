import React, { Component, PropTypes } from 'react';

import BpkCalendarGrid from './BpkCalendarGrid';
import BpkCalendarNav from './BpkCalendarNav';
import { isToday, addMonths, isWithinRange, getMonthRange, startOfMonth, startOfToday } from './utils';
import './bpk-calendar.scss';

class BpkCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMonth: startOfMonth(this.props.initialMonth),
    };

    this.onChangeMonth = this.onChangeMonth.bind(this);
  }

  onChangeMonth(newMonth) {
    const { min, max } = getMonthRange(this.props.minDate, this.props.maxDate);
    if (isWithinRange(newMonth, min, max)) {
      console.log(newMonth);
      this.setState({ currentMonth: newMonth });
    }
  }

  render() {
    const classNames = ['bpk-calendar'];
    const modifiers = {};

    if (this.props.highlightToday) { modifiers.today = isToday; }
    if (this.props.minDate && this.props.maxDate) {
      modifiers.disabled = date => !isWithinRange(date, this.props.minDate, this.props.maxDate);
    }

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
        />
      </div>
    );
  }
}

BpkCalendar.propTypes = {
  highlightToday: PropTypes.bool,
  initialMonth: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  formatMonth: PropTypes.func.isRequired,
};

BpkCalendar.defaultProps = {
  highlightToday: false,
  initialMonth: new Date(),
  minDate: startOfToday(),
  maxDate: addMonths(startOfToday(), 12),
};

export default BpkCalendar;
