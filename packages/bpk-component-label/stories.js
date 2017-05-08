import React from 'react';
import { storiesOf } from '@kadira/storybook';

import BpkLabel from './index';

storiesOf('bpk-component-label', module)
  .add('Example', () => (
    <BpkLabel htmlFor="origin">Origin</BpkLabel>
  ))
  .add('Required', () => (
    <BpkLabel htmlFor="origin" required>Origin</BpkLabel>
  ));
