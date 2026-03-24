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

import { BpkModalV3 } from '../../packages/bpk-component-modal';

import {
  DefaultExample,
  SheetExample,
  FullExample,
  LongTitleExample,
  OverflowingExample,
  MultipleModalsExample,
  DefaultWithImageExample,
  SheetWithImageExample,
  SimpleHeadlineExample,
  CustomHeadlineExample,
  TriggerExample,
  TwoColumnExample,
  NoHeaderExample,
} from './examples';

export default {
  title: 'bpk-component-modal-v3',
  component: BpkModalV3.Root,
  argTypes: {
    zoomEnabled: {
      control: 'boolean',
    },
  },
};

export const Default = DefaultExample;
export const Sheet = SheetExample;
export const Full = FullExample;
export const LongTitle = LongTitleExample;
export const Overflowing = OverflowingExample;
export const MultipleModals = MultipleModalsExample;
export const DefaultWithImage = DefaultWithImageExample;
export const SheetWithImage = SheetWithImageExample;
export const SimpleHeadline = SimpleHeadlineExample;
export const CustomHeadline = CustomHeadlineExample;
export const TwoColumn = TwoColumnExample;
export const NoHeader = NoHeaderExample;
export const Trigger = TriggerExample;

export const VisualTest = DefaultExample;
export const VisualTestWithZoom = {
  render: DefaultExample,
  args: {
    zoomEnabled: true,
  },
};

export const VisualTestSheet = SheetExample;
export const VisualTestSheetWithZoom = {
  render: SheetExample,
  args: {
    zoomEnabled: true,
  },
};

export const VisualTestFull = FullExample;
export const VisualTestFullWithZoom = {
  render: FullExample,
  args: {
    zoomEnabled: true,
  },
};
