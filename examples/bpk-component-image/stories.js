/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { storiesOf } from '@storybook/react';

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

UsingLegacyWidthAndHeightProps.storyName = 'Using legacy width and height props';

export const WithBorderRadius = RoundedCornersExample;
export const FullWidth = FullWidthExample;
export const UsingSrcSet = UsingSrcSetExample;

UsingSrcSet.storyName = 'Using SrcSet';

export const WithAnimation = WithAnimationExample;
export const WithLazyLoading = WithLazyLoadingExample;
export const WithLazyLoadingAndAnimation = WithLazyLoadingAndAnimationExample;

WithLazyLoadingAndAnimation.storyName = 'With Lazy Loading and Animation';

export const WithinAScrollDiv = WithinScrollDivExample;

WithinAScrollDiv.storyName = 'Within a scroll div';

export const BackgroundImage = BackgroundImageExample;
export const BackgroundImageUsingLegacyWidthAndHeightProps =
  BackgroundImageLegacyPropsExample;

BackgroundImageUsingLegacyWidthAndHeightProps.storyName = 'Background Image using legacy width and height props';

export const BackgroundImageWithLazyLoadingAndAnimation =
  BackgroundImageWithLazyLoadingAndAnimationExample;

BackgroundImageWithLazyLoadingAndAnimation.storyName = 'Background Image with Lazy Loading and Animation';
