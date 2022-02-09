import {
  SmallIconsExample,
  LargeIconsExample,
  AlignToBaseTextExample,
  AlignToLargeTextExample,
  AlignSmallTextToIconExample,
  AlignTextToIconExample,
  AlignToButtonExample,
  AlignToLargeButtonExample,
  AlignToLargeButtonRTLExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-icon',
};

export const SmallIcons = SmallIconsExample;

SmallIcons.story = {
  name: 'Small icons',
};

export const LargeIcons = LargeIconsExample;

LargeIcons.story = {
  name: 'Large icons',
};

export const AlignToTextBase = AlignToBaseTextExample;

AlignToTextBase.story = {
  name: 'Align to text base',
};

export const AlignToLargeText = AlignToLargeTextExample;

AlignToLargeText.story = {
  name: 'Align to large text',
};

export const AlignSmallTextToIcon = AlignSmallTextToIconExample;

AlignSmallTextToIcon.story = {
  name: 'Align small text to icon',
};

export const AlignTextToIcon = AlignTextToIconExample;

AlignTextToIcon.story = {
  name: 'Align text to icon',
};

export const AlignToButton = AlignToButtonExample;

AlignToButton.story = {
  name: 'Align to button',
};

export const AlignToLargeButton = AlignToLargeButtonExample;

AlignToLargeButton.story = {
  name: 'Align to large button',
};

export const AlignToLargeButtonRtlSupport = AlignToLargeButtonRTLExample;

AlignToLargeButtonRtlSupport.story = {
  name: 'Align to large button (RTL support)',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
