import {
  DefaultExample,
  ZeroToFiveScaleExample,
  Vertical,
  LargeSize,
  LargeVertical,
  SmallSize,
  SmallVertical,
  TitleOnly,
  PillRatings,
  PillTitleOnly,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-rating',
};

export const Default = DefaultExample;
export const ZeroToFiveRatingScale = ZeroToFiveScaleExample;

ZeroToFiveRatingScale.story = {
  name: 'Zero to five rating scale',
};

export const _Vertical = Vertical;
export const LargeSizeRatings = LargeSize;

LargeSizeRatings.story = {
  name: 'Large size ratings',
};

export const LargeVerticalRatings = LargeVertical;

LargeVerticalRatings.story = {
  name: 'Large vertical ratings',
};

export const SmallSizeRatings = SmallSize;

SmallSizeRatings.story = {
  name: 'Small size ratings',
};

export const SmallVerticalRatings = SmallVertical;

SmallVerticalRatings.story = {
  name: 'Small vertical ratings',
};

export const TitleOnlyRatings = TitleOnly;

TitleOnlyRatings.story = {
  name: 'Title only ratings',
};

export const _PillRatings = PillRatings;

_PillRatings.story = {
  name: 'Pill ratings',
};

export const PillTitleOnlyRatings = PillTitleOnly;

PillTitleOnlyRatings.story = {
  name: 'Pill title only ratings',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
