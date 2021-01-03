/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { cssModules } from 'bpk-react-utils';
import {
  spacingXs,
  spacingSm,
  onePixelRem,
  colorSkyGrayTint06,
} from 'bpk-tokens/tokens/base.es6';
import BpkText from 'bpk-component-text';

import STYLES from './stories.scss';

import BpkHorizontalNav, {
  BpkHorizontalNavItem,
  HORIZONTAL_NAV_TYPES,
} from './index';

const getClassName = cssModules(STYLES);

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
        backgroundColor: colorSkyGrayTint06,
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
  .add('Scroll to selected element', () => (
    <Fragment>
      <BpkText>
        Note - this story works best when viewing the storybook frame alone
      </BpkText>
      <div
        className={getClassName('bpk-horizontal-nav-stories__narrow-container')}
      >
        <BpkHorizontalNav autoScrollToSelected>
          <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
          <BpkHorizontalNavItem>Hotels</BpkHorizontalNavItem>
          <BpkHorizontalNavItem selected>Car hire</BpkHorizontalNavItem>
        </BpkHorizontalNav>
      </div>
    </Fragment>
  ))
  .add('Not underlined', () => (
    <BpkHorizontalNav showUnderline={false}>
      <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
      <BpkHorizontalNavItem selected>Hotels</BpkHorizontalNavItem>
      <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
    </BpkHorizontalNav>
  ))
  .add('Light appearance', () => (
    <div
      className={getClassName(
        'bpk-horizontal-nav-stories__light-appearance-wrapper',
      )}
    >
      <BpkHorizontalNav type={HORIZONTAL_NAV_TYPES.light}>
        <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
        <BpkHorizontalNavItem selected>Hotels</BpkHorizontalNavItem>
        <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
      </BpkHorizontalNav>
    </div>
  ))
  .add('Using custom scroll colors', () => (
    <BpkHorizontalNav
      className={getClassName('bpk-horizontal-nav-custom-scrollers')}
      leadingScrollIndicatorClassName={getClassName(
        'bpk-horizontal-nav-custom-scrollers--leading',
      )}
      trailingScrollIndicatorClassName={getClassName(
        'bpk-horizontal-nav-custom-scrollers--trailing',
      )}
    >
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
    <BpkHorizontalNav spaceAround>
      <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
      <BpkHorizontalNavItem>Hotels</BpkHorizontalNavItem>
      <BpkHorizontalNavItem selected>Car hire</BpkHorizontalNavItem>
    </BpkHorizontalNav>
  ))
  .add('Disabled item', () => (
    <BpkHorizontalNav>
      <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
      <BpkHorizontalNavItem>Hotels</BpkHorizontalNavItem>
      <BpkHorizontalNavItem disabled>Car hire</BpkHorizontalNavItem>
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
