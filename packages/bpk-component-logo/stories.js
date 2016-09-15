import React from 'react'
import { storiesOf } from '@kadira/storybook'

import { BpkInlineLogo, BpkCloudLogo, BpkStackedLogo, BpkTianxunLogo, BpkTianxunStackedLogo } from './index'

storiesOf('bpk-component-logo', module)
  .add('Inline', () => (
    <BpkInlineLogo />
  ))
  .add('Stacked', () => (
    <BpkStackedLogo />
  ))
  .add('Cloud', () => (
    <BpkCloudLogo />
  ))
  .add('Tianxun', () => (
    <BpkTianxunLogo />
  ))
  .add('Tianxun stacked', () => (
    <BpkTianxunStackedLogo />
  ))
