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

import { Fragment } from 'react';

import { BpkProvider } from '../../packages/bpk-component-layout/src/BpkProvider';
import { BpkBox } from '../../packages/bpk-component-layout/src/BpkBox';
import { BpkFlex } from '../../packages/bpk-component-layout/src/BpkFlex';
import { BpkGrid } from '../../packages/bpk-component-layout/src/BpkGrid';
import { BpkStack, BpkHStack, BpkVStack } from '../../packages/bpk-component-layout/src/BpkStack';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

// Helper component for demo items
const DemoItem = ({ children, color = 'blue.100' }: { children: React.ReactNode; color?: string }) => (
  <BpkBox
    p={4}
    bg={color}
    borderRadius="md"
    border="1px solid"
    borderColor="gray.300"
    textAlign="center"
  >
    {children}
  </BpkBox>
);

// BpkBox Examples
export const BpkBoxExample = () => (
  <BpkProvider>
    <BpkBox p={4} bg="gray.100" borderRadius="md">
      <BpkText>This is a basic Box component with padding and background.</BpkText>
    </BpkBox>
  </BpkProvider>
);

export const BpkBoxWithPropsExample = () => (
  <BpkProvider>
    <BpkBox
      p={6}
      bg="blue.500"
      color="white"
      borderRadius="lg"
      boxShadow="lg"
      mb={4}
    >
      <BpkBox mb={2}>
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Box with various props
        </BpkText>
      </BpkBox>
      <BpkText>This Box demonstrates padding, background, color, border radius, and shadow.</BpkText>
    </BpkBox>
  </BpkProvider>
);

// BpkFlex Examples
export const BpkFlexExample = () => (
  <BpkProvider>
    <BpkFlex gap={4}>
      <DemoItem>Item 1</DemoItem>
      <DemoItem>Item 2</DemoItem>
      <DemoItem>Item 3</DemoItem>
    </BpkFlex>
  </BpkProvider>
);

export const BpkFlexDirectionExample = () => (
  <BpkProvider>
    <BpkStack spacing={4}>
      <div>
        <BpkBox mb={2}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Row (default)
          </BpkText>
        </BpkBox>
        <BpkFlex direction="row" gap={4}>
          <DemoItem>Item 1</DemoItem>
          <DemoItem>Item 2</DemoItem>
          <DemoItem>Item 3</DemoItem>
        </BpkFlex>
      </div>
      <div>
        <BpkBox mb={2}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Column
          </BpkText>
        </BpkBox>
        <BpkFlex direction="column" gap={4}>
          <DemoItem>Item 1</DemoItem>
          <DemoItem>Item 2</DemoItem>
          <DemoItem>Item 3</DemoItem>
        </BpkFlex>
      </div>
    </BpkStack>
  </BpkProvider>
);

export const BpkFlexAlignmentExample = () => (
  <BpkProvider>
    <BpkStack spacing={6}>
      <div>
        <BpkBox mb={2}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Center aligned
          </BpkText>
        </BpkBox>
        <BpkFlex align="center" justify="center" gap={4} minH="100px" bg="gray.50" p={4} borderRadius="md">
          <DemoItem color="blue.200">Centered</DemoItem>
        </BpkFlex>
      </div>
      <div>
        <BpkBox mb={2}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Space between
          </BpkText>
        </BpkBox>
        <BpkFlex justify="space-between" gap={4} bg="gray.50" p={4} borderRadius="md">
          <DemoItem color="green.200">Start</DemoItem>
          <DemoItem color="green.200">End</DemoItem>
        </BpkFlex>
      </div>
      <div>
        <BpkBox mb={2}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Space around
          </BpkText>
        </BpkBox>
        <BpkFlex justify="space-around" gap={4} bg="gray.50" p={4} borderRadius="md">
          <DemoItem color="purple.200">Item 1</DemoItem>
          <DemoItem color="purple.200">Item 2</DemoItem>
          <DemoItem color="purple.200">Item 3</DemoItem>
        </BpkFlex>
      </div>
    </BpkStack>
  </BpkProvider>
);

// BpkGrid Examples
export const BpkGridExample = () => (
  <BpkProvider>
    <BpkGrid templateColumns="repeat(3, 1fr)" gap={4}>
      <DemoItem>Item 1</DemoItem>
      <DemoItem>Item 2</DemoItem>
      <DemoItem>Item 3</DemoItem>
      <DemoItem>Item 4</DemoItem>
      <DemoItem>Item 5</DemoItem>
      <DemoItem>Item 6</DemoItem>
    </BpkGrid>
  </BpkProvider>
);

export const BpkGridTemplateColumnsExample = () => (
  <BpkProvider>
    <BpkStack spacing={6}>
      <div>
        <BpkBox mb={2}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            3 equal columns
          </BpkText>
        </BpkBox>
        <BpkGrid templateColumns="repeat(3, 1fr)" gap={4}>
          <DemoItem color="red.200">Column 1</DemoItem>
          <DemoItem color="red.200">Column 2</DemoItem>
          <DemoItem color="red.200">Column 3</DemoItem>
        </BpkGrid>
      </div>
      <div>
        <BpkBox mb={2}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Responsive columns (1fr 2fr 1fr)
          </BpkText>
        </BpkBox>
        <BpkGrid templateColumns="1fr 2fr 1fr" gap={4}>
          <DemoItem color="orange.200">Narrow</DemoItem>
          <DemoItem color="orange.200">Wide</DemoItem>
          <DemoItem color="orange.200">Narrow</DemoItem>
        </BpkGrid>
      </div>
      <div>
        <BpkBox mb={2}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Auto-fit columns
          </BpkText>
        </BpkBox>
        <BpkGrid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={4}>
          <DemoItem color="teal.200">Auto</DemoItem>
          <DemoItem color="teal.200">Auto</DemoItem>
          <DemoItem color="teal.200">Auto</DemoItem>
          <DemoItem color="teal.200">Auto</DemoItem>
        </BpkGrid>
      </div>
    </BpkStack>
  </BpkProvider>
);

