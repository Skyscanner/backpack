import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { spacingXs, spacingSm, onePixelRem, colorGray100 } from 'bpk-tokens/tokens/base.es6';

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
      <BpkHorizontalNavItem selected href="#">Hotels</BpkHorizontalNavItem>
      <BpkHorizontalNavItem href="#">Car hire</BpkHorizontalNavItem>
    </BpkHorizontalNav>
  ))
  .add('Extreme example', () => (
    <BpkHorizontalNav>
      <BpkHorizontalNavItem selected>
        Flights Flights Flights Flights Flights Flights Flights Flights Flights Flights Flights Flights Flights
        Flights Flights Flights
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
  .add('Separators', () => (
    <BpkHorizontalNav>
      <BpkHorizontalNavItem selected>Flights</BpkHorizontalNavItem>
      <Separator />
      <BpkHorizontalNavItem>Hotels</BpkHorizontalNavItem>
      <Separator />
      <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
    </BpkHorizontalNav>
  ));
