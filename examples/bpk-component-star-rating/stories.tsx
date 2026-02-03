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



import BpkInteractiveStar from '../../packages/bpk-component-star-rating/src/BpkInteractiveStar';
import BpkInteractiveStarRating from '../../packages/bpk-component-star-rating/src/BpkInteractiveStarRating';
import { BpkStarNonRtl } from '../../packages/bpk-component-star-rating/src/BpkStar';
import BpkStarRating from '../../packages/bpk-component-star-rating/src/BpkStarRating';

import {
  FullExample,
  FullStarsExample,
  EmptyStarsExample,
  ThreeStarsExample,
  ThreeAndAHalfStarsExample,
  ThreePointThreeStarsExample,
  ThreePointEightStarsExample,
  ThreePointThreeStarsRoundedExample,
  ThreePointEightStarsRoundedExample,
  InteractiveExample,
  MixedExample,
} from './examples';
import WithInteractiveStarRatingStateMock from './stories-utils';

export default {
  title: 'bpk-component-star-rating',
  component: BpkStarRating,
  subcomponents: {
    BpkStar: BpkStarNonRtl,
    BpkInteractiveStarRating,
    BpkInteractiveStar,
    withInteractiveStarRatingState: WithInteractiveStarRatingStateMock
  },
};

export const BpkStarExamples = FullExample;

export const FullStars = FullStarsExample;
export const EmptyStars = EmptyStarsExample;
export const ThreeStars = ThreeStarsExample;
export const ThreeAndAHalfStars = ThreeAndAHalfStarsExample;

export const ThreePointThreeStars = ThreePointThreeStarsExample;

export const ThreePointEightStars = ThreePointEightStarsExample;

export const ThreePointThreeStarsRounded = ThreePointThreeStarsRoundedExample;

export const ThreePointEightStarsRounded = ThreePointEightStarsRoundedExample;

export const Interactive = InteractiveExample;
export const VisualTest = MixedExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};
