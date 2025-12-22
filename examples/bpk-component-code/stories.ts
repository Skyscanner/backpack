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

import BpkCode from '../../packages/bpk-component-code/src/BpkCode';
import BpkCodeBlock from '../../packages/bpk-component-code/src/BpkCodeBlock';

import {
  InlineExample,
  InlineAlternateExample,
  BlockExample,
  BlockAlternateExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-code',
  component: BpkCode,
  subcomponents: {
    BpkCodeBlock
  },
};

export const Inline = InlineExample;
export const InlineAlternate = InlineAlternateExample;

export const Block = BlockExample;
export const BlockAlternate = BlockAlternateExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};