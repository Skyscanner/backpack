/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
import { startOfDay, startOfMonth, isSameMonth } from 'date-fns';
import { VariableSizeList as List } from 'react-window';

import STYLES from './BpkScrollableCalendarGridList.css';
import BpkScrollableCalendarGrid from './BpkScrollableCalendarGrid';
import getMonthsArray from './utils';

const getClassName = cssModules(STYLES);

// The `react-window` API requires the height in pixels to be specified.
// These constants are here to facilitate calculating the height.
const ROW_HEIGHT = 42;
// This is the additional height of each grid without any rows.
const BASE_MONTH_ITEM_HEIGHT = 60;
const COLUMN_COUNT = 7;
// Most calendar grids have 5 rows:
const ESTIMATED_MONTH_ITEM_HEIGHT = BASE_MONTH_ITEM_HEIGHT + 5 * ROW_HEIGHT;

class BpkScrollableCalendarGridList extends React.Component {
  constructor(props) {
    super(props);

    this.outerDiv = null;

    const startDate = startOfDay(startOfMonth(this.props.minDate));
    const endDate = startOfDay(startOfMonth(this.props.maxDate));
    const monthsCount = DateUtils.differenceInCalendarMonths(
      endDate,
      startDate,
    );
    const months = getMonthsArray(startDate, monthsCount);
    // Here we calculate the height of each calendar grid item in pixels, as the `react-window` API
    // requires that these are provided so that they can be efficiently rendered.
    const monthItemHeights = months.map(month => {
      const firstDayOffset = (month.getDay() + 7 - props.weekStartsOn) % 7;
      const monthLength = DateUtils.daysInMonth(
        month.getYear(),
        month.getMonth(),
      );
      const calendarGridSpaces = firstDayOffset + monthLength;
      const rowCount = Math.ceil(calendarGridSpaces / COLUMN_COUNT);
      return BASE_MONTH_ITEM_HEIGHT + ROW_HEIGHT * rowCount;
    });

    this.state = {
      months,
      monthItemHeights,
      outerHeight: ESTIMATED_MONTH_ITEM_HEIGHT,
    };
  }

  componentDidMount = () => {
    this.setComponentHeight();
    if (typeof document !== 'undefined') {
      document.addEventListener('resize', this.setComponentHeight);
      document.addEventListener('orientationchange', this.setComponentHeight);
      document.addEventListener('fullscreenchange', this.setComponentHeight);
    }
  };

  getHtmlElement = () =>
    typeof document !== 'undefined' ? document.querySelector('html') : {};

  getItemSize = index =>
    this.state.monthItemHeights[index] || ESTIMATED_MONTH_ITEM_HEIGHT;

  setComponentHeight = () => {
    const outerNode = this.outerDiv;
    if (outerNode) {
      const newHeight = outerNode.clientHeight;
      this.setState({ outerHeight: newHeight });
    } else {
      this.setState({ outerHeight: ESTIMATED_MONTH_ITEM_HEIGHT });
    }
  };

  rowRenderer = ({ index, style }) => (
    <div style={style}>
      <BpkScrollableCalendarGrid
        onDateClick={this.props.onDateClick}
        {...this.props}
        month={this.state.months[index]}
        focusedDate={this.props.focusedDate}
        preventKeyboardFocus={this.props.preventKeyboardFocus}
        aria-hidden={index !== 1}
        className={getClassName('bpk-scrollable-calendar-grid-list__item')}
      />
    </div>
  );

  calculateOffsetInPixels = numberOfMonths => {
    // The `react-window` API requires the scroll offset to be provided in pixels.
    // Here we use the pre-calculated item heights to find the correct pixel offset
    let result = 0;
    for (let i = 0; i < numberOfMonths; i += 1) {
      result += this.getItemSize(i);
    }
    return result;
  };

  render() {
    return (
      <div
        className={getClassName(
          'bpk-scrollable-calendar-grid-list',
          this.props.className,
        )}
        ref={div => {
          this.outerDiv = div;
        }}
      >
        <List
          extraData={this.props}
          style={
            this.getHtmlElement().dir === 'rtl' ? { direction: 'rtl' } : {}
          }
          width="100%"
          height={this.state.outerHeight}
          estimatedItemSize={ESTIMATED_MONTH_ITEM_HEIGHT}
          itemSize={this.getItemSize}
          itemCount={this.state.months.length}
          rowCount={this.state.months.length}
          overscanCount={1}
          initialScrollOffset={this.calculateOffsetInPixels(
            isSameMonth(this.props.focusedDate, this.props.selectedDate)
              ? DateUtils.differenceInCalendarMonths(
                  this.props.selectedDate,
                  this.props.minDate,
                )
              : DateUtils.differenceInCalendarMonths(
                  this.props.focusedDate,
                  this.props.minDate,
                ),
          )}
        >
          {this.rowRenderer}
        </List>
      </div>
    );
  }
}

BpkScrollableCalendarGridList.propTypes = {
  className: PropTypes.string,
  minDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  focusedDate: PropTypes.instanceOf(Date),
  ...BpkCalendarGridPropTypes,
};

BpkScrollableCalendarGridList.defaultProps = {
  className: null,
  focusedDate: null,
};

export default BpkScrollableCalendarGridList;
