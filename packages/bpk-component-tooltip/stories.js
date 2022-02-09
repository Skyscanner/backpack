import {
  DefaultExample,
  DarkExample,
  SideExample,
  NoPaddingExample,
  LinkExample,
  PopperModifiersExample,
  FocusExample,
} from './examples';

export default {
  title: 'bpk-component-tooltip',
};

export const Default = DefaultExample;
export const Dark = DarkExample;
export const OnTheSide = SideExample;

OnTheSide.story = {
  name: 'On the side',
};

export const WithoutPadding = NoPaddingExample;

WithoutPadding.story = {
  name: 'Without padding',
};

export const OnALink = LinkExample;

OnALink.story = {
  name: 'On a link',
};

export const PopperModifiers = PopperModifiersExample;

PopperModifiers.story = {
  name: 'Popper modifiers',
};

export const _FocusExample = FocusExample;

_FocusExample.story = {
  name: 'Focus example',
};
