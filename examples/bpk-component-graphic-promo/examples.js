/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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

import BpkGraphicPromo, {
  TEXT_ALIGN,
} from '../../packages/bpk-component-graphic-promo';

const image =
  'https://content.skyscnr.com/m/4933408c167ee099/original/MERCH-131-Graphic-Promo-2096x800.png';
const sponsor = {
  label: 'Sponsored',
  logo: 'https://js.skyscnr.com/sttc/bpk-content/logo_suite_horizontal_logo-33239ee8.svg',
  altText: 'easyJet',
};
const buttonText = 'Learn more';
const onClick = () => {
  window.location.href = 'https://www.skyscanner.net';
};

const kicker = 'Kicker';
const headline = 'Ride your wave';
const strapline =
  'Portugal and 6 more countries have just been added to the UK travel green list';

const DefaultExample = () => (
  <BpkGraphicPromo
    kicker={kicker}
    headline={headline}
    strapline={strapline}
    image={image}
    sponsor={sponsor}
    buttonText={buttonText}
    onClick={onClick}
    textAlign={TEXT_ALIGN.start}
  />
);

const CenterAlignedExample = () => (
  <BpkGraphicPromo
    kicker={kicker}
    headline={headline}
    strapline={strapline}
    image={image}
    sponsor={sponsor}
    buttonText={buttonText}
    onClick={onClick}
    textAlign={TEXT_ALIGN.center}
  />
);

const RightAlignedExample = () => (
  <BpkGraphicPromo
    kicker={kicker}
    headline={headline}
    strapline={strapline}
    image={image}
    sponsor={sponsor}
    buttonText={buttonText}
    onClick={onClick}
    textAlign={TEXT_ALIGN.end}
  />
);

const InvertedPortraitExample = () => (
  <BpkGraphicPromo
    kicker={kicker}
    headline={headline}
    strapline={strapline}
    image={image}
    sponsor={sponsor}
    buttonText={buttonText}
    onClick={onClick}
    textAlign={TEXT_ALIGN.start}
    invertVertically
  />
);

const MinimalisticExample = () => (
  <BpkGraphicPromo
    headline={headline}
    image={image}
    sponsor={sponsor}
    buttonText={buttonText}
    onClick={onClick}
    textAlign={TEXT_ALIGN.start}
  />
);

const NonSponsoredExample = () => (
  <BpkGraphicPromo
    kicker={kicker}
    headline={headline}
    strapline={strapline}
    image={image}
    buttonText={buttonText}
    onClick={onClick}
    textAlign={TEXT_ALIGN.start}
  />
);

export {
  DefaultExample,
  CenterAlignedExample,
  RightAlignedExample,
  InvertedPortraitExample,
  MinimalisticExample,
  NonSponsoredExample,
};
