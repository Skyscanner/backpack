import React from 'react'
import { storiesOf } from '@kadira/storybook'

import TOKENS from 'bpk-tokens/tokens/base.common'
import { BpkList, BpkListItem } from 'bpk-component-list'

import { sm, lg } from './index'

storiesOf('bpk-component-icon', module)
  .add('Small icons', () => (
    <BpkList>
      {Object.keys(sm).map((icon) => {
        const Icon = sm[ icon ]
        return (
          <BpkListItem key={icon}>
            <Icon fill={TOKENS.colorGray700} /> <span>{icon}</span>
          </BpkListItem>
        )
      })}
    </BpkList>
  ))
  .add('Large icons', () => (
    <BpkList>
      {Object.keys(lg).map((icon) => {
        const Icon = lg[ icon ]
        return (
          <BpkListItem key={icon}>
            <Icon fill={TOKENS.colorGray700} /> <span>{icon}</span>
          </BpkListItem>
        )
      })}
    </BpkList>
  ))
