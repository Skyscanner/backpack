import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import isFriday from 'date-fns/is_friday';
import isWeekend from 'date-fns/is_weekend';
import format from 'date-fns/format';
import addMonths from 'date-fns/add_months';

import BpkCalendar, { BpkCalendarGrid, BpkCalendarNav } from './index';

const formatMonth = date => format(date, 'MMMM YYYY');
const formatMonthGerman = (date) => {
  const months = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ];
  return `${months[date.getMonth()]} ${date.getUTCFullYear()}`;
};

storiesOf('bpk-component-calendar', module)
  .add('BpkCalendarNav', () => (
    <BpkCalendarNav
      month={new Date()}
      onChangeMonth={action('Changed month')}
      minDate={new Date()}
      maxDate={addMonths(new Date(), 12)}
      formatMonth={formatMonth}
      id="myCalendarNav"
    />
  ))
  .add('BpkCalendarGrid', () => (
    <BpkCalendarGrid
      onDateClick={action('Clicked day')}
    />
  ))
  .add('Calendar - default', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      onDateSelect={action('Selected day')}
      id="myCalendar"
    />
  ))
  .add('Calendar - Show weekend separator', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      onDateSelect={action('Selected day')}
      showWeekendSeparator
      id="myCalendar"
    />
  ))
  .add('Calendar - Week starts on a Sunday', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      onDateSelect={action('Selected day')}
      weekStartsOn={0}
      id="myCalendar"
    />
  ))
  .add('Calendar - Fridays are blocked', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      onDateSelect={action('Selected day')}
      dateModifiers={{ disabled: isFriday }}
      id="myCalendar"
    />
  ))
  .add('Calendar - Non-english locale', () => (
    <BpkCalendar
      formatMonth={formatMonthGerman}
      onDateSelect={action('Selected day')}
      weekDays={['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']}
      id="myCalendar"
    />
  ))
  .add('Calendar - Specific initial month', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      onDateSelect={action('Selected day')}
      initialMonth={addMonths(new Date(), 6)}
      id="myCalendar"
    />
  ))
  .add('Calendar - Specific date range', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      onDateSelect={action('Selected day')}
      minDate={new Date(2020, 4, 15)}
      maxDate={new Date(2020, 5, 15)}
      initialMonth={new Date(2020, 4, 15)}
      id="myCalendar"
    />
  ))
  .add('Calendar - Highlight today', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      onDateSelect={action('Selected day')}
      highlightToday
      id="myCalendar"
    />
  ))
  .add('Using a custom date component', () => {
    const MyCustomDate = (props) => {
      const cx = {
        backgroundColor: 'rgb(255, 84, 82)',
        width: '50%',
        height: '50%',
        borderRadius: '5rem',
        margin: '25%',
      };
      if (isWeekend(props.date)) { cx.backgroundColor = 'rgb(0, 215, 117)'; }
      return <div style={cx} />;
    };
    MyCustomDate.propTypes = {
      date: React.PropTypes.instanceOf(Date).isRequired,
    };
    return (
      <BpkCalendar
        formatMonth={formatMonth}
        onDateSelect={action('Selected day')}
        getDateComponent={() => MyCustomDate}
        id="myCalendar"
      />
    );
  });
