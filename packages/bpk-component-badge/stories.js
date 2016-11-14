import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BpkBadge from './index'
import TOKENS from 'bpk-tokens/tokens/base.common'

const DockedContainer = (props) => <div
  {...props}
  style={{ backgroundColor: TOKENS.colorGray700, minHeight: TOKENS.spacingXxl, position: 'relative' }}
/>

storiesOf('bpk-component-badge', module)
  .add('Default', () => (
    <div>
      This is a badge <BpkBadge>Promocionado</BpkBadge>
    </div>
  ))
  .add('Centered', () => (
    <div>
      This is a badge <BpkBadge centered>Promocionado</BpkBadge>
    </div>
  ))
  .add('Docked right', () => (
    <DockedContainer>
      <BpkBadge docked='right'>Promocionado</BpkBadge>
    </DockedContainer>
  ))
  .add('Docked left', () => (
    <DockedContainer>
      <BpkBadge docked='left'>Promocionado</BpkBadge>
    </DockedContainer>
  ))
