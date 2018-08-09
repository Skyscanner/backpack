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

import { cssModules } from 'bpk-react-utils';
import { DateUtils, BpkCalendarGridPropTypes } from 'bpk-component-calendar';
import { startOfDay, startOfMonth } from 'date-fns';

import STYLES from './bpk-scrollable-calendar-grid-list.scss';
import BpkScrollableCalendarGrid from './BpkScrollableCalendarGrid';

const getClassName = cssModules(STYLES);

const BpkScrollableCalendarGridList = props => {
  const { className, minDate, maxDate, focusedDate, ...rest } = props;

  const classNames = getClassName(
    'bpk-scrollable-calendar-grid-list',
    className,
  );
  if (className) {
    classNames.push(className);
  }

  const startDate = startOfDay(startOfMonth(minDate));
  const endDate = startOfDay(startOfMonth(maxDate));
  const months = [
    startDate,
    ...Array.from(
      Array(DateUtils.differenceInCalendarMonths(endDate, startDate)).keys(),
    ).map(i => DateUtils.addMonths(startDate, i + 1)),
  ];

  return (
    <div className={classNames}>
      <div className={getClassName('bpk-scrollable-calendar-grid-list__strip')}>
        {months.map((m, index) => (
          <BpkScrollableCalendarGrid
            {...props}
            key={DateUtils.formatIsoMonth(m)}
            month={m}
            focusedDate={focusedDate}
            preventKeyboardFocus={rest.preventKeyboardFocus}
            aria-hidden={index !== 1}
            className={getClassName('bpk-scrollable-calendar-grid-list__item')}
          />
        ))}
      </div>
    </div>
  );
};

BpkScrollableCalendarGridList.propTypes = {
  className: PropTypes.string,
  minDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
  focusedDate: PropTypes.instanceOf(Date),
  ...BpkCalendarGridPropTypes,
};

BpkScrollableCalendarGridList.defaultProps = {
  className: null,
  // Subtract one day from today's date to make today selectable by default
  minDate: DateUtils.addDays(new Date(), -1),
  maxDate: DateUtils.addMonths(new Date(), 12),
  focusedDate: null,
};

const addScrollableCalendarGridList = ListItem => props => (
  <BpkScrollableCalendarGridList ListItem={ListItem} {...props} />
);

export default BpkScrollableCalendarGridList;
export { addScrollableCalendarGridList };
