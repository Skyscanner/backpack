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

import { storiesOf } from '@storybook/react';

import {
  FullExample,
  FullStars,
  EmptyStars,
  ThreeStars,
  ThreeAndAHalfStars,
  ThreePointThreeStars,
  ThreePointEightStars,
  ThreePointThreeStarsRounded,
  ThreePointEightStarsRounded,
  Interactive,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-star-rating',
};

export const BpkStarExamples = FullExample;

BpkStarExamples.storyName = 'BpkStar examples';

export const _FullStars = FullStars;
export const _EmptyStars = EmptyStars;
export const _3StarsRating = ThreeStars;
export const _312StarsRating = ThreeAndAHalfStars;

_312StarsRating.storyName = '3 1/2 Stars Rating';

export const _33Stars = ThreePointThreeStars;

_33Stars.storyName = '3.3 Stars';

export const _38Stars = ThreePointEightStars;

_38Stars.storyName = '3.8 Stars';

export const _33StarsRounded = ThreePointThreeStarsRounded;

_33StarsRounded.storyName = '3.3 Stars Rounded';

export const _38StarsRounded = ThreePointEightStarsRounded;

_38StarsRounded.storyName = '3.8 Stars Rounded';

export const _Interactive = Interactive;
export const VisualTest = MixedExample;

VisualTest.storyName = 'Visual test';
