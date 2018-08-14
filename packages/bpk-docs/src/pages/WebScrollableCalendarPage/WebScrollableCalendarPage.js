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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateUtils } from 'bpk-component-calendar';
import BpkScrollableCalendar, {
  BpkScrollableCalendarGrid,
  BpkScrollableCalendarDate,
} from 'bpk-component-scrollable-calendar';

import scrollableCalendarReadme from 'bpk-component-scrollable-calendar/README.md';

import DocsPageBuilder from '../../components/DocsPageBuilder';
import {
  weekDays,
  formatDateFull,
  formatMonth,
  weekDaysArabic,
  formatDateFullArabic,
  formatMonthArabic,
} from './test-utils';

class ScrollableCal extends Component {
  constructor(props) {
    super(props);

    const selectedDate = this.props.selectTodaysDate ? new Date() : null;

    this.state = {
      selectedDate,
    };
  }

  handleDateSelect = date => {
    this.setState({
      selectedDate: date,
    });
  };

  render() {
    return (
      <BpkScrollableCalendar
        id="calendar"
        {...this.props}
        onDateSelect={selectedDate => {
          this.setState({ selectedDate });
        }}
        date={this.state.selectedDate}
      />
    );
  }
}
ScrollableCal.propTypes = {
  selectTodaysDate: PropTypes.bool,
};

ScrollableCal.defaultProps = {
  selectTodaysDate: true,
};

const components = [
  {
    id: 'default',
    title: 'Default',
    examples: [
      <ScrollableCal
        id="myCalendar"
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        markToday={false}
        selectTodaysDate
        minDate={DateUtils.addDays(new Date(), -1)}
        maxDate={DateUtils.addMonths(new Date(), 12)}
      />,
    ],
  },
  {
    id: 'localised',
    title: 'Localised scrollable calendar',
    examples: [
      <ScrollableCal
        id="myCalendar"
        formatMonth={formatMonthArabic}
        formatDateFull={formatDateFullArabic}
        daysOfWeek={weekDaysArabic}
        markToday={false}
        selectTodaysDate
        minDate={DateUtils.addDays(new Date(), -1)}
        maxDate={DateUtils.addMonths(new Date(), 12)}
      />,
    ],
  },
  {
    id: 'grid',
    title: 'Scrollable calendar grid',
    examples: [
      <BpkScrollableCalendarGrid
        month={new Date(2019, 1, 0)}
        weekStartsOn={1}
        daysOfWeek={weekDays}
        onDateClick={null}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkScrollableCalendarDate}
        showWeekendSeparator
      />,
    ],
  },
];

const WebScrollableCalendarPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Scrollable Calendar"
    components={components}
    readme={scrollableCalendarReadme}
    {...rest}
  />
);

export default WebScrollableCalendarPage;
