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

import { BpkBox, BpkStack, BPK_COLOR_TOKENS } from '../../packages/bpk-component-layout';

import Wrapper from './Wrapper';

/**
 * BpkVStack Examples
 *
 * BpkVStack is a convenience component that arranges its children in a vertical line.
 * It's equivalent to BpkStack with direction="column" but provides a more semantic API.
 */

export const Default = () => (
  <Wrapper>
    <BpkStack.VStack spacing="base" padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md">
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        VStack item 1
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        VStack item 2
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceElevated} borderRadius="md">
        VStack item 3
      </BpkBox>
    </BpkStack.VStack>
  </Wrapper>
);

export const WithAlignment = () => (
  <Wrapper>
    <BpkStack.VStack
      spacing="base"
      padding="base"
      align="stretch"
      bg={BPK_COLOR_TOKENS.canvasContrast}
      borderRadius="md"
    >
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        Stretched item 1
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        Stretched item 2
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceElevated} borderRadius="md">
        Stretched item 3
      </BpkBox>
    </BpkStack.VStack>
  </Wrapper>
);

export const WithDifferentSpacing = () => (
  <Wrapper>
    <BpkStack.VStack spacing="sm" padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md" marginBottom="base">
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        Small spacing
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        Small spacing
      </BpkBox>
    </BpkStack.VStack>
    <BpkStack.VStack spacing="lg" padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md">
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        Large spacing
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        Large spacing
      </BpkBox>
    </BpkStack.VStack>
  </Wrapper>
);

export const Responsive = () => (
  <Wrapper>
    <BpkStack.VStack
      spacing={{ base: 'sm', mobile: 'base', desktop: 'lg' }}
      padding="base"
      bg={BPK_COLOR_TOKENS.canvasContrast}
      borderRadius="md"
    >
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        Responsive VStack item 1
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        Responsive VStack item 2
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceElevated} borderRadius="md">
        Responsive VStack item 3
      </BpkBox>
    </BpkStack.VStack>
  </Wrapper>
);

