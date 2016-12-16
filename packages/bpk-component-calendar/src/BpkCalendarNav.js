import React, { PropTypes } from 'react';

import ArrowLeftIcon from 'bpk-component-icon/sm/arrow-left';
import ArrowRightIcon from 'bpk-component-icon/sm/arrow-right';
import BpkSelect from 'bpk-component-select';

import addMonths from 'date-fns/add_months';
import { getMonthsInRange, isWithinRange, getMonthRange, formatIsoMonth, parseIsoDate } from './utils';

import './bpk-calendar.scss';

const PrevIcon = () => (
  <ArrowLeftIcon className="bpk-calendar-nav__icon" />
);

const NextIcon = () => (
  <ArrowRightIcon className="bpk-calendar-nav__icon" />
);

const BpkCalendarNav = (props) => {
  const {
    month,
    onChangeMonth,
    prevMonthLabel,
    nextMonthLabel,
    minDate,
    maxDate,
    formatMonth,
  } = props;

  const { min, max } = getMonthRange(minDate, maxDate);
  const navigatableMonths = getMonthsInRange(minDate, maxDate);

  return (
    <div className="bpk-calendar-nav">
      <div className="bpk-calendar-nav__nudger">
        <button
          className="bpk-calendar-nav__button"
          onClick={() => onChangeMonth(addMonths(month, -1))}
          disabled={!isWithinRange(addMonths(month, -1), min, max)}
        >
          <PrevIcon />
          <span className="visually-hidden">{ prevMonthLabel }</span>
        </button>
      </div>
      <div className="bpk-calendar-nav__month">
        <BpkSelect
          id="monthsTODOchangeME"
          name="months"
          value={formatIsoMonth(month)}
          onChange={event => onChangeMonth(parseIsoDate(event.target.value))}
        >
          { navigatableMonths.map(m => (
            <option value={formatIsoMonth(m)} key={m.toString()}>{formatMonth(m)}</option>
          ))}
        </BpkSelect>
      </div>
      <div className="bpk-calendar-nav__nudger">
        <button
          className="bpk-calendar-nav__button"
          onClick={() => onChangeMonth(addMonths(month, 1))}
          disabled={!isWithinRange(addMonths(month, 1), min, max)}
        >
          <NextIcon />
          <span className="visually-hidden">{ nextMonthLabel }</span>
        </button>
      </div>
    </div>
  );
};

BpkCalendarNav.propTypes = {
  month: PropTypes.instanceOf(Date).isRequired,
  onChangeMonth: PropTypes.func,
  prevMonthLabel: PropTypes.string,
  nextMonthLabel: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  formatMonth: PropTypes.func.isRequired,
};

export default BpkCalendarNav;
