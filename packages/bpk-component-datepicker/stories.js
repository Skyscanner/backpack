import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { weekDays, formatMonth, formatDateFull } from 'bpk-component-calendar/test-utils';
import { format } from 'bpk-component-calendar/src/date-utils';
import BpkDatepicker from './index';

const formatDate = date => format(date, 'DD/MM/YYYY');

const inputProps = {
  onChange: () => null,
  placeholder: 'placeholder',
  large: true,
  docked: true,
};

storiesOf('bpk-component-datepicker', module)
  .add('Default', () => (
    <BpkDatepicker
      id="myDatepicker"
      closeButtonText="Close"
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      popoverLabel="Departure date"
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
    />
  ))
  .add('Depart & Return', () => (
    <div style={{ display: 'flex' }}>
      <BpkDatepicker
        id="depart"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        popoverLabel="Departure date"
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
      />
      <BpkDatepicker
        id="return"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        popoverLabel="Return date"
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
      />
    </div>
  ));
