import {
  DefaultExample,
  WithIconsExample,
  CenteredExample,
  DockedLeadingExample,
  DockedTrailingExample,
  WarningExample,
  SuccessExample,
  DestructiveExample,
  LightExample,
  InverseExample,
  OutlineExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-badge',
};

export const Default = DefaultExample;
export const WithIcons = WithIconsExample;

WithIcons.story = {
  name: 'With icons',
};

export const Centered = CenteredExample;
export const DockedRight = DockedLeadingExample;

DockedRight.story = {
  name: 'Docked right',
};

export const DockedLeft = DockedTrailingExample;

DockedLeft.story = {
  name: 'Docked left',
};

export const WarningDefault = WarningExample;

WarningDefault.story = {
  name: 'Warning (Default)',
};

export const Success = SuccessExample;
export const Destructive = DestructiveExample;
export const Light = LightExample;
export const Inverse = InverseExample;
export const Outline = OutlineExample;
export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