// BpkStack Examples
export const BpkStackExample = () => (
  <BpkProvider>
    <BpkStack spacing={4}>
      <DemoItem>Stack Item 1</DemoItem>
      <DemoItem>Stack Item 2</DemoItem>
      <DemoItem>Stack Item 3</DemoItem>
    </BpkStack>
  </BpkProvider>
);

export const BpkHStackExample = () => (
  <BpkProvider>
    <BpkHStack spacing={4}>
      <DemoItem color="pink.200">Horizontal Item 1</DemoItem>
      <DemoItem color="pink.200">Horizontal Item 2</DemoItem>
      <DemoItem color="pink.200">Horizontal Item 3</DemoItem>
    </BpkHStack>
  </BpkProvider>
);

export const BpkVStackExample = () => (
  <BpkProvider>
    <BpkVStack spacing={4}>
      <DemoItem color="cyan.200">Vertical Item 1</DemoItem>
      <DemoItem color="cyan.200">Vertical Item 2</DemoItem>
      <DemoItem color="cyan.200">Vertical Item 3</DemoItem>
    </BpkVStack>
  </BpkProvider>
);

export const BpkStackSpacingExample = () => (
  <BpkProvider>
    <BpkStack spacing={6}>
      <div>
        <BpkBox mb={2}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Small spacing (2)
          </BpkText>
        </BpkBox>
        <BpkVStack spacing={2}>
          <DemoItem color="yellow.200">Item 1</DemoItem>
          <DemoItem color="yellow.200">Item 2</DemoItem>
          <DemoItem color="yellow.200">Item 3</DemoItem>
        </BpkVStack>
      </div>
      <div>
        <BpkBox mb={2}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Medium spacing (4)
          </BpkText>
        </BpkBox>
        <BpkVStack spacing={4}>
          <DemoItem color="yellow.200">Item 1</DemoItem>
          <DemoItem color="yellow.200">Item 2</DemoItem>
          <DemoItem color="yellow.200">Item 3</DemoItem>
        </BpkVStack>
      </div>
      <div>
        <BpkBox mb={2}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Large spacing (8)
          </BpkText>
        </BpkBox>
        <BpkVStack spacing={8}>
          <DemoItem color="yellow.200">Item 1</DemoItem>
          <DemoItem color="yellow.200">Item 2</DemoItem>
          <DemoItem color="yellow.200">Item 3</DemoItem>
        </BpkVStack>
      </div>
    </BpkStack>
  </BpkProvider>
);

// Mixed Example for Visual Test
export const MixedExample = () => (
  <BpkProvider>
    <BpkStack spacing={8} p={6}>
      <div>
        <BpkBox mb={4}>
          <BpkText textStyle={TEXT_STYLES.heading4}>
            Layout Components Showcase
          </BpkText>
        </BpkBox>
      </div>

      <div>
        <BpkBox mb={3}>
          <BpkText textStyle={TEXT_STYLES.heading5}>
            Box Component
          </BpkText>
        </BpkBox>
        <BpkBoxExample />
      </div>

      <div>
        <BpkBox mb={3}>
          <BpkText textStyle={TEXT_STYLES.heading5}>
            Flex Component
          </BpkText>
        </BpkBox>
        <BpkFlexExample />
      </div>

      <div>
        <BpkBox mb={3}>
          <BpkText textStyle={TEXT_STYLES.heading5}>
            Grid Component
          </BpkText>
        </BpkBox>
        <BpkGridExample />
      </div>

      <div>
        <BpkBox mb={3}>
          <BpkText textStyle={TEXT_STYLES.heading5}>
            Stack Components
          </BpkText>
        </BpkBox>
        <BpkBox mb={4}>
          <BpkHStack spacing={4}>
            <BpkText textStyle={TEXT_STYLES.label1}>HStack:</BpkText>
            <BpkHStackExample />
          </BpkHStack>
        </BpkBox>
        <BpkVStackExample />
      </div>

      <div>
        <BpkBox mb={3}>
          <BpkText textStyle={TEXT_STYLES.heading5}>
            Complex Layout
          </BpkText>
        </BpkBox>
        <BpkBox p={4} bg="gray.50" borderRadius="md">
          <BpkGrid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
            <BpkBox p={4} bg="blue.100" borderRadius="md">
              <BpkText textStyle={TEXT_STYLES.label1}>Grid Item 1</BpkText>
            </BpkBox>
            <BpkBox p={4} bg="green.100" borderRadius="md">
              <BpkText textStyle={TEXT_STYLES.label1}>Grid Item 2</BpkText>
            </BpkBox>
          </BpkGrid>
          <BpkFlex justify="space-between" align="center" p={4} bg="purple.100" borderRadius="md">
            <BpkText textStyle={TEXT_STYLES.label1}>Flex Item 1</BpkText>
            <BpkText textStyle={TEXT_STYLES.label1}>Flex Item 2</BpkText>
          </BpkFlex>
        </BpkBox>
      </div>
    </BpkStack>
  </BpkProvider>
);

