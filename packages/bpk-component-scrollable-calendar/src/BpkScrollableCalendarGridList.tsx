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

import { useRef, useState, useMemo, useEffect } from 'react';
import type { ElementType } from 'react';
import { startOfDay, startOfMonth } from 'date-fns';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

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

// These constants are here to facilitate calculating the height
// Row and month item heights are defined in rem to support text scaling
const ROW_HEIGHT = 2.75;
// This is the additional height of each grid without any rows.
const BASE_MONTH_ITEM_HEIGHT = 8.125;
const COLUMN_COUNT = 7;
// Most browsers have by default 16px root font size
const DEFAULT_ROOT_FONT_SIZE = 16;
// Most calendar grids have 5 rows. Calculate height in px as this is what react-window expects.
const ESTIMATED_MONTH_ITEM_HEIGHT =
  (BASE_MONTH_ITEM_HEIGHT + 5 * ROW_HEIGHT) * DEFAULT_ROOT_FONT_SIZE;
// Minimum month item width (useful for server-side rendering. This value will be overridden with an accurate width after mounting.)
const ESTIMATED_MONTH_ITEM_WIDTH = BASE_MONTH_ITEM_HEIGHT * 7 * DEFAULT_ROOT_FONT_SIZE;

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

const BpkScrollableCalendarGridList = ({
  className = null,
  focusedDate = null,
  minDate,
  selectionConfiguration,
  ...props
}: Props) => {
  const listRef = useRef(null);
  const startDate = startOfDay(startOfMonth(minDate));
  const endDate = startOfDay(startOfMonth(props.maxDate));
  const monthsCount = DateUtils.differenceInCalendarMonths(endDate, startDate);

  const getInitialRootFontSize = () =>
    parseFloat(getComputedStyle(document.documentElement).fontSize) ||
    DEFAULT_ROOT_FONT_SIZE;

  // The `react-window` API requires the height in pixels to be specified
  // To be able to scale text size, we use rem and then we get the root font size so that we can calculate the final value in px
  const [rootFontSize, setRootFontSize] = useState(getInitialRootFontSize);

  const months = useMemo(
    () => getMonthsArray(startDate, monthsCount),
    [minDate, monthsCount],
  );

  const monthItemHeights = useMemo(
    () =>
      getMonthItemHeights(
        months,
        props.weekStartsOn,
        COLUMN_COUNT,
        ROW_HEIGHT * rootFontSize,
        BASE_MONTH_ITEM_HEIGHT * rootFontSize,
      ),
    [rootFontSize, months, props.weekStartsOn],
  );

  useEffect(() => {
    if (listRef.current) {
      (listRef.current as List).resetAfterIndex(0);
    }
  }, [monthItemHeights]);

  const getHtmlElement = () =>
    typeof document !== 'undefined' ? document.querySelector('html') : {};

  const getItemSize = (index: number) =>
    monthItemHeights[index] || ESTIMATED_MONTH_ITEM_HEIGHT;

  const rowRenderer = ({ index, style }: { index: number; style: {} }) => (
    <div style={style}>
      <BpkScrollableCalendarGrid
        onDateClick={props.onDateClick}
        {...props}
        minDate={minDate}
        selectionConfiguration={selectionConfiguration}
        month={months[index]}
        focusedDate={focusedDate}
        preventKeyboardFocus={props.preventKeyboardFocus}
        aria-hidden={index !== 1}
        className={getClassName('bpk-scrollable-calendar-grid-list__item')}
      />
    </div>
  );

  const calculateOffsetInPixels = (numberOfMonths: number) => {
    // The `react-window` API requires the scroll offset to be provided in pixels.
    // Here we use the pre-calculated item heights to find the correct pixel offset
    let result = 0;
    for (let i = 0; i < numberOfMonths; i += 1) {
      result += getItemSize(i);
    }
    return result;
  };

  const onResize = () => {
    const newRootFontSize =
      parseFloat(getComputedStyle(document.documentElement).fontSize) ||
      DEFAULT_ROOT_FONT_SIZE;
    setRootFontSize(newRootFontSize);
  };

  const date =
    selectionConfiguration?.type === CALENDAR_SELECTION_TYPE.single
      ? selectionConfiguration?.date
      : selectionConfiguration?.startDate;
  const selectedDate = focusedDate || date;

  return (
    <div
      className={getClassName('bpk-scrollable-calendar-grid-list', className)}
    >
      <AutoSizer
        onResize={onResize}
        defaultHeight={ESTIMATED_MONTH_ITEM_HEIGHT}
        defaultWidth={ESTIMATED_MONTH_ITEM_WIDTH}
      >
        {({ height, width }: { height: number | string, width: number | string}) => (
          <List
            style={
              (getHtmlElement() as HTMLElement).dir === 'rtl'
                ? { direction: 'rtl' }
                : {}
            }
            width={width}
            height={height}
            estimatedItemSize={ESTIMATED_MONTH_ITEM_HEIGHT}
            itemSize={getItemSize}
            itemCount={months.length}
            overscanCount={1}
            initialScrollOffset={calculateOffsetInPixels(
              selectedDate
                ? DateUtils.differenceInCalendarMonths(selectedDate, minDate)
                : 0,
            )}
            ref={listRef}
          >
            {rowRenderer}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default BpkScrollableCalendarGridList;
