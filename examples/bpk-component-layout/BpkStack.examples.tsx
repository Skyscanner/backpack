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

import { BpkBox, BpkStack } from '../../packages/bpk-component-layout';

import { Wrapper } from './Wrapper';

/**
 * BpkStack Examples
 *
 * BpkStack is a layout component that stacks children vertically or horizontally
 * with consistent spacing between them.
 */

export const Default = () => (
  <Wrapper>
    <BpkStack spacing="base" padding="base" bg="canvas-contrast" borderRadius="md">
      <BpkBox padding="base" bg="surface-highlight" borderRadius="md">
        Stack item 1
      </BpkBox>
      <BpkBox padding="base" bg="surface-default" borderRadius="md">
        Stack item 2
      </BpkBox>
      <BpkBox padding="base" bg="surface-elevated" borderRadius="md">
        Stack item 3
      </BpkBox>
    </BpkStack>
  </Wrapper>
);

export const Row = () => (
  <Wrapper>
    <BpkStack direction="row" spacing="base" padding="base" bg="canvas-contrast" borderRadius="md">
      <BpkBox padding="base" bg="surface-highlight" borderRadius="md">
        Row item 1
      </BpkBox>
      <BpkBox padding="base" bg="surface-default" borderRadius="md">
        Row item 2
      </BpkBox>
      <BpkBox padding="base" bg="surface-elevated" borderRadius="md">
        Row item 3
      </BpkBox>
    </BpkStack>
  </Wrapper>
);

export const Responsive = () => (
  <Wrapper>
    <BpkStack
      direction={{ base: 'column', mobile: 'row' }}
      spacing={{ base: 'sm', desktop: 'lg' }}
      padding="base"
      bg="canvas-contrast"
      borderRadius="md"
    >
      <BpkBox padding="base" bg="surface-highlight" borderRadius="md">
        Responsive stack item 1
      </BpkBox>
      <BpkBox padding="base" bg="surface-default" borderRadius="md">
        Responsive stack item 2
      </BpkBox>
    </BpkStack>
  </Wrapper>
);

