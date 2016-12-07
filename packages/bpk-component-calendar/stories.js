import React from 'react';
import { storiesOf } from '@kadira/storybook';

import BpkCalendar from './index';

storiesOf('bpk-component-calendar', module)
  .add('Default', () => (
    <BpkCalendar />
  ));
