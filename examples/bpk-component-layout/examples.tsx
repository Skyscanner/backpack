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

import type { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import BpkBox from '../../packages/bpk-component-layout';

import STYLES from './examples.module.scss';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <ChakraProvider>
    <div className={STYLES['bpk-layout-examples--wrapper']}>
      {children}
    </div>
  </ChakraProvider>
);

export const DefaultExample = () => (
  <Wrapper>
    <BpkBox>
      Default BpkBox with no props. This is a simple container.
    </BpkBox>
  </Wrapper>
);

export const WithPaddingExample = () => (
  <Wrapper>
    <BpkBox padding={4} bg="gray.100">
      BpkBox with padding and background color
    </BpkBox>
  </Wrapper>
);

export const WithMarginExample = () => (
  <Wrapper>
    <BpkBox margin={4} padding={4} bg="blue.100" border="1px solid" borderColor="blue.300">
      BpkBox with margin, padding, background, and border
    </BpkBox>
  </Wrapper>
);

export const FlexboxExample = () => (
  <Wrapper>
    <BpkBox display="flex" gap={4} padding={4} bg="gray.50">
      <BpkBox flex={1} padding={4} bg="blue.100" borderRadius="md">
        Flex item 1
      </BpkBox>
      <BpkBox flex={1} padding={4} bg="green.100" borderRadius="md">
        Flex item 2
      </BpkBox>
      <BpkBox flex={1} padding={4} bg="purple.100" borderRadius="md">
        Flex item 3
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

export const FlexboxColumnExample = () => (
  <Wrapper>
    <BpkBox display="flex" flexDirection="column" gap={4} padding={4} bg="gray.50">
      <BpkBox padding={4} bg="blue.100" borderRadius="md">
        Column item 1
      </BpkBox>
      <BpkBox padding={4} bg="green.100" borderRadius="md">
        Column item 2
      </BpkBox>
      <BpkBox padding={4} bg="purple.100" borderRadius="md">
        Column item 3
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

export const GridExample = () => (
  <Wrapper>
    <BpkBox
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      gap={4}
      padding={4}
      bg="gray.50"
    >
      <BpkBox padding={4} bg="red.100" borderRadius="md">
        Grid item 1
      </BpkBox>
      <BpkBox padding={4} bg="orange.100" borderRadius="md">
        Grid item 2
      </BpkBox>
      <BpkBox padding={4} bg="yellow.100" borderRadius="md">
        Grid item 3
      </BpkBox>
      <BpkBox padding={4} bg="green.100" borderRadius="md">
        Grid item 4
      </BpkBox>
      <BpkBox padding={4} bg="blue.100" borderRadius="md">
        Grid item 5
      </BpkBox>
      <BpkBox padding={4} bg="purple.100" borderRadius="md">
        Grid item 6
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

export const WidthHeightExample = () => (
  <Wrapper>
    <BpkBox width="300px" height="200px" padding={4} bg="teal.100" borderRadius="md">
      Fixed width (300px) and height (200px)
    </BpkBox>
  </Wrapper>
);

export const ResponsiveExample = () => (
  <Wrapper>
    <BpkBox
      width={{ base: '100%', md: '50%', lg: '33%' }}
      padding={4}
      bg="pink.100"
      borderRadius="md"
    >
      Responsive width: 100% on mobile, 50% on tablet, 33% on desktop
    </BpkBox>
  </Wrapper>
);

export const SemanticHTMLElementExample = () => (
  <Wrapper>
    <BpkBox as="section" padding={4} bg="gray.100" borderRadius="md">
      <BpkBox as="h2" fontSize="xl" fontWeight="bold" marginBottom={2}>
        Section Title
      </BpkBox>
      <BpkBox as="p">
        This BpkBox is rendered as a section element, and the title is an h2.
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

export const CenteredContentExample = () => (
  <Wrapper>
    <BpkBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="200px"
      bg="gray.100"
      borderRadius="md"
    >
      Centered content
    </BpkBox>
  </Wrapper>
);

export const ShadowExample = () => (
  <Wrapper>
    <BpkBox
      padding={6}
      bg="white"
      borderRadius="md"
      boxShadow="lg"
      margin={4}
    >
      BpkBox with shadow and rounded corners
    </BpkBox>
  </Wrapper>
);

export const BorderExample = () => (
  <Wrapper>
    <BpkBox
      padding={4}
      border="2px solid"
      borderColor="blue.500"
      borderRadius="lg"
      bg="blue.50"
    >
      BpkBox with custom border
    </BpkBox>
  </Wrapper>
);

export const MixedExample = () => (
  <Wrapper>
    <BpkBox marginBottom={4}>
      <BpkBox as="h2" fontSize="2xl" fontWeight="bold" marginBottom={4}>
        Mixed Layout Examples
      </BpkBox>

      <BpkBox display="flex" gap={4} marginBottom={4}>
        <BpkBox flex={1} padding={4} bg="blue.100" borderRadius="md">
          Flex item with custom className
        </BpkBox>
        <BpkBox flex={1} padding={4} bg="green.100" borderRadius="md">
          Another flex item
        </BpkBox>
      </BpkBox>

      <BpkBox
        display="grid"
        gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        gap={4}
        marginBottom={4}
      >
        <BpkBox padding={4} bg="purple.100" borderRadius="md">
          Grid item 1
        </BpkBox>
        <BpkBox padding={4} bg="orange.100" borderRadius="md">
          Grid item 2
        </BpkBox>
      </BpkBox>

      <BpkBox
        padding={4}
        bg="gray.50"
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
      >
        A box with padding, background, border, and rounded corners
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

