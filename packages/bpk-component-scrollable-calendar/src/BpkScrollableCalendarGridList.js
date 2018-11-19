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
import { startOfDay, startOfMonth, isSameMonth } from 'date-fns';
import LazyLoad from 'react-lazyload';

import STYLES from './bpk-scrollable-calendar-grid-list.scss';
import BpkScrollableCalendarGrid from './BpkScrollableCalendarGrid';
import getMonthsArray from './utils';
import MonthPlaceholder from './MonthPlaceholder';

const getClassName = cssModules(STYLES);

class BpkScrollableCalendarGridList extends React.Component {
  constructor(props) {
    super(props);

    const startDate = startOfDay(startOfMonth(this.props.minDate));
    const endDate = startOfDay(startOfMonth(this.props.maxDate));
    const monthsCount = DateUtils.differenceInCalendarMonths(
      endDate,
      startDate,
    );
    const months = getMonthsArray(startDate, monthsCount);

    this.state = { months };
    this.months = [];
  }

  componentDidMount() {
    this.months[this.scrollToIndex()].scrollIntoView();
  }

  getHtmlElement = () =>
    typeof document !== 'undefined' ? document.querySelector('html') : {};

  scrollToIndex() {
    return isSameMonth(this.props.focusedDate, this.props.selectedDate)
      ? DateUtils.differenceInCalendarMonths(
          this.props.selectedDate,
          this.props.minDate,
        )
      : DateUtils.differenceInCalendarMonths(
          this.props.focusedDate,
          this.props.minDate,
        );
  }

  render() {
    const placeholder = <MonthPlaceholder />;
    return (
      <div
        className={getClassName('bpk-scrollable-calendar-grid-list__strip')}
        style={
          this.getHtmlElement().dir === 'rtl' ? { direction: 'rtl' } : null
        }
      >
        {this.state.months.map((month, index) => (
          <div key={month} ref={node => this.months.push(node)}>
            <LazyLoad height={270} once overflow placeholder={placeholder}>
              <div key={month}>
                <BpkScrollableCalendarGrid
                  onDateClick={this.props.onDateClick}
                  {...this.props}
                  month={month}
                  focusedDate={this.props.focusedDate}
                  preventKeyboardFocus={this.props.preventKeyboardFocus}
                  aria-hidden={index !== 1}
                  className={getClassName(
                    'bpk-scrollable-calendar-grid-list__item',
                  )}
                />
              </div>
            </LazyLoad>
          </div>
        ))}
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
