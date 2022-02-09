import {
  DefaultExample,
  OverlayTypeNoneExample,
  WithForegroundContentExample,
  WithBpkImageExample,
  WithBpkImageNoTintExample,
  WithBpkImageLazyLoadedExample,
  TextOverlaidOnImageExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-overlay',
};

export const Default = DefaultExample;
export const OverlayTypeNone = OverlayTypeNoneExample;

OverlayTypeNone.story = {
  name: 'overlayType="none"',
};

export const WithForegroundContent = WithForegroundContentExample;

WithForegroundContent.story = {
  name: 'with foreground content',
};

export const WithBpkImage = WithBpkImageExample;

WithBpkImage.story = {
  name: 'With BpkImage',
};

export const WithBpkImageAndOverlayTypeNone = WithBpkImageNoTintExample;

WithBpkImageAndOverlayTypeNone.story = {
  name: 'With BpkImage and overlayType="none"',
};

export const WithBpkImageLazyLoaded = WithBpkImageLazyLoadedExample;

WithBpkImageLazyLoaded.story = {
  name: 'With BpkImage, lazy loaded',
};

export const TextOverlaidOnAnImageUsingForegroundContent =
  TextOverlaidOnImageExample;

TextOverlaidOnAnImageUsingForegroundContent.story = {
  name: 'Text overlaid on an image using foreground content',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
