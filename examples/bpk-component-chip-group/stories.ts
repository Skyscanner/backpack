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
// @ts-nocheck

import BpkMultiSelectChipGroup, {
  BpkSingleSelectChipGroup,
} from '../../packages/bpk-component-chip-group';

import {
  BpkChipGroupRail,
  BpkChipGroupWrapping,
  BpkChipGroupSticky,
  BpkSingleChipGroupWrapping,
  OnDarkChipGroup,
  OnImageChipGroup,
  BpkChipGroupWithLabel,
  MixedExample,
  AllChipTypesGroup,
  OnContrastChipGroup,
  StateManagement,
} from './examples';

export default {
  title: 'bpk-component-chip-group',
  component: BpkMultiSelectChipGroup,
  subcomponents: {
    BpkChipGroupSingleSelect: BpkSingleSelectChipGroup,
    // TODO: can we show the shape of ChipItem here?
  },
};

export const WrappedChipGroup = BpkChipGroupWrapping;
export const SingleSelectChipGroup = BpkSingleChipGroupWrapping;
export const RailChipGroup = BpkChipGroupRail;
export const StickyChipGroup = BpkChipGroupSticky;
export const OnContrast = OnContrastChipGroup;
export const OnDark = OnDarkChipGroup;
export const OnImage = OnImageChipGroup;
export const WithLabel = BpkChipGroupWithLabel;
export const AllChipTypes = AllChipTypesGroup;
export const ExampleStateManagement = StateManagement;
export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true
  },
};
