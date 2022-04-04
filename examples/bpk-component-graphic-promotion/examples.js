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
} from '../../packages/bpk-component-graphic-promotion';

const image =
  'https://content.skyscnr.com/m/31ebf33b07194794/original/Hiker-looking-out-over-mountain.jpg?crop=1048px:400px&quality=90';
const sponsor = {
  label: 'Sponsored',
  logo: 'https://js.skyscnr.com/sttc/bpk-content/skyland-a76916b4.png',
  altText: 'SkyLand',
};
const buttonText = 'Discover more';
const onClick = () => {
  window.location.href = 'https://www.skyscanner.net';
};

const tagline = 'Travel tips';
const headline = 'Three Peaks Challenge';
const subheading = 'How to complete the climb in 3 days';

const DefaultExample = () => (
  <BpkGraphicPromo
    tagline={tagline}
    headline={headline}
    subheading={subheading}
    image={image}
    sponsor={sponsor}
    buttonText={buttonText}
    onClick={onClick}
    textAlign={TEXT_ALIGN.start}
  />
);

const CenterAlignedExample = () => (
  <BpkGraphicPromo
    tagline={tagline}
    headline={headline}
    subheading={subheading}
    image={image}
    sponsor={sponsor}
    buttonText={buttonText}
    onClick={onClick}
    textAlign={TEXT_ALIGN.center}
  />
);

const RightAlignedExample = () => (
  <BpkGraphicPromo
    tagline={tagline}
    headline={headline}
    subheading={subheading}
    image={image}
    sponsor={sponsor}
    buttonText={buttonText}
    onClick={onClick}
    textAlign={TEXT_ALIGN.end}
  />
);

const InvertedPortraitExample = () => (
  <BpkGraphicPromo
    tagline={tagline}
    headline={headline}
    subheading={subheading}
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
    tagline={tagline}
    headline={headline}
    subheading={subheading}
    image={image}
    buttonText={buttonText}
    onClick={onClick}
    textAlign={TEXT_ALIGN.start}
  />
);

const MixedExample = () => (
  <>
    <DefaultExample />
    <CenterAlignedExample />
    <RightAlignedExample />
    <InvertedPortraitExample />
    <MinimalisticExample />
    <NonSponsoredExample />
  </>
);

export {
  DefaultExample,
  CenterAlignedExample,
  RightAlignedExample,
  InvertedPortraitExample,
  MinimalisticExample,
  NonSponsoredExample,
  MixedExample,
};
