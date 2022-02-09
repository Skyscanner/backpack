import {
  DefaultExample,
  FullWidthGridExample,
  HomePageGridExample,
  DayViewGridExample,
} from './examples';

export default {
  title: 'bpk-component-grid',
};

export const Example = DefaultExample;
export const FullWidthExample = FullWidthGridExample;

FullWidthExample.story = {
  name: 'Full width example',
};

export const HomePageExample = HomePageGridExample;

HomePageExample.story = {
  name: 'Home page example',
};

export const DayViewExample = DayViewGridExample;

DayViewExample.story = {
  name: 'Day view example',
};
