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


// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { action } from '../../../examples/bpk-storybook-utils';

import BpkCloseButton from './BpkCloseButton';

import type { Meta } from '@storybook/react';

const DefaultExample = () => (
  <BpkCloseButton label="Close" onClick={action('Close button clicked')} />
);

const meta = {
  title: 'bpk-component-close-button',
  component: BpkCloseButton,
} satisfies Meta;

export default meta;

export const Default = {
  render: () => <DefaultExample />,
};

export const VisualTest = {
  render: () => <DefaultExample />,
};

export const VisualTestWithZoom = {
  render: () => <DefaultExample />,
  args: {
    zoomEnabled: true,
  },
};
