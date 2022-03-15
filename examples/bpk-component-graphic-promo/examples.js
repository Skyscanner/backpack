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

import React from 'react';

import BpkGraphicPromo from '../../packages/bpk-component-graphic-promo';

const image =
  'https://content.skyscnr.com/m/4933408c167ee099/original/MERCH-131-Graphic-Promo-2096x800.png';
const sponsorLabel = 'Sponsored';
const sponsorLogo =
  'https://www.easyjet.com/ejcms/cache/medialibrary/Images/Global/Main-III/Logo/ej-transparent-x.png';
const sponsorAltText = 'easyJet';
const ctaText = 'Learn more';
const ctaUrl = 'https://www.skyscanner.net';

const kicker = 'Kicker';
const headline = 'Ride your wave';
const strapline =
  'Portugal and 6 more countries have just been added to the UK travel green list';

const DefaultExample = () => (
  <BpkGraphicPromo
    kicker={kicker}
    headline={headline}
    strapline={strapline}
    image={image}
    sponsorLabel={sponsorLabel}
    sponsorLogo={sponsorLogo}
    sponsorAltText={sponsorAltText}
    ctaText={ctaText}
    ctaUrl={ctaUrl}
    textAlign="start"
    invertVertically={false}
  />
);

const CenterAlignedExample = () => (
  <BpkGraphicPromo
    kicker={kicker}
    headline={headline}
    strapline={strapline}
    image={image}
    sponsorLabel={sponsorLabel}
    sponsorLogo={sponsorLogo}
    sponsorAltText={sponsorAltText}
    ctaText={ctaText}
    ctaUrl={ctaUrl}
    textAlign="center"
    invertVertically={false}
  />
);

const RightAlignedExample = () => (
  <BpkGraphicPromo
    kicker={kicker}
    headline={headline}
    strapline={strapline}
    image={image}
    sponsorLabel={sponsorLabel}
    sponsorLogo={sponsorLogo}
    sponsorAltText={sponsorAltText}
    ctaText={ctaText}
    ctaUrl={ctaUrl}
    textAlign="end"
    invertVertically={false}
  />
);

const InvertedPortraitExample = () => (
  <BpkGraphicPromo
    kicker={kicker}
    headline={headline}
    strapline={strapline}
    image={image}
    sponsorLabel={sponsorLabel}
    sponsorLogo={sponsorLogo}
    sponsorAltText={sponsorAltText}
    ctaText={ctaText}
    ctaUrl={ctaUrl}
    textAlign="start"
    invertVertically
  />
);

const MinimalisticExample = () => (
  <BpkGraphicPromo
    headline={headline}
    image={image}
    sponsorLabel={sponsorLabel}
    sponsorLogo={sponsorLogo}
    ctaText={ctaText}
    ctaUrl={ctaUrl}
    textAlign="start"
    invertVertically={false}
  />
);

const NonSponsoredExample = () => (
  <BpkGraphicPromo
    kicker={kicker}
    headline={headline}
    strapline={strapline}
    image={image}
    sponsorLabel={sponsorLabel}
    ctaText={ctaText}
    ctaUrl={ctaUrl}
    textAlign="start"
    invertVertically={false}
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
