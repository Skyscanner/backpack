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
    <BpkBox p="bpk-spacing-base" bg="bpk-canvas-day" borderRadius="bpk-spacing-md">
      <BpkText>This is a basic Box component with padding and background.</BpkText>
    </BpkBox>
  </BpkProvider>
);

export const BpkBoxWithPropsExample = () => (
  <BpkProvider>
    <BpkBox
      p="bpk-spacing-lg"
      bg="bpk-core-primary-day"
      color="white"
      borderRadius="bpk-spacing-lg"
      mb="bpk-spacing-base"
    >
      <BpkBox mb="bpk-spacing-sm">
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Box with various props
        </BpkText>
      </BpkBox>
      <BpkText>This Box demonstrates padding, background, color, border radius.</BpkText>
    </BpkBox>
  </BpkProvider>
);

// BpkBox Color Examples
export const BpkBoxTextColorsExample = () => (
  <BpkProvider>
    <BpkVStack spacing="bpk-spacing-base">
      <BpkBox mb="bpk-spacing-base">
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Text Colors with Backpack Tokens
        </BpkText>
      </BpkBox>
      
      <BpkBox p="bpk-spacing-base" bg="bpk-canvas-day" borderRadius="bpk-spacing-md" border="1px solid" borderColor="bpk-line-day">
        <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1} mb="bpk-spacing-sm">
          Primary Text Color
        </BpkText>
        <BpkText color="bpk-text-secondary-day" textStyle={TEXT_STYLES.bodyDefault}>
          Secondary Text Color
        </BpkText>
      </BpkBox>

      <BpkBox p="bpk-spacing-base" bg="bpk-canvas-day" borderRadius="bpk-spacing-md" border="1px solid" borderColor="bpk-line-day">
        <BpkText color="bpk-text-link-day" textStyle={TEXT_STYLES.label1} mb="bpk-spacing-sm">
          Link Text Color
        </BpkText>
        <BpkText color="bpk-text-error-day" textStyle={TEXT_STYLES.bodyDefault} mb="bpk-spacing-sm">
          Error Text Color
        </BpkText>
        <BpkText color="bpk-text-success-day" textStyle={TEXT_STYLES.bodyDefault}>
          Success Text Color
        </BpkText>
      </BpkBox>
    </BpkVStack>
  </BpkProvider>
);

export const BpkBoxBackgroundColorsExample = () => (
  <BpkProvider>
    <BpkVStack spacing="bpk-spacing-base">
      <BpkBox mb="bpk-spacing-base">
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Background Colors with Backpack Tokens
        </BpkText>
      </BpkBox>
      
      <BpkGrid templateColumns="repeat(2, 1fr)" gap="bpk-spacing-base">
        <BpkBox p="bpk-spacing-base" bg="bpk-canvas-day" borderRadius="bpk-spacing-md" border="1px solid" borderColor="bpk-line-day">
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1}>
            Canvas Background
          </BpkText>
        </BpkBox>

        <BpkBox p="bpk-spacing-base" bg="bpk-canvas-contrast-day" borderRadius="md" border="1px solid" borderColor="bpk-line-day">
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1}>
            Canvas Contrast Background
          </BpkText>
        </BpkBox>

        <BpkBox p="bpk-spacing-base" bg="bpk-surface-highlight-day" borderRadius="md" border="1px solid" borderColor="bpk-line-day">
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1}>
            Surface Highlight Background
          </BpkText>
        </BpkBox>

        <BpkBox p="bpk-spacing-base" bg="bpk-surface-elevated-day" borderRadius="md" border="1px solid" borderColor="bpk-line-day">
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1}>
            Surface Elevated Background
          </BpkText>
        </BpkBox>
      </BpkGrid>
    </BpkVStack>
  </BpkProvider>
);

