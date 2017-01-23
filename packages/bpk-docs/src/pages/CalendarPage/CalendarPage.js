import BpkParagraph from 'bpk-component-paragraph';
import React, { PropTypes, Component } from 'react';
import BpkCalendar, { BpkCalendarGrid, BpkCalendarNav, BpkCalendarDate } from 'bpk-component-calendar';

import calendarReadme from 'bpk-component-calendar/readme.md';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import format from '../../../../bpk-component-calendar/node_modules/date-fns/format';
import addMonths from '../../../../bpk-component-calendar/node_modules/date-fns/add_months';
import { weekDays } from '../../../../bpk-component-calendar/test-utils';

const formatMonth = date => format(date, 'MMMM YYYY');
const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');

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
        onChangeMonth={this.onChange}
        formatMonth={formatMonth}
        id={this.props.id}
      />
    );
  }
}

CalendarNavContainer.propTypes = {
  id: PropTypes.string.isRequired,
};

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
      <BpkCalendar
        id="calendar-1"
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
      />,
    ],
  },
  {
    id: 'calendar-no-selection',
    title: 'Calendar without date selection',
    blurb: [
      <BpkParagraph>
        The default calendar configuration ships with navigation to nudge between months or make a
        direct selection via a select menu.
      </BpkParagraph>,
    ],
    examples: [
      <BpkCalendar
        id="calendar-2"
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        enableSelection={false}
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
        Similarly the calendar grid can be used on its own.
      </BpkParagraph>,
    ],
    examples: [
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
