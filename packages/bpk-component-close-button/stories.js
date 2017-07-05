import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BpkCloseButton from './index';

storiesOf('bpk-component-close-button', module)
  .add('Default', () => (
    <BpkCloseButton label="Close" onClick={action('Close button clicked')} />
  ));
