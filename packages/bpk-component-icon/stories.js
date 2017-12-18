/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';

import { colors } from 'bpk-tokens/tokens/base.es6';
import BpkButton from '../bpk-component-button';
import { BpkList, BpkListItem } from '../bpk-component-list';

import { sm, lg } from './all';
import {
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from './index';
import SmallLongArrowRightIcon from './sm/long-arrow-right';
import LargeLongArrowRightIcon from './lg/long-arrow-right';

const AlignedSmallLongArrowRightIcon = withButtonAlignment(
  SmallLongArrowRightIcon,
);
const AlignedLargeLongArrowRightIcon = withLargeButtonAlignment(
  LargeLongArrowRightIcon,
);
const RtlAlignedLargeLongArrowRightIcon = withRtlSupport(
  withLargeButtonAlignment(LargeLongArrowRightIcon),
);

storiesOf('bpk-component-icon', module)
  .add('Small icons', () => (
    <BpkList>
      {Object.keys(sm).map(icon => {
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
      {Object.keys(lg).map(icon => {
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
