import {
  SimpleSlider,
  SimpleLargeSlider,
  TimeSlider,
  SimpleSliderWithSteps,
  RangeSlider,
  RangeSliderWithMinimumDistance,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-slider',
};

export const _SimpleSlider = SimpleSlider;

_SimpleSlider.story = {
  name: 'Simple slider',
};

export const _SimpleLargeSlider = SimpleLargeSlider;

_SimpleLargeSlider.story = {
  name: 'Simple large slider',
};

export const _TimeSlider = TimeSlider;

_TimeSlider.story = {
  name: 'Time slider',
};

export const _SimpleSliderWithSteps = SimpleSliderWithSteps;

_SimpleSliderWithSteps.story = {
  name: 'Simple slider with steps',
};

export const _RangeSlider = RangeSlider;

_RangeSlider.story = {
  name: 'Range slider',
};

export const _RangeSliderWithMinimumDistance = RangeSliderWithMinimumDistance;

_RangeSliderWithMinimumDistance.story = {
  name: 'Range slider with minimum distance',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
