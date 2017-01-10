import React, { PropTypes } from 'react';

import ArrowLeftIcon from 'bpk-component-icon/sm/arrow-left';
import ArrowRightIcon from 'bpk-component-icon/sm/arrow-right';
import BpkSelect from 'bpk-component-select';

import addMonths from 'date-fns/add_months';
import { getMonthsInRange, isWithinRange, getMonthRange, formatIsoMonth, parseIsoDate, startOfMonth } from './utils';

import './bpk-calendar.scss';

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

  // Safeguard for disabled buttons is due to React bug in Chrome: https://github.com/facebook/react/issues/8308
  // PR: https://github.com/facebook/react/pull/8329 - unresolved as of 22/12/2016
  return (
    <div className="bpk-calendar-nav">
      <div className="bpk-calendar-nav__nudger">
        <button
          type="button"
          className="bpk-calendar-nav__button"
          onClick={() => {
            if (isWithinRange(prevMonth, min, max)) {
              onChangeMonth(prevMonth);
            }
          }}
          disabled={!isWithinRange(prevMonth, min, max)}
        >
          <ArrowLeftIcon className="bpk-calendar-nav__icon" />
          <span className="visually-hidden">{ formatMonth(addMonths(baseMonth, -1)) }</span>
        </button>
      </div>
      <div className="bpk-calendar-nav__month">
        <label htmlFor={`${id}_select`} className="visually-hidden">{ changeMonthLabel }</label>
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
          onClick={() => {
            if (isWithinRange(nextMonth, min, max)) {
              onChangeMonth(nextMonth);
            }
          }}
          disabled={!isWithinRange(addMonths(baseMonth, 1), min, max)}
        >
          <ArrowRightIcon className="bpk-calendar-nav__icon" />
          <span className="visually-hidden">{ formatMonth(addMonths(baseMonth, 1)) }</span>
        </button>
      </div>
    </div>
  );
};

BpkCalendarNav.propTypes = {
  id: PropTypes.string.isRequired,
  changeMonthLabel: PropTypes.string.isRequired,
  month: PropTypes.instanceOf(Date).isRequired,
  minDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
  formatMonth: PropTypes.func.isRequired,
  onChangeMonth: PropTypes.func.isRequired,
};

export default BpkCalendarNav;
