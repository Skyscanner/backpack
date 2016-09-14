import React from 'react'
import { storiesOf } from '@kadira/storybook'

const requireSmallIcon = require.context('./sm', false, /\.js$/)
const requireLargeIcon = require.context('./lg', false, /\.js$/)

const smallIcons = requireSmallIcon.keys()
const largeIcons = requireSmallIcon.keys()

storiesOf('bpk-component-icon', module)
  .add('Small icons', () => (
    <ul>
      {smallIcons.map((icon) => {
        const Icon = requireSmallIcon(icon).default
        return (
          <li key={icon}>
            <Icon /><span>{icon}</span>
          </li>
        )
      })}
    </ul>
  ))
  .add('Large icons', () => (
    <ul>
      {largeIcons.map((icon) => {
        const Icon = requireLargeIcon(icon).default
        return (
          <li key={icon}>
            <Icon /><span>{icon}</span>
          </li>
        )
      })}
    </ul>
  ))
