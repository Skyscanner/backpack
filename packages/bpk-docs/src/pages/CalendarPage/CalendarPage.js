import BpkParagraph from 'bpk-component-paragraph';
import React, { PropTypes, Component } from 'react';
import BpkCalendar, { BpkCalendarGrid, BpkCalendarNav } from 'bpk-component-calendar';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import format from '../../../../bpk-component-calendar/node_modules/date-fns/format';
import addMonths from '../../../../bpk-component-calendar/node_modules/date-fns/add_months';

const formatMonth = date => format(date, 'MMMM YYYY');

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
    title: 'Calendar',
    blurb: [
      <BpkParagraph>
        Calendar blurb
      </BpkParagraph>,
    ],
    examples: [
      <BpkCalendar
        formatMonth={formatMonth}
      />,
    ],

  },
  {
    id: 'calendar-nav',
    title: 'Calendar Nav',
    blurb: [
      <BpkParagraph>
        Calendar Nav blurb
      </BpkParagraph>,
    ],
    examples: [
      <CalendarNavContainer id="my-calendar-nav" />,
    ],
  },
  {
    id: 'calendar-grid',
    title: 'Calendar Grid',
    blurb: [
      <BpkParagraph>
        Calendar Grid blurb
      </BpkParagraph>,
    ],
    examples: [
      <BpkCalendarGrid />,
    ],
  },
];

const CalendarPage = () => <DocsPageBuilder
  title="Calendar"
  blurb={[
    <BpkParagraph>
      Calendar blurb
    </BpkParagraph>,
  ]}
  components={components}
  // readme={calendarReadme}
  sassdocId="calendar"
/>;

export default CalendarPage;
