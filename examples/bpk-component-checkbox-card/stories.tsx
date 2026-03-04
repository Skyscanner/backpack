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

import { BpkCheckboxCard } from '../../packages/bpk-component-checkbox-card';
import { BpkProvider } from '../../packages/bpk-component-layout';

import {
  NewAPIBasicExample,
  NewAPIWithMultiContentExample,
  NewAPIAllVariantsExample,
  NewAPIWithImageExample,
  NewAPIWithIndicatorExample,
  NewAPIWithInlineLayoutExample,
  NewAPIWithSizesExample,
  NewAPIWithCustomThemeExample,
} from './examples';

export default {
  title: 'bpk-component-checkbox-card',
  component: BpkCheckboxCard,
  decorators: [(Story: () => JSX.Element) => <BpkProvider><Story /></BpkProvider>],
};

// Compound Component API (V2) Examples
export const Basic = NewAPIBasicExample;
export const WithMultiContent = NewAPIWithMultiContentExample;
export const AllVariants = NewAPIAllVariantsExample;
export const WithImage = NewAPIWithImageExample;
export const WithIndicator = NewAPIWithIndicatorExample;
export const WithInlineLayout = NewAPIWithInlineLayoutExample;
export const WithSizes = NewAPIWithSizesExample;
export const WithCustomTheme = NewAPIWithCustomThemeExample;
