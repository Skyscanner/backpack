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

import { BpkModalV2 } from '../../packages/bpk-component-modal/src/BpkModalV2/BpkModal';

import {
  DefaultExample,
  LongTitleExample,
  HeaderNoTitleExample,
  OverflowingExample,
  OverflowingNoTitleExample,
  WideExample,
  WideNoTitleExample,
  NoPaddingExample,
  NoPaddingNoTitleExample,
  FullScreenOnDesktopExample,
  FullScreenOnDesktopNoTitleExample,
  NoFullScreenOnMobileExample,
  NoFullScreenOnMobileNoTitleExample,
  NoHeaderExample,
  MultipleModalsExample,
  ContrastExample,
} from './examples';

export default {
  title: 'bpk-component-modal-v2',
  component: BpkModalV2,
};

export const Default = DefaultExample;
export const LongTitle = LongTitleExample;
export const NoTitle = HeaderNoTitleExample;
export const Overflowing = OverflowingExample;
export const OverflowingNoTitle = OverflowingNoTitleExample;
export const Wide = WideExample;
export const WideNoTitle = WideNoTitleExample;
export const NoPadding = NoPaddingExample;
export const NoPaddingNoTitle = NoPaddingNoTitleExample;
export const FullScreenOnDesktop = FullScreenOnDesktopExample;
export const FullScreenOnDesktopNoTitle = FullScreenOnDesktopNoTitleExample;
export const NoFullScreenOnMobile = NoFullScreenOnMobileExample;
export const NoFullScreenOnMobileNoTitle = NoFullScreenOnMobileNoTitleExample;
export const NoHeader = NoHeaderExample;
export const MultipleModals = MultipleModalsExample;
export const Contrast = ContrastExample;
