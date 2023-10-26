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

/* @flow strict */

import BpkSmallTickIcon from '../../packages/bpk-component-icon/sm/tick-circle';
import BpkSmallExclamationIcon from '../../packages/bpk-component-icon/sm/exclamation';
import BpkSmallInfoCircleIcon from '../../packages/bpk-component-icon/sm/information-circle';
import { BpkDarkExampleWrapper } from '../bpk-storybook-utils';
import { BpkBadgeV2, BADGE_TYPES } from '../../packages/bpk-component-badge';

import BadgeLayout from './BadgeLayout';

const DefaultExample = () => (
  <BadgeLayout>
    <BpkBadgeV2>Normal</BpkBadgeV2>
    &nbsp;
    <BpkBadgeV2>
      <BpkSmallTickIcon /> &nbsp;Normal
    </BpkBadgeV2>
  </BadgeLayout>
);

const WarningExample = () => (
  <BadgeLayout>
    <BpkBadgeV2 type={BADGE_TYPES.warning}>
      <BpkSmallInfoCircleIcon /> &nbsp;Warning
    </BpkBadgeV2>
  </BadgeLayout>
);

const SuccessExample = () => (
  <BadgeLayout>
    <BpkBadgeV2 type={BADGE_TYPES.success}>
      <BpkSmallTickIcon />
      &nbsp;Success
    </BpkBadgeV2>
  </BadgeLayout>
);

const CriticalExample = () => (
  <BadgeLayout>
    <BpkBadgeV2 type={BADGE_TYPES.critical}>
      <BpkSmallExclamationIcon />
      &nbsp;Critical
    </BpkBadgeV2>
  </BadgeLayout>
);

const InverseExample = () => (
  <BpkDarkExampleWrapper>
    <BadgeLayout>
      <BpkBadgeV2 type={BADGE_TYPES.inverse}>Inverse</BpkBadgeV2>
      &nbsp;
      <BpkBadgeV2 type={BADGE_TYPES.inverse}>
        <BpkSmallTickIcon />
        &nbsp;Inverse
      </BpkBadgeV2>
    </BadgeLayout>
  </BpkDarkExampleWrapper>
);

const OutlineExample = () => (
  <BpkDarkExampleWrapper>
    <BadgeLayout>
      <BpkBadgeV2 type={BADGE_TYPES.outline}>Outline</BpkBadgeV2>
      &nbsp;
      <BpkBadgeV2 type={BADGE_TYPES.outline}>
        <BpkSmallTickIcon />
        &nbsp;Outline
      </BpkBadgeV2>
    </BadgeLayout>
  </BpkDarkExampleWrapper>
);

const StrongExample = () => (
  <BadgeLayout>
    <BpkBadgeV2 type={BADGE_TYPES.strong}>Strong</BpkBadgeV2>
    &nbsp;
    <BpkBadgeV2 type={BADGE_TYPES.strong}>
      <BpkSmallTickIcon />
      &nbsp;Strong
    </BpkBadgeV2>
  </BadgeLayout>
);

const BrandExample = () => (
  <BadgeLayout>
    <BpkBadgeV2 type={BADGE_TYPES.brand}>Strong</BpkBadgeV2>
    &nbsp;
    <BpkBadgeV2 type={BADGE_TYPES.brand}>
      <BpkSmallTickIcon />
      &nbsp;Brand
    </BpkBadgeV2>
  </BadgeLayout>
);

const CenteredExample = () => (
  <BadgeLayout>
    <div>
      The badge is aligned to the centre of this text.{' '}
      <BpkBadgeV2 centered>Centered</BpkBadgeV2>
    </div>
  </BadgeLayout>
);

const DockedLeadingExample = () => (
  <BadgeLayout docked="left">
    <BpkBadgeV2 docked="left">Advert</BpkBadgeV2>
  </BadgeLayout>
);

const DockedTrailingExample = () => (
  <BadgeLayout docked="right">
    <BpkBadgeV2 docked="right">Advert</BpkBadgeV2>
  </BadgeLayout>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <WarningExample />
    <SuccessExample />
    <CriticalExample />
    <StrongExample />
    <BrandExample />
    <InverseExample />
    <OutlineExample />
  </div>
);

export {
  DefaultExample,
  WarningExample,
  SuccessExample,
  CriticalExample,
  InverseExample,
  OutlineExample,
  StrongExample,
  BrandExample,
  CenteredExample,
  DockedLeadingExample,
  DockedTrailingExample,
  MixedExample,
};
