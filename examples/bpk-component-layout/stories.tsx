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

import { ArgTypes, Title, Markdown } from '@storybook/addon-docs/blocks';

import { BpkProvider } from '../../packages/bpk-component-layout/src/BpkProvider';
import { BpkBox } from '../../packages/bpk-component-layout/src/BpkBox';
import { BpkFlex } from '../../packages/bpk-component-layout/src/BpkFlex';
import { BpkGrid } from '../../packages/bpk-component-layout/src/BpkGrid';
import { BpkStack, BpkHStack, BpkVStack } from '../../packages/bpk-component-layout/src/BpkStack';

import {
  BpkBoxExample,
  BpkBoxWithPropsExample,
  BpkBoxTextColorsExample,
  BpkBoxBackgroundColorsExample,
  BpkBoxBrandColorsExample,
  BpkBoxBorderColorsExample,
  BpkBoxColorCombinationsExample,
  BpkFlexExample,
  BpkFlexDirectionExample,
  BpkFlexAlignmentExample,
  BpkGridExample,
  BpkGridTemplateColumnsExample,
  BpkStackExample,
  BpkHStackExample,
  BpkVStackExample,
  BpkStackSpacingExample,
  BpkSpacingTokenExample,
  BpkColorTokenExample,
  BpkTokenCombinedExample,
  BpkResponsiveOverrideExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-layout',
  component: BpkBox,
  subcomponents: {
    BpkProvider,
    BpkFlex,
    BpkGrid,
    BpkStack,
    BpkHStack,
    BpkVStack,
  },
  decorators: [
    (Story) => (
      <BpkProvider>
        <Story />
      </BpkProvider>
    ),
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <ArgTypes exclude={['zoomEnabled']} />
          <Markdown>
            {`**Note:** These layout components are built on Chakra UI with PandaCSS. The \`className\` prop is intentionally removed to maintain design system consistency.`}
          </Markdown>
        </>
      )
    },
  },
};

export const Box = BpkBoxExample;
export const BoxWithProps = BpkBoxWithPropsExample;
export const BoxTextColors = BpkBoxTextColorsExample;
export const BoxBackgroundColors = BpkBoxBackgroundColorsExample;
export const BoxBrandColors = BpkBoxBrandColorsExample;
export const BoxBorderColors = BpkBoxBorderColorsExample;
export const BoxColorCombinations = BpkBoxColorCombinationsExample;

export const Flex = BpkFlexExample;
export const FlexDirection = BpkFlexDirectionExample;
export const FlexAlignment = BpkFlexAlignmentExample;

export const Grid = BpkGridExample;
export const GridTemplateColumns = BpkGridTemplateColumnsExample;

export const Stack = BpkStackExample;
export const HStack = BpkHStackExample;
export const VStack = BpkVStackExample;
export const StackSpacing = BpkStackSpacingExample;

export const SpacingTokens = BpkSpacingTokenExample;
export const ColorTokens = BpkColorTokenExample;
export const CombinedTokens = BpkTokenCombinedExample;
export const ResponsiveOverrides = BpkResponsiveOverrideExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};

