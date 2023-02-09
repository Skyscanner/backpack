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
/* @flow strict */

import {
  DefaultExample,
  WithHrefExample,
  WithoutPaddingExample,
  NonAtomicExample,
  NonAtomicHrefExample,
  DefaultDividedCardExample,
  VerticalDividedCardExample,
  WithHrefDividedCardExample,
  UnElevatedDividedCardExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-card',
};

export const Default = DefaultExample;
export const WithHref = WithHrefExample;

export const WithoutPadding = WithoutPaddingExample;

export const NonAtomic = NonAtomicExample;

export const NonAtomicWithHref = NonAtomicHrefExample;

export const DefaultDividedCard = DefaultDividedCardExample;
export const VerticalDividedCard = VerticalDividedCardExample;
export const WithHrefDividedCard = WithHrefDividedCardExample;
export const UnElevatedDividedCard = UnElevatedDividedCardExample;

export const VisualTest = MixedExample;
