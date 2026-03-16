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
import { Component, useEffect } from 'react';


import { endOfMonth } from 'date-fns/endOfMonth';
import { startOfMonth } from 'date-fns/startOfMonth';

import {
  DateUtils,
  CustomPropTypes,
  CALENDAR_SELECTION_TYPE,
} from '../../packages/bpk-component-calendar';
import BpkScrollableCalendar, {
  BpkScrollableCalendarDate,
  BpkScrollableCalendarGrid,
  BpkScrollableCalendarGridList,
} from '../../packages/bpk-component-scrollable-calendar';
import { action } from '../bpk-storybook-utils';

import {
  formatDateFull,
  formatDateFullArabic,
  formatDateFullJapanese,
  formatMonth,
  formatMonthArabic,
  formatMonthJapanese,
  weekDays,
  weekDaysMoreWeekend,
  weekDaysArabic,
  weekDaysJapanese,
} from './test-utils';

export default class ScrollableCal extends Component {
  constructor(props) {
    super(props);

    if (this.props.selectionConfiguration.type === 'range') {
      this.state = {
        selectionConfiguration: {
          type: this.props.selectionConfiguration.type,
          startDate: this.props.selectionConfiguration.startDate,
          endDate: this.props.selectionConfiguration.endDate,
        },
      };
    } else {
      this.state = {
        selectionConfiguration: {
          type: this.props.selectionConfiguration.type,
          date: this.props.selectionConfiguration.date,
        },
      };
    }
  }

  render() {
    return (
      <BpkScrollableCalendar
        id="calendar"
        {...this.props}
        onDateSelect={(startDate, endDate = null) => {
          if (this.props.selectionConfiguration.type === 'range') {
            if (startDate && !endDate) {
              this.setState({
                selectionConfiguration: {
                  type: this.props.selectionConfiguration.type,
                  startDate,
                  endDate: null,
                },
              });
              action('Selected day')(startDate);
            }
            if (startDate && endDate) {
              this.setState({
                selectionConfiguration: {
                  type: this.props.selectionConfiguration.type,
                  startDate,
                  endDate,
                },
              });
              action('Selected end day')(endDate);
            }
          } else {
            this.setState({
              selectionConfiguration: {
                type: this.props.selectionConfiguration.type,
                date: startDate,
              },
            });
            action('Selected day')(startDate);
          }
        }}
        selectionConfiguration={this.state.selectionConfiguration}
      />
    );
  }
}
ScrollableCal.propTypes = {
  selectionConfiguration: CustomPropTypes.SelectionConfiguration,
};

ScrollableCal.defaultProps = {
  selectionConfiguration: {
    type: CALENDAR_SELECTION_TYPE.single,
    date: new Date(),
  },
};

const DefaultExample = () => (
  <ScrollableCal
    weekStartsOn={1}
    daysOfWeek={weekDays}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    DateComponent={BpkScrollableCalendarDate}
    minDate={new Date(2020, 3, 1)}
    maxDate={new Date(2020, 6, 1)}
    selectionConfiguration={{
      type: CALENDAR_SELECTION_TYPE.single,
      date: new Date(2020, 3, 15),
    }}
  />
);

const DefaultExampleWithCustomHeight = () => (
  <ScrollableCal
    weekStartsOn={1}
    daysOfWeek={weekDays}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    DateComponent={BpkScrollableCalendarDate}
    minDate={new Date(2020, 3, 1)}
    maxDate={new Date(2020, 6, 1)}
    selectionConfiguration={{
      type: CALENDAR_SELECTION_TYPE.single,
      date: new Date(2020, 3, 15),
    }}
    customRowHeight={3}
  />
);


const RangeExample = () => (
  <ScrollableCal
    weekStartsOn={1}
    daysOfWeek={weekDays}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    DateComponent={BpkScrollableCalendarDate}
    markToday={false}
    minDate={new Date(2020, 3, 1)}
    maxDate={new Date(2020, 6, 1)}
    selectionConfiguration={{
      type: 'range',
      startDate: new Date(2020, 5, 7),
      endDate: new Date(2020, 5, 15),
    }}
  />
);

