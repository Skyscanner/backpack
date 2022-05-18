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
/* @flow strict */

import React from 'react';

import { cssModules } from '../../packages/bpk-react-utils';
import BpkRating, {
  RATING_SIZES,
  RATING_SCALES,
} from '../../packages/bpk-component-rating';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const owlSrc =
  'https://content.skyscnr.com/m/276cca4d531e119b/original/4-5-64600-4.svg';
const tripSrc =
  'https://content.skyscnr.com/m/70435dd3a4ec4038/original/sc_trip_logo_primary_full.svg';

const ImageTitle = (
  <img
    alt="rating 4.5"
    className={getClassName('bpk-rating-story--img')}
    src={owlSrc}
  />
);

const TripImageTitle = (
  <img
    alt="rating 4.5"
    className={getClassName('bpk-rating-story--trip')}
    src={tripSrc}
  />
);

const LargeImageTitle = (
  <span lassName={getClassName('bpk-rating-story--large')}>
    <img
      alt="rating 4.5"
      className={getClassName('bpk-rating-story--img')}
      src={owlSrc}
    />
  </span>
);

const LargeTripImageTitle = (
  <span lassName={getClassName('bpk-rating-story--large')}>
    <img
      alt="rating 4.5"
      className={getClassName('bpk-rating-story--trip')}
      src={tripSrc}
    />
  </span>
);

const HighScoreTitle = (
  <span className={getClassName('bpk-rating-story--score')}>With honours</span>
);

const DefaultExample = () => (
  <div>
    <BpkRating
      ariaLabel="4.5 Great 818 reviews"
      value={4.5}
      title={ImageTitle}
      subtitle="818 reviews"
    />
    <br />
    <BpkRating
      ariaLabel="4.5 Great 818 reviews"
      value={4.5}
      title={TripImageTitle}
      subtitle="818 reviews"
      showScale
    />
    <br />
    <BpkRating
      ariaLabel="4.8 Excellent 2,420 reviews"
      value={4.8}
      title="Excellent"
      subtitle="2,420 reviews"
      showScale
    />
    <br />
  </div>
);

const LargeSizeExample = () => (
  <div>
    <BpkRating
      ariaLabel="4.4 Very good This place was amazing"
      title="Very good"
      subtitle="This place was amazing"
      size={RATING_SIZES.large}
      value={4.4}
      showScale
    />
    <br />
    <BpkRating
      ariaLabel="5.0 With honours 8,202 reviews"
      value={5}
      title={HighScoreTitle}
      subtitle="8,202 reviews"
      size={RATING_SIZES.large}
      showScale
    />
    <br />
    <BpkRating
      ariaLabel="4.5 Great. 6,170 reviews"
      value={4.5}
      title={LargeImageTitle}
      subtitle="6,170 reviews"
      size={RATING_SIZES.large}
    />
    <br />
    <BpkRating
      ariaLabel="4.5 Great. 6,170 reviews"
      value={4.5}
      title={LargeTripImageTitle}
      subtitle="6,170 reviews"
      size={RATING_SIZES.large}
      showScale
    />
    <br />
  </div>
);

const ShowScaleExample = () => (
  <div>
    <BpkRating
      ariaLabel="3.8 Good Nice choice"
      title="Good"
      subtitle="Nice choice"
      value={3.8}
      showScale
    />
    <br />
  </div>
);

const TitleOnlyExample = () => (
  <div>
    <BpkRating ariaLabel="2.3 Bad" title="Bad" value={2.3} showScale />
    <br />
    <BpkRating ariaLabel="4.5 Great" title={ImageTitle} value={4.5} />
    <br />
  </div>
);

const ZeroToTenScaleExample = () => (
  <div>
    <BpkRating
      ariaLabel="1.0 Terrible"
      title="Terrible"
      value={1}
      ratingScale={RATING_SCALES.zeroToTen}
      showScale
    />
    <br />
    <BpkRating
      ariaLabel="9.9 Fantastic It is almost perfect"
      title="Fantastic"
      subtitle="It is almost perfect"
      value={9.9}
      ratingScale={RATING_SCALES.zeroToTen}
      showScale
    />
    <br />
  </div>
);

const MixedExample = () => (
  <div>
    <BpkRating
      ariaLabel="4.5 Great 818 reviews"
      value={4.5}
      title={ImageTitle}
      subtitle="818 reviews"
    />
    <br />
    <BpkRating
      ariaLabel="4.5 Great 1,532 reviews"
      value={4.5}
      title={LargeImageTitle}
      subtitle="1,532 reviews"
      size={RATING_SIZES.large}
    />
    <br />
    <BpkRating
      ariaLabel="4.8 Excellent 2,420 reviews"
      value={4.8}
      title="Excellent"
      subtitle="2,420 reviews"
      showScale
    />
    <br />
    <BpkRating
      ariaLabel="5.0 With honours 8,202 reviews"
      value={5}
      title={HighScoreTitle}
      subtitle="8,202 reviews"
      size={RATING_SIZES.large}
      showScale
    />
    <br />
    <BpkRating
      ariaLabel="4.5 Great 818 reviews"
      value={4.5}
      title={TripImageTitle}
      subtitle="818 reviews"
      showScale
    />
    <br />
    <BpkRating
      ariaLabel="4.5 Great 6,170 reviews"
      value={4.5}
      title={LargeTripImageTitle}
      subtitle="6,170 reviews"
      size={RATING_SIZES.large}
      showScale
    />
    <br />
    <BpkRating ariaLabel="2.3 Bad" title="Bad" value={2.3} showScale />
    <br />
    <BpkRating ariaLabel="4.5 Great" title={ImageTitle} value={4.5} />
    <br />
    <BpkRating
      ariaLabel="4.5 Great"
      title={TripImageTitle}
      value={4.5}
      showScale
    />
    <br />
  </div>
);

export {
  DefaultExample,
  LargeSizeExample,
  ShowScaleExample,
  TitleOnlyExample,
  ZeroToTenScaleExample,
  MixedExample,
};
