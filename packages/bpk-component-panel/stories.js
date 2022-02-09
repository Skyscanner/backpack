import {
  DefaultExample,
  WithoutPaddingExample,
  FullWidthExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-panel',
};

export const Default = DefaultExample;
export const WithoutPadding = WithoutPaddingExample;

WithoutPadding.story = {
  name: 'Without padding',
};

export const FullWidth = FullWidthExample;

FullWidth.story = {
  name: 'Full width',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
