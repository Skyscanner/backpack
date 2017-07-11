import React from 'react';
import { storiesOf } from '@storybook/react';

import { colors } from 'bpk-tokens/tokens/base.es6';
import BpkButton from '../bpk-component-button';
import { BpkList, BpkListItem } from '../bpk-component-list';

import { sm, lg } from './all';
import { withButtonAlignment, withLargeButtonAlignment, withRtlSupport } from './index';
import SmallLongArrowRightIcon from './sm/long-arrow-right';
import LargeLongArrowRightIcon from './lg/long-arrow-right';

const AlignedSmallLongArrowRightIcon = withButtonAlignment(SmallLongArrowRightIcon);
const AlignedLargeLongArrowRightIcon = withLargeButtonAlignment(LargeLongArrowRightIcon);
const RtlAlignedLargeLongArrowRightIcon = withRtlSupport(withLargeButtonAlignment(LargeLongArrowRightIcon));

storiesOf('bpk-component-icon', module)
  .add('Small icons', () => (
    <BpkList>
      {Object.keys(sm).map((icon) => {
        const Icon = sm[icon];
        return (
          <BpkListItem key={icon}>
            <Icon fill={colors.colorGray700} /> <span>{icon}</span>
          </BpkListItem>
        );
      })}
    </BpkList>
  ))
  .add('Large icons', () => (
    <BpkList>
      {Object.keys(lg).map((icon) => {
        const Icon = lg[icon];
        return (
          <BpkListItem key={icon}>
            <Icon fill={colors.colorGray700} /> <span>{icon}</span>
          </BpkListItem>
        );
      })}
    </BpkList>
  ))
  .add('Align to button', () => (
    <BpkButton>
      Search <AlignedSmallLongArrowRightIcon fill={colors.colorWhite} />
    </BpkButton>
  ))
  .add('Align to large button', () => (
    <BpkButton large>
      Search <AlignedLargeLongArrowRightIcon fill={colors.colorWhite} />
    </BpkButton>
  ))
  .add('Align to large button (RTL support)', () => (
    <BpkButton large>
      Search <RtlAlignedLargeLongArrowRightIcon fill={colors.colorWhite} />
    </BpkButton>
  ));
