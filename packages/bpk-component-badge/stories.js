/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
import { storiesOf } from '@storybook/react';
import BpkSmallBeerIcon from 'bpk-component-icon/sm/beer';
import BpkSmallFlightIcon from 'bpk-component-icon/sm/flight';
import BpkSmallWeatherIcon from 'bpk-component-icon/sm/weather';

import BadgeLayout from './BadgeLayout';

import BpkBadge, { BADGE_TYPES } from './index';

storiesOf('bpk-component-badge', module)
  .add('Default', () => (
    <BadgeLayout>
      <div>
        This is a badge <BpkBadge>Promocionado</BpkBadge>
      </div>
    </BadgeLayout>
  ))
  .add('With icons', () => (
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
  ))
  .add('Centered', () => (
    <BadgeLayout>
      <div>
        This is a badge <BpkBadge centered>Promocionado</BpkBadge>
      </div>
    </BadgeLayout>
  ))
  .add('Docked right', () => (
    <BadgeLayout docked="right">
      <BpkBadge docked="right">Promocionado</BpkBadge>
    </BadgeLayout>
  ))
  .add('Docked left', () => (
    <BadgeLayout docked="left">
      <BpkBadge docked="left">Promocionado</BpkBadge>
    </BadgeLayout>
  ))
  .add('Warning (Default)', () => (
    <BadgeLayout>
      <BpkBadge type={BADGE_TYPES.warning}>Promocionado</BpkBadge>
    </BadgeLayout>
  ))
  .add('Success', () => (
    <BadgeLayout>
      <BpkBadge type={BADGE_TYPES.success}>Promocionado</BpkBadge>
    </BadgeLayout>
  ))
  .add('Destructive', () => (
    <BadgeLayout>
      <BpkBadge type={BADGE_TYPES.destructive}>Promocionado</BpkBadge>
    </BadgeLayout>
  ))
  .add('Light', () => (
    <BadgeLayout>
      <BpkBadge type={BADGE_TYPES.light}>Promocionado</BpkBadge>
    </BadgeLayout>
  ))
  .add('Inverse', () => (
    <BadgeLayout>
      <BpkBadge type={BADGE_TYPES.inverse}>Promocionado</BpkBadge>
    </BadgeLayout>
  ))
  .add('Outline', () => (
    <BadgeLayout>
      <BpkBadge type={BADGE_TYPES.outline}>Promocionado</BpkBadge>
    </BadgeLayout>
  ));
