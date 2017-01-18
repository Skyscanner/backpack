import React, { PropTypes } from 'react';

import BpkCalendarNav from './BpkCalendarNav';
import BpkCalendarGrid from './BpkCalendarGrid';
import BpkCalendarDate from './BpkCalendarDate';
import CustomPropTypes from './custom-proptypes';
import './bpk-calendar.scss';

const BpkCalendarView = props => (
  <div className="bpk-calendar">
    <BpkCalendarNav
      id={`${props.id}__bpk_calendar_nav`}
      month={props.month}
      minDate={props.minDate}
      maxDate={props.maxDate}
      formatMonth={props.formatMonth}
      onChangeMonth={props.onChangeMonth}
      changeMonthLabel={props.changeMonthLabel}
    />
    <BpkCalendarGrid
      month={props.month}
      dateModifiers={props.dateModifiers}
      showWeekendSeparator={props.showWeekendSeparator}
      onDateClick={props.onDateClick}
      onDateKeyDown={props.onDateKeyDown}
      weekStartsOn={props.weekStartsOn}
      daysOfWeek={props.daysOfWeek}
      DateComponent={props.DateComponent}
      formatDateFull={props.formatDateFull}
      formatMonth={props.formatMonth}
      preventKeyboardFocus={props.preventKeyboardFocus}
    />
  </div>
);

BpkCalendarView.propTypes = {
  id: PropTypes.string.isRequired,
  changeMonthLabel: PropTypes.string.isRequired,
  formatMonth: PropTypes.func.isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  month: PropTypes.instanceOf(Date).isRequired,
  minDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
  preventKeyboardFocus: PropTypes.bool.isRequired,
  onDateClick: PropTypes.func,
  onDateKeyDown: PropTypes.func,
  onChangeMonth: PropTypes.func,

  showWeekendSeparator: PropTypes.bool,
  weekStartsOn: PropTypes.number,
  dateModifiers: CustomPropTypes.DateModifiers,
  DateComponent: PropTypes.func,
  formatDateFull: PropTypes.func.isRequired,
};

BpkCalendarView.defaultProps = {
  onDateClick: null,
  onChangeMonth: null,

  dateModifiers: {},
  DateComponent: BpkCalendarDate,
  weekStartsOn: 1,
  showWeekendSeparator: true,
};

export default BpkCalendarView;
