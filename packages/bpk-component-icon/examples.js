/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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
import {
  colors,
  lineHeightBase,
  iconSizeSm,
  iconSizeLg,
  lineHeightSm,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';
import BpkButton from 'bpk-component-button';
import { BpkList, BpkListItem } from 'bpk-component-list';
import BpkText from 'bpk-component-text';

import { sm, lg } from './all';
import SearchIcon from './lg/search';
import SmallLongArrowRightIcon from './sm/long-arrow-right';
import LargeLongArrowRightIcon from './lg/long-arrow-right';

import {
  withAlignment,
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from './index';

const AlignedBaseArrow = withAlignment(
  SmallLongArrowRightIcon,
  lineHeightBase,
  iconSizeSm,
);

const AlignedSpan = withAlignment('span', iconSizeLg, lineHeightBase);
const AlignedSpanSmall = withAlignment('span', iconSizeLg, lineHeightSm);

const AlignedSmallLongArrowRightIcon = withButtonAlignment(
  SmallLongArrowRightIcon,
);
const AlignedLargeLongArrowRightIcon = withLargeButtonAlignment(
  LargeLongArrowRightIcon,
);
const RtlAlignedLargeLongArrowRightIcon = withRtlSupport(
  withLargeButtonAlignment(LargeLongArrowRightIcon),
);

const SmallIconsExample = () => (
  <BpkList>
    {Object.keys(sm).map((icon) => {
      const Icon = sm[icon];
      return (
        <BpkListItem key={icon}>
          <Icon fill={colors.colorSkyGrayTint01} /> <span>{icon}</span>
        </BpkListItem>
      );
    })}
  </BpkList>
);

const LargeIconsExample = () => (
  <BpkList>
    {Object.keys(lg).map((icon) => {
      const Icon = lg[icon];
      return (
        <BpkListItem key={icon}>
          <Icon fill={colors.colorSkyGrayTint01} /> <span>{icon}</span>
        </BpkListItem>
      );
    })}
  </BpkList>
);

const AlignToBaseTextExample = () => (
  <BpkText textStyle="base">
    Search &nbsp;
    <AlignedBaseArrow fill={colors.colorSkyGrayTint01} />
  </BpkText>
);

const AlignToLargeTextExample = () => (
  <BpkText textStyle="lg">
    Search &nbsp;
    <AlignedLargeLongArrowRightIcon fill={colors.colorSkyGrayTint01} />
  </BpkText>
);

const AlignSmallTextToIconExample = () => (
  <BpkText textStyle="sm">
    <SearchIcon fill={colors.colorSkyGrayTint01} />
    <AlignedSpanSmall>&nbsp; Search</AlignedSpanSmall>
  </BpkText>
);

const AlignTextToIconExample = () => (
  <BpkText textStyle="base">
    <SearchIcon fill={colors.colorSkyGrayTint01} />
    <AlignedSpan>&nbsp; Search</AlignedSpan>
  </BpkText>
);

const AlignToButtonExample = () => (
  <BpkButton>
    Next step <AlignedSmallLongArrowRightIcon fill={colors.colorWhite} />
  </BpkButton>
);

const AlignToLargeButtonExample = () => (
  <BpkButton large>
    Next step <AlignedLargeLongArrowRightIcon fill={colors.colorWhite} />
  </BpkButton>
);

const AlignToLargeButtonRTLExample = () => (
  <BpkButton large>
    Search <RtlAlignedLargeLongArrowRightIcon fill={colors.colorWhite} />
  </BpkButton>
);

const MixedExample = () => (
  <div>
    <SmallIconsExample />
    <LargeIconsExample />
  </div>
);

export {
  SmallIconsExample,
  LargeIconsExample,
  AlignToBaseTextExample,
  AlignToLargeTextExample,
  AlignSmallTextToIconExample,
  AlignTextToIconExample,
  AlignToButtonExample,
  AlignToLargeButtonExample,
  AlignToLargeButtonRTLExample,
  MixedExample,
};
