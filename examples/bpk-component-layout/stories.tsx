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

import {
  BpkBox,
  BpkFlex,
  BpkGrid,
  BpkGridItem,
  BpkProvider,
  BpkStack,
  BpkVessel,
} from '../../packages/bpk-component-layout';

import {
  PositionExample,
  ResponsiveExample,
  RtlSpacingExample,
  SizeExample,
  SpacingExample,
} from './box-examples';
import {
  BpkFlexAlignExample,
  BpkFlexDirectionExample,
  BpkFlexExample,
  BpkFlexJustifyExample,
  BpkFlexOrderExample,
  BpkFlexWrapExample,
} from './flex-examples';
import {
  BpkGridExample,
  BpkGridSpanExample,
  BpkGridBentoBoxExample,
} from './grid-examples';
import {
  BpkStackExample,
  BpkStackDirectionExample,
  BpkHStackExample,
  BpkVStackExample,
  BpkStackResponsiveExample,
} from './stack-examples';
import BpkVesselExample from './vessel-examples';

export default {
  title: 'bpk-component-layout',
  component: BpkProvider,
  subcomponents: {
    BpkBox,
    BpkFlex,
    BpkGrid,
    BpkGridItem,
    BpkStack,
    BpkVessel,
  },
  parameters: {
    docs: {
      // Use Storybook's default docs rendering.
      page: undefined,
    },
  },
};

export const VisualTest = () => (
  <>
    {/* Box examples */}
    <SpacingExample />
    <RtlSpacingExample />
    <SizeExample />
    <ResponsiveExample />
    <PositionExample />

    {/* Flex examples */}
    <BpkFlexExample />
    <BpkFlexDirectionExample />
    <BpkFlexAlignExample />
    <BpkFlexJustifyExample />
    <BpkFlexOrderExample />
    <BpkFlexWrapExample />

    {/* Grid examples */}
    <BpkGridExample />
    <BpkGridSpanExample />
    <BpkGridBentoBoxExample />

    {/* Stack examples */}
    <BpkStackExample />
    <BpkStackDirectionExample />
    <BpkHStackExample />
    <BpkVStackExample />
    <BpkStackResponsiveExample />

    {/* Vessel examples */}
    <BpkVesselExample />
  </>
);

export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};
