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
import React, { Component } from 'react';
import BpkCalendar, {
  BpkCalendarGrid,
  BpkCalendarNav,
  BpkCalendarDate,
  BpkCalendarGridHeader,
} from 'bpk-component-calendar';
import BpkMobileScrollContainer from 'bpk-component-mobile-scroll-container';
import { cssModules } from 'bpk-react-utils';

import calendarReadme from 'bpk-component-calendar/README.md';
import DocsPageBuilder from '../../components/DocsPageBuilder';
import DocsPageWrapper from '../../components/DocsPageWrapper';
import Paragraph from '../../components/Paragraph';
import IntroBlurb from '../../components/IntroBlurb';
import addMonths from '../../../../bpk-component-calendar/node_modules/date-fns/add_months';
import {
  weekDays,
  weekDaysArabic,
  formatDateFull,
  formatDateFullArabic,
  formatMonth,
  formatMonthArabic,
} from '../../../../bpk-component-calendar/test-utils';

import STYLES from './calendar-page.css';

const getClassName = cssModules(STYLES);

/* eslint-disable react/no-multi-comp */
class CalendarNavContainer extends Component {
  constructor() {
    super();

    this.state = {
      month: new Date(),
    };
  }

  onChange = (event, { month }) => {
    this.setState(() => ({ month }));
  };

  render() {
    return (
      <BpkCalendarNav
        changeMonthLabel="Change month"
        month={this.state.month}
        minDate={new Date()}
        maxDate={addMonths(new Date(), 12)}
        onMonthChange={this.onChange}
        formatMonth={formatMonth}
        id={this.props.id}
      />
    );
  }
}

CalendarNavContainer.propTypes = {
  id: PropTypes.string.isRequired,
};

class CalendarContainer extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date(),
    };
  }

  render() {
    return (
      <BpkCalendar
        {...this.props}
        date={this.state.date}
        onDateSelect={date => this.setState({ date })}
      />
    );
  }
}
/* eslint-enable react/no-multi-comp */

const components = [
  {
    id: 'calendar',
    title: 'Default calendar',
    blurb: [
      <Paragraph>
        The default calendar configuration ships with navigation to select
        months, select a date, and the ability to navigate via keyboard.
      </Paragraph>,
      <Paragraph>
        See the prop types table below for full list of config and default
        options.
      </Paragraph>,
    ],
    examples: [
      <BpkMobileScrollContainer className={getClassName('bpk-calendar-demo')}>
        <CalendarContainer
          id="calendar-1"
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          daysOfWeek={weekDays}
          changeMonthLabel="Change month"
        />
      </BpkMobileScrollContainer>,
    ],
  },
  {
    id: 'calendar-ar',
    title: 'Localised calendar',
    blurb: [
      <Paragraph>
        The calendar can be configured with locale data: month names, weekday
        names, weekend, first day of the week, date formatting.
      </Paragraph>,
    ],
    examples: [
      <BpkMobileScrollContainer className={getClassName('bpk-calendar-demo')}>
        <CalendarContainer
          id="calendar-ar1"
          formatMonth={formatMonthArabic}
          formatDateFull={formatDateFullArabic}
          daysOfWeek={weekDaysArabic}
          changeMonthLabel="Change month"
          weekStartsOn={6}
        />
      </BpkMobileScrollContainer>,
    ],
  },
  {
    id: 'calendar-nav',
    title: 'Calendar navigation',
    blurb: [
      <Paragraph>
        The calendar nav component can be used independently to allow users to
        cycle through a group of months.
      </Paragraph>,
    ],
    examples: [<CalendarNavContainer id="my-calendar-nav" />],
  },
  {
    id: 'calendar-grid',
    title: 'Calendar grid',
    blurb: [
      <Paragraph>
        Similarly the calendar grid can be used on its own (grid and header are
        separate components).
      </Paragraph>,
    ],
    examples: [
      <BpkCalendarGridHeader
        className={getClassName('bpk-calendar-demo')}
        month={new Date()}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        DateComponent={BpkCalendarDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        showWeekendSeparator
      />,
      <BpkCalendarGrid
        className={getClassName('bpk-calendar-demo')}
        month={new Date()}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        DateComponent={BpkCalendarDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        showWeekendSeparator
      />,
    ],
  },
];

const blurb = [
  <IntroBlurb>
    Calendars are used for date selection within a defined time period.
  </IntroBlurb>,
];

const CalendarSubPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Calendar"
    components={components}
    readme={calendarReadme}
    sassdocId="calendar"
    {...rest}
  />
);

const CalendarPage = () => (
  <DocsPageWrapper
    title="Calendar"
    blurb={blurb}
    webSubpage={<CalendarSubPage wrapped />}
  />
);

export default CalendarPage;
