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

import BpkTooltip from '../../packages/bpk-component-tooltip/src/BpkTooltip';

import {
  DefaultExample,
  DarkExample,
  SideExample,
  NoPaddingExample,
  LinkExample,
  LongTextExample,
  VisualTestExample,
} from './examples';

export default {
  title: 'bpk-component-tooltip',
  component: BpkTooltip,
};

export const Default = DefaultExample;
export const Dark = DarkExample;
export const OnTheSide = SideExample;
export const WithoutPadding = NoPaddingExample;
export const OnALink = LinkExample;
export const WithMaxWidth = LongTextExample

const VisualExample = VisualTestExample;
export const VisualTest = {
  render: VisualExample,
  parameters: {
    percy: {
      waitForTimeout: 10000
    }
  }
};
export const VisualTestWithZoom = {
  render: VisualExample,
  args: {
    zoomEnabled: true,
  },
  parameters: {
    percy: {
      waitForTimeout: 10000
    }
  }
};