export const BpkBoxBrandColorsExample = () => (
  <BpkProvider>
    <BpkVStack spacing="bpk-spacing-base">
      <BpkBox mb="bpk-spacing-base">
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Brand Colors with Backpack Tokens
        </BpkText>
      </BpkBox>
      
      <BpkHStack spacing="bpk-spacing-base">
        <BpkBox 
          p="bpk-spacing-lg" 
          bg="bpk-core-primary-day" 
          borderRadius="bpk-spacing-md"
          flex="1"
        >
          <BpkText color="white" textStyle={TEXT_STYLES.heading5} textAlign="center">
            Core Primary
          </BpkText>
        </BpkBox>

        <BpkBox 
          p="bpk-spacing-lg" 
          bg="bpk-core-accent-day" 
          borderRadius="bpk-spacing-md"
          flex="1"
        >
          <BpkText color="white" textStyle={TEXT_STYLES.heading5} textAlign="center">
            Core Accent
          </BpkText>
        </BpkBox>
      </BpkHStack>
    </BpkVStack>
  </BpkProvider>
);

export const BpkBoxBorderColorsExample = () => (
  <BpkProvider>
    <BpkVStack spacing="bpk-spacing-base">
      <BpkBox mb="bpk-spacing-base">
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Border Colors with Backpack Tokens
        </BpkText>
      </BpkBox>
      
      <BpkVStack spacing="bpk-spacing-md">
        <BpkBox 
          p="bpk-spacing-base" 
          bg="bpk-canvas-day" 
          borderRadius="bpk-spacing-md" 
          border="2px solid" 
          borderColor="bpk-line-day"
        >
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1}>
            Standard Border (bpk-line-day)
          </BpkText>
        </BpkBox>

        <BpkBox 
          p="bpk-spacing-base" 
          bg="bpk-canvas-day" 
          borderRadius="bpk-spacing-md" 
          border="2px solid" 
          borderColor="bpk-core-primary-day"
        >
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1}>
            Primary Border (bpk-core-primary-day)
          </BpkText>
        </BpkBox>

        <BpkBox 
          p="bpk-spacing-base" 
          bg="bpk-canvas-day" 
          borderRadius="bpk-spacing-md" 
          borderTop="3px solid" 
          borderTopColor="bpk-core-primary-day"
          borderRight="1px solid"
          borderRightColor="bpk-line-day"
          borderBottom="1px solid"
          borderBottomColor="bpk-line-day"
          borderLeft="1px solid"
          borderLeftColor="bpk-line-day"
        >
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1}>
            Custom Border Colors (top: primary, others: line)
          </BpkText>
        </BpkBox>
      </BpkVStack>
    </BpkVStack>
  </BpkProvider>
);

