import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import isFriday from 'date-fns/is_friday';
import isToday from 'date-fns/is_today';

import { BpkCalendarGrid } from './index';

storiesOf('bpk-component-calendar', module)
  .add('Default', () => (
    <BpkCalendarGrid
      onClickDate={action('Clicked day')}
    />
  ))
  .add('Week starts on a Sunday', () => (
    <BpkCalendarGrid
      onClickDate={action('Clicked day')}
      weekStartsOn={0}
    />
  ))
  .add('Fridays are blocked', () => (
    <BpkCalendarGrid
      onClickDate={action('Clicked day')}
      dayModifiers={{ disabled: isFriday }}
    />
  ))
  .add('Non-english locale', () => (
    <BpkCalendarGrid
      onClickDate={action('Clicked day')}
      weekDays={['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']}
    />
  ))
  .add('Highlight today', () => (
    <BpkCalendarGrid
      onClickDate={action('Clicked day')}
      dayModifiers={{ today: isToday }}
    />
  ));
