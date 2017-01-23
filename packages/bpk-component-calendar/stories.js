import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import isFriday from 'date-fns/is_friday';
import isWeekend from 'date-fns/is_weekend';
import addMonths from 'date-fns/add_months';
import {
  formatMonth,
  formatDateFull,
  formatMonthArabic,
  formatDateFullArabic,
  weekDaysMoreWeekend,
  weekDaysArabic,
  weekDays,
} from './test-utils';

import BpkCalendar, { BpkCalendarView, BpkCalendarGrid, BpkCalendarNav, BpkCalendarDate } from './index';

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
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      DateComponent={BpkCalendarDate}
      showWeekendSeparator
      preventKeyboardFocus
    />
  ))
  .add('BpkCalendarView', () => (
    <BpkCalendarView
      month={new Date()}
      formatDateFull={formatDateFull}
      DateComponent={BpkCalendarDate}
      formatMonth={formatMonth}
      minDate={new Date()}
      maxDate={addMonths(new Date(), 12)}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      id="myCalendar"
      preventKeyboardFocus
    />
  ))
  .add('Calendar - default', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
    />
  ))
  .add('Calendar - Don\'t show weekend separator', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      showWeekendSeparator={false}
    />
  ))
  .add('Calendar - Week starts on a Sunday', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      weekStartsOn={0}
    />
  ))
  .add('Calendar - Honest weekend', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDaysMoreWeekend}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
    />
  ))
  .add('Calendar - Custom modifiers (Fridays are blocked)', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      dateModifiers={{ disabled: isFriday }}
    />
  ))
  .add('Calendar - ar-ae locale', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonthArabic}
      formatDateFull={formatDateFullArabic}
      daysOfWeek={weekDaysArabic}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      weekStartsOn={6}
    />
  ))
  .add('Calendar - Specify initial date', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      initialSelectedDate={addMonths(new Date(), 6)}
    />
  ))
  .add('Calendar - Specify min/max date', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      minDate={new Date(2020, 4, 15)}
      maxDate={new Date(2020, 5, 15)}
      initialMonth={new Date(2020, 4, 15)}
    />
  ))
  .add('Calendar - Don\'t mark today', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      markToday={false}
    />
  ))
  .add('Calendar - Don\'t mark outside days', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      markOutsideDays={false}
    />
  ))
  .add('Calendar - No selection', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      enableSelection={false}
    />
  ))
  .add('Calendar - No selection; initial month', () => (
    <BpkCalendar
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      onDateSelect={action('Selected day')}
      minDate={new Date(2020, 4, 15)}
      maxDate={new Date(2020, 6, 15)}
      initialMonth={new Date(2020, 5, 15)}
      enableSelection={false}
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
        id="myCalendar"
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        onDateSelect={action('Selected day')}
        DateComponent={MyCustomDate}
      />
    );
  });
