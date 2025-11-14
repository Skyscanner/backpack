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

import { BpkBox, BpkFlex } from '../../packages/bpk-component-layout';

import Wrapper from './Wrapper';

/**
 * BpkFlex Examples
 *
 * BpkFlex is a layout component that provides a flexbox container.
 * It's a convenience component that sets display="flex" by default.
 */

export const Default = () => (
  <Wrapper>
    <BpkFlex gap="base" padding="base" bg="canvas-contrast" borderRadius="md">
      <BpkBox flex={1} padding="base" bg="surface-highlight" borderRadius="md">
        Flex item 1
      </BpkBox>
      <BpkBox flex={1} padding="base" bg="surface-default" borderRadius="md">
        Flex item 2
      </BpkBox>
      <BpkBox flex={1} padding="base" bg="surface-elevated" borderRadius="md">
        Flex item 3
      </BpkBox>
    </BpkFlex>
  </Wrapper>
);

export const Column = () => (
  <Wrapper>
    <BpkFlex flexDirection="column" gap="base" padding="base" bg="canvas-contrast" borderRadius="md">
      <BpkBox padding="base" bg="surface-highlight" borderRadius="md">
        Column item 1
      </BpkBox>
      <BpkBox padding="base" bg="surface-default" borderRadius="md">
        Column item 2
      </BpkBox>
      <BpkBox padding="base" bg="surface-elevated" borderRadius="md">
        Column item 3
      </BpkBox>
    </BpkFlex>
  </Wrapper>
);

export const Responsive = () => (
  <Wrapper>
    <BpkFlex
      flexDirection={{ base: 'column', mobile: 'row' }}
      gap={{ base: 'sm', desktop: 'lg' }}
      padding="base"
      bg="canvas-contrast"
      borderRadius="md"
    >
      <BpkBox flex={1} padding="base" bg="surface-highlight" borderRadius="md">
        Responsive flex item 1
      </BpkBox>
      <BpkBox flex={1} padding="base" bg="surface-default" borderRadius="md">
        Responsive flex item 2
      </BpkBox>
    </BpkFlex>
  </Wrapper>
);

export const Shorthand = () => (
  <Wrapper>
    <BpkFlex
      align="center"
      justify="space-between"
      wrap="wrap"
      direction="row"
      gap="base"
      padding="base"
      bg="canvas-contrast"
      borderRadius="md"
    >
      <BpkBox padding="base" bg="surface-highlight" borderRadius="md">
        Using shorthand: align, justify, wrap, direction
      </BpkBox>
      <BpkBox padding="base" bg="surface-default" borderRadius="md">
        Flex item 2
      </BpkBox>
    </BpkFlex>
  </Wrapper>
);

