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

storiesOf('bpk-component-star-rating', module)
  .add('BpkStar examples', FullExample)
  .add('Full Stars', FullStars)
  .add('Empty Stars', EmptyStars)
  .add('3 Stars Rating', ThreeStars)
  .add('3 1/2 Stars Rating', ThreeAndAHalfStars)
  .add('3.3 Stars', ThreePointThreeStars)
  .add('3.8 Stars', ThreePointEightStars)
  .add('3.3 Stars Rounded', ThreePointThreeStarsRounded)
  .add('3.8 Stars Rounded', ThreePointEightStarsRounded)
  .add('Interactive', Interactive)
  .add('Visual test', MixedExample);
