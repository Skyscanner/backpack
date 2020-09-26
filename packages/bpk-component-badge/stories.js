/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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
import BpkSmallBeerIcon from 'bpk-component-icon/sm/beer';
import BpkSmallFlightIcon from 'bpk-component-icon/sm/flight';
import BpkSmallWeatherIcon from 'bpk-component-icon/sm/weather';
import BpkSmallTickIcon from 'bpk-component-icon/sm/tick-circle';
import BpkSmallCloseIcon from 'bpk-component-icon/sm/close-circle';

import BadgeLayout from './BadgeLayout';

import BpkBadge, { BADGE_TYPES } from './index';

export default {
  title: 'bpk-component-badge',
};

export const Default = () => (
  <BadgeLayout>
    <div>
      This is a badge <BpkBadge>Promocionado</BpkBadge>
    </div>
  </BadgeLayout>
);

export const WithIcons = () => (
  <BadgeLayout>
    <div>
      With one icon{' '}
      <BpkBadge>
        <BpkSmallFlightIcon />
        &nbsp;Promocionado
      </BpkBadge>
    </div>
    <div>
      With multiple icons{' '}
      <BpkBadge>
        <BpkSmallWeatherIcon /> + <BpkSmallBeerIcon />
        &nbsp;Promocionado
      </BpkBadge>
    </div>
    <div>
      With multiple icons and no text{' '}
      <BpkBadge>
        <BpkSmallWeatherIcon /> + <BpkSmallBeerIcon />
      </BpkBadge>
    </div>
  </BadgeLayout>
);

export const Centered = () => (
  <BadgeLayout>
    <div>
      This is a badge <BpkBadge centered>Promocionado</BpkBadge>
    </div>
  </BadgeLayout>
);

export const DockedRight = () => (
  <BadgeLayout docked="right">
    <BpkBadge docked="right">Promocionado</BpkBadge>
  </BadgeLayout>
);

DockedRight.story = {
  name: 'Docked right',
};

export const DockedLeft = () => (
  <BadgeLayout docked="left">
    <BpkBadge docked="left">Promocionado</BpkBadge>
  </BadgeLayout>
);

export const WarningDefault = () => (
  <BadgeLayout>
    <BpkBadge type={BADGE_TYPES.warning}>Warning</BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.warning}>
      <BpkSmallTickIcon /> &nbsp;Warning
    </BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.warning}>
      Warning&nbsp; <BpkSmallTickIcon />
    </BpkBadge>
  </BadgeLayout>
);

WarningDefault.story = {
  name: 'Warning (Default)',
};

export const Success = () => (
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

export const Destructive = () => (
  <BadgeLayout>
    <BpkBadge type={BADGE_TYPES.destructive}>Destructive</BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.destructive}>
      <BpkSmallCloseIcon />
      &nbsp;Destructive
    </BpkBadge>
    &nbsp;
    <BpkBadge type={BADGE_TYPES.destructive}>
      Destructive&nbsp;
      <BpkSmallCloseIcon />
    </BpkBadge>
  </BadgeLayout>
);

export const Light = () => (
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
);

export const Inverse = () => (
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
);

export const Outline = () => (
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
);
