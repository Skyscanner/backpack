import React from 'react';
import { storiesOf } from '@storybook/react';

import BpkLabel from './index';

storiesOf('bpk-component-label', module)
  .add('Example', () => (
    <BpkLabel htmlFor="origin">Origin</BpkLabel>
  ))
  .add('Required', () => (
    <BpkLabel htmlFor="origin" required>Origin</BpkLabel>
  ));
