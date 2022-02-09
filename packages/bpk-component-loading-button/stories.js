import {
  DocsPrimary,
  Primary,
  Secondary,
  Destructive,
  LinkButton,
  Featured,
  IconOnly,
  Mixture,
  AnchorTags,
  CustomIcon,
} from './examples';

export default {
  title: 'bpk-component-loading-button',
};

export const _DocsPrimary = DocsPrimary;

_DocsPrimary.story = {
  name: 'DocsPrimary',
};

export const _Primary = Primary;
export const _Secondary = Secondary;
export const _Destructive = Destructive;
export const _LinkButton = LinkButton;

_LinkButton.story = {
  name: 'Link button',
};

export const _Featured = Featured;
export const IconOnlyButton = IconOnly;

IconOnlyButton.story = {
  name: 'Icon-only button',
};

export const _Mixture = Mixture;
export const _AnchorTags = AnchorTags;

_AnchorTags.story = {
  name: 'Anchor tags',
};

export const _CustomIcon = CustomIcon;
