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
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';

import STYLES from './bpk-scrollable-calendar-grid-list.scss';
import BpkScrollableCalendarGrid from './BpkScrollableCalendarGrid';
import getMonthsArray from './utils';

const getClassName = cssModules(STYLES);

const getMonthsArray = (startDate, count) => {
  const months = [];

  for (let i = 0; i < count + 1; i += 1) {
    months.push(DateUtils.addMonths(startDate, i));
  }

  return months;
};

const BpkScrollableCalendarGridList = props => {
  const { className, minDate, maxDate, focusedDate, ...rest } = props;

  const classNames = getClassName(
    'bpk-scrollable-calendar-grid-list',
    className,
  );

  const startDate = startOfDay(startOfMonth(minDate));
  const endDate = startOfDay(startOfMonth(maxDate));
  const monthsCount = DateUtils.differenceInCalendarMonths(endDate, startDate);
  const months = getMonthsArray(startDate, monthsCount);

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 276, // most common height (in px) of BpkScrollableCalendarGrid
  });

  /* eslint-disable react/prop-types */

  function rowRenderer({ index, key, style, parent }) {
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style}>
          <BpkScrollableCalendarGrid
            {...props}
            key={key}
            month={months[index]}
            focusedDate={focusedDate}
            preventKeyboardFocus={rest.preventKeyboardFocus}
            aria-hidden={index !== 1}
            className={getClassName('bpk-scrollable-calendar-grid-list__item')}
          />
        </div>
      </CellMeasurer>
    );
  }

  function renderList({ width, height }) {
    return (
      <List
        width={width}
        height={height}
        deferredMeasurementCache={cache}
        rowHeight={cache.rowHeight}
        rowRenderer={rowRenderer}
        rowCount={months.length}
        overscanRowCount={1}
      />
    );
  }

  /* eslint-enable react/prop-types */

  return (
    <div className={classNames}>
      <div className={getClassName('bpk-scrollable-calendar-grid-list__strip')}>
        <AutoSizer>{(width, height) => renderList(width, height)}</AutoSizer>{' '}
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
  focusedDate: null,
};

const addScrollableCalendarGridList = ListItem => props => (
  <BpkScrollableCalendarGridList ListItem={ListItem} {...props} />
);

export default BpkScrollableCalendarGridList;
export { addScrollableCalendarGridList };
