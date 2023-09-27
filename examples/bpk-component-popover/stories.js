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

/* @flow strict */

import BpkPopover from '../../packages/bpk-component-popover/src/BpkPopover';

import {
  DefaultExample,
  WithLabelAsTitleExample,
  AlongsideInputExample,
  CloseProgrammaticallyExample,
  WithLabelAsTitleAndTextCloseButtonExample,
  OnTheSideExample,
  AttachToExternalExample,
  NoRenderWhenNoExternalElementExample,
  RepositioningExample,
  PopperModifiersExample,
  InputTriggerExample,
} from './examples';

export default {
  title: 'bpk-component-popover',
  component: BpkPopover,
};

export const Default = DefaultExample;
export const WithLabelAsTitle = WithLabelAsTitleExample;

export const AlongsideInput = AlongsideInputExample;

export const CloseProgrammatically = CloseProgrammaticallyExample;

export const WithLabelAsTitleButCloseButtonText =
  WithLabelAsTitleAndTextCloseButtonExample;

export const OnTheSide = OnTheSideExample;

export const AttachToExternalElement = AttachToExternalExample;

export const NotRenderingIfExternalElementDoesNotExist =
  NoRenderWhenNoExternalElementExample;

export const Repositioning = RepositioningExample;
export const PopperModifiers = PopperModifiersExample;

export const TriggeredByInput = InputTriggerExample;