export const BpkBoxColorCombinationsExample = () => (
  <BpkProvider>
    <BpkVStack spacing="bpk-spacing-lg">
      <BpkBox mb="bpk-spacing-base">
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Color Combinations with Backpack Tokens
        </BpkText>
      </BpkBox>
      
      <BpkGrid templateColumns="repeat(2, 1fr)" gap="bpk-spacing-base">
        <BpkBox 
          p="bpk-spacing-lg" 
          bg="bpk-surface-elevated-day" 
          borderRadius="bpk-spacing-md" 
          border="1px solid" 
          borderColor="bpk-line-day"
        >
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.heading5} mb="bpk-spacing-sm">
            Card Title
          </BpkText>
          <BpkText color="bpk-text-secondary-day" textStyle={TEXT_STYLES.bodyDefault} mb="bpk-spacing-base">
            Card description with secondary text color.
          </BpkText>
          <BpkBox 
            p="bpk-spacing-base" 
            bg="bpk-core-primary-day" 
            borderRadius="bpk-spacing-md"
            mt="bpk-spacing-base"
          >
            <BpkText color="white" textStyle={TEXT_STYLES.label1} textAlign="center">
              Primary Action
            </BpkText>
          </BpkBox>
        </BpkBox>

        <BpkBox 
          p="bpk-spacing-lg" 
          bg="bpk-surface-highlight-day" 
          borderRadius="bpk-spacing-md" 
          border="1px solid" 
          borderColor="bpk-line-day"
        >
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.heading5} mb="bpk-spacing-sm">
            Highlight Card
          </BpkText>
          <BpkText color="bpk-text-secondary-day" textStyle={TEXT_STYLES.bodyDefault} mb="bpk-spacing-base">
            This card uses surface-highlight background.
          </BpkText>
          <BpkBox 
            p="bpk-spacing-base" 
            bg="bpk-canvas-contrast-day" 
            borderRadius="bpk-spacing-md"
            border="1px solid"
            borderColor="bpk-line-day"
            mt="bpk-spacing-base"
          >
            <BpkText color="bpk-text-link-day" textStyle={TEXT_STYLES.label1} textAlign="center">
              Secondary Action
            </BpkText>
          </BpkBox>
        </BpkBox>
      </BpkGrid>

      {/* Background Color Showcase */}
      <BpkBox mt="bpk-spacing-lg" mb="bpk-spacing-base">
        <BpkText textStyle={TEXT_STYLES.heading5} mb="bpk-spacing-sm">
          Background Color Variations
        </BpkText>
        <BpkText color="bpk-text-secondary-day" textStyle={TEXT_STYLES.bodyDefault}>
          Different background colors with appropriate text colors
        </BpkText>
      </BpkBox>

      <BpkGrid templateColumns="repeat(2, 1fr)" gap="bpk-spacing-base">
        <BpkBox 
          p="bpk-spacing-lg" 
          bg="bpk-canvas-day" 
          borderRadius="bpk-spacing-md"
          border="1px solid"
          borderColor="bpk-line-day"
        >
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.heading5} mb="bpk-spacing-sm">
            Canvas Background
          </BpkText>
          <BpkText color="bpk-text-secondary-day" textStyle={TEXT_STYLES.bodyDefault}>
            Using bpk-canvas-day background with primary and secondary text colors.
          </BpkText>
        </BpkBox>

        <BpkBox 
          p="bpk-spacing-lg" 
          bg="bpk-canvas-contrast-day" 
          borderRadius="bpk-spacing-md"
          border="1px solid"
          borderColor="bpk-line-day"
        >
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.heading5} mb="bpk-spacing-sm">
            Canvas Contrast
          </BpkText>
          <BpkText color="bpk-text-secondary-day" textStyle={TEXT_STYLES.bodyDefault}>
            Using bpk-canvas-contrast-day for subtle contrast.
          </BpkText>
        </BpkBox>

        <BpkBox 
          p="bpk-spacing-lg" 
          bg="bpk-surface-default-day" 
          borderRadius="bpk-spacing-md"
          border="1px solid"
          borderColor="bpk-line-day"
        >
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.heading5} mb="bpk-spacing-sm">
            Surface Default
          </BpkText>
          <BpkText color="bpk-text-secondary-day" textStyle={TEXT_STYLES.bodyDefault}>
            Using bpk-surface-default-day background.
          </BpkText>
        </BpkBox>

        <BpkBox 
          p="bpk-spacing-lg" 
          bg="bpk-surface-elevated-day" 
          borderRadius="bpk-spacing-md"
          border="1px solid"
          borderColor="bpk-line-day"
        >
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.heading5} mb="bpk-spacing-sm">
            Surface Elevated
          </BpkText>
          <BpkText color="bpk-text-secondary-day" textStyle={TEXT_STYLES.bodyDefault}>
            Using bpk-surface-elevated-day for elevated surfaces.
          </BpkText>
        </BpkBox>
      </BpkGrid>

      {/* Brand Background Colors */}
      <BpkBox mt="bpk-spacing-lg" mb="bpk-spacing-base">
        <BpkText textStyle={TEXT_STYLES.heading5} mb="bpk-spacing-sm">
          Brand Background Colors
        </BpkText>
        <BpkText color="bpk-text-secondary-day" textStyle={TEXT_STYLES.bodyDefault}>
          Brand colors with white text for contrast
        </BpkText>
      </BpkBox>

      <BpkHStack spacing="bpk-spacing-base">
        <BpkBox 
          p="bpk-spacing-lg" 
          bg="bpk-core-primary-day" 
          borderRadius="bpk-spacing-md"
          flex="1"
        >
          <BpkText color="white" textStyle={TEXT_STYLES.heading5} mb="bpk-spacing-sm" textAlign="center">
            Core Primary
          </BpkText>
          <BpkText color="white" textStyle={TEXT_STYLES.bodyDefault} textAlign="center" style={{ opacity: 0.9 }}>
            Primary brand color background
          </BpkText>
        </BpkBox>

        <BpkBox 
          p="bpk-spacing-lg" 
          bg="bpk-core-accent-day" 
          borderRadius="bpk-spacing-md"
          flex="1"
        >
          <BpkText color="white" textStyle={TEXT_STYLES.heading5} mb="bpk-spacing-sm" textAlign="center">
            Core Accent
          </BpkText>
          <BpkText color="white" textStyle={TEXT_STYLES.bodyDefault} textAlign="center" style={{ opacity: 0.9 }}>
            Accent brand color background
          </BpkText>
        </BpkBox>
      </BpkHStack>

      {/* Nested Background Examples */}
      <BpkBox mt="bpk-spacing-lg" mb="bpk-spacing-base">
        <BpkText textStyle={TEXT_STYLES.heading5} mb="bpk-spacing-sm">
          Nested Background Combinations
        </BpkText>
        <BpkText color="bpk-text-secondary-day" textStyle={TEXT_STYLES.bodyDefault}>
          Multiple background layers with different colors
        </BpkText>
      </BpkBox>

      <BpkBox 
        p="bpk-spacing-lg" 
        bg="bpk-canvas-day" 
        borderRadius="bpk-spacing-md"
        border="1px solid"
        borderColor="bpk-line-day"
      >
        <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.heading5} mb="bpk-spacing-base">
          Outer Container (Canvas)
        </BpkText>
        
        <BpkHStack spacing="bpk-spacing-base" mb="bpk-spacing-base">
          <BpkBox 
            p="bpk-spacing-base" 
            bg="bpk-surface-highlight-day" 
            borderRadius="bpk-spacing-md"
            flex="1"
          >
            <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1} textAlign="center">
              Highlight
            </BpkText>
          </BpkBox>
          
          <BpkBox 
            p="bpk-spacing-base" 
            bg="bpk-surface-elevated-day" 
            borderRadius="bpk-spacing-md"
            flex="1"
          >
            <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1} textAlign="center">
              Elevated
            </BpkText>
          </BpkBox>
        </BpkHStack>

        <BpkBox 
          p="bpk-spacing-base" 
          bg="bpk-core-primary-day" 
          borderRadius="bpk-spacing-md"
        >
          <BpkText color="white" textStyle={TEXT_STYLES.label1} textAlign="center">
            Brand Color Nested
          </BpkText>
        </BpkBox>
      </BpkBox>
    </BpkVStack>
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
        <BpkFlex align="center" justify="center" gap="bpk-spacing-base" minH="100px" bg="bpk-canvas-contrast-day" p="bpk-spacing-base" borderRadius="bpk-spacing-md">
          <DemoItem color="blue.200">Centered</DemoItem>
        </BpkFlex>
      </div>
      <div>
        <BpkBox mb={2}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Space between
          </BpkText>
        </BpkBox>
        <BpkFlex justify="space-between" gap="bpk-spacing-base" bg="bpk-canvas-contrast-day" p="bpk-spacing-base" borderRadius="bpk-spacing-md">
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
        <BpkFlex justify="space-around" gap="bpk-spacing-base" bg="bpk-canvas-contrast-day" p="bpk-spacing-base" borderRadius="bpk-spacing-md">
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

