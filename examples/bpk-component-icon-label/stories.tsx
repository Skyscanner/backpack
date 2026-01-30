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

import { surfaceColors } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkIconLabel from '../../packages/bpk-component-icon-label';

import {
  DefaultExample,
  LongTextExample,
  TypeVariantsExample,
  OnDarkExample,
  AllVariantsExample,
  MultipleMessagesExample,
  VisualTestExample,
  ThemedExample,
  ThemedOnDarkExample,
  ThemedNightExample,
  FlexiblePositioningExample,
} from './examples';

export default {
  title: 'bpk-component-icon-label',
  component: BpkIconLabel.Root,
  parameters: {
    backgrounds: {
      default: 'Default',
      values: [
        {
          name: 'Default',
          value: surfaceColors.surfaceDefaultDay,
        },
        {
          name: 'Contrast',
          value: surfaceColors.surfaceContrastDay,
        },
      ],
    },
  },
};

export const Default = {
  render: DefaultExample,
  parameters: {
    backgrounds: { default: 'Default' },
  },
};

export const LongText = {
  render: LongTextExample,
  parameters: {
    backgrounds: { default: 'Default' },
  },
};

export const TypeVariants = {
  render: TypeVariantsExample,
  parameters: {
    backgrounds: { default: 'Default' },
  },
};

export const OnDark = {
  render: OnDarkExample,
  parameters: {
    backgrounds: { default: 'Contrast' },
  },
};

export const AllVariants = {
  render: AllVariantsExample,
  parameters: {
    backgrounds: { default: 'Default' },
  },
};

export const MultipleMessages = {
  render: MultipleMessagesExample,
  parameters: {
    backgrounds: { default: 'Default' },
  },
};

export const Themed = {
  render: ThemedExample,
  parameters: {
    backgrounds: { default: 'Default' },
  },
};

export const ThemedOnDark = {
  render: ThemedOnDarkExample,
  parameters: {
    backgrounds: { default: 'Contrast' },
  },
};

export const ThemedNight = {
  render: ThemedNightExample,
  parameters: {
    backgrounds: { default: 'Contrast' },
  },
};

export const FlexiblePositioning = {
  render: FlexiblePositioningExample,
  parameters: {
    backgrounds: { default: 'Default' },
  },
};

export const VisualTest = VisualTestExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};
