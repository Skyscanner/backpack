/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import BpkDatepicker from 'bpk-component-datepicker';
import BpkRouterLink from 'bpk-component-router-link';

import datepickerReadme from 'bpk-component-datepicker/readme.md';
import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import format from '../../../../bpk-component-calendar/node_modules/date-fns/format';
import Paragraph from './../../components/Paragraph';
import { weekDays } from '../../../../bpk-component-calendar/test-utils';

const formatDate = date => format(date, 'DD/MM/YYYY');
const formatMonth = date => format(date, 'MMMM YYYY');
const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');

class DatepickerContainer extends Component {
  constructor() {
    super();

    this.state = {
      date: null,
    };
  }
  render() {
    return (
      <BpkDatepicker
        {...this.props}
        date={this.state.date}
        onDateSelect={date => this.setState({ date, focusedDate: date })}
      />
    );
  }
}

const components = [
  {
    id: 'datepicker',
    title: 'Default datepicker',
    blurb: [
      <Paragraph>
        Default calendar, input and popover configuration.
      </Paragraph>,
      <Paragraph>
        See the <BpkRouterLink to={ROUTES.CALENDAR}>BpkCalendar documentation</BpkRouterLink> for more examples.
      </Paragraph>,
    ],
    examples: [
      <DatepickerContainer
        id="calendar-1"
        closeButtonText="Close"
        formatDate={formatDate}
        formatDateFull={formatDateFull}
        formatMonth={formatMonth}
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        title="Select date"
        getApplicationElement={() => document.getElementById('react-mount')}
        inputProps={{ placeholder: 'Select date' }}
      />,
    ],
  },
];

const DatepickerPage = () => <DocsPageBuilder
  title="Datepicker"
  blurb={[
    <Paragraph>
      The datepicker is an input control that allows the user to pick a single date. It embeds
      a <BpkRouterLink to={ROUTES.CALENDAR}>calendar component</BpkRouterLink> in
      a <BpkRouterLink to={ROUTES.POPOVERS}>popover</BpkRouterLink>.
    </Paragraph>,
  ]}
  components={components}
  readme={datepickerReadme}
/>;

export default DatepickerPage;
