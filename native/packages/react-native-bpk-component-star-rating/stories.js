/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import BpkStarRating, { BpkStar, STAR_TYPES } from './index';

const StarRating = props => <BpkStarRating ratingLabel={(r, m) => `${r} out of ${m} stars`} {...props} />;

storiesOf('BpkStarRating', module)
  .add('docs:default', () => (
    <View>
      <StarRating rating={3} />
    </View>
  ))
  .add('Full Stars', () => (
    <View>
      <StarRating rating={5} />
    </View>
  ))
  .add('Empty Stars', () => (
    <View>
      <StarRating rating={0} />
    </View>
  ))
  .add('3 Stars Rating', () => (
    <View>
      <StarRating rating={3} />
    </View>
  ))
  .add('3 1/2 Stars Rating', () => (
    <View>
      <StarRating rating={3.5} />
    </View>
  ))
  .add('3.3 Stars', () => (
    <View>
      <StarRating rating={3.3} />
    </View>
  ))
  .add('3.7 Stars', () => (
    <View>
      <StarRating rating={3.7} />
    </View>
  ));

storiesOf('BpkStar', module)
  .add('Full', () => (
    <View>
      <BpkStar type={STAR_TYPES.FULL} />
    </View>
  ))
  .add('Half', () => (
    <View>
      <BpkStar type={STAR_TYPES.HALF} />
    </View>
  ))
  .add('Empty', () => (
    <View>
      <BpkStar type={STAR_TYPES.EMPTY} />
    </View>
  ));
