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

import type { ReactNode } from 'react';

import { BpkCardV2 } from '../../packages/bpk-component-card-v2';
import { BpkProvider } from '../../packages/bpk-component-layout';

import {
  DefaultExample,
  VariantsExample,
  SurfaceColorsExample,
  PackagesCardExample,
  FlightsCardExample,
  HotelCardExample,
  CustomPaddingExample,
  InteractiveExample,
  AllExamples,
} from './examples';

export default {
  title: 'bpk-component-card-v2',
  component: BpkCardV2.Root,
  decorators: [(story: () => ReactNode) => <BpkProvider>{story()}</BpkProvider>],
};

export const Default = DefaultExample;
export const Variants = VariantsExample;
export const SurfaceColors = SurfaceColorsExample;
export const PackagesCard = PackagesCardExample;
export const FlightsCard = FlightsCardExample;
export const HotelsCard = HotelCardExample;
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
    columns: {
      control: { type: 'text' },
      description: 'Column fractions (e.g. "7fr 3fr", "1fr 1fr 1fr")',
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
    columns: '',
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
