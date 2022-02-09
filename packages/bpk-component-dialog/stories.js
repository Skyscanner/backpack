import {
  DefaultExample,
  WithIconExample,
  NotDismissibleExample,
  WithFlareExample,
} from './examples';

export default {
  title: 'bpk-component-dialog',
};

export const Default = DefaultExample;
export const WithAnIcon = WithIconExample;

WithAnIcon.story = {
  name: 'With an icon',
};

export const NotDismissible = NotDismissibleExample;

NotDismissible.story = {
  name: 'Not dismissible',
};

export const WithFlare = WithFlareExample;

WithFlare.story = {
  name: 'With flare',
};
