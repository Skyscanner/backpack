import React, { PropTypes } from 'react';

import ArrowLeftIcon from 'bpk-component-icon/lg/arrow-left';
import ArrowRightIcon from 'bpk-component-icon/lg/arrow-right';
import BpkSelect from 'bpk-component-select';

import {
  addMonths,
  formatIsoMonth,
  getMonthRange,
  getMonthsInRange,
  isWithinRange,
  parseIsoDate,
  startOfMonth,
} from './date-utils';

import './bpk-calendar.scss';

const changeMonth = (targetMonth, min, max, callback) => () => {
  // Safeguard for disabled buttons is due to React bug in Chrome: https://github.com/facebook/react/issues/8308
  // PR: https://github.com/facebook/react/pull/8329 - unresolved as of 22/12/2016
  if (isWithinRange(targetMonth, min, max)) {
    callback(targetMonth);
  }
};

const BpkCalendarNav = (props) => {
  const {
    id,
    month,
    minDate,
    maxDate,
    formatMonth,
    onChangeMonth,
    changeMonthLabel,
  } = props;

  const baseMonth = startOfMonth(month);
  const { min, max } = getMonthRange(minDate, maxDate);
  const navigatableMonths = getMonthsInRange(minDate, maxDate);
  const prevMonth = addMonths(baseMonth, -1);
  const nextMonth = addMonths(baseMonth, 1);

  return (
    <div className="bpk-calendar-nav">
      <div className="bpk-calendar-nav__nudger">
        <button
          type="button"
          className="bpk-calendar-nav__button"
          onClick={changeMonth(prevMonth, min, max, onChangeMonth)}
          disabled={!isWithinRange(prevMonth, min, max)}
        >
          <ArrowLeftIcon className="bpk-calendar-nav__icon" />
          <span className="bpk-calendar-nav__text--hidden">{ formatMonth(addMonths(baseMonth, -1)) }</span>
        </button>
      </div>
      <div className="bpk-calendar-nav__month">
        <label htmlFor={`${id}_select`} className="bpk-calendar-nav__text--hidden">{ changeMonthLabel }</label>
        <BpkSelect
          id={`${id}_select`}
          name="months"
          value={formatIsoMonth(baseMonth)}
          onChange={event => onChangeMonth(parseIsoDate(event.target.value))}
        >
          { navigatableMonths.map(m => (
            <option value={formatIsoMonth(m)} key={m.toString()}>{ formatMonth(m) }</option>
          ))}
        </BpkSelect>
      </div>
      <div className="bpk-calendar-nav__nudger">
        <button
          type="button"
          className="bpk-calendar-nav__button"
          onClick={changeMonth(nextMonth, min, max, onChangeMonth)}
          disabled={!isWithinRange(addMonths(baseMonth, 1), min, max)}
        >
          <ArrowRightIcon className="bpk-calendar-nav__icon" />
          <span className="bpk-calendar-nav__text--hidden">{ formatMonth(addMonths(baseMonth, 1)) }</span>
        </button>
      </div>
    </div>
  );
};

BpkCalendarNav.propTypes = {
  // Required
  changeMonthLabel: PropTypes.string.isRequired,
  formatMonth: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
  minDate: PropTypes.instanceOf(Date).isRequired,
  month: PropTypes.instanceOf(Date).isRequired,
  // Optional
  onChangeMonth: PropTypes.func,
};

BpkCalendarNav.defaultProps = {
  onChangeMonth: null,
};

export default BpkCalendarNav;
