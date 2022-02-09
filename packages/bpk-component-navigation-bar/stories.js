import {
  DefaultExample,
  LeadingIconOnlyExample,
  TrailingIconOnlyExample,
  WithLinksExample,
  WithLogoExample,
  StickyExample,
} from './examples';

export default {
  title: 'bpk-component-navigation-bar',
};

export const Default = DefaultExample;
export const LeadingIconOnly = LeadingIconOnlyExample;

LeadingIconOnly.story = {
  name: 'Leading icon only',
};

export const TrailingIconOnly = TrailingIconOnlyExample;

TrailingIconOnly.story = {
  name: 'Trailing icon only',
};

export const WithLinks = WithLinksExample;

WithLinks.story = {
  name: 'With links',
};

export const WithLogo = WithLogoExample;

WithLogo.story = {
  name: 'With logo',
};

export const Sticky = StickyExample;
export const VisualTest = DefaultExample;

VisualTest.story = {
  name: 'Visual test',
};
