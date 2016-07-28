import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BpkLogo from './index'

storiesOf('bpk-component-logo', module)
  .add('Cloud', () => (
    <BpkLogo logo='cloud' />
  ))
  .add('Inline', () => (
    <BpkLogo logo='inline' />
  ))
  .add('Stacked', () => (
    <BpkLogo logo='stacked' />
  ))
  .add('Tianxun', () => (
    <BpkLogo logo='tianxun' />
  ))
  .add('Tianxun stacked', () => (
    <BpkLogo logo='tianxun-stacked' />
  ))
