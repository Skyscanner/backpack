import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import isFriday from 'date-fns/is_friday';
import isWeekend from 'date-fns/is_weekend';
import addMonths from 'date-fns/add_months';
import isSameDay from 'date-fns/is_same_day';
import { formatMonth, formatMonthGerman, weekDaysMoreWeekend, weekDaysGerman, weekDays } from './stories-data';

import BpkCalendar, { BpkCalendarGrid, BpkCalendarNav, BpkCalendarDate } from './index';

storiesOf('bpk-component-calendar', module)
  .add('BpkCalendarNav', () => (
    <BpkCalendarNav
      month={new Date()}
      changeMonthLabel="Change month"
      onChangeMonth={action('Changed month')}
      minDate={new Date()}
      maxDate={addMonths(new Date(), 12)}
      formatMonth={formatMonth}
      id="myCalendarNav"
    />
  ))
  .add('BpkCalendarGrid', () => (
    <BpkCalendarGrid
      month={new Date()}
      weekStartsOn={1}
      daysOfWeek={weekDays}
      onDateClick={action('Clicked day')}
      getDateComponent={() => BpkCalendarDate}
    />
  ))
  .add('Calendar - default', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      id="myCalendar"
    />
  ))
  .add('Calendar - Don\'t show weekend separator', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      showWeekendSeparator={false}
      id="myCalendar"
    />
  ))
  .add('Calendar - Week starts on a Sunday', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      weekStartsOn={0}
      id="myCalendar"
    />
  ))
  .add('Calendar - Honest weekend', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      daysOfWeek={weekDaysMoreWeekend}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      id="myCalendar"
    />
  ))
  .add('Calendar - Fridays are blocked', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      dateModifiers={{ disabled: isFriday }}
      id="myCalendar"
    />
  ))
  .add('Calendar - Non-english locale', () => (
    <BpkCalendar
      formatMonth={formatMonthGerman}
      daysOfWeek={weekDaysGerman}
      changeMonthLabel="Monat auswählen"
      onDateSelect={action('Selected day')}
      id="myCalendar"
    />
  ))
  .add('Calendar - Specific initial month', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      initialMonth={addMonths(new Date(), 6)}
      id="myCalendar"
    />
  ))
  .add('Calendar - Specific date range', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      minDate={new Date(2020, 4, 15)}
      maxDate={new Date(2020, 5, 15)}
      initialMonth={new Date(2020, 4, 15)}
      id="myCalendar"
    />
  ))
  .add('Calendar - Don\'t mark today', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      markToday={false}
      id="myCalendar"
    />
  ))
  .add('Calendar - Don\'t mark outside days', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      markOutsideDays={false}
      id="myCalendar"
    />
  ))
  .add('Calendar - Selected day', () => (
    <BpkCalendar
      formatMonth={formatMonth}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      minDate={new Date(2020, 4, 15)}
      maxDate={new Date(2020, 5, 15)}
      initialMonth={new Date(2020, 4, 15)}
      dateModifiers={{ selected: date => isSameDay(date, new Date(2020, 4, 20)) }}
      id="myCalendar"
    />
  ))
  .add('Calendar -  Custom date component', () => {
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
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        onDateSelect={action('Selected day')}
        getDateComponent={() => MyCustomDate}
        id="myCalendar"
      />
    );
  });
