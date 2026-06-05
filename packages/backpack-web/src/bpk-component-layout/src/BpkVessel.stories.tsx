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

import { BpkProvider, BpkVessel } from '..';

import type { Meta } from '@storybook/react';

const BpkVesselExample = () => (
  <BpkVessel
    style={{
      padding: '16px',
      transition: 'opacity 0.3s',
    }}
    data-testid="vessel-basic"
  >
    Content
  </BpkVessel>
);

const meta = {
  title: 'bpk-component-layout/Vessel',
  component: BpkVessel,
  decorators: [
    (Story: any) => (
      <BpkProvider>
        <Story />
      </BpkProvider>
    ),
  ],
} satisfies Meta;

export default meta;

export const Default = {
  render: () => <BpkVesselExample />,
};
