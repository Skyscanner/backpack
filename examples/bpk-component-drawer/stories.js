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

import BkpDrawer from '../../packages/bpk-component-drawer/src/BpkDrawer';

import {
  DefaultExample,
  OverflowingExamples,
  CloseButtonTextExample,
  WithVisuallyHiddenTitleExample,
  WithFullHeightContentExample,
  WithNonPaddedContentExample,
} from './examples';

export default {
  title: 'bpk-component-drawer',
  component: BkpDrawer,
};

export const Default = DefaultExample;
export const Overflowing = OverflowingExamples;
export const CloseButtonText = CloseButtonTextExample;

export const WithVisuallyHiddenTitle = WithVisuallyHiddenTitleExample;

export const WithFullHeightContent = WithFullHeightContentExample;

export const WithNonPaddedContent = WithNonPaddedContentExample;
