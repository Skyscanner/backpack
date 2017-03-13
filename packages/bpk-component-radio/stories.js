import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import BpkRadio from './index';

storiesOf('bpk-component-radio', module)
  .add('Checked', () => (
    <BpkRadio
      id="checked"
      name="checked"
      label="Return"
      onChange={action('radio changed')}
      checked
    />
  ))
  .add('Unchecked', () => (
    <BpkRadio
      id="unchecked"
      name="unchecked"
      label="Return"
      onChange={action('radio changed')}
    />
  ))
  .add('No label', () => (
    <BpkRadio
      id="no_label"
      name="no_label"
      onChange={action('radio changed')}
      checked
    />
  ))
  .add('Disabled (Checked)', () => (
    <BpkRadio
      id="disabled_checked"
      name="disabled_checked"
      label="Return"
      onChange={action('radio changed')}
      checked
      disabled
    />
  ))
  .add('Disabled (Unchecked)', () => (
    <BpkRadio
      id="disabled"
      name="disabled"
      label="Return"
      onChange={action('radio changed')}
      disabled
    />
  ));
