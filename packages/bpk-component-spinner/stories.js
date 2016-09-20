import React from 'react'
import { storiesOf } from '@kadira/storybook'

import { BpkSpinner, BpkLargeSpinner, BpkExtraLargeSpinner } from './index'

storiesOf('bpk-component-spinner', module)
  .add('Small', () => (
    <BpkSpinner />
  ))
  .add('Large', () => (
    <BpkLargeSpinner />
  ))
  .add('Extra large', () => (
    <BpkExtraLargeSpinner />
  ))
