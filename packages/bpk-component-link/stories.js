import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BpkLink from './index'

storiesOf('bpk-component-link', module)
  .add('Example', () => (
    <div>
      <BpkLink href='#'>Link #1</BpkLink><br />
      <BpkLink href='#'>Link #2</BpkLink>
    </div>
  ))
