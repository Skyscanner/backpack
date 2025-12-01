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

import BpkBottomSheet from '../../packages/bpk-component-bottom-sheet';

import {
  DefaultExample,
  BackdropClickCloseExample,
  EscapeCloseExample,
  OverflowingExample,
  LongHeaderTextExample,
  LongHeaderTextWithActionButtonExample,
  NoHeaderExample,
  NoHeaderWithActionButtonExample,
  ActionButtonExample,
  WideExample,
  NestedExample,
  MultipleBottomSheetsExample,
  NoPaddingExample,
  BasePaddingExample,
  LgPaddingExample,
  XXLPaddingExample,
  XXXLPaddingExample,
} from './examples';

export default {
  title: 'bpk-component-bottom-sheet',
  component: BpkBottomSheet,
};

export const Default = DefaultExample;
export const BackdropClickClose = BackdropClickCloseExample;
export const EscapeClose = EscapeCloseExample;
export const Overflowing = OverflowingExample;

export const LongHeaderText = LongHeaderTextExample;
export const LongHeaderTextWithActionButton =
  LongHeaderTextWithActionButtonExample;

export const NoHeader = NoHeaderExample;
export const NoHeaderWithActionButton = NoHeaderWithActionButtonExample;

export const ActionButton = ActionButtonExample;

export const Wide = WideExample;

export const Nested = NestedExample;

export const MultipleBottomSheets = MultipleBottomSheetsExample;

export const NoPadding = NoPaddingExample;
export const BasePadding = BasePaddingExample;
export const LgPadding = LgPaddingExample;
export const XXLPadding = XXLPaddingExample;
export const XXXLPadding = XXXLPaddingExample;
