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
} from '../../packages/bpk-component-layout';

import {
  FlexExample,
  GridExample,
  PositionExample,
  ResponsiveExample,
  RtlSpacingExample,
  SizeExample,
  SpacingExample,
} from './box-examples';
import {
  BpkFlexDirectionExample,
  BpkFlexExample,
  BpkFlexInlineExample,
  BpkFlexItemExample,
  BpkFlexResponsiveExample,
  BpkFlexWrapExample,
} from './flex-examples';
import {
  BpkGridExample,
  BpkGridResponsiveExample,
  BpkGridSpanExample,
  BpkGridWithItemExample,
} from './grid-examples';
import {
  HStackExample,
  HorizontalButtonsExample,
  NestedStackExample,
  ResponsiveDirectionExample,
  StackDefaultExample,
  StackHorizontalExample,
  VStackExample,
  VerticalContentBlocksExample,
} from './stack-examples';

export default {
  title: 'bpk-component-layout',
  component: BpkProvider,
  subcomponents: {
    BpkBox,
    BpkFlex,
    BpkGrid,
    BpkGridItem,
    BpkStack,
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
    <FlexExample />
    <GridExample />

    {/* Flex examples */}
    <BpkFlexExample />
    <BpkFlexDirectionExample />
    <BpkFlexWrapExample />
    <BpkFlexResponsiveExample />
    <BpkFlexItemExample />
    <BpkFlexInlineExample />

    {/* Grid examples */}
    <BpkGridExample />
    <BpkGridSpanExample />
    <BpkGridWithItemExample />
    <BpkGridResponsiveExample />

    {/* Stack examples */}
    <VerticalContentBlocksExample />
    <HorizontalButtonsExample />
    <NestedStackExample />
    <StackDefaultExample />
    <StackHorizontalExample />
    <HStackExample />
    <VStackExample />
    <ResponsiveDirectionExample />
  </>
);

export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};
