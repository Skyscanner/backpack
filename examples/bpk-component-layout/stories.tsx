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

import {
  BpkBox,
  BpkFlex,
  BpkGrid,
  BpkGridItem,
  BpkProvider,
  BpkStack,
} from '../../packages/bpk-component-layout';

import {
  SpacingExample,
  RtlSpacingExample,
  SizeExample,
  MixedExample,
  ResponsiveExample,
  PositionExample,
  FlexExample,
  GridExample,
  FlexComponentExample,
  GridComponentExample,
  GridItemComponentExample,
  StackComponentExample,
  HStackComponentExample,
  VStackComponentExample,
} from './examples';

export default {
  title: 'bpk-component-layout',
  component: BpkBox,
  subcomponents: {
    BpkProvider,
    BpkFlex,
    BpkGrid,
    BpkGridItem,
    BpkStack,
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <ArgTypes exclude={['zoomEnabled']} />
          <Markdown>
            Notes: BpkProvider is the root component for the Backpack layout components.
          </Markdown>
        </>
      )
    },
  },
};
export const BoxSpacing = () => <SpacingExample />;
BoxSpacing.storyName = 'Box/Spacing';

export const BoxRtlSpacing = () => <RtlSpacingExample />;
BoxRtlSpacing.storyName = 'Box/RTL spacing';

export const BoxSize = () => <SizeExample />;
BoxSize.storyName = 'Box/Size';

export const BoxResponsive = () => <ResponsiveExample />;
BoxResponsive.storyName = 'Box/Responsive';

export const BoxPosition = () => <PositionExample />;
BoxPosition.storyName = 'Box/Position';

export const BoxFlex = () => <FlexExample />;
BoxFlex.storyName = 'Box/Flex (via Box)';

export const BoxGrid = () => <GridExample />;
BoxGrid.storyName = 'Box/Grid (via Box)';

export const FlexBasic = () => <FlexComponentExample />;
FlexBasic.storyName = 'Flex/Basic';

export const GridBasic = () => <GridComponentExample />;
GridBasic.storyName = 'Grid/Basic';

export const GridItem = () => <GridItemComponentExample />;
GridItem.storyName = 'Grid/GridItem';

export const StackBasic = () => <StackComponentExample />;
StackBasic.storyName = 'Stack/Basic';

export const StackH = () => <HStackComponentExample />;
StackH.storyName = 'Stack/HStack';

export const StackV = () => <VStackComponentExample />;
StackV.storyName = 'Stack/VStack';

export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};
