/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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
import { storiesOf } from '@storybook/react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './stories.scss';

import BpkRating, { RATING_SIZES, RATING_TYPES } from './index';

const getClassName = cssModules(STYLES);

storiesOf('bpk-component-rating', module)
  .add('Default', () => (
    <div>
      <BpkRating
        ariaLabel="9 Excellent would recommend"
        title="Excellent"
        subtitle="This place was amazing"
        value={9}
      />
      <br />
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        subtitle="Might recommend"
        value={6.7}
      />
      <br />
      <BpkRating
        ariaLabel="2.3 Bad avoid here"
        title="Bad"
        subtitle="Avoid here"
        value={2.3}
      />
    </div>
  ))
  .add('Vertical', () => (
    <div>
      <BpkRating
        className={getClassName('bpk-rating-story')}
        ariaLabel="9 Excellent would recommend"
        title="Excellent"
        subtitle="This place was amazing"
        value={9}
        vertical
      />
      <br />
      <BpkRating
        className={getClassName('bpk-rating-story')}
        ariaLabel="6.7 Average might recommend"
        title="Average"
        subtitle="Might recommend"
        value={6.7}
        vertical
      />
      <br />
      <BpkRating
        className={getClassName('bpk-rating-story')}
        ariaLabel="2.3 Bad avoid here"
        title="Bad"
        subtitle="Avoid here"
        value={2.3}
        vertical
      />
    </div>
  ))
  .add('Large size ratings', () => (
    <div>
      <BpkRating
        ariaLabel="9 Excellent would recommend"
        title="Excellent"
        subtitle="This place was amazing"
        value={9}
        size={RATING_SIZES.lg}
      />
      <br />
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        subtitle="Might recommend"
        value={6.7}
        size={RATING_SIZES.lg}
      />
      <br />
      <BpkRating
        ariaLabel="2.3 Bad avoid here"
        title="Bad"
        subtitle="Avoid here"
        value={2.3}
        size={RATING_SIZES.lg}
      />
    </div>
  ))
  .add('Large vertical ratings', () => (
    <div>
      <BpkRating
        className={getClassName('bpk-rating-story')}
        ariaLabel="9 Excellent would recommend"
        title="Excellent"
        subtitle="This place was amazing"
        value={9}
        size={RATING_SIZES.lg}
        vertical
      />
      <br />
      <BpkRating
        className={getClassName('bpk-rating-story')}
        ariaLabel="6.7 Average might recommend"
        title="Average"
        subtitle="Might recommend"
        value={6.7}
        size={RATING_SIZES.lg}
        vertical
      />
      <br />
      <BpkRating
        className={getClassName('bpk-rating-story')}
        ariaLabel="2.3 Bad avoid here"
        title="Bad"
        subtitle="Avoid here"
        value={2.3}
        size={RATING_SIZES.lg}
        vertical
      />
    </div>
  ))
  .add('Small size ratings', () => (
    <div>
      <BpkRating
        ariaLabel="9 Excellent would recommend"
        title="Excellent"
        subtitle="This place was amazing"
        value={9}
        size={RATING_SIZES.sm}
      />
      <br />
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        subtitle="Might recommend"
        value={6.7}
        size={RATING_SIZES.sm}
      />
      <br />
      <BpkRating
        ariaLabel="2.3 Bad avoid here"
        title="Bad"
        subtitle="Avoid here"
        value={2.3}
        size={RATING_SIZES.sm}
      />
    </div>
  ))
  .add('Small vertical ratings', () => (
    <div>
      <BpkRating
        className={getClassName('bpk-rating-story')}
        ariaLabel="9 Excellent would recommend"
        title="Excellent"
        subtitle="This place was amazing"
        value={9}
        size={RATING_SIZES.sm}
        vertical
      />
      <br />
      <BpkRating
        className={getClassName('bpk-rating-story')}
        ariaLabel="6.7 Average might recommend"
        title="Average"
        subtitle="Might recommend"
        value={6.7}
        size={RATING_SIZES.sm}
        vertical
      />
      <br />
      <BpkRating
        className={getClassName('bpk-rating-story')}
        ariaLabel="2.3 Bad avoid here"
        title="Bad"
        subtitle="Avoid here"
        value={2.3}
        size={RATING_SIZES.sm}
        vertical
      />
    </div>
  ))
  .add('Title only ratings', () => (
    <div>
      <BpkRating
        ariaLabel="9 Excellent would recommend"
        title="Excellent"
        value={9}
        size={RATING_SIZES.sm}
      />
      <br />
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        value={6.7}
      />
      <br />
      <BpkRating
        ariaLabel="2.3 Bad avoid here"
        title="Bad"
        value={2.3}
        size={RATING_SIZES.lg}
      />
      <br />
      <BpkRating
        className={getClassName('bpk-rating-story')}
        ariaLabel="9 Excellent would recommend"
        title="Excellent"
        value={9}
        size={RATING_SIZES.sm}
        vertical
      />
      <br />
      <BpkRating
        className={getClassName('bpk-rating-story')}
        ariaLabel="6.7 Average might recommend"
        title="Average"
        value={6.7}
        vertical
      />
      <br />
      <BpkRating
        className={getClassName('bpk-rating-story')}
        ariaLabel="2.3 Bad avoid here"
        title="Bad"
        value={2.3}
        size={RATING_SIZES.lg}
        vertical
      />
    </div>
  ))
  .add('Pill ratings', () => (
    <div>
      <BpkRating
        ariaLabel="9 Excellent would recommend"
        title="Excellent"
        subtitle="(4,000 reviews)"
        value={9}
        size={RATING_SIZES.sm}
        type={RATING_TYPES.pill}
      />
      <br />
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        subtitle="(50 reviews)"
        value={6.7}
        type={RATING_TYPES.pill}
      />
      <br />
      <BpkRating
        ariaLabel="2.3 Bad avoid here"
        title="Bad"
        subtitle="(1,000 reviews)"
        value={2.3}
        size={RATING_SIZES.lg}
        type={RATING_TYPES.pill}
      />
      <br />
    </div>
  ))
  .add('Pill title only ratings', () => (
    <div>
      <BpkRating
        ariaLabel="9 Excellent would recommend"
        title="Excellent"
        value={9}
        size={RATING_SIZES.sm}
        type={RATING_TYPES.pill}
      />
      <br />
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        value={6.7}
        type={RATING_TYPES.pill}
      />
      <br />
      <BpkRating
        ariaLabel="2.3 Bad avoid here"
        title="Bad"
        value={2.3}
        size={RATING_SIZES.lg}
        type={RATING_TYPES.pill}
      />
      <br />
    </div>
  ));
