import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BpkSpinner from './index'

storiesOf('bpk-component-spinner', module)
  .add('Small', () => (
    <BpkSpinner />
  ))
  .add('Large', () => (
    <BpkSpinner large />
  ))
  .add('Extra large', () => (
    <BpkSpinner extraLarge />
  ))
