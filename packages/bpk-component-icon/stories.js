import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { colors } from 'bpk-tokens/tokens/base.es6';
import BpkButton from '../bpk-component-button';
import { BpkList, BpkListItem } from '../bpk-component-list';

import allIcons from './all';
import { withButtonAlignment, withLargeButtonAlignment, withRtlSupport } from './index';
import SmallLongArrowRightIcon from './sm/long-arrow-right';
import LargeLongArrowRightIcon from './lg/long-arrow-right';

const AlignedSmallLongArrowRightIcon = withButtonAlignment(SmallLongArrowRightIcon);
const AlignedLargeLongArrowRightIcon = withLargeButtonAlignment(LargeLongArrowRightIcon);
const RtlAlignedLargeLongArrowRightIcon = withRtlSupport(withLargeButtonAlignment(LargeLongArrowRightIcon));

const stories = storiesOf('bpk-component-icon', module);

Object.keys(allIcons).forEach((iconGroupName) => {
  let storyName = `${iconGroupName} icons`;

  if (['sm', 'lg'].indexOf(iconGroupName) !== -1) {
    storyName = `${iconGroupName} icons (DEPRECATED)`;
  }

  stories.add(storyName, () => (
    <BpkList>
      {Object.keys(allIcons[iconGroupName]).map((icon) => {
        const Icon = allIcons[iconGroupName][icon];
        return (
          <BpkListItem key={icon}>
            <Icon fill={colors.colorGray700} /> <span>{icon}</span>
          </BpkListItem>
        );
      })}
    </BpkList>
  ));
});

stories
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
