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

import { storiesOf } from '@storybook/react';

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
};

export const Default = DefaultExample;
export const WithLabelAsTitle = WithLabelAsTitleExample;

WithLabelAsTitle.storyName = 'With label as title';

export const AlongsideInput = AlongsideInputExample;

AlongsideInput.storyName = 'Alongside input';

export const CloseProgrammatically = CloseProgrammaticallyExample;

CloseProgrammatically.storyName = 'Close programmatically';

export const WithLabelAsTitleButCloseButtonText =
  WithLabelAsTitleAndTextCloseButtonExample;

WithLabelAsTitleButCloseButtonText.storyName = 'With label as title but close button text';

export const OnTheSide = OnTheSideExample;

OnTheSide.storyName = 'On the side';

export const AttachToExternalElement = AttachToExternalExample;

AttachToExternalElement.storyName = 'Attach to external element';

export const NotRenderingIfExternalElementDoesNotExist =
  NoRenderWhenNoExternalElementExample;

NotRenderingIfExternalElementDoesNotExist.storyName = 'Not rendering if external element does not exist';

export const Repositioning = RepositioningExample;
export const PopperModifiers = PopperModifiersExample;

PopperModifiers.storyName = 'Popper modifiers';

export const TriggeredByInput = InputTriggerExample;

TriggeredByInput.storyName = 'Triggered by input';
