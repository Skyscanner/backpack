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

import BpkSwitch from '../../packages/bpk-component-switch';

const DefaultExample = ({ ...rest }: {}) => (
  <BpkSwitch {...rest} label="Backpack" />
);

const SmallExample = ({ ...rest }: {}) => (
  <BpkSwitch small {...rest} label="Backpack" />
);

const LabelonRightExample =({ ...rest }: {}) => (
  <BpkSwitch {...rest} label="Backpack" labelPosition="right" />
);

// Putting the switch in a container which we know is too small to contain the label and the switch
const ReducedSpaceExample =  ({ ...rest }: {}) => (
  <div style={{ width: "4rem" }}>
    <BpkSwitch {...rest} label="Backpack" />
    <BpkSwitch {...rest} label="Backpack" small />
  </div>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <SmallExample />
    <ReducedSpaceExample />
    <DefaultExample checked />
    <SmallExample checked />
    <ReducedSpaceExample checked />
  </div>
);


export { DefaultExample, SmallExample, MixedExample, ReducedSpaceExample, LabelonRightExample };
