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
  VisualTestExample,
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
export const VisualTestDefault = VisualTestExample;
export const VisualTestDefaultWithZoom = {
  render: VisualTestDefault,
  args: {
    zoomEnabled: true
  }
}
export const VisualTestContrast = Contrast;
export const VisualTestContrastWithZoom = {
  render: Contrast,
  args: {
    zoomEnabled: true
  }
}
export const VisualTestWithAccessoryView = WithAccessoryView;
export const VisualTestWithAccessoryViewAndZoom = {
  render: WithAccessoryView,
  args: {
    zoomEnabled: true
  }
}
