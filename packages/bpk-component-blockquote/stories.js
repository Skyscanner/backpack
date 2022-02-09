import { DefaultExample, ExtraSpaceExample } from './examples';

export default {
  title: 'bpk-component-blockquote',
};

export const _DefaultExample = DefaultExample;

_DefaultExample.story = {
  name: 'Default example',
};

export const ExampleWithAdditionalSpacingAboveAndBelow = ExtraSpaceExample;

ExampleWithAdditionalSpacingAboveAndBelow.story = {
  name: 'Example with additional spacing (above and below)',
};

export const VisualTest = DefaultExample;

VisualTest.story = {
  name: 'Visual test',
};
