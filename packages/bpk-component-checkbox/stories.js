import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import BpkCheckbox from './index'

storiesOf('bpk-component-checkbox', module)
  .add('Checked', () => (
    <BpkCheckbox name='prefer-directs' label='Prefer directs' onChange={action('checkbox changed')} checked />
  ))
  .add('Unchecked', () => (
    <BpkCheckbox name='prefer-directs' label='Prefer directs' onChange={action('checkbox changed')} />
  ))
  .add('No label', () => (
    <BpkCheckbox name='prefer-directs' onChange={action('checkbox changed')} checked />
  ))
  .add('Disabled', () => (
    <BpkCheckbox name='prefer-directs' label='Prefer directs' onChange={action('checkbox changed')} checked disabled />
  ))
