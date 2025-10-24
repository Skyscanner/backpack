/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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

import { INITIAL_VIEWPORTS } from 'storybook/viewport';

import BpkSnippet from '../../packages/bpk-component-snippet';

import {
  DesktopExample,
  MobileLandscapeExample,
  MobileSquareExample,
  MobilePortraitExample
} from './examples';

import type { StoryObj } from '@storybook/react';

export default {
  title: 'bpk-component-snippet',
  component: BpkSnippet,
};

export const Desktop = DesktopExample;

type Story = StoryObj;

export const MobileLandscape: Story = {
  render: () => <MobileLandscapeExample />,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
  },
};

export const MobileSquare: Story = {
  render: () => <MobileSquareExample />,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
  },
};

export const MobilePortrait: Story = {
  render: () => <MobilePortraitExample />,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
  },
};

export const VisualTest = DesktopExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true
  }
}
