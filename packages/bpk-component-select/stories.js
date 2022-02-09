import {
  Example,
  Invalid,
  InvalidWithImage,
  Disabled,
  Large,
  Docked,
  DockedWithImages,
  ManuallyDocked,
  ManuallyDockedWithImages,
  WithImage,
  WithImageLarge,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-select',
};

export const _Example = Example;
export const _Invalid = Invalid;
export const _InvalidWithImage = InvalidWithImage;

_InvalidWithImage.story = {
  name: 'Invalid with image',
};

export const _Disabled = Disabled;
export const _Large = Large;
export const _Docked = Docked;
export const _DockedWithImages = DockedWithImages;

_DockedWithImages.story = {
  name: 'Docked with images',
};

export const _ManuallyDocked = ManuallyDocked;

_ManuallyDocked.story = {
  name: 'Manually docked',
};

export const _ManuallyDockedWithImages = ManuallyDockedWithImages;

_ManuallyDockedWithImages.story = {
  name: 'Manually docked with images',
};

export const _WithImage = WithImage;
export const _WithImageLarge = WithImageLarge;
export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
