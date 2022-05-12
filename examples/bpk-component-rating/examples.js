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

const ImageTiltle = (
  <img
    alt="rating 4.5"
    className={getClassName('bpk-rating-story--img')}
    src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-64600-4.svg"
  />
);

const LargeImageTiltle = (
  <span className={getClassName('bpk-rating-story--large')}>
    <img
      alt="rating 4.5"
      className={getClassName('bpk-rating-story--img')}
      src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-64600-4.svg"
    />
  </span>
);

const DefaultExample = () => (
  <div>
    <BpkRating
      ariaLabel="4.6 Excellent 672 reviews"
      value={4.6}
      title="Excellent"
      subtitle="672 reviews"
    />
    <br />
    <BpkRating
      ariaLabel="4.5 Excellent 672 reviews"
      value={4.5}
      title={ImageTiltle}
      subtitle="672 reviews"
    />
  </div>
);

const LargeSizeExample = () => (
  <div>
    <BpkRating
      ariaLabel="4.6 Excellent 2,420 reviews"
      value={4.6}
      title="Excellent"
      subtitle="2,420 reviews"
      size={RATING_SIZES.large}
    />
    <br />
    <BpkRating
      ariaLabel="4.5 Excellent 2,420 reviews"
      value={4.5}
      title={LargeImageTiltle}
      subtitle="2,420 reviews"
      size={RATING_SIZES.large}
    />
  </div>
);

const ShowMaxValueExample = () => (
  <div>
    <BpkRating
      ariaLabel="4.6 Excellent 2,420 reviews"
      value={4.6}
      title="Excellent"
      subtitle="2,420 reviews"
      showMaxValue
    />
    <br />
    <BpkRating
      ariaLabel="4.5 Excellent 2,420 reviews"
      value={4.5}
      title={ImageTiltle}
      subtitle="2,420 reviews"
      showMaxValue
    />
    <br />
    <BpkRating
      ariaLabel="4.6 Excellent 2,420 reviews"
      value={4.6}
      title="Excellent"
      subtitle="2,420 reviews"
      size={RATING_SIZES.large}
      showMaxValue
    />
    <br />
    <BpkRating
      ariaLabel="4.5 Excellent 2,420 reviews"
      value={4.5}
      title={LargeImageTiltle}
      subtitle="2,420 reviews"
      size={RATING_SIZES.large}
      showMaxValue
    />
  </div>
);

const TitleOnlyExample = () => (
  <div>
    <BpkRating
      ariaLabel="4.6 Excellent 2,420 reviews"
      value={4.6}
      title="Excellent"
    />
    <br />
    <BpkRating
      ariaLabel="4.5 Excellent 2,420 reviews"
      value={4.5}
      title={ImageTiltle}
    />
  </div>
);

const ZeroToTenScaleExample = () => (
  <div>
    <BpkRating
      ariaLabel="8.2 Excellent 2,420 reviews"
      value={8.2}
      title="Excellent"
      subtitle="2,420 reviews"
      ratingScale={RATING_SCALES.zeroToTen}
    />
    <br />
    <BpkRating
      ariaLabel="9.0 Excellent 2,420 reviews"
      value={9.0}
      title={ImageTiltle}
      subtitle="2,420 reviews"
      ratingScale={RATING_SCALES.zeroToTen}
    />
  </div>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <LargeSizeExample />
    <ShowMaxValueExample />
    <TitleOnlyExample />
    <ZeroToTenScaleExample />
  </div>
);

export {
  DefaultExample,
  LargeSizeExample,
  ShowMaxValueExample,
  TitleOnlyExample,
  ZeroToTenScaleExample,
  MixedExample,
};
