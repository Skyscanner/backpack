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

import BpkLabel from '../../packages/bpk-component-label';
import { BpkDarkExampleWrapper } from '../bpk-storybook-utils';

// @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; }' is n... Remove this comment to see the full error message
const DefaultExample = () => <BpkLabel htmlFor="origin">Origin</BpkLabel>;

const RequiredExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; require... Remove this comment to see the full error message
  <BpkLabel htmlFor="origin" required>
    Origin
  </BpkLabel>
);

const InvalidExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; valid: ... Remove this comment to see the full error message
  <BpkLabel htmlFor="origin" valid={false}>
    Origin
  </BpkLabel>
);

const DisabledExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; disable... Remove this comment to see the full error message
  <BpkLabel htmlFor="origin" disabled>
    Origin
  </BpkLabel>
);

const InvalidRequiredExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; require... Remove this comment to see the full error message
  <BpkLabel htmlFor="origin" required valid={false}>
    Origin
  </BpkLabel>
);

const WhiteExample = () => (
  <BpkDarkExampleWrapper>
    <BpkLabel
    // @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; white: ... Remove this comment to see the full error message
    htmlFor="origin" white>
      Origin
    </BpkLabel>
     {/* @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; white: ... Remove this comment to see the full error message */}
    <BpkLabel htmlFor="origin" white valid={false}>
      Origin
    </BpkLabel>
     {/* @ts-expect-error TS(2322) FIXME: Type '{ children: string; htmlFor: string; white: ... Remove this comment to see the full error message */}
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

export {
  DefaultExample,
  RequiredExample,
  InvalidExample,
  DisabledExample,
  InvalidRequiredExample,
  WhiteExample,
  MixedExample,
};
