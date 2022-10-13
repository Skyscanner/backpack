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
import { startOfDay, startOfMonth } from 'date-fns';
import { VariableSizeList as List } from 'react-window';

import { cssModules, deprecated } from '../../bpk-react-utils';
import {
  DateUtils,
  BpkCalendarGridPropTypes,
} from '../../bpk-component-calendar';

import STYLES from './BpkScrollableCalendarGridList.module.scss';
import BpkScrollableCalendarGrid from './BpkScrollableCalendarGrid';
import { getMonthsArray, getMonthItemHeights } from './utils';

const getClassName = cssModules(STYLES);

// The `react-window` API requires the height in pixels to be specified.
// These constants are here to facilitate calculating the height.
const ROW_HEIGHT = 44;
// This is the additional height of each grid without any rows.
const BASE_MONTH_ITEM_HEIGHT = 130;
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
    const monthItemHeights = getMonthItemHeights(
      months,
      props.weekStartsOn,
      COLUMN_COUNT,
      ROW_HEIGHT,
      BASE_MONTH_ITEM_HEIGHT,
    );

    this.state = {
      months,
      monthItemHeights,
      outerHeight: ESTIMATED_MONTH_ITEM_HEIGHT,
    };
  }

  componentDidMount = () => {
    this.setComponentHeight();
    if (typeof document !== 'undefined') {
      window.addEventListener('resize', this.setComponentHeight);
      document.addEventListener('orientationchange', this.setComponentHeight);
      document.addEventListener('fullscreenchange', this.setComponentHeight);
    }
  };

  componentWillUnmount = () => {
    if (typeof document !== 'undefined') {
      window.removeEventListener('resize', this.setComponentHeight);
      document.removeEventListener(
        'orientationchange',
        this.setComponentHeight,
      );
      document.removeEventListener('fullscreenchange', this.setComponentHeight);
    }
  };

  getHtmlElement = () =>
    typeof document !== 'undefined' ? document.querySelector('html') : {};

  getItemSize = (index) =>
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

  calculateOffsetInPixels = (numberOfMonths) => {
    // The `react-window` API requires the scroll offset to be provided in pixels.
    // Here we use the pre-calculated item heights to find the correct pixel offset
    let result = 0;
    for (let i = 0; i < numberOfMonths; i += 1) {
      result += this.getItemSize(i);
    }
    return result;
  };

  render() {
    const { focusedDate, minDate, selectionConfiguration } = this.props;
    const { date, startDate } = selectionConfiguration || {};
    const selectedDate = focusedDate || date || startDate;

    return (
      <div
        className={getClassName(
          'bpk-scrollable-calendar-grid-list',
          this.props.className,
        )}
        ref={(div) => {
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
            selectedDate
              ? DateUtils.differenceInCalendarMonths(selectedDate, minDate)
              : 0,
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
