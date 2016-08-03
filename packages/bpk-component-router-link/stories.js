import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import BpkRouterLink from './index'

storiesOf('bpk-component-router-link', module)
  .add('Example', () => (
    <div>
      <BpkRouterLink to='#' onClick={action('#1 clicked')}>Link #1</BpkRouterLink><br />
      <BpkRouterLink to='#' onClick={action('#2 clicked')}>Link #2</BpkRouterLink>
    </div>
  ))
