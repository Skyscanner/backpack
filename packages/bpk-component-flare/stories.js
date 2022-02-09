import {
  FlareBarExample,
  FlareBarRoundedExample,
  ContentBubbleFullWithImageExample,
  ContentBubbleFullWithContentExample,
  ContentBubbleStandaloneExample,
  ContentBubbleFixedHeightExample,
  ContentBubblePointerHiddenExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-flare',
};

export const BpkFlareBarDefault = FlareBarExample;

BpkFlareBarDefault.story = {
  name: 'BpkFlareBar - default',
};

export const BpkFlareBarRounded = FlareBarRoundedExample;

BpkFlareBarRounded.story = {
  name: 'BpkFlareBar - rounded',
};

export const BpkContentBubbleFullWidthWithBackgroundImage =
  ContentBubbleFullWithImageExample;

BpkContentBubbleFullWidthWithBackgroundImage.story = {
  name: 'BpkContentBubble - Full width with background image',
};

export const BpkContentBubbleFullWidthWithContent =
  ContentBubbleFullWithContentExample;

BpkContentBubbleFullWidthWithContent.story = {
  name: 'BpkContentBubble - Full width with content',
};

export const BpkContentBubbleStandalone = ContentBubbleStandaloneExample;

BpkContentBubbleStandalone.story = {
  name: 'BpkContentBubble - standalone',
};

export const BpkContentBubbleFixedHeight = ContentBubbleFixedHeightExample;

BpkContentBubbleFixedHeight.story = {
  name: 'BpkContentBubble - fixed height',
};

export const BpkContentBubblePointerHidden = ContentBubblePointerHiddenExample;

BpkContentBubblePointerHidden.story = {
  name: 'BpkContentBubble - pointer hidden',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
