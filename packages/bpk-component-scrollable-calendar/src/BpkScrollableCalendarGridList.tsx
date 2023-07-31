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

import { Component } from 'react';
import type { ElementType } from 'react';
import { startOfDay, startOfMonth } from 'date-fns';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { VariableSizeList as List } from 'react-window';

import { cssModules } from '../../bpk-react-utils';
import {
  CALENDAR_SELECTION_TYPE,
  DateUtils,
} from '../../bpk-component-calendar';
import type { BpkCalendarGridProps } from '../../bpk-component-calendar';

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

type Props = Partial<BpkCalendarGridProps> & {
  minDate: Date;
  maxDate: Date;
  DateComponent: ElementType;
  formatDateFull: (date: Date) => Date | string;
  month: Date;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  formatMonth: (date: Date) => Date | string;
  focusedDate?: Date | null;
};

type State = {
  months: Date[];
  monthItemHeights: number[];
  outerHeight: number;
};

class BpkScrollableCalendarGridList extends Component<Props, State> {
  outerDiv: HTMLDivElement | null;

  static defaultProps = {
    // Disabling as the rule doesn't work when types are defined in a different file
    /* eslint-disable react/default-props-match-prop-types */
    className: null,
    focusedDate: null,
  };

  constructor(props: Props) {
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

  componentDidMount() {
    this.setComponentHeight();
    if (typeof document !== 'undefined') {
      window.addEventListener('resize', this.setComponentHeight);
      document.addEventListener('orientationchange', this.setComponentHeight);
      document.addEventListener('fullscreenchange', this.setComponentHeight);
    }
  }

  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      window.removeEventListener('resize', this.setComponentHeight);
      document.removeEventListener(
        'orientationchange',
        this.setComponentHeight,
      );
      document.removeEventListener('fullscreenchange', this.setComponentHeight);
    }
  }

  getHtmlElement = () =>
    typeof document !== 'undefined' ? document.querySelector('html') : {};

  getItemSize = (index: number) =>
    this.state.monthItemHeights[index] || ESTIMATED_MONTH_ITEM_HEIGHT;

  setComponentHeight = () => {
    const outerNode = this.outerDiv;
    if (outerNode) {
      if (outerNode.clientHeight > 0) {
        const newHeight = outerNode.clientHeight;
        this.setState({ outerHeight: newHeight });
      }
    } else {
      this.setState({ outerHeight: ESTIMATED_MONTH_ITEM_HEIGHT });
    }
  };

  rowRenderer = ({ index, style }: { index: number; style: {} }) => (
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

  calculateOffsetInPixels = (numberOfMonths: number) => {
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
    const date =
      selectionConfiguration?.type === CALENDAR_SELECTION_TYPE.single
        ? selectionConfiguration?.date
        : selectionConfiguration?.startDate;
    const selectedDate = focusedDate || date;

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
            (this.getHtmlElement() as HTMLElement).dir === 'rtl'
              ? { direction: 'rtl' }
              : {}
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

export default BpkScrollableCalendarGridList;
