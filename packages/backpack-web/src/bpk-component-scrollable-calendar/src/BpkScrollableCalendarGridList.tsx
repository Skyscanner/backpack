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
import type { ElementType, ReactNode } from 'react';

import { startOfDay, startOfMonth } from 'date-fns';
import { List, useListRef } from 'react-window';

import {
  CALENDAR_SELECTION_TYPE,
  DateUtils,
} from '../../bpk-component-calendar';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import BpkScrollableCalendarGrid from './BpkScrollableCalendarGrid';
import { getMonthsArray, getMonthItemHeights } from './utils';

import type {
  BpkCalendarGridProps,
  SelectionConfiguration,
} from '../../bpk-component-calendar';
import type { RowComponentProps } from 'react-window';

import STYLES from './BpkScrollableCalendarGridList.module.scss';

const getClassName = cssModules(STYLES);

// These constants are here to facilitate calculating the height
// This is the additional height of each grid without any rows.
const BASE_MONTH_ITEM_HEIGHT = 8.125;
const COLUMN_COUNT = 7;
// Most browsers have by default 16px root font size
const DEFAULT_ROOT_FONT_SIZE = 16;

type Props = Partial<BpkCalendarGridProps> & {
  minDate: Date;
  maxDate: Date;
  DateComponent: ElementType;
  formatDateFull: (date: Date) => Date | string;
  month: Date;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  formatMonth: (date: Date) => ReactNode | string;
  focusedDate?: Date | null;
  selectionConfiguration?: SelectionConfiguration;
  className?: string | null;
  /**
   * Sets the height of month rows in 'rem' units. If not specified, the default value of `2.75rem` will be used.
   */
  customRowHeight?: number;
};

type RowProps = {
  months: Date[];
  monthItemHeights: number[];
  estimatedMonthItemHeight: number;
  minDate: Date;
  selectionConfiguration?: SelectionConfiguration;
  focusedDate: Date | null;
  gridProps: Omit<
    Props,
    | 'minDate'
    | 'selectionConfiguration'
    | 'focusedDate'
    | 'className'
    | 'customRowHeight'
  >;
};

const Row = ({
  focusedDate,
  gridProps,
  index,
  minDate,
  months,
  selectionConfiguration,
  style,
}: RowComponentProps<RowProps>) => (
  <div style={style}>
    <BpkScrollableCalendarGrid
      onDateClick={gridProps.onDateClick}
      {...gridProps}
      minDate={minDate}
      selectionConfiguration={selectionConfiguration}
      month={months[index]}
      focusedDate={focusedDate}
      preventKeyboardFocus={gridProps.preventKeyboardFocus}
      aria-hidden={index !== 1}
    />
  </div>
);

const rowHeight = (
  index: number,
  { estimatedMonthItemHeight, monthItemHeights }: RowProps,
) => monthItemHeights[index] || estimatedMonthItemHeight;

const BpkScrollableCalendarGridList = (props: Props) => {
  const {
    className = null,
    customRowHeight = 2.75,
    focusedDate = null,
    minDate,
    selectionConfiguration,
    ...rest
  } = props;
  const listRef = useListRef(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const startDate = useMemo(
    () => startOfDay(startOfMonth(minDate)),
    [minDate],
  );
  const endDate = useMemo(
    () => startOfDay(startOfMonth(rest.maxDate)),
    [rest.maxDate],
  );
  const monthsCount = DateUtils.differenceInCalendarMonths(endDate, startDate);

  // Row and month item heights are defined in rem to support text scaling
  const rowHeightRem = customRowHeight;
  // Most calendar grids have 5 rows. Calculate height in px as this is what react-window expects.
  const estimatedMonthItemHeight =
    (BASE_MONTH_ITEM_HEIGHT + 5 * rowHeightRem) * DEFAULT_ROOT_FONT_SIZE;

  // The `react-window` API requires the height in pixels to be specified
  // To be able to scale text size, we use rem and then we get the root font size so that we can calculate the final value in px
  // Initialise to the default; the sentinel ResizeObserver corrects this to the true rendered
  // value immediately on mount, so we never rely on getComputedStyle which can be stale under
  // browser font scaling.
  const [rootFontSize, setRootFontSize] = useState(DEFAULT_ROOT_FONT_SIZE);

  const months = useMemo(
    () => getMonthsArray(startDate, monthsCount),
    [monthsCount, startDate],
  );

  const monthItemHeights = useMemo(
    () =>
      getMonthItemHeights(
        months,
        rest.weekStartsOn,
        COLUMN_COUNT,
        rowHeightRem * rootFontSize,
        BASE_MONTH_ITEM_HEIGHT * rootFontSize,
      ),
    [rootFontSize, months, rest.weekStartsOn, rowHeightRem],
  );

  useEffect(() => {
    // Some browsers apply font scaling at the rendering level without updating getComputedStyle.
    // A sentinel element sized to 1rem lets us measure the true rendered px-per-rem directly,
    // so that react-window item heights stay accurate regardless of browser font scaling.
    const sentinel = sentinelRef.current;
    if (!sentinel || typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const newRootFontSize =
          entry.contentRect.width || DEFAULT_ROOT_FONT_SIZE;
        setRootFontSize(newRootFontSize);
      }
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const getHtmlElement = () =>
    typeof document !== 'undefined' ? document.querySelector('html') : {};

  const date =
    selectionConfiguration?.type === CALENDAR_SELECTION_TYPE.single
      ? selectionConfiguration?.date
      : selectionConfiguration?.startDate;
  const selectedDate = focusedDate || date;

  useEffect(() => {
    const initialIndex = selectedDate
      ? DateUtils.differenceInCalendarMonths(selectedDate, minDate)
      : 0;

    if (initialIndex > 0) {
      listRef.current?.scrollToRow({
        index: initialIndex,
        align: 'start',
        behavior: 'instant',
      });
    }
    // Mount-only: preserve the initial scroll position after first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isRtl = (getHtmlElement() as HTMLElement).dir === 'rtl';

  return (
    <div
      className={getClassName('bpk-scrollable-calendar-grid-list', className)}
      {...getDataComponentAttribute('ScrollableCalendarGridList')}
    >
      {/* Hidden sentinel element sized to 1rem; ResizeObserver measures its width to get the true rendered px-per-rem */}
      <div
        ref={sentinelRef}
        className={getClassName(
          'bpk-scrollable-calendar-grid-list__font-sentinel',
        )}
        aria-hidden="true"
      />
      <List
        listRef={listRef}
        rowComponent={Row}
        rowCount={months.length}
        rowHeight={rowHeight}
        rowProps={{
          months,
          monthItemHeights,
          estimatedMonthItemHeight,
          minDate,
          selectionConfiguration,
          focusedDate,
          gridProps: rest,
        }}
        overscanCount={1}
        defaultHeight={estimatedMonthItemHeight}
        role="presentation"
        style={isRtl ? { direction: 'rtl' } : undefined}
      />
    </div>
  );
};

export default BpkScrollableCalendarGridList;
