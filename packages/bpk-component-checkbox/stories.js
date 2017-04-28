import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { colorGray700, spacingBase } from 'bpk-tokens/tokens/base.es6';

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
  .add('White (Checked)', () => (
    <div style={{ backgroundColor: colorGray700, padding: spacingBase }}>
      <BpkCheckbox
        id="white_checked"
        name="checked"
        label="Prefer directs"
        onChange={action('checkbox changed')}
        white
        checked
      />
    </div>
  ))
  .add('White (Unchecked)', () => (
    <div style={{ backgroundColor: colorGray700, padding: spacingBase }}>
      <BpkCheckbox
        id="white_unchecked"
        name="unchecked"
        label="Prefer directs"
        white
        onChange={action('checkbox changed')}
      />
    </div>
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
