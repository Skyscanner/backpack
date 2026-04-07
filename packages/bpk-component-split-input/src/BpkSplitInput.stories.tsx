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
import BpkLabel from '../../bpk-component-label';

import BpkSplitInput, { INPUT_TYPES } from './BpkSplitInput';

import type { Meta } from '@storybook/react';

const SplitInputExample = () => (
  <form>
    <BpkLabel htmlFor="otpInput">4-digit verification code</BpkLabel>
    <BpkSplitInput
      type={INPUT_TYPES.number}
      name="otpInput"
      id="otpInput"
      label="otp input"
      onInputChange={action('On Input Change')}
      onSubmit={action('On Submit')}
      inputLength={4}
    />
  </form>
);

const SplitInputSixDigitExample = () => (
  <form>
    <BpkLabel htmlFor="otpInput">6-digit verification code</BpkLabel>
    <BpkSplitInput
      type={INPUT_TYPES.text}
      name="otpInput"
      id="otpInput"
      label="otp input"
      onInputChange={action('On Input Change')}
      onSubmit={action('On Submit')}
      inputLength={6}
    />
  </form>
);

const SplitInputWithPlaceholderExample = () => (
  <form>
    <BpkLabel htmlFor="otpInput">6-digit verification code</BpkLabel>
    <BpkSplitInput
      type={INPUT_TYPES.text}
      name="otpInput"
      id="otpInput"
      label="otp input"
      placeholder="X"
      onInputChange={action('On Input Change')}
      onSubmit={action('On Submit')}
      inputLength={6}
    />
  </form>
);

const SplitInputSmallExample = () => (
  <form>
    <BpkLabel htmlFor="otpInput">4-digit verification code</BpkLabel>
    <BpkSplitInput
      type={INPUT_TYPES.number}
      name="otpInput"
      id="otpInput"
      label="otp input"
      large={false}
      onInputChange={action('On Input Change')}
      onSubmit={action('On Submit')}
    />
  </form>
);

const meta = {
  title: 'bpk-component-split-input',
  component: BpkSplitInput,
} satisfies Meta;

export default meta;

export const DefaultInput = {
  render: () => <SplitInputExample />,
};

export const SplitInputSixDigit = {
  render: () => <SplitInputSixDigitExample />,
};

export const SplitInputWithPlaceholder = {
  render: () => <SplitInputWithPlaceholderExample />,
};

export const SmallInput = {
  render: () => <SplitInputSmallExample />,
};

export const VisualTest = {
  render: () => <SplitInputExample />,
};

export const VisualTestWithZoom = {
  render: () => <SplitInputExample />,
  args: {
    zoomEnabled: true,
  },
};
