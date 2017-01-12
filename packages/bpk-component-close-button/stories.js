import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import BpkCloseButton from './index';

storiesOf('bpk-component-close-button', module)
  .add('Default', () => (
    <BpkCloseButton label="Close" onClick={action('Close button clicked')} />
  ));
