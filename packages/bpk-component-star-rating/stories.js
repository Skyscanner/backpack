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

BpkStarExamples.story = {
  name: 'BpkStar examples',
};

export const _FullStars = FullStars;
export const _EmptyStars = EmptyStars;
export const _3StarsRating = ThreeStars;
export const _312StarsRating = ThreeAndAHalfStars;

_312StarsRating.story = {
  name: '3 1/2 Stars Rating',
};

export const _33Stars = ThreePointThreeStars;

_33Stars.story = {
  name: '3.3 Stars',
};

export const _38Stars = ThreePointEightStars;

_38Stars.story = {
  name: '3.8 Stars',
};

export const _33StarsRounded = ThreePointThreeStarsRounded;

_33StarsRounded.story = {
  name: '3.3 Stars Rounded',
};

export const _38StarsRounded = ThreePointEightStarsRounded;

_38StarsRounded.story = {
  name: '3.8 Stars Rounded',
};

export const _Interactive = Interactive;
export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