// Backpack Token Examples
export const BpkSpacingTokenExample = () => (
  <BpkProvider>
    <BpkStack spacing="bpk-spacing-base">
      <BpkBox mb="bpk-spacing-base">
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Backpack Spacing Tokens
        </BpkText>
      </BpkBox>
      
      <BpkVStack spacing="bpk-spacing-sm">
        <BpkBox p="bpk-spacing-sm" bg="gray.100" borderRadius="md">
          <BpkText>Small spacing (bpk-spacing-sm)</BpkText>
        </BpkBox>
        <BpkBox p="bpk-spacing-base" bg="gray.100" borderRadius="md">
          <BpkText>Base spacing (bpk-spacing-base)</BpkText>
        </BpkBox>
        <BpkBox p="bpk-spacing-md" bg="gray.100" borderRadius="md">
          <BpkText>Medium spacing (bpk-spacing-md)</BpkText>
        </BpkBox>
        <BpkBox p="bpk-spacing-lg" bg="gray.100" borderRadius="md">
          <BpkText>Large spacing (bpk-spacing-lg)</BpkText>
        </BpkBox>
        <BpkBox p="bpk-spacing-xl" bg="gray.100" borderRadius="md">
          <BpkText>Extra large spacing (bpk-spacing-xl)</BpkText>
        </BpkBox>
      </BpkVStack>

      <BpkBox mt="bpk-spacing-base" p="bpk-spacing-base" bg="blue.50" borderRadius="md">
        <BpkText textStyle={TEXT_STYLES.label1} mb="bpk-spacing-sm">
          Spacing with percentages (50% width):
        </BpkText>
        <BpkBox width="50%" p="bpk-spacing-base" bg="blue.200" borderRadius="md">
          <BpkText>50% width container</BpkText>
        </BpkBox>
      </BpkBox>
    </BpkStack>
  </BpkProvider>
);

