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

import BpkLabel from '../../packages/bpk-component-label';
import BpkSplitInput, {
  INPUT_TYPES,
} from '../../packages/bpk-component-split-input';
import { action } from '../bpk-storybook-utils';

const SplitInputExample = () => (
  <form>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2322): Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2322): Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2322): Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2322): Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
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

export {
  SplitInputExample,
  SplitInputSixDigitExample,
  SplitInputWithPlaceholderExample,
  SplitInputSmallExample,
};
