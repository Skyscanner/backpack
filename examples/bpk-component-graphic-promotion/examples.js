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

import BpkGraphicPromo, {
  TEXT_ALIGN,
} from '../../packages/bpk-component-graphic-promotion';
import { cssModules } from '../../packages/bpk-react-utils';

import * as STYLES from './examples.module.scss';

const contentId = 'graphic-promo-content';
const getClassName = cssModules(STYLES);
const graphicPromoClassName = getClassName('bpk-graphic-promotion-example');

const sponsor = {
  label: 'Sponsored',
  logo: 'https://js.skyscnr.com/sttc/bpk-content/skyland-a76916b4.png',
  altText: 'SkyLand',
};
const buttonText = 'Discover more';
const onClick = () => {
  window.open('https://www.skyscanner.net');
};

const tagline = 'Travel tips';
const headline = 'Three Peaks Challenge';
const subheading = 'How to complete the climb in 3 days';
const style = {
  '--background-image-mobile':
    "url('https://content.skyscnr.com/m/31ebf33b07194794/original/Hiker-looking-out-over-mountain.jpg?crop=390:844px&quality=90')",
  '--background-image-tablet':
    "url('https://content.skyscnr.com/m/31ebf33b07194794/original/Hiker-looking-out-over-mountain.jpg?crop=820px:1180px&quality=90')",
  '--background-image-desktop':
    "url('https://content.skyscnr.com/m/31ebf33b07194794/original/Hiker-looking-out-over-mountain.jpg?crop=2096px:800px&quality=90')",
};

const DefaultExample = () => (
  <BpkGraphicPromo
    contentId={contentId}
    tagline={tagline}
    headline={headline}
    subheading={subheading}
    sponsor={sponsor}
    buttonText={buttonText}
    onClick={onClick}
    className={graphicPromoClassName}
    style={style}
    textAlign={TEXT_ALIGN.start}
  />
);

const CenterAlignedExample = () => (
  <BpkGraphicPromo
    tagline={tagline}
    headline={headline}
    subheading={subheading}
    sponsor={sponsor}
    buttonText={buttonText}
    onClick={onClick}
    className={graphicPromoClassName}
    style={style}
    textAlign={TEXT_ALIGN.center}
  />
);

const RightAlignedExample = () => (
  <BpkGraphicPromo
    tagline={tagline}
    headline={headline}
    subheading={subheading}
    sponsor={sponsor}
    buttonText={buttonText}
    onClick={onClick}
    className={graphicPromoClassName}
    style={style}
    textAlign={TEXT_ALIGN.end}
  />
);

const InvertedPortraitExample = () => (
  <BpkGraphicPromo
    tagline={tagline}
    headline={headline}
    subheading={subheading}
    sponsor={sponsor}
    buttonText={buttonText}
    onClick={onClick}
    className={graphicPromoClassName}
    style={style}
    textAlign={TEXT_ALIGN.start}
    invertVertically
  />
);

const MinimalisticExample = () => (
  <BpkGraphicPromo
    headline={headline}
    sponsor={sponsor}
    buttonText={buttonText}
    className={graphicPromoClassName}
    style={style}
    onClick={onClick}
    textAlign={TEXT_ALIGN.start}
  />
);

const MinimalisticRightAlignedExample = () => (
  <BpkGraphicPromo
    headline={headline}
    subheading={subheading}
    buttonText={buttonText}
    className={graphicPromoClassName}
    style={style}
    onClick={onClick}
    textAlign={TEXT_ALIGN.end}
  />
);

const NoStyleExample = () => (
  <BpkGraphicPromo
    headline={headline}
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
    buttonText={buttonText}
    className={graphicPromoClassName}
    style={style}
    onClick={onClick}
    textAlign={TEXT_ALIGN.start}
  />
);

const NonSponsoredCenterAlignedExample = () => (
  <BpkGraphicPromo
    tagline={tagline}
    headline={headline}
    subheading={subheading}
    buttonText={buttonText}
    className={graphicPromoClassName}
    style={style}
    onClick={onClick}
    textAlign={TEXT_ALIGN.center}
  />
);

const NonSponsoredRightAlignedExample = () => (
  <BpkGraphicPromo
    tagline={tagline}
    headline={headline}
    subheading={subheading}
    buttonText={buttonText}
    className={graphicPromoClassName}
    style={style}
    onClick={onClick}
    textAlign={TEXT_ALIGN.end}
  />
);

const VisualTestExample = () => (
  <>
    <BpkGraphicPromo
      tagline={tagline}
      headline={headline}
      subheading={subheading}
      sponsor={sponsor}
      buttonText={buttonText}
      onClick={onClick}
      className={graphicPromoClassName}
      textAlign={TEXT_ALIGN.start}
    />
    <BpkGraphicPromo
      tagline={tagline}
      headline={headline}
      subheading={subheading}
      sponsor={sponsor}
      buttonText={buttonText}
      onClick={onClick}
      className={graphicPromoClassName}
      textAlign={TEXT_ALIGN.center}
    />
    <BpkGraphicPromo
      tagline={tagline}
      headline={headline}
      subheading={subheading}
      sponsor={sponsor}
      buttonText={buttonText}
      onClick={onClick}
      className={graphicPromoClassName}
      textAlign={TEXT_ALIGN.end}
    />
    <BpkGraphicPromo
      tagline={tagline}
      headline={headline}
      subheading={subheading}
      sponsor={sponsor}
      buttonText={buttonText}
      onClick={onClick}
      className={graphicPromoClassName}
      textAlign={TEXT_ALIGN.start}
      invertVertically
    />
    <BpkGraphicPromo
      headline={headline}
      sponsor={sponsor}
      buttonText={buttonText}
      className={graphicPromoClassName}
      onClick={onClick}
      textAlign={TEXT_ALIGN.start}
    />
    <BpkGraphicPromo
      headline={headline}
      subheading={subheading}
      buttonText={buttonText}
      className={graphicPromoClassName}
      onClick={onClick}
      textAlign={TEXT_ALIGN.end}
    />
    <BpkGraphicPromo
      tagline={tagline}
      headline={headline}
      subheading={subheading}
      buttonText={buttonText}
      className={graphicPromoClassName}
      onClick={onClick}
      textAlign={TEXT_ALIGN.start}
    />
    <BpkGraphicPromo
      tagline={tagline}
      headline={headline}
      subheading={subheading}
      buttonText={buttonText}
      className={graphicPromoClassName}
      onClick={onClick}
      textAlign={TEXT_ALIGN.center}
    />
    <BpkGraphicPromo
      tagline={tagline}
      headline={headline}
      subheading={subheading}
      buttonText={buttonText}
      className={graphicPromoClassName}
      onClick={onClick}
      textAlign={TEXT_ALIGN.end}
    />
  </>
);

export {
  DefaultExample,
  CenterAlignedExample,
  RightAlignedExample,
  InvertedPortraitExample,
  MinimalisticExample,
  MinimalisticRightAlignedExample,
  NonSponsoredExample,
  NonSponsoredCenterAlignedExample,
  NonSponsoredRightAlignedExample,
  NoStyleExample,
  VisualTestExample,
};
