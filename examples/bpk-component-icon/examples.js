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

import {
  textColors,
  lineHeightBase,
  iconSizeSm,
  iconSizeLg,
  lineHeightSm,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkButton from '../../packages/bpk-component-button';
import {
  withAlignment,
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from '../../packages/bpk-component-icon';
import { sm, lg, xxxl } from '../../packages/bpk-component-icon/all';
import LargeLongArrowRightIcon from '../../packages/bpk-component-icon/lg/long-arrow-right';
import SearchIcon from '../../packages/bpk-component-icon/lg/search';
import SmallLongArrowRightIcon from '../../packages/bpk-component-icon/sm/long-arrow-right';
import { BpkList, BpkListItem } from '../../packages/bpk-component-list';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';

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
          <Icon fill={textColors.textPrimaryDay} /> <span>{icon}</span>
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
          <Icon fill={textColors.textPrimaryDay} /> <span>{icon}</span>
        </BpkListItem>
      );
    })}
  </BpkList>
);

const ExtraLargeIconsExample = () => (
  <BpkList>
    {Object.keys(xxxl).map((icon) => {
      const Icon = xxxl[icon];
      return (
        <BpkListItem key={icon}>
          <Icon fill={textColors.textPrimaryDay} /> <span>{icon}</span>
        </BpkListItem>
      );
    })}
  </BpkList>
);

const AlignToBaseTextExample = () => (
  <BpkText textStyle={TEXT_STYLES.bodyDefault}>
    Search &nbsp;
    <AlignedBaseArrow fill={textColors.textPrimaryDay} />
  </BpkText>
);

const AlignToLargeTextExample = () => (
  <BpkText textStyle={TEXT_STYLES.bodyLongform}>
    Search &nbsp;
    <AlignedLargeLongArrowRightIcon fill={textColors.textPrimaryDay} />
  </BpkText>
);

const AlignSmallTextToIconExample = () => (
  <BpkText textStyle={TEXT_STYLES.footnote}>
    <SearchIcon fill={textColors.textPrimaryDay} />
    <AlignedSpanSmall>&nbsp; Search</AlignedSpanSmall>
  </BpkText>
);

const AlignTextToIconExample = () => (
  <BpkText textStyle={TEXT_STYLES.bodyDefault}>
    <SearchIcon fill={textColors.textPrimaryDay} />
    <AlignedSpan>&nbsp; Search</AlignedSpan>
  </BpkText>
);

const AlignToButtonExample = () => (
  <BpkButton>
    Next step{' '}
    <AlignedSmallLongArrowRightIcon fill={textColors.textPrimaryInverseDay} />
  </BpkButton>
);

const AlignToLargeButtonExample = () => (
  <BpkButton large>
    Next step{' '}
    <AlignedLargeLongArrowRightIcon fill={textColors.textPrimaryInverseDay} />
  </BpkButton>
);

const AlignToLargeButtonRTLExample = () => (
  <BpkButton large>
    Search{' '}
    <RtlAlignedLargeLongArrowRightIcon
      fill={textColors.textPrimaryInverseDay}
    />
  </BpkButton>
);

const MixedExample = () => (
  <div>
    <SmallIconsExample />
    <LargeIconsExample />
    <ExtraLargeIconsExample />
  </div>
);

export {
  SmallIconsExample,
  LargeIconsExample,
  ExtraLargeIconsExample,
  AlignToBaseTextExample,
  AlignToLargeTextExample,
  AlignSmallTextToIconExample,
  AlignTextToIconExample,
  AlignToButtonExample,
  AlignToLargeButtonExample,
  AlignToLargeButtonRTLExample,
  MixedExample,
};
