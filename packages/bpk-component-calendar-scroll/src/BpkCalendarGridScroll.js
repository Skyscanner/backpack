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

import {
  formatIsoMonth,
  dateToBoundaries,
  startOfDay,
  setMonthYear,
  isWithinRange,
  getMonthRange,
} from './date-utils';

import STYLES from './bpk-calendar-grid-scroll.scss';

const getClassName = cssModules(STYLES);

const getFocusedDateForMonth = (month, currentFocusedDate, minDate, maxDate) =>
  dateToBoundaries(
    setMonthYear(currentFocusedDate, month.getMonth(), month.getFullYear()),
    startOfDay(minDate),
    startOfDay(maxDate),
  );

const BpkCalendarGridScroll = props => {
  const { ScrollComponent, className, focusedDate, ...rest } = props;

  const stripClassNames = [getClassName('bpk-calendar-grid-scroll__strip')];
  const classNames = [getClassName('bpk-calendar-grid-scroll')];
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
                preventKeyboardFocus={index !== 1 || rest.preventKeyboardFocus}
                isKeyboardFocusable={index === 1}
                focusedDate={
                  index === 1
                    ? focusedDate
                    : getFocusedDateForMonth(
                        m,
                        focusedDate,
                        rest.minDate,
                        rest.maxDate,
                      )
                }
                aria-hidden={index !== 1}
                className={getClassName('bpk-calendar-grid-scroll__grid')}
              />
            ) : (
              <div
                className={getClassName('bpk-calendar-grid-scroll__dummy')}
                key={formatIsoMonth(m)}
              />
            ),
        )}
      </div>
    </div>
  );
};

BpkCalendarGridScroll.propTypes = {
  ScrollComponent: PropTypes.func.isRequired,
  className: PropTypes.string,
  months: PropTypes.arrayOf(Date),
  focusedDate: PropTypes.instanceOf(Date),
};

BpkCalendarGridScroll.defaultProps = {
  className: null,
  months: [],
  focusedDate: null,
};

const addCalendarGridScroll = ScrollComponent => props => (
  <BpkCalendarGridScroll ScrollComponent={ScrollComponent} {...props} />
);

export default BpkCalendarGridScroll;
export { addCalendarGridScroll };
