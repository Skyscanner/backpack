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

import { formatIsoMonth, isWithinRange, getMonthRange } from './date-utils';

import STYLES from './bpk-calendar-scroll-grid-list.scss';

const getClassName = cssModules(STYLES);

const BpkCalendarScrollGridList = props => {
  const { ScrollComponent, className, focusedDate, ...rest } = props;

  const stripClassNames = [
    getClassName('bpk-calendar-scroll-grid-list__strip'),
  ];
  const classNames = [getClassName('bpk-calendar-scroll-grid-list')];
  if (className) {
    classNames.push(className);
  }
  const { min, max } = getMonthRange(rest.minDate, rest.maxDate);

  return (
    <div className={classNames.join(' ')}>
      <div className={stripClassNames.join(' ')}>
        {props.months.map(
          (m, index) =>
            isWithinRange(m, min, max) ? (
              <ScrollComponent
                {...rest}
                key={formatIsoMonth(m)}
                month={m}
                focusedDate={focusedDate}
                preventKeyboardFocus={rest.preventKeyboardFocus}
                aria-hidden={index !== 1}
                className={getClassName('bpk-calendar-scroll-grid-list__grid')}
              />
            ) : (
              <div
                className={getClassName('bpk-calendar-scroll-grid-list__dummy')}
                key={formatIsoMonth(m)}
              />
            ),
        )}
      </div>
    </div>
  );
};

BpkCalendarScrollGridList.propTypes = {
  ScrollComponent: PropTypes.func.isRequired,
  className: PropTypes.string,
  months: PropTypes.arrayOf(Date),
  focusedDate: PropTypes.instanceOf(Date),
};

BpkCalendarScrollGridList.defaultProps = {
  className: null,
  months: [],
  focusedDate: null,
};

const addCalendarScrollGridList = ScrollComponent => props => (
  <BpkCalendarScrollGridList ScrollComponent={ScrollComponent} {...props} />
);

export default BpkCalendarScrollGridList;
export { addCalendarScrollGridList };
