import BpkParagraph from 'bpk-component-paragraph';
import React, { PropTypes, Component } from 'react';
import BpkCalendar, {
  BpkCalendarGrid,
  BpkCalendarNav,
  BpkCalendarDate,
  BpkCalendarGridHeader,
} from 'bpk-component-calendar';

import calendarReadme from 'bpk-component-calendar/readme.md';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import addMonths from '../../../../bpk-component-calendar/node_modules/date-fns/add_months';
import {
  weekDays,
  weekDaysArabic,
  formatDateFull,
  formatDateFullArabic,
  formatMonth,
  formatMonthArabic,
} from '../../../../bpk-component-calendar/test-utils';

/* eslint-disable react/no-multi-comp */
class CalendarNavContainer extends Component {
  constructor() {
    super();

    this.state = {
      month: new Date(),
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(month) {
    this.setState({ month });
  }

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
        onDateSelect={date => this.setState({ date, focusedDate: date })}
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
      <BpkParagraph>
        The default calendar configuration ships with navigation to select months, select a date, and the ability
        to navigate via keyboard.
      </BpkParagraph>,
      <BpkParagraph>
        See the prop types table below for full list of config and default options.
      </BpkParagraph>,
    ],
    examples: [
      <CalendarContainer
        id="calendar-1"
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
      />,
    ],
  },
  {
    id: 'calendar-ar',
    title: 'Localised calendar',
    blurb: [
      <BpkParagraph>
        The calendar can be configured with locale data: month names, weekday names, weekend, first day of the week,
        date formatting.
      </BpkParagraph>,
    ],
    examples: [
      <CalendarContainer
        id="calendar-ar1"
        formatMonth={formatMonthArabic}
        formatDateFull={formatDateFullArabic}
        daysOfWeek={weekDaysArabic}
        changeMonthLabel="Change month"
        weekStartsOn={6}
      />,
    ],
  },
  {
    id: 'calendar-nav',
    title: 'Calendar navigation',
    blurb: [
      <BpkParagraph>
        The calendar nav component can be used independently to allow users to cycle through a group of months.
      </BpkParagraph>,
    ],
    examples: [
      <CalendarNavContainer id="my-calendar-nav" />,
    ],
  },
  {
    id: 'calendar-grid',
    title: 'Calendar grid',
    blurb: [
      <BpkParagraph>
        Similarly the calendar grid can be used on its own (grid and header are separate components).
      </BpkParagraph>,
    ],
    examples: [
      <BpkCalendarGridHeader
        month={new Date()}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        DateComponent={BpkCalendarDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        showWeekendSeparator
      />,
      <BpkCalendarGrid
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

const CalendarPage = () => <DocsPageBuilder
  title="Calendar"
  blurb={[
    <BpkParagraph>
      Calendars are used for date selection.  They can be configured in different ways depending on the context,
      e.g. constrained to a date range, or with dates blocked out.
    </BpkParagraph>,
  ]}
  components={components}
  readme={calendarReadme}
  sassdocId="calendar"
/>;

export default CalendarPage;
