/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import {
  spacingXs,
  spacingSm,
  onePixelRem,
  colorGray100,
} from 'bpk-tokens/tokens/base.es6';

import BpkHorizontalNav, { BpkHorizontalNavItem } from './index';

const Separator = () => (
  <span
    style={{
      padding: `${spacingXs} ${spacingSm}`,
    }}
  >
    <span
      style={{
        display: 'flex',
        height: '100%',
        paddingRight: onePixelRem,
        backgroundColor: colorGray100,
      }}
    />
  </span>
);

storiesOf('bpk-component-horizontal-nav', module)
  .add('Example', () => (
    <BpkHorizontalNav>
      <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
      <BpkHorizontalNavItem selected>Hotels</BpkHorizontalNavItem>
      <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
    </BpkHorizontalNav>
  ))
  .add('Anchor tags', () => (
    <BpkHorizontalNav>
      <BpkHorizontalNavItem href="#">Flights</BpkHorizontalNavItem>
      <BpkHorizontalNavItem selected href="#">
        Hotels
      </BpkHorizontalNavItem>
      <BpkHorizontalNavItem href="#">Car hire</BpkHorizontalNavItem>
    </BpkHorizontalNav>
  ))
  .add('Extreme example', () => (
    <BpkHorizontalNav>
      <BpkHorizontalNavItem selected>
        Flights Flights Flights Flights Flights Flights Flights Flights Flights
        Flights Flights Flights Flights Flights Flights Flights
      </BpkHorizontalNavItem>
      <BpkHorizontalNavItem>
        HotelsHotelsHotelsHotelsHotelsHotels
      </BpkHorizontalNavItem>
      <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
    </BpkHorizontalNav>
  ))
  .add('Space around', () => (
    <BpkHorizontalNav>
      <BpkHorizontalNavItem spaceAround>Flights</BpkHorizontalNavItem>
      <BpkHorizontalNavItem spaceAround>Hotels</BpkHorizontalNavItem>
      <BpkHorizontalNavItem selected spaceAround>
        Car hire
      </BpkHorizontalNavItem>
    </BpkHorizontalNav>
  ))
  .add('Stretch', () => (
    <BpkHorizontalNav>
      <BpkHorizontalNavItem stretch>Flights</BpkHorizontalNavItem>
      <BpkHorizontalNavItem stretch>Hotels</BpkHorizontalNavItem>
      <BpkHorizontalNavItem stretch selected>
        Car hire
      </BpkHorizontalNavItem>
    </BpkHorizontalNav>
  ))
  .add('Separators', () => (
    <BpkHorizontalNav>
      <BpkHorizontalNavItem selected>Flights</BpkHorizontalNavItem>
      <Separator />
      <BpkHorizontalNavItem>Hotels</BpkHorizontalNavItem>
      <Separator />
      <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
    </BpkHorizontalNav>
  ));
