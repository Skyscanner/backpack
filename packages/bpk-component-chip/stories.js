import {
  AllTypesExample,
  SelectableChipsExample,
  AllSelectableChipStylesExample,
  WithIconsExample,
  RadioGroupChipsExample,
  DismissibleChipsExample,
} from './examples';

export default {
  title: 'bpk-component-chip',
};

export const AllTypes = AllTypesExample;

AllTypes.story = {
  name: 'All types',
};

export const Selectable = SelectableChipsExample;
export const AllSelectableTypes = AllSelectableChipStylesExample;
export const WithIcons = WithIconsExample;

WithIcons.story = {
  name: 'With icons',
};

export const Dismissable = DismissibleChipsExample;
export const RadioGroup = RadioGroupChipsExample;
export const VisualTest = AllTypesExample;

VisualTest.story = {
  name: 'Visual test',
};