const SplitWeekRangeExample = () => (
  <ScrollableCal
    DateComponent={BpkScrollableCalendarDate}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={0}
    minDate={new Date(2020, 3, 1)}
    maxDate={new Date(2020, 6, 1)}
    selectionConfiguration={{
      type: 'range',
      startDate: new Date(2020, 3, 29),
      endDate: new Date(2020, 4, 4),
    }}
  />
);

const WeekStartsOnSixExample = () => (
  <ScrollableCal
    weekStartsOn={6}
    daysOfWeek={weekDays}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    DateComponent={BpkScrollableCalendarDate}
    // Subtract one day from today's date to make today selectable by default
    minDate={DateUtils.addDays(new Date(), -1)}
    maxDate={DateUtils.addMonths(new Date(), 12)}
  />
);

const WithFocusedDateExample = () => (
  <ScrollableCal
    weekStartsOn={1}
    daysOfWeek={weekDays}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    DateComponent={BpkScrollableCalendarDate}
    // Subtract one day from today's date to make today selectable by default
    minDate={DateUtils.addDays(new Date(), -1)}
    focusedDate={DateUtils.addMonths(new Date(), 11)}
    maxDate={DateUtils.addMonths(new Date(), 12)}
  />
);

const TallContainerExample = () => (
  <div style={{ height: '500px', display: 'flex' }}>
    <ScrollableCal
      weekStartsOn={1}
      daysOfWeek={weekDays}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      DateComponent={BpkScrollableCalendarDate}
      // Subtract one day from today's date to make today selectable by default
      minDate={DateUtils.addDays(new Date(), -1)}
      maxDate={DateUtils.addMonths(new Date(), 12)}
    />
  </div>
);

const SingleMonthExample = () => (
  <div style={{ height: '500px', display: 'flex' }}>
    <ScrollableCal
      weekStartsOn={1}
      daysOfWeek={weekDays}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      DateComponent={BpkScrollableCalendarDate}
      // Subtract one day from today's date to make today selectable by default
      minDate={startOfMonth(new Date())}
      maxDate={endOfMonth(new Date())}
    />
  </div>
);

const ScrollableCalendarDateExample = () => (
  <BpkScrollableCalendarDate
    date={new Date()}
    onDateClick={action('Clicked day')}
  />
);

const ScrollableCalendarGridExample = () => (
  <BpkScrollableCalendarGrid
    month={new Date(2019, 1, 0)}
    weekStartsOn={1}
    daysOfWeek={weekDays}
    onDateClick={action('Clicked day')}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    DateComponent={BpkScrollableCalendarDate}
  />
);

const ScrollableCalendarGridListExample = () => (
  <BpkScrollableCalendarGridList
    month={new Date()}
    weekStartsOn={1}
    daysOfWeek={weekDays}
    onDateClick={action('Clicked day')}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    DateComponent={BpkScrollableCalendarDate}
    minDate={DateUtils.addDays(new Date(), -1)}
    maxDate={DateUtils.addMonths(new Date(), 12)}
  />
);

const WeekStartsOnSundayExample = () => (
  <ScrollableCal
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={0}
    minDate={DateUtils.addDays(new Date(), -1)}
    maxDate={DateUtils.addMonths(new Date(), 12)}
  />
);

const HonestWeekendExample = () => (
  <ScrollableCal
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDaysMoreWeekend}
    weekStartsOn={1}
    minDate={DateUtils.addDays(new Date(), -1)}
    maxDate={DateUtils.addMonths(new Date(), 12)}
  />
);

const ArabicLocaleExample = () => (
  <ScrollableCal
    id="myCalendar"
    formatMonth={formatMonthArabic}
    formatDateFull={formatDateFullArabic}
    daysOfWeek={weekDaysArabic}
    weekStartsOn={6}
    minDate={DateUtils.addDays(new Date(), -1)}
    maxDate={DateUtils.addMonths(new Date(), 12)}
  />
);

