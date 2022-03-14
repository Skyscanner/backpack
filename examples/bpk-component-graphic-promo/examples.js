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

const DefaultExample = () => (
  <BpkGraphicPromo
    kicker="Kicker"
    headline="Headline"
    strapline="Strapline"
    image="https://content.skyscnr.com/m/4933408c167ee099/original/MERCH-131-Graphic-Promo-2096x800.png"
    sponsorLogo="https://www.easyjet.com/ejcms/cache/medialibrary/Images/Global/Main-III/Logo/ej-transparent-x.png"
    sponsorAltText="easyJet"
    ctaText="Learn More"
    textAlign="start"
    invertVertically={false}
  />
);

const CenterAlignedExample = () => (
  <BpkGraphicPromo
    kicker="Kicker"
    headline="Headline"
    strapline="Strapline"
    image="https://content.skyscnr.com/m/4933408c167ee099/original/MERCH-131-Graphic-Promo-2096x800.png"
    sponsorLogo="https://www.easyjet.com/ejcms/cache/medialibrary/Images/Global/Main-III/Logo/ej-transparent-x.png"
    sponsorAltText="easyJet"
    ctaText="Learn More"
    textAlign="center"
    invertVertically={false}
  />
);

const RightAlignedExample = () => (
  <BpkGraphicPromo
    kicker="Kicker"
    headline="Headline"
    strapline="Strapline"
    image="https://content.skyscnr.com/m/4933408c167ee099/original/MERCH-131-Graphic-Promo-2096x800.png"
    sponsorLogo="https://www.easyjet.com/ejcms/cache/medialibrary/Images/Global/Main-III/Logo/ej-transparent-x.png"
    sponsorAltText="easyJet"
    ctaText="Learn More"
    textAlign="end"
    invertVertically={false}
  />
);

const InvertedPortraitExample = () => (
  <BpkGraphicPromo
    kicker="Kicker"
    headline="Headline"
    strapline="Strapline"
    image="https://content.skyscnr.com/m/4933408c167ee099/original/MERCH-131-Graphic-Promo-2096x800.png"
    sponsorLogo="https://www.easyjet.com/ejcms/cache/medialibrary/Images/Global/Main-III/Logo/ej-transparent-x.png"
    ctaText="Learn More"
    textAlign="start"
    invertVertically
  />
);

const MinimalisticExample = () => (
  <BpkGraphicPromo
    headline="Headline"
    image="https://content.skyscnr.com/m/4933408c167ee099/original/MERCH-131-Graphic-Promo-2096x800.png"
    sponsorLogo="https://www.easyjet.com/ejcms/cache/medialibrary/Images/Global/Main-III/Logo/ej-transparent-x.png"
    ctaText="Learn More"
    textAlign="start"
    invertVertically={false}
  />
);

const NonSponsoredExample = () => (
  <BpkGraphicPromo
    kicker="Kicker"
    headline="Headline"
    strapline="Strapline"
    image="https://content.skyscnr.com/m/4933408c167ee099/original/MERCH-131-Graphic-Promo-2096x800.png"
    ctaText="Learn More"
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
