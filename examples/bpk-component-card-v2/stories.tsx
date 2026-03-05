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

import { BpkCardV2 } from '../../packages/bpk-component-card-v2';

import {
  DefaultExample,
  VariantsExample,
  SurfaceColorsExample,
  SplitLayoutExample,
  CustomPaddingExample,
  InteractiveExample,
  AllExamples,
} from './examples';

export default {
  title: 'bpk-component-card-v2',
  component: BpkCardV2.Root,
};

export const Default = DefaultExample;
export const Variants = VariantsExample;
export const SurfaceColors = SurfaceColorsExample;
export const SplitLayout = SplitLayoutExample;
export const CustomPadding = CustomPaddingExample;

export const Interactive = {
  render: InteractiveExample,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'noElevation'],
    },
    bgColor: {
      control: { type: 'select' },
      options: [
        'surfaceDefault',
        'surfaceElevated',
        'surfaceTint',
        'surfaceSubtle',
        'surfaceHero',
        'surfaceContrast',
        'surfaceLowContrast',
        'surfaceHighlight',
      ],
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'base', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'],
    },
    split: {
      control: { type: 'boolean' },
    },
    splitRatio: {
      control: { type: 'range', min: 10, max: 90, step: 5 },
    },
    showHeader: {
      control: { type: 'boolean' },
    },
    showFooter: {
      control: { type: 'boolean' },
    },
  },
  args: {
    variant: 'default',
    bgColor: 'surfaceDefault',
    padding: 'base',
    split: false,
    splitRatio: 70,
    showHeader: true,
    showFooter: true,
  },
};

export const VisualTest = AllExamples;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};
