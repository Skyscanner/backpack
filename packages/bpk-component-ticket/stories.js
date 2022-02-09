import {
  DefaultExample,
  VerticalExample,
  WithoutPaddingExample,
  WithoutPaddingImageExample,
  WithoutNotchesExample,
  WithoutNotchesVerticalExample,
  WithHrefExample,
  DayViewExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-ticket',
};

export const Default = DefaultExample;
export const Vertical = VerticalExample;
export const WithoutPadding = WithoutPaddingExample;

WithoutPadding.story = {
  name: 'Without padding',
};

export const WithoutPaddingAndWithAnImage = WithoutPaddingImageExample;

WithoutPaddingAndWithAnImage.story = {
  name: 'Without padding and with an image ',
};

export const WithoutNotches = WithoutNotchesExample;

WithoutNotches.story = {
  name: 'Without notches',
};

export const WithoutNotchesVertical = WithoutNotchesVerticalExample;

WithoutNotchesVertical.story = {
  name: 'Without notches (vertical)',
};

export const WithAHrefProp = WithHrefExample;

WithAHrefProp.story = {
  name: 'With a "href" prop',
};

export const DayView = DayViewExample;

DayView.story = {
  name: 'Day view',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
