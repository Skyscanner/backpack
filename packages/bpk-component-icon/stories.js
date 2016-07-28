import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BpkIcon from './index'

const req = require.context('raw!bpk-svgs/src/icons/sm', false, /\.svg$/)
const icons = req.keys().map((key) => key.replace('./', '').replace('.svg', ''))

storiesOf('bpk-component-icon', module)
  .add('Small icons', () => (
    <ul>
      {icons.map((icon) => (
        <li key={icon}>
          <BpkIcon icon={icon} /> <span>{icon}</span>
        </li>
      ))}

    </ul>
  ))
  .add('Large icons', () => (
    <ul>
      {icons.map((icon) => (
        <li key={icon}>
          <BpkIcon icon={icon} large /> <span>{icon}</span>
        </li>
      ))}
    </ul>
  ))
