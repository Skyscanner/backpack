import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import BpkCheckbox from './index';

storiesOf('bpk-component-checkbox', module)
  .add('Checked', () => (
    <BpkCheckbox
      id="checked"
      name="checked"
      label="Prefer directs"
      onChange={action('checkbox changed')}
      checked
    />
  ))
  .add('Unchecked', () => (
    <BpkCheckbox
      id="unchecked"
      name="unchecked"
      label="Prefer directs"
      onChange={action('checkbox changed')}
    />
  ))
  .add('No label', () => (
    <BpkCheckbox
      id="no_label"
      name="no_label"
      onChange={action('checkbox changed')}
      checked
    />
  ))
  .add('Disabled (Checked)', () => (
    <BpkCheckbox
      id="disabled_checked"
      name="disabled_checked"
      label="Prefer directs"
      onChange={action('checkbox changed')}
      checked
      disabled
    />
  ))
  .add('Disabled (Unchecked)', () => (
    <BpkCheckbox
      id="disabled"
      name="disabled"
      label="Prefer directs"
      onChange={action('checkbox changed')}
      disabled
    />
  ));
