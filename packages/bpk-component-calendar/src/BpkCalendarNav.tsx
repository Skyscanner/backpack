/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import type { ChangeEvent, MouseEvent } from 'react';

import {
  textColors,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkAriaLive from '../../bpk-component-aria-live';
import ArrowLeftIcon from '../../bpk-component-icon/lg/arrow-left';
import ArrowRightIcon from '../../bpk-component-icon/lg/arrow-right';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkSelect from '../../bpk-component-select';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import {
  addMonths,
  formatIsoMonth,
  getMonthRange,
  getMonthsInRange,
  isWithinRange,
  parseIsoDate,
  startOfMonth,
} from './date-utils';

import STYLES from './BpkCalendarNav.module.scss';

const getClassName = cssModules(STYLES);

type MonthChangeEvent =
  | ChangeEvent<HTMLInputElement>
  | MouseEvent<HTMLButtonElement>;

type Props = {
  changeMonthLabel: string;
  /**
   * A function to format a human-readable month, for example: "January 2018":
   * If you just need to quickly prototype, use the following from [`date-fns`](https://date-fns.org/docs/format#usage)
   */
  formatMonth: (month: Date) => string;
  id: string;
  maxDate: Date;
  minDate: Date;
  month: Date;
  nextMonthLabel: string;
  previousMonthLabel: string;
  onMonthChange?: (
    event: MonthChangeEvent,
    options: { month: Date; source: string },
  ) => void;
  disabled?: boolean;
};
const changeMonth =
  ({
    callback,
    max,
    min,
    month,
    source,
  }: {
    callback: (
      event: MonthChangeEvent,
      options: { month: Date; source: string },
    ) => void;
    max: Date;
    min: Date;
    month: Date;
    source: string;
  }) =>
  (event: MonthChangeEvent) => {
    // Safeguard for disabled buttons is due to React bug in Chrome: https://github.com/facebook/react/issues/8308
    // PR: https://github.com/facebook/react/pull/8329 - unresolved as of 22/12/2016
    if (isWithinRange(month, { start: min, end: max })) {
      event.persist();
      callback(event, { month, source });
    }
  };

const BpkCalendarNav = ({
  changeMonthLabel,
  disabled = false,
  formatMonth,
  id,
  maxDate,
  minDate,
  month,
  nextMonthLabel,
  onMonthChange = () => {},
  previousMonthLabel,
}: Props) => {
  const baseMonth = startOfMonth(month);
  const { max, min } = getMonthRange(minDate, maxDate);
  const navigatableMonths = getMonthsInRange(minDate, maxDate);
  const prevMonth = addMonths(baseMonth, -1);
  const nextMonth = addMonths(baseMonth, 1);

  return (
    <div className={getClassName('bpk-calendar-nav')}>
      <div style={{ display: 'table-row' }}>
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
            disabled={
              disabled || !isWithinRange(prevMonth, { start: min, end: max })
            }
          >
            <ArrowLeftIcon
              className={getClassName('bpk-calendar-nav__icon')}
              fill={
                disabled || !isWithinRange(prevMonth, { start: min, end: max })
                  ? textColors.textDisabledDay
                  : 'currentcolor'
              }
            />
            <span className={getClassName('bpk-calendar-nav__text--hidden')}>
              {previousMonthLabel}
            </span>
          </button>
        </div>
        <div className={getClassName('bpk-calendar-nav__month')}>
          <label
            htmlFor={`${id}_select`}
            className={getClassName('bpk-calendar-nav__text--hidden')} {...getDataComponentAttribute('CalendarNav')}
          >
            {changeMonthLabel}
          </label>

          <BpkSelect
            id={`${id}_select`}
            name="months"
            value={formatIsoMonth(baseMonth)}
            disabled={disabled}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              event.persist();
              onMonthChange(event, {
                month: parseIsoDate(event.target.value),
                source: 'SELECT',
              });
            }}
          >
            {navigatableMonths.map((m) => (
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
              disabled ||
              !isWithinRange(addMonths(baseMonth, 1), { start: min, end: max })
            }
          >
            <ArrowRightIcon
              className={getClassName('bpk-calendar-nav__icon')}
              fill={
                disabled || !isWithinRange(addMonths(baseMonth, 1), { start: min, end: max })
                ? textColors.textDisabledDay
                : 'currentcolor'
              }
            />
            <span className={getClassName('bpk-calendar-nav__text--hidden')}>
              {nextMonthLabel}
            </span>
          </button>
        </div>
        <BpkAriaLive>{formatMonth(baseMonth)}</BpkAriaLive>
      </div>
    </div>
  );
};

export default BpkCalendarNav;
