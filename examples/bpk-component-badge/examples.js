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

import React from 'react';

import BpkSmallTickIcon from '../../packages/bpk-component-icon/sm/tick-circle';
import BpkSmallExclamationIcon from '../../packages/bpk-component-icon/sm/exclamation';
import BpkSmallHelpCircleIcon from '../../packages/bpk-component-icon/sm/help-circle';
import { BpkDarkExampleWrapper } from '../../packages/bpk-storybook-utils';
import BpkBadge, { BADGE_TYPES } from '../../packages/bpk-component-badge';

import BadgeLayout from './BadgeLayout';

const DefaultExample = () => (
  <BadgeLayout>
    <div>
      <BpkBadge>Apples</BpkBadge>&nbsp;
      <BpkBadge>Bananas</BpkBadge>&nbsp;
      <BpkBadge>Cherries</BpkBadge>&nbsp;
      <BpkBadge>Dragonfruit</BpkBadge>
    </div>
  </BadgeLayout>
);

const CenteredExample = () => (
  <BadgeLayout>
    <div>
      The badge is aligned to the centre of this text.{' '}
      <BpkBadge centered>Centered</BpkBadge>
    </div>
  </BadgeLayout>
);

const DockedLeadingExample = () => (
  <BadgeLayout docked="left">
    <BpkBadge docked="left">Advert</BpkBadge>
  </BadgeLayout>
);

const DockedTrailingExample = () => (
  <BadgeLayout docked="right">
    <BpkBadge docked="right">Advert</BpkBadge>
  </BadgeLayout>
);

const WarningExample = () => (
  <BadgeLayout>
    <BpkBadge type={BADGE_TYPES.warning}>Warning</BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.warning}>
      <BpkSmallHelpCircleIcon /> &nbsp;Warning
    </BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.warning}>
      Warning&nbsp; <BpkSmallHelpCircleIcon />
    </BpkBadge>
  </BadgeLayout>
);

const SuccessExample = () => (
  <BadgeLayout>
    <BpkBadge type={BADGE_TYPES.success}>Success</BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.success}>
      <BpkSmallTickIcon />
      &nbsp;Success
    </BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.success}>
      Success&nbsp;
      <BpkSmallTickIcon />
    </BpkBadge>
  </BadgeLayout>
);

const DestructiveExample = () => (
  <BadgeLayout>
    <BpkBadge type={BADGE_TYPES.destructive}>Destructive</BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.destructive}>
      <BpkSmallExclamationIcon />
      &nbsp;Destructive
    </BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.destructive}>
      Destructive&nbsp;
      <BpkSmallExclamationIcon />
    </BpkBadge>
  </BadgeLayout>
);

const LightExample = () => (
  <BpkDarkExampleWrapper>
    <BadgeLayout>
      <BpkBadge type={BADGE_TYPES.light}>Light</BpkBadge>
      &nbsp;
      <BpkBadge type={BADGE_TYPES.light}>
        <BpkSmallTickIcon />
        &nbsp;Light
      </BpkBadge>
      &nbsp;
      <BpkBadge type={BADGE_TYPES.light}>
        Light&nbsp;
        <BpkSmallTickIcon />
      </BpkBadge>
    </BadgeLayout>
  </BpkDarkExampleWrapper>
);

const InverseExample = () => (
  <BpkDarkExampleWrapper>
    <BadgeLayout>
      <BpkBadge type={BADGE_TYPES.inverse}>Inverse</BpkBadge>
      &nbsp;
      <BpkBadge type={BADGE_TYPES.inverse}>
        <BpkSmallTickIcon />
        &nbsp;Inverse
      </BpkBadge>
      &nbsp;
      <BpkBadge type={BADGE_TYPES.inverse}>
        Inverse&nbsp;
        <BpkSmallTickIcon />
      </BpkBadge>
    </BadgeLayout>
  </BpkDarkExampleWrapper>
);

const OutlineExample = () => (
  <BpkDarkExampleWrapper>
    <BadgeLayout>
      <BpkBadge type={BADGE_TYPES.outline}>Outline</BpkBadge>
      &nbsp;
      <BpkBadge type={BADGE_TYPES.outline}>
        <BpkSmallTickIcon />
        &nbsp;Outline
      </BpkBadge>
      &nbsp;
      <BpkBadge type={BADGE_TYPES.outline}>
        Outline&nbsp; <BpkSmallTickIcon />
      </BpkBadge>
    </BadgeLayout>
  </BpkDarkExampleWrapper>
);

const StrongExample = () => (
  <BadgeLayout>
    <BpkBadge type={BADGE_TYPES.strong}>Strong</BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.strong}>
      <BpkSmallTickIcon />
      &nbsp;Strong
    </BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.strong}>
      Strong&nbsp;
      <BpkSmallTickIcon />
    </BpkBadge>
  </BadgeLayout>
);

const BrandExample = () => (
  <BadgeLayout>
    <BpkBadge type={BADGE_TYPES.brand}>Strong</BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.brand}>
      <BpkSmallTickIcon />
      &nbsp;Brand
    </BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.brand}>
      Brand&nbsp;
      <BpkSmallTickIcon />
    </BpkBadge>
  </BadgeLayout>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <WarningExample />
    <SuccessExample />
    <DestructiveExample />
    <StrongExample />
    <BrandExample />
    <LightExample />
    <InverseExample />
    <OutlineExample />
  </div>
);

export {
  DefaultExample,
  CenteredExample,
  DockedLeadingExample,
  DockedTrailingExample,
  WarningExample,
  SuccessExample,
  DestructiveExample,
  LightExample,
  InverseExample,
  OutlineExample,
  StrongExample,
  BrandExample,
  MixedExample,
};
