import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import BpkRadio from './index'

storiesOf('bpk-component-radio', module)
  .add('Checked', () => (
    <BpkRadio
      name='return'
      label='Return'
      onChange={action('radio changed')}
      checked
    />
  ))
  .add('Unchecked', () => (
    <BpkRadio
      name='return'
      label='Return'
      onChange={action('radio changed')}
    />
  ))
  .add('No label', () => (
    <BpkRadio
      name='return'
      onChange={action('radio changed')}
      checked
    />
  ))
  .add('Disabled', () => (
    <BpkRadio
      name='return'
      label='Return'
      onChange={action('radio changed')}
      checked
      disabled
    />
  ))
