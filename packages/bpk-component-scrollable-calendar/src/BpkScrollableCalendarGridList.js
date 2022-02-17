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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules, deprecated } from 'bpk-react-utils';
import { DateUtils, BpkCalendarGridPropTypes } from 'bpk-component-calendar';
import { startOfDay, startOfMonth } from 'date-fns';
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';

import STYLES from './BpkScrollableCalendarGridList.module.scss';
import BpkScrollableCalendarGrid from './BpkScrollableCalendarGrid';
import getMonthsArray from './utils';

const getClassName = cssModules(STYLES);

class BpkScrollableCalendarGridList extends React.Component {
  constructor(props) {
    super(props);

    this.rowRenderer = this.rowRenderer.bind(this);
    this.renderList = this.renderList.bind(this);

    const startDate = startOfDay(startOfMonth(this.props.minDate));
    const endDate = startOfDay(startOfMonth(this.props.maxDate));
    const monthsCount = DateUtils.differenceInCalendarMonths(
      endDate,
      startDate,
    );
    const months = getMonthsArray(startDate, monthsCount);

    const cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 276, // most common height (in px) of BpkScrollableCalendarGrid
    });
    this.state = {
      months,
      cache,
    };
  }

  getHtmlElement = () =>
    typeof document !== 'undefined' ? document.querySelector('html') : {};

  rowRenderer({ index, key, parent, style }) {
    return (
      <CellMeasurer
        key={key}
        cache={this.state.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style}>
          <BpkScrollableCalendarGrid
            onDateClick={this.props.onDateClick}
            {...this.props}
            key={key}
            month={this.state.months[index]}
            focusedDate={this.props.focusedDate}
            preventKeyboardFocus={this.props.preventKeyboardFocus}
            aria-hidden={index !== 1}
            className={getClassName('bpk-scrollable-calendar-grid-list__item')}
          />
        </div>
      </CellMeasurer>
    );
  }

  renderList(width, height, minDate, focusedDate, selectionConfiguration) {
    const { date, startDate } = selectionConfiguration || {};
    const selectedDate = focusedDate || date || startDate;
    return (
      <List
        extraData={this.props}
        style={this.getHtmlElement().dir === 'rtl' ? { direction: 'rtl' } : {}}
        width={width}
        height={height}
        deferredMeasurementCache={this.state.cache}
        rowHeight={this.state.cache.rowHeight}
        rowRenderer={this.rowRenderer}
        rowCount={this.state.months.length}
        overscanRowCount={0}
        scrollToIndex={
          selectedDate
            ? DateUtils.differenceInCalendarMonths(selectedDate, minDate)
            : 0
        }
      />
    );
  }

  render() {
    const { focusedDate, minDate, selectionConfiguration } = this.props;
    return (
      <div
        className={getClassName(
          'bpk-scrollable-calendar-grid-list',
          this.props.className,
        )}
      >
        <AutoSizer>
          {({ height, width }) =>
            this.renderList(
              width,
              height,
              minDate,
              focusedDate,
              selectionConfiguration,
            )
          }
        </AutoSizer>
      </div>
    );
  }
}

BpkScrollableCalendarGridList.propTypes = {
  className: PropTypes.string,
  minDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
  selectedDate: deprecated(
    PropTypes.instanceOf(Date),
    'Use selectionConfiguration to set selectedDate',
  ),
  focusedDate: PropTypes.instanceOf(Date),
  ...BpkCalendarGridPropTypes,
};

BpkScrollableCalendarGridList.defaultProps = {
  className: null,
  focusedDate: null,
  selectedDate: null,
};

export default BpkScrollableCalendarGridList;
