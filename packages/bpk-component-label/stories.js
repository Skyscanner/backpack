import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BpkLabel from './index'

storiesOf('bpk-component-label', module)
  .add('Example', () => (
    <BpkLabel label='Origin' htmlFor='origin' />
  ))
