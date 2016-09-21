import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BpkButton from 'bpk-component-button'
import TOKENS from 'bpk-tokens/tokens/base.common'
import { BpkList, BpkListItem } from 'bpk-component-list'

import { sm, lg } from './all'
import { withButtonAlignment, withLargeButtonAlignment, withRtlSupport } from './index'
import SmallLongArrowRightAltIcon from './sm/long-arrow-right-alt'
import LargeLongArrowRightAltIcon from './lg/long-arrow-right-alt'

const AlignedSmallLongArrowRightAltIcon = withButtonAlignment(SmallLongArrowRightAltIcon)
const AlignedLargeLongArrowRightAltIcon = withLargeButtonAlignment(LargeLongArrowRightAltIcon)
const RtlAlignedLargeLongArrowRightAltIcon = withRtlSupport(withLargeButtonAlignment(LargeLongArrowRightAltIcon))

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
  .add('Align to button', () => (
    <BpkButton>
      Search <AlignedSmallLongArrowRightAltIcon fill={TOKENS.colorWhite} />
    </BpkButton>
  ))
  .add('Align to large button', () => (
    <BpkButton large>
      Search <AlignedLargeLongArrowRightAltIcon fill={TOKENS.colorWhite} />
    </BpkButton>
  ))
  .add('Align to large button (RTL support)', () => (
    <BpkButton large>
      Search <RtlAlignedLargeLongArrowRightAltIcon fill={TOKENS.colorWhite} />
    </BpkButton>
  ))