const JapaneseLocaleExample = () => (
  <ScrollableCal
    id="myCalendar"
    formatMonth={formatMonthJapanese}
    formatDateFull={formatDateFullJapanese}
    daysOfWeek={weekDaysJapanese}
    weekStartsOn={0}
    minDate={DateUtils.addDays(new Date(), -1)}
    maxDate={DateUtils.addMonths(new Date(), 12)}
  />
);

const DifferentMinMaxDatesExample = () => (
  <ScrollableCal
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={1}
    minDate={new Date(2020, 4, 15)}
    maxDate={new Date(2020, 5, 15)}
  />
);

const DontMarkTodayExample = () => (
  <ScrollableCal
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={1}
    markToday={false}
    minDate={DateUtils.addDays(new Date(), -1)}
    maxDate={DateUtils.addMonths(new Date(), 12)}
  />
);

const PastCalendarExample = () => (
  <ScrollableCal
    id="myCalendar"
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    daysOfWeek={weekDays}
    weekStartsOn={1}
    markToday={false}
    minDate={new Date(2020, 3, 1)}
    maxDate={new Date(2020, 6, 1)}
  />
);

// ─── Font-scale height debug stories ────────────────────────────────────────
// These four cases help diagnose the Samsung Browser font-scale layout bug.
//
// March 2020 (weekStartsOn=1): firstDayOffset=6, 31 days → 6 weeks
// April 2020 (weekStartsOn=1): firstDayOffset=2, 30 days → 5 weeks
//
// Showing 2 months per case so that any height miscalculation causes visible
// overlap or gap between months (easier to spot than a single-month cutoff).
//
// SCALED_FONT_SIZE simulates Samsung Browser "Webpage text size" at 70% (11.2px).
// When browsers apply font scaling without updating getComputedStyle, rootFontSize
// stays at 16px while CSS renders 1rem as 11.2px, causing height miscalculation.
// The useEffect sets root font-size on mount and restores it on unmount so the
// story does not bleed into other Storybook stories.

const SCALED_FONT_SIZE = '11.2px'; // 16px × 70%
const LARGE_FONT_SIZE = '24px';    // 16px × 150%

const SIX_WEEK_MONTH_START = new Date(2020, 2, 1);   // March 2020 → 6 weeks
const SIX_WEEK_MONTH_END   = new Date(2020, 3, 30);  // + April 2020

const FIVE_WEEK_MONTH_START = new Date(2020, 3, 1);  // April 2020 → 5 weeks
const FIVE_WEEK_MONTH_END   = new Date(2020, 4, 31); // + May 2020

const GridListFixedHeight = ({ maxDate, minDate }) => (
  <div style={{ height: '500px', display: 'flex' }}>
    <BpkScrollableCalendarGridList
      month={minDate}
      weekStartsOn={1}
      daysOfWeek={weekDays}
      onDateClick={action('Clicked day')}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      DateComponent={BpkScrollableCalendarDate}
      minDate={minDate}
      maxDate={maxDate}
    />
  </div>
);
GridListFixedHeight.propTypes = {
  minDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
};

const FiveWeekDefaultFontExample = () => (
  <GridListFixedHeight minDate={FIVE_WEEK_MONTH_START} maxDate={FIVE_WEEK_MONTH_END} />
);

const FiveWeekScaledFontExample = () => {
  useEffect(() => {
    const orig = window.getComputedStyle;
    window.getComputedStyle = (el, pseudo) => {
      const style = orig(el, pseudo);
      if (el === document.documentElement) {
        return new Proxy(style, {
          get(target, prop) {
            if (prop === 'fontSize') return '16px';
            const val = target[prop];
            return typeof val === 'function' ? val.bind(target) : val;
          },
        });
      }
      return style;
    };
    document.documentElement.style.fontSize = SCALED_FONT_SIZE;

    return () => {
      window.getComputedStyle = orig;
      document.documentElement.style.fontSize = '';
    };
  }, []);
  return <GridListFixedHeight minDate={FIVE_WEEK_MONTH_START} maxDate={FIVE_WEEK_MONTH_END} />;
};

