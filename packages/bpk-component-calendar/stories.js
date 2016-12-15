import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import isFriday from 'date-fns/is_friday';
import isToday from 'date-fns/is_today';
import isWeekend from 'date-fns/is_weekend';

import { BpkCalendarGrid } from './index';

storiesOf('bpk-component-calendar', module)
  .add('Default', () => (
    <BpkCalendarGrid
      onDateClick={action('Clicked day')}
    />
  ))
  .add('Week starts on a Sunday', () => (
    <BpkCalendarGrid
      onDateClick={action('Clicked day')}
      weekStartsOn={0}
    />
  ))
  .add('Fridays are blocked', () => (
    <BpkCalendarGrid
      onDateClick={action('Clicked day')}
      dateModifiers={{ disabled: isFriday }}
    />
  ))
  .add('Non-english locale', () => (
    <BpkCalendarGrid
      onDateClick={action('Clicked day')}
      weekDays={['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']}
    />
  ))
  .add('Highlight today', () => (
    <BpkCalendarGrid
      onDateClick={action('Clicked day')}
      dateModifiers={{ today: isToday }}
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
      <BpkCalendarGrid
        getDateComponent={() => MyCustomDate}
      />
    );
  });
