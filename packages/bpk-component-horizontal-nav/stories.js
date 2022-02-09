import {
  DefaultExample,
  ScrollToSelectedExample,
  NotUnderlinedExample,
  LightAppearanceExample,
  UsingCustomScrollColors,
  AnchorTagsExample,
  ExtremeExample,
  SpacedAroundExample,
  DisabledItemExample,
  SeparatorsExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-horizontal-nav',
};

export const Example = DefaultExample;
export const ScrollToSelectedElement = ScrollToSelectedExample;

ScrollToSelectedElement.story = {
  name: 'Scroll to selected element',
};

export const NotUnderlined = NotUnderlinedExample;

NotUnderlined.story = {
  name: 'Not underlined',
};

export const LightAppearance = LightAppearanceExample;

LightAppearance.story = {
  name: 'Light appearance',
};

export const _UsingCustomScrollColors = UsingCustomScrollColors;

_UsingCustomScrollColors.story = {
  name: 'Using custom scroll colors',
};

export const AnchorTags = AnchorTagsExample;

AnchorTags.story = {
  name: 'Anchor tags',
};

export const _ExtremeExample = ExtremeExample;

_ExtremeExample.story = {
  name: 'Extreme example',
};

export const SpaceAround = SpacedAroundExample;

SpaceAround.story = {
  name: 'Space around',
};

export const DisabledItem = DisabledItemExample;

DisabledItem.story = {
  name: 'Disabled item',
};

export const Separators = SeparatorsExample;
export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
