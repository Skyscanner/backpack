import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BpkBadge from './index'
import TOKENS from 'bpk-tokens/tokens/base.common'

storiesOf('bpk-component-badge', module)
  .add('Default', () => (
    <div>
      This is a badge <BpkBadge>Promocionado</BpkBadge>
    </div>
  ))
  .add('Docked right', () => (
    <div
      className='clearfix'
      style={{ backgroundColor: TOKENS.colorGray700, minHeight: TOKENS.spacingXxl, textAlign: 'right' }}
    >
      <BpkBadge docked='right'>Promocionado</BpkBadge>
    </div>
  ))
  .add('Docked left', () => (
    <div className='clearfix' style={{ backgroundColor: TOKENS.colorGray700, minHeight: TOKENS.spacingXxl }}>
      <BpkBadge docked='left'>Promocionado</BpkBadge>
    </div>
  ))
