import React from 'react';
import { storiesOf, action } from '@storybook/react';

import BpkChip from './index';

storiesOf('bpk-component-chip', module)
  .add('Default', () => (
    <BpkChip onClose={action('Chip closing!')} >This is a chip!</BpkChip>
  ));