export const BpkColorTokenExample = () => (
  <BpkProvider>
    <BpkStack spacing="bpk-spacing-base">
      <BpkBox mb="bpk-spacing-base">
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Backpack Color Tokens
        </BpkText>
      </BpkBox>

      <BpkGrid templateColumns="repeat(2, 1fr)" gap="bpk-spacing-base">
        {/* Text Colors */}
        <BpkBox p="bpk-spacing-base" bg="bpk-canvas-day" borderRadius="bpk-spacing-md" border="1px solid" borderColor="bpk-line-day">
          <BpkText color="bpk-text-primary-day" mb="bpk-spacing-sm" textStyle={TEXT_STYLES.label1}>
            Text Primary
          </BpkText>
          <BpkText color="bpk-text-secondary-day" textStyle={TEXT_STYLES.bodyDefault}>
            Text Secondary
          </BpkText>
        </BpkBox>

        <BpkBox p="bpk-spacing-base" bg="bpk-canvas-day" borderRadius="bpk-spacing-md" border="1px solid" borderColor="bpk-line-day">
          <BpkText color="bpk-text-link-day" mb="bpk-spacing-sm" textStyle={TEXT_STYLES.label1}>
            Text Link
          </BpkText>
          <BpkText color="bpk-text-error-day" textStyle={TEXT_STYLES.bodyDefault}>
            Text Error
          </BpkText>
        </BpkBox>

        {/* Background Colors */}
        <BpkBox p="bpk-spacing-base" bg="bpk-surface-highlight-day" borderRadius="md" border="1px solid" borderColor="bpk-line-day">
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1}>
            Surface Highlight
          </BpkText>
        </BpkBox>

        <BpkBox p="bpk-spacing-base" bg="bpk-surface-elevated-day" borderRadius="md" border="1px solid" borderColor="bpk-line-day">
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1}>
            Surface Elevated
          </BpkText>
        </BpkBox>

        {/* Brand Colors */}
        <BpkBox p="bpk-spacing-base" bg="bpk-core-primary-day" borderRadius="md">
          <BpkText color="white" textStyle={TEXT_STYLES.label1}>
            Core Primary
          </BpkText>
        </BpkBox>

        <BpkBox p="bpk-spacing-base" bg="bpk-core-accent-day" borderRadius="md">
          <BpkText color="white" textStyle={TEXT_STYLES.label1}>
            Core Accent
          </BpkText>
        </BpkBox>
      </BpkGrid>
    </BpkStack>
  </BpkProvider>
);

