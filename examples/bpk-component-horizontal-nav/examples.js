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

import { Fragment } from 'react';

import {
  onePixelRem,
  colorSkyGrayTint06,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkHorizontalNav, {
  BpkHorizontalNavItem,
  HORIZONTAL_NAV_TYPES,
} from '../../packages/bpk-component-horizontal-nav';
import BpkText from '../../packages/bpk-component-text';
import { cssModules } from '../../packages/bpk-react-utils';
import { BpkDarkExampleWrapper } from '../bpk-storybook-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const Separator = () => (
  <span
    style={{
      padding: '.25rem .25rem',
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

const DefaultExample = () => (
  <BpkHorizontalNav>
    <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
    <BpkHorizontalNavItem selected>Hotels</BpkHorizontalNavItem>
    <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
  </BpkHorizontalNav>
);

const ScrollToSelectedExample = () => (
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
);

const NotUnderlinedExample = () => (
  <BpkHorizontalNav showUnderline={false}>
    <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
    <BpkHorizontalNavItem selected>Hotels</BpkHorizontalNavItem>
    <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
  </BpkHorizontalNav>
);

const LightAppearanceExample = () => (
  <BpkDarkExampleWrapper>
    <BpkHorizontalNav type={HORIZONTAL_NAV_TYPES.light}>
      <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
      <BpkHorizontalNavItem selected>Hotels</BpkHorizontalNavItem>
      <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
    </BpkHorizontalNav>
  </BpkDarkExampleWrapper>
);

const UsingCustomScrollColorsExample = () => (
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
);

const AnchorTagsExample = () => (
  <BpkHorizontalNav>
    <BpkHorizontalNavItem href="#">Flights</BpkHorizontalNavItem>
    <BpkHorizontalNavItem selected href="#">
      Hotels
    </BpkHorizontalNavItem>
    <BpkHorizontalNavItem href="#">Car hire</BpkHorizontalNavItem>
  </BpkHorizontalNav>
);

const ExtremeExample = () => (
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
);

const SpacedAroundExample = () => (
  <BpkHorizontalNav>
    <BpkHorizontalNavItem spaceAround>Flights</BpkHorizontalNavItem>
    <BpkHorizontalNavItem spaceAround>Hotels</BpkHorizontalNavItem>
    <BpkHorizontalNavItem spaceAround selected>
      Car hire
    </BpkHorizontalNavItem>
  </BpkHorizontalNav>
);

const DisabledItemExample = () => (
  <BpkHorizontalNav>
    <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
    <BpkHorizontalNavItem>Hotels</BpkHorizontalNavItem>
    <BpkHorizontalNavItem disabled>Car hire</BpkHorizontalNavItem>
  </BpkHorizontalNav>
);

const SeparatorsExample = () => (
  <BpkHorizontalNav>
    <BpkHorizontalNavItem selected>Flights</BpkHorizontalNavItem>
    <Separator />
    <BpkHorizontalNavItem>Hotels</BpkHorizontalNavItem>
    <Separator />
    <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
  </BpkHorizontalNav>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <LightAppearanceExample />
    <UsingCustomScrollColorsExample />
    <DisabledItemExample />
    <SpacedAroundExample />
    <SeparatorsExample />
  </div>
);

export {
  DefaultExample,
  ScrollToSelectedExample,
  NotUnderlinedExample,
  LightAppearanceExample,
  UsingCustomScrollColorsExample,
  AnchorTagsExample,
  ExtremeExample,
  SpacedAroundExample,
  DisabledItemExample,
  SeparatorsExample,
  MixedExample,
};
