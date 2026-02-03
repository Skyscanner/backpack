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

import { ArgTypes, Title, Markdown } from '@storybook/addon-docs/blocks';

import BpkBackgroundImage from '../../packages/bpk-component-image/src/BpkBackgroundImage';
import BpkImage from '../../packages/bpk-component-image/src/BpkImage';

import {
  DefaultExample,
  RoundedCornersExample,
  FullWidthExample,
  UsingSrcSetExample,
  WithAnimationExample,
  WithLazyLoadingExample,
  WithLazyLoadingAndAnimationExample,
  WithinScrollDivExample,
  BackgroundImageExample,
  BackgroundImageWithLazyLoadingAndAnimationExample,
} from './examples';

export default {
  title: 'bpk-component-image',
  component: BpkImage,
  subcomponents: { BpkBackgroundImage },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <ArgTypes exclude={['zoomEnabled']} />
          <Markdown>
            {`**Note:** All [standard img attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img#Attributes) including \`srcSet\` are also supported.`}
          </Markdown>
        </>
      )
    },
  },
};

export const Default = DefaultExample;

export const WithBorderRadius = RoundedCornersExample;
export const FullWidth = FullWidthExample;
export const UsingSrcSet = UsingSrcSetExample;

export const WithAnimation = WithAnimationExample;
export const WithLazyLoading = WithLazyLoadingExample;
export const WithLazyLoadingAndAnimation = WithLazyLoadingAndAnimationExample;

export const WithinAScrollDiv = WithinScrollDivExample;

export const BackgroundImage = BackgroundImageExample;

export const BackgroundImageWithLazyLoadingAndAnimation =
  BackgroundImageWithLazyLoadingAndAnimationExample;
