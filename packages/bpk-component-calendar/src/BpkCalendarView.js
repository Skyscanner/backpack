import React, { PropTypes } from 'react';

import BpkCalendarNav from './BpkCalendarNav';
import BpkCalendarGrid from './BpkCalendarGrid';
import BpkCalendarDate from './BpkCalendarDate';
import CustomPropTypes from './custom-proptypes';
import './bpk-calendar.scss';

const BpkCalendarView = (props) => {
  const classNames = ['bpk-calendar'];

  if (props.className) { classNames.push(props.className); }

  return (
    <div className={classNames.join(' ')}>
      <BpkCalendarNav
        className="bpk-calendar__nav"
        changeMonthLabel={props.changeMonthLabel}
        formatMonth={props.formatMonth}
        id={`${props.id}__bpk_calendar_nav`}
        maxDate={props.maxDate}
        minDate={props.minDate}
        month={props.month}
        onChangeMonth={props.onChangeMonth}
      />
      <BpkCalendarGrid
        className="bpk-calendar__grid"
        DateComponent={props.DateComponent}
        dateModifiers={props.dateModifiers}
        daysOfWeek={props.daysOfWeek}
        formatDateFull={props.formatDateFull}
        formatMonth={props.formatMonth}
        month={props.month}
        onDateClick={props.onDateClick}
        onDateKeyDown={props.onDateKeyDown}
        preventKeyboardFocus={props.preventKeyboardFocus}
        showWeekendSeparator={props.showWeekendSeparator}
        weekStartsOn={props.weekStartsOn}
      />
    </div>
  );
};

BpkCalendarView.propTypes = {
  // BpkCalendarNav & BpkCalendarGrid
  month: PropTypes.instanceOf(Date).isRequired,
  formatMonth: PropTypes.func.isRequired,

  // BpkCalendarNav
  changeMonthLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
  minDate: PropTypes.instanceOf(Date).isRequired,

  onChangeMonth: PropTypes.func,

  // BpkCalendarGrid
  DateComponent: PropTypes.func.isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  showWeekendSeparator: PropTypes.bool.isRequired,
  weekStartsOn: PropTypes.number.isRequired,

  className: PropTypes.string,
  dateModifiers: CustomPropTypes.DateModifiers,
  onDateClick: PropTypes.func,
  onDateKeyDown: PropTypes.func,
  preventKeyboardFocus: PropTypes.bool,
};

BpkCalendarView.defaultProps = {
  className: null,
  DateComponent: BpkCalendarDate,
  dateModifiers: {},
  onChangeMonth: null,
  onDateClick: null,
  showWeekendSeparator: true,
  weekStartsOn: 1,
};

export default BpkCalendarView;
