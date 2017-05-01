import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { colorGray700, spacingBase } from 'bpk-tokens/tokens/base.es6';

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
  .add('White (Checked)', () => (
    <div style={{ backgroundColor: colorGray700, padding: spacingBase }}>
      <BpkRadio
        id="checked"
        name="checked"
        label="Return"
        onChange={action('radio changed')}
        white
        checked
      />
    </div>
  ))
  .add('White (Unchecked)', () => (
    <div style={{ backgroundColor: colorGray700, padding: spacingBase }}>
      <BpkRadio
        id="unchecked"
        name="unchecked"
        label="Return"
        onChange={action('radio changed')}
        white
      />
    </div>
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
