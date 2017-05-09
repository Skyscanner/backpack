import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
  isSameMonth,
} from './date-utils';

import './bpk-calendar.scss';

const changeMonth = (targetMonth, min, max, callback) => () => {
  // Safeguard for disabled buttons is due to React bug in Chrome: https://github.com/facebook/react/issues/8308
  // PR: https://github.com/facebook/react/pull/8329 - unresolved as of 22/12/2016
  if (isWithinRange(targetMonth, min, max)) {
    callback(targetMonth);
  }
};

class BpkCalendarNav extends Component {
  shouldComponentUpdate(nextProps) {
    if (!isSameMonth(nextProps.month, this.props.month)) {
      return true;
    }
    if (!isSameMonth(nextProps.minDate, this.props.minDate)) {
      return true;
    }
    if (!isSameMonth(nextProps.maxDate, this.props.maxDate)) {
      return true;
    }
    if (nextProps.onMonthChange !== this.props.onMonthChange) {
      return true;
    }
    if (nextProps.formatMonth !== this.props.formatMonth) {
      return true;
    }
    if (nextProps.changeMonthLabel !== this.props.changeMonthLabel) {
      return true;
    }
    if (nextProps.id !== this.props.id) {
      return true;
    }

    return false;
  }

  render() {
    const {
      id,
      month,
      minDate,
      maxDate,
      formatMonth,
      onMonthChange,
      changeMonthLabel,
    } = this.props;

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
            onClick={changeMonth(prevMonth, min, max, onMonthChange)}
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
            onChange={event => onMonthChange(parseIsoDate(event.target.value))}
          >
            { navigatableMonths.map(m => (
              <option value={formatIsoMonth(m)} key={formatIsoMonth(m)}>{ formatMonth(m) }</option>
            ))}
          </BpkSelect>
        </div>
        <div className="bpk-calendar-nav__nudger">
          <button
            type="button"
            className="bpk-calendar-nav__button"
            onClick={changeMonth(nextMonth, min, max, onMonthChange)}
            disabled={!isWithinRange(addMonths(baseMonth, 1), min, max)}
          >
            <ArrowRightIcon className="bpk-calendar-nav__icon" />
            <span className="bpk-calendar-nav__text--hidden">{ formatMonth(addMonths(baseMonth, 1)) }</span>
          </button>
        </div>
      </div>
    );
  }
}

BpkCalendarNav.propTypes = {
  // Required
  changeMonthLabel: PropTypes.string.isRequired,
  formatMonth: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
  minDate: PropTypes.instanceOf(Date).isRequired,
  month: PropTypes.instanceOf(Date).isRequired,
  // Optional
  onMonthChange: PropTypes.func,
};

BpkCalendarNav.defaultProps = {
  onMonthChange: null,
};

export default BpkCalendarNav;
