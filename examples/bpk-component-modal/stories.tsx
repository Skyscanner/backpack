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

import BpkModal from '../../packages/bpk-component-modal/src/BpkModal';

import {
  DefaultExample,
  WideExample,
  OverflowingExample,
  CloseButtonTextExample,
  LongTitleExample,
  NotFullScreenOnMobileExample,
  FullScreenExample,
  FullScreenOverflowingExample,
  NestedExample,
  NoHeaderExample,
  NoPaddingExample,
  WithAccessoryViewExample,
  ContrastExample,
} from './examples';

export default {
  title: 'bpk-component-modal',
  component: BpkModal,
};

export const Default = DefaultExample;
export const Wide = WideExample;
export const Overflowing = OverflowingExample;
export const CloseButtonText = CloseButtonTextExample;

export const LongTitle = LongTitleExample;

export const NotFullScreenOnMobile = NotFullScreenOnMobileExample;

export const FullScreen = FullScreenExample;

export const FullScreenOverflowing = FullScreenOverflowingExample;

export const Nested = NestedExample;
export const NoHeader = NoHeaderExample;

export const NoPadding = NoPaddingExample;

export const WithAccessoryView = WithAccessoryViewExample;
export const Contrast = ContrastExample;
export const VisualTestDefault = () => Default(true);
export const VisualTestDefaultWithZoom = {
  render: () => Default(true),
  args: {
    zoomEnabled: true
  }
}
export const VisualTestContrast = () => Contrast(true);
export const VisualTestContrastWithZoom = {
  render: () => Contrast(true),
  args: {
    zoomEnabled: true
  }
}
export const VisualTestWithAccessoryView = () => WithAccessoryView(true);
export const VisualTestWithAccessoryViewAndZoom = {
  render: () => WithAccessoryView(true),
  args: {
    zoomEnabled: true
  }
}