const SixWeekDefaultFontExample = () => (
  <GridListFixedHeight minDate={SIX_WEEK_MONTH_START} maxDate={SIX_WEEK_MONTH_END} />
);

const FiveWeekLargeFontExample = () => {
  useEffect(() => {
    const orig = window.getComputedStyle;
    window.getComputedStyle = (el, pseudo) => {
      const style = orig(el, pseudo);
      if (el === document.documentElement) {
        return new Proxy(style, {
          get(target, prop) {
            if (prop === 'fontSize') return '16px';
            const val = target[prop];
            return typeof val === 'function' ? val.bind(target) : val;
          },
        });
      }
      return style;
    };
    document.documentElement.style.fontSize = LARGE_FONT_SIZE;

    return () => {
      window.getComputedStyle = orig;
      document.documentElement.style.fontSize = '';
    };
  }, []);
  return <GridListFixedHeight minDate={FIVE_WEEK_MONTH_START} maxDate={FIVE_WEEK_MONTH_END} />;
};

const SixWeekLargeFontExample = () => {
  useEffect(() => {
    const orig = window.getComputedStyle;
    window.getComputedStyle = (el, pseudo) => {
      const style = orig(el, pseudo);
      if (el === document.documentElement) {
        return new Proxy(style, {
          get(target, prop) {
            if (prop === 'fontSize') return '16px';
            const val = target[prop];
            return typeof val === 'function' ? val.bind(target) : val;
          },
        });
      }
      return style;
    };
    document.documentElement.style.fontSize = LARGE_FONT_SIZE;

    return () => {
      window.getComputedStyle = orig;
      document.documentElement.style.fontSize = '';
    };
  }, []);
  return <GridListFixedHeight minDate={SIX_WEEK_MONTH_START} maxDate={SIX_WEEK_MONTH_END} />;
};

const SixWeekScaledFontExample = () => {
  // Simulate Samsung Browser: render at 24px but keep getComputedStyle returning 16px.
  // This is the actual mechanism of the bug — the browser's font scaling bypasses
  // getComputedStyle, so rootFontSize is stale while CSS renders 1rem as 24px.
  useEffect(() => {
    const orig = window.getComputedStyle;
    window.getComputedStyle = (el, pseudo) => {
      const style = orig(el, pseudo);
      if (el === document.documentElement) {
        return new Proxy(style, {
          get(target, prop) {
            if (prop === 'fontSize') return '16px'; // lie: pretend font is still 16px
            const val = target[prop];
            return typeof val === 'function' ? val.bind(target) : val;
          },
        });
      }
      return style;
    };
    document.documentElement.style.fontSize = SCALED_FONT_SIZE; // actually render at 11.2px

    return () => {
      window.getComputedStyle = orig;
      document.documentElement.style.fontSize = '';
    };
  }, []);
  return <GridListFixedHeight minDate={SIX_WEEK_MONTH_START} maxDate={SIX_WEEK_MONTH_END} />;
};

export {
  DefaultExample,
  DefaultExampleWithCustomHeight,
  RangeExample,
  SplitWeekRangeExample,
  WeekStartsOnSixExample,
  WithFocusedDateExample,
  TallContainerExample,
  SingleMonthExample,
  WeekStartsOnSundayExample,
  HonestWeekendExample,
  ArabicLocaleExample,
  JapaneseLocaleExample,
  DifferentMinMaxDatesExample,
  DontMarkTodayExample,
  ScrollableCalendarDateExample,
  ScrollableCalendarGridExample,
  ScrollableCalendarGridListExample,
  PastCalendarExample,
  FiveWeekDefaultFontExample,
  FiveWeekScaledFontExample,
  FiveWeekLargeFontExample,
  SixWeekDefaultFontExample,
  SixWeekScaledFontExample,
  SixWeekLargeFontExample,
};
