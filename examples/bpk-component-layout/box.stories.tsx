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

import { ArgTypes, Title, Markdown } from '@storybook/addon-docs/blocks';

import { BpkProvider, BpkBox } from '../../packages/bpk-component-layout';

import {
  SpacingExample,
  RtlSpacingExample,
  SizeExample,
  ResponsiveExample,
  PositionExample,
  InteractiveExample,
  TextStyleExample,
  ResponsiveTextStyleExample,
  RefExample,
  ColorExample,
  SurfaceBackgroundColorExample,
  CanvasBackgroundColorExample,
  StatusFillBackgroundColorExample,
} from './box-examples';

export default {
  title: 'bpk-component-layout/Box',
  component: BpkBox,
  decorators: [
    (Story: any) => (
      <BpkProvider>
        <Story />
      </BpkProvider>
    ),
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <ArgTypes exclude={['zoomEnabled']} />
          <Markdown>
            Notes: `BpkBox` is the base layout primitive. It exposes a curated,
            structural prop surface and tokenised spacing.
          </Markdown>
        </>
      ),
    },
  },
};

export const Spacing = () => <SpacingExample />;
export const RtlSpacing = () => <RtlSpacingExample />;
export const Size = () => <SizeExample />;
export const Responsive = () => <ResponsiveExample />;
export const Position = () => <PositionExample />;
export const Interactive = () => <InteractiveExample />;
export const TextStyle = () => <TextStyleExample />;
export const ResponsiveTextStyle = () => <ResponsiveTextStyleExample />;
export const Ref = () => <RefExample />;
export const Color = () => <ColorExample />;
export const SurfaceBackgroundColor = () => <SurfaceBackgroundColorExample />;
export const CanvasBackgroundColor = () => <CanvasBackgroundColorExample />;
export const StatusFillBackgroundColor = () => <StatusFillBackgroundColorExample />;


