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

import BpkPanel from '../../packages/bpk-component-panel/src/BpkPanel';

import {
  BackgroundColorExample,
  WithoutPaddingExample,
  FullWidthExample,
  MixedExample,
  NoKeylineExample,
} from './examples';

export default {
  title: 'bpk-component-panel',
  component: BpkPanel,
};

export const Default = BackgroundColorExample;
export const WithoutPadding = WithoutPaddingExample;

export const FullWidth = FullWidthExample;
export const NoKeyline = NoKeylineExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true
  }
}
