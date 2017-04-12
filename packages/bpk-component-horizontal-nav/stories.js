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
  .add('Extreme example', () => (
    <BpkHorizontalNav>
      <BpkHorizontalNavItem>
        Flights Flights Flights Flights Flights Flights Flights Flights Flights Flights Flights Flights Flights
        Flights Flights Flights
      </BpkHorizontalNavItem>
      <Separator />
      <BpkHorizontalNavItem selected>
        HotelsHotelsHotelsHotelsHotelsHotels
      </BpkHorizontalNavItem>
      <Separator />
      <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
    </BpkHorizontalNav>
  ))
  .add('Separators', () => (
    <BpkHorizontalNav>
      <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
      <Separator />
      <BpkHorizontalNavItem selected>Hotels</BpkHorizontalNavItem>
      <Separator />
      <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
    </BpkHorizontalNav>
  ));
