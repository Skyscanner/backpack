import BpkParagraph from 'bpk-component-paragraph';
import React from 'react';
import BpkDatepicker from 'bpk-component-datepicker';

import datepickerReadme from 'bpk-component-datepicker/readme.md';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import format from '../../../../bpk-component-calendar/node_modules/date-fns/format';
import { weekDays } from '../../../../bpk-component-calendar/test-utils';

const formatDate = date => format(date, 'DD/MM/YYYY');
const formatMonth = date => format(date, 'MMMM YYYY');
const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');

const components = [
  {
    id: 'datepicker',
    title: 'Default datepicker',
    blurb: [
      <BpkParagraph>
        Default calendar, input and popover configuration.
      </BpkParagraph>,
      <BpkParagraph>
        See the BpkCalendar documentation for more examples.
      </BpkParagraph>,
    ],
    examples: [
      <BpkDatepicker
        id="calendar-1"
        formatDate={formatDate}
        formatDateFull={formatDateFull}
        formatMonth={formatMonth}
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        popoverLabel="Select date"
      />,
    ],
  },
];

const DatepickerPage = () => <DocsPageBuilder
  title="Datepicker"
  blurb={[
    <BpkParagraph>
      The datepicker is an input control that allows the user to pick a single date. It embeds a calendar
      component in a popover.
    </BpkParagraph>,
  ]}
  components={components}
  readme={datepickerReadme}
  sassdocId="calendar"
/>;

export default DatepickerPage;
