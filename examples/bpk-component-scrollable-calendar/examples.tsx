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
  constructor(props: any) {
    super(props);

    // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
    if (this.props.selectionConfiguration.type === 'range') {
      this.state = {
        selectionConfiguration: {
          // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
          type: this.props.selectionConfiguration.type,
          // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
          startDate: this.props.selectionConfiguration.startDate,
          // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
          endDate: this.props.selectionConfiguration.endDate,
        },
      };
    } else {
      this.state = {
        selectionConfiguration: {
          // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
          type: this.props.selectionConfiguration.type,
          // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
          date: this.props.selectionConfiguration.date,
        },
      };
    }
  }

  render() {
    return (
      // @ts-expect-error TS(2739) FIXME: Type '{ onDateSelect: (startDate: Date, endDate?: ... Remove this comment to see the full error message
      <BpkScrollableCalendar
        id="calendar"
        {...this.props}
        // @ts-expect-error TS(2322) FIXME: Type 'null' is not assignable to type 'Date | unde... Remove this comment to see the full error message
        onDateSelect={(startDate, endDate = null) => {
          // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
          if (this.props.selectionConfiguration.type === 'range') {
            if (startDate && !endDate) {
              this.setState({
                selectionConfiguration: {
                  // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
                  type: this.props.selectionConfiguration.type,
                  startDate,
                  endDate: null,
                },
              });
              // @ts-expect-error TS(2554) FIXME: Expected 0 arguments, but got 1.
              action('Selected day')(startDate);
            }
            if (startDate && endDate) {
              this.setState({
                selectionConfiguration: {
                  // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
                  type: this.props.selectionConfiguration.type,
                  startDate,
                  endDate,
                },
              });
              // @ts-expect-error TS(2554) FIXME: Expected 0 arguments, but got 1.
              action('Selected end day')(endDate);
            }
          } else {
            this.setState({
              selectionConfiguration: {
                // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
                type: this.props.selectionConfiguration.type,
                date: startDate,
              },
            });
            // @ts-expect-error TS(2554) FIXME: Expected 0 arguments, but got 1.
            action('Selected day')(startDate);
          }
        }}
        // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
        selectionConfiguration={this.state.selectionConfiguration}
      />
    );
  }
}
// @ts-expect-error TS(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
ScrollableCal.propTypes = {
  selectionConfiguration: CustomPropTypes.SelectionConfiguration,
};

// @ts-expect-error TS(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ScrollableCal.defaultProps = {
  selectionConfiguration: {
    type: CALENDAR_SELECTION_TYPE.single,
    date: new Date(),
  },
};

const DefaultExample = () => (
  <ScrollableCal
    // @ts-expect-error TS(2322) FIXME: Type '{ weekStartsOn: number; daysOfWeek: { name: ... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2322) FIXME: Type '{ weekStartsOn: number; daysOfWeek: { name: ... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2322) FIXME: Type '{ weekStartsOn: number; daysOfWeek: { name: ... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2322) FIXME: Type '{ DateComponent: ({ isOutside, ...rest }: Pr... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2322) FIXME: Type '{ weekStartsOn: number; daysOfWeek: { name: ... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2322) FIXME: Type '{ weekStartsOn: number; daysOfWeek: { name: ... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2322) FIXME: Type '{ weekStartsOn: number; daysOfWeek: { name: ... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2322) FIXME: Type '{ weekStartsOn: number; daysOfWeek: { name: ... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2322) FIXME: Type '{ month: Date; weekStartsOn: 1; daysOfWeek: ... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2322) FIXME: Type '{ month: Date; weekStartsOn: 1; daysOfWeek: ... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; formatMonth: (date: any) => st... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; formatMonth: (date: any) => st... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; formatMonth: (date: any) => st... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; formatMonth: (date: any) => st... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; formatMonth: (date: any) => st... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; formatMonth: (date: any) => st... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; formatMonth: (date: any) => st... Remove this comment to see the full error message
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
};
