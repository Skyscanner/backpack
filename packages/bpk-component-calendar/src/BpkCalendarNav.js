/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import PropTypes from 'prop-types';
import React from 'react';

import ArrowLeftIcon from 'bpk-component-icon/lg/arrow-left';
import ArrowRightIcon from 'bpk-component-icon/lg/arrow-right';
import BpkSelect from 'bpk-component-select';
import { cssModules } from 'bpk-react-utils';

import {
  addMonths,
  formatIsoMonth,
  getMonthRange,
  getMonthsInRange,
  isWithinRange,
  parseIsoDate,
  startOfMonth,
} from './date-utils';

import STYLES from './bpk-calendar-nav.css';

const getClassName = cssModules(STYLES);

const changeMonth = ({ month, min, max, callback, source }) => event => {
  // Safeguard for disabled buttons is due to React bug in Chrome: https://github.com/facebook/react/issues/8308
  // PR: https://github.com/facebook/react/pull/8329 - unresolved as of 22/12/2016
  if (isWithinRange(month, min, max)) {
    event.persist();
    callback(event, { month, source });
  }
};

const BpkCalendarNav = props => {
  const {
    id,
    month,
    minDate,
    maxDate,
    formatMonth,
    onMonthChange,
    changeMonthLabel,
    disabled,
  } = props;

  const baseMonth = startOfMonth(month);
  const { min, max } = getMonthRange(minDate, maxDate);
  const navigatableMonths = getMonthsInRange(minDate, maxDate);
  const prevMonth = addMonths(baseMonth, -1);
  const nextMonth = addMonths(baseMonth, 1);

  return (
    <div className={getClassName('bpk-calendar-nav')}>
      <div className={getClassName('bpk-calendar-nav__nudger')}>
        <button
          type="button"
          className={getClassName('bpk-calendar-nav__button')}
          id={`${id}_month_nudger_previous`}
          onClick={changeMonth({
            month: prevMonth,
            min,
            max,
            callback: onMonthChange,
            source: 'PREV',
          })}
          disabled={disabled || !isWithinRange(prevMonth, min, max)}
        >
          <ArrowLeftIcon className={getClassName('bpk-calendar-nav__icon')} />
          <span className={getClassName('bpk-calendar-nav__text--hidden')}>
            {formatMonth(addMonths(baseMonth, -1))}
          </span>
        </button>
      </div>
      <div className={getClassName('bpk-calendar-nav__month')}>
        <label
          htmlFor={`${id}_select`}
          className={getClassName('bpk-calendar-nav__text--hidden')}
        >
          {changeMonthLabel}
        </label>
        <BpkSelect
          id={`${id}_select`}
          name="months"
          value={formatIsoMonth(baseMonth)}
          disabled={disabled}
          onChange={event => {
            event.persist();
            onMonthChange(event, {
              month: parseIsoDate(event.target.value),
              source: 'SELECT',
            });
          }}
        >
          {navigatableMonths.map(m => (
            <option value={formatIsoMonth(m)} key={m.toString()}>
              {formatMonth(m)}
            </option>
          ))}
        </BpkSelect>
      </div>
      <div className={getClassName('bpk-calendar-nav__nudger')}>
        <button
          type="button"
          className={getClassName('bpk-calendar-nav__button')}
          id={`${id}_month_nudger_next`}
          onClick={changeMonth({
            month: nextMonth,
            min,
            max,
            callback: onMonthChange,
            source: 'NEXT',
          })}
          disabled={
            disabled || !isWithinRange(addMonths(baseMonth, 1), min, max)
          }
        >
          <ArrowRightIcon className={getClassName('bpk-calendar-nav__icon')} />
          <span className={getClassName('bpk-calendar-nav__text--hidden')}>
            {formatMonth(addMonths(baseMonth, 1))}
          </span>
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
  onMonthChange: PropTypes.func,
  disabled: PropTypes.bool,
};

BpkCalendarNav.defaultProps = {
  onMonthChange: null,
  disabled: false,
};

export default BpkCalendarNav;
