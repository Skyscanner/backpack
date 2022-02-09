import {
  DefaultExample,
  LegacyWidthAndHeightExample,
  RoundedCornersExample,
  FullWidthExample,
  UsingSrcSetExample,
  WithAnimationExample,
  WithLazyLoadingExample,
  WithLazyLoadingAndAnimationExample,
  WithinScrollDivExample,
  BackgroundImageExample,
  BackgroundImageLegacyPropsExample,
  BackgroundImageWithLazyLoadingAndAnimationExample,
} from './examples';

export default {
  title: 'bpk-component-image',
};

export const Default = DefaultExample;
export const UsingLegacyWidthAndHeightProps = LegacyWidthAndHeightExample;

UsingLegacyWidthAndHeightProps.story = {
  name: 'Using legacy width and height props',
};

export const WithBorderRadius = RoundedCornersExample;
export const FullWidth = FullWidthExample;
export const UsingSrcSet = UsingSrcSetExample;

UsingSrcSet.story = {
  name: 'Using SrcSet',
};

export const WithAnimation = WithAnimationExample;
export const WithLazyLoading = WithLazyLoadingExample;
export const WithLazyLoadingAndAnimation = WithLazyLoadingAndAnimationExample;

WithLazyLoadingAndAnimation.story = {
  name: 'With Lazy Loading and Animation',
};

export const WithinAScrollDiv = WithinScrollDivExample;

WithinAScrollDiv.story = {
  name: 'Within a scroll div',
};

export const BackgroundImage = BackgroundImageExample;
export const BackgroundImageUsingLegacyWidthAndHeightProps =
  BackgroundImageLegacyPropsExample;

BackgroundImageUsingLegacyWidthAndHeightProps.story = {
  name: 'Background Image using legacy width and height props',
};

export const BackgroundImageWithLazyLoadingAndAnimation =
  BackgroundImageWithLazyLoadingAndAnimationExample;

BackgroundImageWithLazyLoadingAndAnimation.story = {
  name: 'Background Image with Lazy Loading and Animation',
};
