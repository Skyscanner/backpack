import {
  DefaultExample,
  WithNavBarExample,
  WithNavBarOutsideExample,
} from './examples';

export default {
  title: 'bpk-component-navigation-stack',
};

export const Default = DefaultExample;
export const WithNavigationBar = WithNavBarExample;

WithNavigationBar.story = {
  name: 'With navigation bar',
};

export const WithNavigationBarOutside = WithNavBarOutsideExample;

WithNavigationBarOutside.story = {
  name: 'With navigation bar outside',
};
