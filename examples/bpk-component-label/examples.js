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
import { BpkDarkExampleWrapper } from '../bpk-storybook-utils';

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

export {
  DefaultExample,
  RequiredExample,
  InvalidExample,
  DisabledExample,
  InvalidRequiredExample,
  WhiteExample,
  MixedExample,
};
