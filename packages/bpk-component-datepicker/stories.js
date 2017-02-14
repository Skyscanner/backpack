import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import { weekDays, formatMonth, formatDateFull } from 'bpk-component-calendar/test-utils';
import { format, dateToBoundaries, addMonths, addDays, startOfDay } from 'bpk-component-calendar/src/date-utils';
import BpkDatepicker from './index';

const formatDate = date => format(date, 'DD/MM/YYYY');

const inputProps = {
  onChange: () => null,
  placeholder: 'placeholder',
  large: true,
  docked: true,
};

/* eslint-disable react/no-multi-comp */
class CalendarContainer extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date(),
    };
  }
  render() {
    return (
      <BpkDatepicker
        {...this.props}
        date={this.state.date}
        onDateSelect={date => this.setState({ date })}
      />
    );
  }
}

class ReturnDatepicker extends Component {
  constructor() {
    super();

    this.minDate = startOfDay(new Date());
    this.maxDate = startOfDay(addMonths(new Date(), 12));
    this.state = {
      departDate: startOfDay(addDays(new Date(), 1)),
      returnDate: startOfDay(addDays(new Date(), 4)),
    };
  }
  render() {
    return (
      <div style={{ display: 'flex' }} id="application-element">
        <BpkDatepicker
          id="depart"
          closeButtonText="Close"
          daysOfWeek={weekDays}
          changeMonthLabel="Change month"
          title="Departure date"
          getApplicationElement={() => document.getElementById('application-element')}
          formatDate={formatDate}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          inputProps={inputProps}
          date={this.state.departDate}
          onDateSelect={departDate => this.setState({
            departDate,
            returnDate: dateToBoundaries(this.state.returnDate, departDate, this.maxDate),
          })}
        />
        <BpkDatepicker
          id="return"
          closeButtonText="Close"
          daysOfWeek={weekDays}
          changeMonthLabel="Change month"
          title="Return date"
          getApplicationElement={() => document.getElementById('application-element')}
          formatDate={formatDate}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          inputProps={inputProps}
          date={this.state.returnDate}
          onDateSelect={returnDate => this.setState({
            returnDate,
            departDate: dateToBoundaries(this.state.departDate, this.minDate, returnDate),
          })}
        />
      </div>
    );
  }
}
/* eslint-enable react/no-multi-comp */

storiesOf('bpk-component-datepicker', module)
  .add('Default', () => (
    <div id="application-element">
      <CalendarContainer
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        title="Departure date"
        getApplicationElement={() => document.getElementById('application-element')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
      />
    </div>
  ))
  .add('Depart & Return', () => (
    <ReturnDatepicker />
  ));
