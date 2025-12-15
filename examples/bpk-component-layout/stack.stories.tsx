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

import { BpkProvider, BpkStack } from '../../packages/bpk-component-layout';

import {
  StackDefaultExample,
  StackHorizontalExample,
  HStackExample,
  VStackExample,
  VerticalContentBlocksExample,
  ResponsiveDirectionExample,
  HorizontalButtonsExample,
  NestedStackExample,
} from './stack-examples';

export default {
  // Place under the same root as other layout stories
  title: 'bpk-component-layout/Stack',
  component: BpkStack,
  decorators: [
    (Story: any) => (
      <BpkProvider>
        <Story />
      </BpkProvider>
    ),
  ],
};

export const VerticalContentBlocks = () => <VerticalContentBlocksExample />;
export const HorizontalButtons = ()=> <HorizontalButtonsExample/>;
export const NestedStack = ()=> <NestedStackExample/>;
export const StackDefault = () => <StackDefaultExample />;
export const StackHorizontal = () => <StackHorizontalExample />;
export const StackH = () => <HStackExample />;
export const StackV = () => <VStackExample />;
export const StackResponsive = () => <ResponsiveDirectionExample />;

