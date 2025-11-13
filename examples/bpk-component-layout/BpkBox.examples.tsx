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

import { BpkBox } from '../../packages/bpk-component-layout';

import { Wrapper } from './Wrapper';

/**
 * BpkBox Examples
 *
 * BpkBox is a versatile layout component that provides a flexible container.
 * It supports all common layout properties including spacing, colors, borders, shadows, and more.
 */

export const Default = () => (
  <Wrapper>
    <BpkBox>
      Default BpkBox with no props. This is a simple container.
    </BpkBox>
  </Wrapper>
);

export const WithPadding = () => (
  <Wrapper>
    <BpkBox padding="base" bg="canvas-contrast">
      BpkBox with Backpack spacing token: padding=&quot;base&quot; (1rem / 16px)
    </BpkBox>
  </Wrapper>
);

export const WithMargin = () => (
  <Wrapper>
    <BpkBox margin="base" padding="base" bg="surface-highlight" border="1px solid" borderColor="line">
      BpkBox with Backpack spacing tokens: margin=&quot;base&quot; and padding=&quot;base&quot;
    </BpkBox>
  </Wrapper>
);

export const Flexbox = () => (
  <Wrapper>
    <BpkBox display="flex" gap="base" padding="base" bg="canvas-contrast">
      <BpkBox flex={1} padding="base" bg="surface-highlight" borderRadius="md">
        Flex item 1
      </BpkBox>
      <BpkBox flex={1} padding="base" bg="surface-default" borderRadius="md">
        Flex item 2
      </BpkBox>
      <BpkBox flex={1} padding="base" bg="surface-elevated" borderRadius="md">
        Flex item 3
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

export const FlexboxColumn = () => (
  <Wrapper>
    <BpkBox display="flex" flexDirection="column" gap="base" padding="base" bg="canvas-contrast">
      <BpkBox padding="base" bg="surface-highlight" borderRadius="md">
        Column item 1
      </BpkBox>
      <BpkBox padding="base" bg="surface-default" borderRadius="md">
        Column item 2
      </BpkBox>
      <BpkBox padding="base" bg="surface-elevated" borderRadius="md">
        Column item 3
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

export const Grid = () => (
  <Wrapper>
    <BpkBox
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      gap="base"
      padding="base"
      bg="canvas-contrast"
    >
      <BpkBox padding="base" bg="surface-highlight" borderRadius="md">
        Grid item 1
      </BpkBox>
      <BpkBox padding="base" bg="surface-default" borderRadius="md">
        Grid item 2
      </BpkBox>
      <BpkBox padding="base" bg="surface-elevated" borderRadius="md">
        Grid item 3
      </BpkBox>
      <BpkBox padding="base" bg="status-success-fill" borderRadius="md">
        Grid item 4
      </BpkBox>
      <BpkBox padding="base" bg="status-warning-fill" borderRadius="md">
        Grid item 5
      </BpkBox>
      <BpkBox padding="base" bg="status-error-fill" borderRadius="md">
        Grid item 6
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

export const WidthHeight = () => (
  <Wrapper>
    <BpkBox width="300px" height="200px" padding="base" bg="surface-highlight" borderRadius="md">
      Fixed width (300px) and height (200px)
    </BpkBox>
  </Wrapper>
);

export const Responsive = () => (
  <Wrapper>
    <BpkBox
      width={{
        base: '100%',
        mobile: '50%',
        desktop: '33%',
      }}
      padding="base"
      bg="surface-highlight"
      borderRadius="md"
    >
      Responsive width using Backpack breakpoint tokens: 100% base, 50% mobile, 33% desktop
    </BpkBox>
  </Wrapper>
);

export const ColorTokens = () => (
  <Wrapper>
    <BpkBox padding="base" bg="canvas-contrast" borderColor="line" borderWidth="1px" borderRadius="md" marginBottom="base">
      <BpkBox color="text-primary" marginBottom="sm">
        Using Backpack color tokens: bg=&quot;canvas-contrast&quot;, color=&quot;text-primary&quot;
      </BpkBox>
      <BpkBox color="text-secondary" fontSize="sm">
        Secondary text color with Backpack token
      </BpkBox>
    </BpkBox>
    <BpkBox padding="base" bg="core-primary" color="text-on-dark" borderRadius="md" marginTop="base">
      Brand color example: bg=&quot;core-primary&quot;, color=&quot;text-on-dark&quot;
    </BpkBox>
  </Wrapper>
);

export const SemanticHTMLElement = () => (
  <Wrapper>
    <BpkBox as="section" padding="base" bg="canvas-contrast" borderRadius="md">
      <BpkBox as="h2" fontSize="xl" fontWeight="bold" marginBottom={2} color="text-primary">
        Section Title
      </BpkBox>
      <BpkBox as="p" color="text-secondary">
        This BpkBox is rendered as a section element, and the title is an h2.
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

export const CenteredContent = () => (
  <Wrapper>
    <BpkBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="200px"
      bg="canvas-contrast"
      borderRadius="md"
    >
      Centered content
    </BpkBox>
  </Wrapper>
);

export const Shadow = () => (
  <Wrapper>
    <BpkBox
      padding="lg"
      bg="canvas"
      borderRadius="md"
      boxShadow="lg"
      margin="base"
    >
      BpkBox with shadow and rounded corners
    </BpkBox>
  </Wrapper>
);

export const Border = () => (
  <Wrapper>
    <BpkBox
      padding="base"
      border="2px solid"
      borderColor="core-primary"
      borderRadius="lg"
      bg="surface-highlight"
    >
      BpkBox with custom border
    </BpkBox>
  </Wrapper>
);

export const Mixed = () => (
  <Wrapper>
    <BpkBox marginBottom={4}>
      <BpkBox as="h2" fontSize="2xl" fontWeight="bold" marginBottom={4}>
        Mixed Layout Examples
      </BpkBox>

      <BpkBox display="flex" gap="base" marginBottom="base">
        <BpkBox flex={1} padding="base" bg="surface-highlight" borderRadius="md">
          Flex item 1
        </BpkBox>
        <BpkBox flex={1} padding="base" bg="surface-default" borderRadius="md">
          Flex item 2
        </BpkBox>
      </BpkBox>

      <BpkBox
        display="grid"
        gridTemplateColumns={{ base: '1fr', mobile: 'repeat(2, 1fr)' }}
        gap="base"
        marginBottom="base"
      >
        <BpkBox padding="base" bg="surface-elevated" borderRadius="md">
          Grid item 1
        </BpkBox>
        <BpkBox padding="base" bg="surface-highlight" borderRadius="md">
          Grid item 2
        </BpkBox>
      </BpkBox>

      <BpkBox
        padding="base"
        bg="canvas-contrast"
        border="1px solid"
        borderColor="line"
        borderRadius="md"
      >
        A box with padding, background, border, and rounded corners
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

