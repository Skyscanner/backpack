import {
  SingleItemExample,
  SingleItemExampleInitiallyExpanded,
  MultipleItemsOpenExample,
  MultipleItemsOpenInitiallyExpandedExample,
  CustomExample,
  CustomTitleTextStyleExample,
  WithIconsExample,
  WithBoldTitlesExample,
} from './examples';

export default {
  title: 'bpk-component-accordion',
  component: SingleItemExample,
};

export const SingleItemOnly = SingleItemExample;

SingleItemOnly.story = {
  name: 'Single item only',
};

export const SingleItemOnlySecondItemInitiallyExpanded = SingleItemExampleInitiallyExpanded;

SingleItemOnlySecondItemInitiallyExpanded.story = {
  name: 'Single item only (second item initially expanded)',
};

export const MultipleItemsOpen = MultipleItemsOpenExample;

MultipleItemsOpen.story = {
  name: 'Multiple items open',
};

export const MultipleItemsOpenSecondThirdItemsInitiallyExpanded = MultipleItemsOpenInitiallyExpandedExample;

MultipleItemsOpenSecondThirdItemsInitiallyExpanded.story = {
  name: 'Multiple items open (second & third items initially expanded)',
};

export const Custom = CustomExample;
export const CustomTitleTextStyle = CustomTitleTextStyleExample;

CustomTitleTextStyle.story = {
  name: 'Custom title textStyle',
};

export const WithIcons = WithIconsExample;

WithIcons.story = {
  name: 'With icons',
};

export const WithBoldTitles = WithBoldTitlesExample;

WithBoldTitles.story = {
  name: 'With bold titles',
};

export const VisualTest = SingleItemExample;

VisualTest.story = {
  name: 'Visual test',
};
