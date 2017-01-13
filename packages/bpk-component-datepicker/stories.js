import React from 'react';
import { storiesOf } from '@kadira/storybook';

import BpkDatepicker from './index';

storiesOf('bpk-component-datepicker', module)
  .add('Default', () => (
    <BpkDatepicker />
  ));
