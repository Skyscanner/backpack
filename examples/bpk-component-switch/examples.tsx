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
// @ts-nocheck

import BpkSwitch from '../../packages/bpk-component-switch';

type Props = {
  checked?: boolean,
  [rest: string]: any
};

const DefaultExample = ({ ...rest }: Props) => (
  <BpkSwitch {...rest} ariaLabel="Activate Backpack" />
);

const SmallExample = ({ ...rest }: Props) => (
  <BpkSwitch small {...rest} ariaLabel="Activate Backpack" />
);

// Putting the switch in a container which we know is too small to contain the label and the switch
const ReducedSpaceExample =  ({ ...rest }: Props) => (
  <div style={{ width: "4rem" }}>
    <BpkSwitch {...rest} ariaLabel="Activate Backpack" />
    <BpkSwitch {...rest} ariaLabel="Activate Backpack" small />
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


export { DefaultExample, SmallExample, MixedExample, ReducedSpaceExample };