export const BpkTokenCombinedExample = () => (
  <BpkProvider>
    <BpkStack spacing="bpk-spacing-lg">
      <BpkBox mb="bpk-spacing-base">
        <BpkText textStyle={TEXT_STYLES.heading4}>
          Combined Backpack Tokens
        </BpkText>
        <BpkText textStyle={TEXT_STYLES.bodyDefault} color="bpk-text-secondary-day" mt="bpk-spacing-sm">
          Using Backpack spacing and color tokens together
        </BpkText>
      </BpkBox>

      <BpkBox 
        p="bpk-spacing-lg" 
        bg="bpk-surface-elevated-day" 
        borderRadius="md"
        border="1px solid"
        borderColor="bpk-line-day"
      >
        <BpkText textStyle={TEXT_STYLES.heading5} color="bpk-text-primary-day" mb="bpk-spacing-base">
          Card with Backpack Tokens
        </BpkText>
        <BpkText textStyle={TEXT_STYLES.bodyDefault} color="bpk-text-secondary-day" mb="bpk-spacing-base">
          This card uses Backpack spacing tokens for padding and margins, and Backpack color tokens for background and text colors.
        </BpkText>
        <BpkFlex gap="bpk-spacing-base" mt="bpk-spacing-base">
          <BpkBox 
            p="bpk-spacing-base" 
            bg="bpk-core-primary-day" 
            borderRadius="bpk-spacing-md"
            flex="1"
          >
            <BpkText color="white" textStyle={TEXT_STYLES.label1} textAlign="center">
              Primary Action
            </BpkText>
          </BpkBox>
          <BpkBox 
            p="bpk-spacing-base" 
            bg="bpk-canvas-contrast-day" 
            borderRadius="bpk-spacing-md"
            border="1px solid"
            borderColor="bpk-line-day"
            flex="1"
          >
            <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1} textAlign="center">
              Secondary Action
            </BpkText>
          </BpkBox>
        </BpkFlex>
      </BpkBox>

      <BpkGrid templateColumns="repeat(3, 1fr)" gap="bpk-spacing-base">
        <BpkBox 
          p="bpk-spacing-md" 
          bg="bpk-surface-highlight-day" 
          borderRadius="bpk-spacing-md"
          border="1px solid"
          borderColor="bpk-line-day"
        >
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1} mb="bpk-spacing-sm">
            Item 1
          </BpkText>
          <BpkText color="bpk-text-secondary-day" textStyle={TEXT_STYLES.caption}>
            Using bpk-spacing-md
          </BpkText>
        </BpkBox>
        <BpkBox 
          p="bpk-spacing-md" 
          bg="bpk-surface-highlight-day" 
          borderRadius="bpk-spacing-md"
          border="1px solid"
          borderColor="bpk-line-day"
        >
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1} mb="bpk-spacing-sm">
            Item 2
          </BpkText>
          <BpkText color="bpk-text-secondary-day" textStyle={TEXT_STYLES.caption}>
            Using bpk-spacing-md
          </BpkText>
        </BpkBox>
        <BpkBox 
          p="bpk-spacing-md" 
          bg="bpk-surface-highlight-day" 
          borderRadius="bpk-spacing-md"
          border="1px solid"
          borderColor="bpk-line-day"
        >
          <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.label1} mb="bpk-spacing-sm">
            Item 3
          </BpkText>
          <BpkText color="bpk-text-secondary-day" textStyle={TEXT_STYLES.caption}>
            Using bpk-spacing-md
          </BpkText>
        </BpkBox>
      </BpkGrid>
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

