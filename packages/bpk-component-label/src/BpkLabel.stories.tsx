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


// @ts-expect-error Untyped import
import { BpkDarkExampleWrapper } from '../../../.storybook/bpk-storybook-utils';

import BpkLabel from './BpkLabel';

import type { Meta } from '@storybook/react';

const DefaultExample = () => <BpkLabel htmlFor="origin">Origin</BpkLabel>;

const RequiredExample = () => (
  <BpkLabel htmlFor="origin" required>
    Origin
  </BpkLabel>
);

const InvalidExample = () => (
  <BpkLabel htmlFor="origin" valid={false}>
    Origin
  </BpkLabel>
);

const DisabledExample = () => (
  <BpkLabel htmlFor="origin" disabled>
    Origin
  </BpkLabel>
);

const InvalidRequiredExample = () => (
  <BpkLabel htmlFor="origin" required valid={false}>
    Origin
  </BpkLabel>
);

const WhiteExample = () => (
  <BpkDarkExampleWrapper>
    <BpkLabel htmlFor="origin" white>
      Origin
    </BpkLabel>
    <BpkLabel htmlFor="origin" white valid={false}>
      Origin
    </BpkLabel>
    <BpkLabel htmlFor="origin" white disabled>
      Origin
    </BpkLabel>
  </BpkDarkExampleWrapper>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <RequiredExample />
    <InvalidExample />
    <DisabledExample />
    <InvalidRequiredExample />
    <WhiteExample />
  </div>
);

const meta = {
  title: 'bpk-component-label',
  component: BpkLabel,
} satisfies Meta;

export default meta;

export const Example = {
  render: () => <DefaultExample />,
};

export const Required = {
  render: () => <RequiredExample />,
};

export const Invalid = {
  render: () => <InvalidExample />,
};

export const Disabled = {
  render: () => <DisabledExample />,
};

export const InvalidRequired = {
  render: () => <InvalidRequiredExample />,
};

export const White = {
  render: () => <WhiteExample />,
};

export const VisualTest = {
  render: () => <MixedExample />,
};

export const VisualTestWithZoom = {
  render: () => <MixedExample />,
  args: {
    zoomEnabled: true,
  },
};
