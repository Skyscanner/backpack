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
  // @ts-expect-error TS(2740) FIXME: Type '{ children: (string | Element)[]; }' is miss... Remove this comment to see the full error message
  <BpkHorizontalNav>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
    {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem selected>Hotels</BpkHorizontalNavItem>
    {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
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
       {/* @ts-expect-error TS(2740) FIXME: Type '{ children: (string | Element)[]; autoScroll... Remove this comment to see the full error message */}
      <BpkHorizontalNav autoScrollToSelected>
         {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
        <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
        {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
        <BpkHorizontalNavItem>Hotels</BpkHorizontalNavItem>
         {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
        <BpkHorizontalNavItem selected>Car hire</BpkHorizontalNavItem>
      </BpkHorizontalNav>
    </div>
  </Fragment>
);

const NotUnderlinedExample = () => (
  // @ts-expect-error TS(2740) FIXME: Type '{ children: (string | Element)[]; showUnderl... Remove this comment to see the full error message
  <BpkHorizontalNav showUnderline={false}>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem selected>Hotels</BpkHorizontalNavItem>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
  </BpkHorizontalNav>
);

const LightAppearanceExample = () => (
  <BpkDarkExampleWrapper>
    {/* @ts-expect-error TS(2740) FIXME: Type '{ children: (string | Element)[]; type: HORIZ... Remove this comment to see the full error message */}
   <BpkHorizontalNav type={HORIZONTAL_NAV_TYPES.light}>
       {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
      <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
       {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
      <BpkHorizontalNavItem selected>Hotels</BpkHorizontalNavItem>
       {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
      <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
    </BpkHorizontalNav>
  </BpkDarkExampleWrapper>
);

const UsingCustomScrollColorsExample = () => (
  // @ts-expect-error TS(2739) FIXME: Type '{ children: (string | Element)[]; className:... Remove this comment to see the full error message
  <BpkHorizontalNav
    className={getClassName('bpk-horizontal-nav-custom-scrollers')}
    leadingScrollIndicatorClassName={getClassName(
      'bpk-horizontal-nav-custom-scrollers--leading',
    )}
    trailingScrollIndicatorClassName={getClassName(
      'bpk-horizontal-nav-custom-scrollers--trailing',
    )}
  >
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem selected>Hotels</BpkHorizontalNavItem>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
  </BpkHorizontalNav>
);

const AnchorTagsExample = () => (
  // @ts-expect-error TS(2740) FIXME: Type '{ children: (string | Element)[]; }' is miss... Remove this comment to see the full error message
  <BpkHorizontalNav>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem href="#">Flights</BpkHorizontalNavItem>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem selected href="#">
      Hotels
    </BpkHorizontalNavItem>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem href="#">Car hire</BpkHorizontalNavItem>
  </BpkHorizontalNav>
);

const ExtremeExample = () => (
  // @ts-expect-error TS(2740) FIXME: Type '{ children: (string | Element)[]; }' is miss... Remove this comment to see the full error message
  <BpkHorizontalNav>
    {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem selected>
      Flights Flights Flights Flights Flights Flights Flights Flights Flights
      Flights Flights Flights Flights Flights Flights Flights
    </BpkHorizontalNavItem>
    {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem>
      HotelsHotelsHotelsHotelsHotelsHotels
    </BpkHorizontalNavItem>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
  </BpkHorizontalNav>
);

const SpacedAroundExample = () => (
  // @ts-expect-error TS(2740) FIXME: Type '{ children: (string | Element)[]; }' is miss... Remove this comment to see the full error message
  <BpkHorizontalNav>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem spaceAround>Flights</BpkHorizontalNavItem>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem spaceAround>Hotels</BpkHorizontalNavItem>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem spaceAround selected>
      Car hire
    </BpkHorizontalNavItem>
  </BpkHorizontalNav>
);

const DisabledItemExample = () => (
  // @ts-expect-error TS(2740) FIXME: Type '{ children: (string | Element)[]; }' is miss... Remove this comment to see the full error message
  <BpkHorizontalNav>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem>Hotels</BpkHorizontalNavItem>
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem disabled>Car hire</BpkHorizontalNavItem>
  </BpkHorizontalNav>
);

const SeparatorsExample = () => (
  // @ts-expect-error TS(2740) FIXME: Type '{ children: (string | Element)[]; }' is miss... Remove this comment to see the full error message
  <BpkHorizontalNav>
   {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem selected>Flights</BpkHorizontalNavItem>
    <Separator />
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
    <BpkHorizontalNavItem>Hotels</BpkHorizontalNavItem>
    <Separator />
     {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
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
