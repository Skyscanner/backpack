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

storiesOf('bpk-component-image', module)
  .add('Default', DefaultExample)
  .add('Using legacy width and height props', LegacyWidthAndHeightExample)
  .add('With Border Radius', RoundedCornersExample)
  .add('Full Width', FullWidthExample)
  .add('Using SrcSet', UsingSrcSetExample)
  .add('With Animation', WithAnimationExample)
  .add('With Lazy Loading', WithLazyLoadingExample)
  .add('With Lazy Loading and Animation', WithLazyLoadingAndAnimationExample)
  .add('Within a scroll div', WithinScrollDivExample)
  .add('Background Image', BackgroundImageExample)
  .add(
    'Background Image using legacy width and height props',
    BackgroundImageLegacyPropsExample,
  )
  .add(
    'Background Image with Lazy Loading and Animation',
    BackgroundImageWithLazyLoadingAndAnimationExample,
  );
