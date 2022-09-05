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
  AllTypesExample,
  SelectableChipsExample,
  AllSelectableChipStylesExample,
  WithIconsExample,
  RadioGroupChipsExample,
  DismissibleChipsExample,
} from './examples';

export default {
  title: 'bpk-component-chip',
};

export const AllTypes = AllTypesExample;

AllTypes.storyName = 'All types';

export const Selectable = SelectableChipsExample;
export const AllSelectableTypes = AllSelectableChipStylesExample;
export const WithIcons = WithIconsExample;

WithIcons.storyName = 'With icons';

export const Dismissable = DismissibleChipsExample;
export const RadioGroup = RadioGroupChipsExample;
export const VisualTest = AllTypesExample;

VisualTest.storyName = 'Visual test';
