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
 * BpkHStack Examples
 *
 * BpkHStack is a convenience component that arranges its children in a horizontal line.
 * It's equivalent to BpkStack with direction="row" but provides a more semantic API.
 */

export const Default = () => (
  <Wrapper>
    <BpkStack.HStack spacing="base" padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md">
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        HStack item 1
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        HStack item 2
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceElevated} borderRadius="md">
        HStack item 3
      </BpkBox>
    </BpkStack.HStack>
  </Wrapper>
);

export const WithAlignment = () => (
  <Wrapper>
    <BpkStack.HStack
      spacing="base"
      padding="base"
      align="center"
      justify="space-between"
      bg={BPK_COLOR_TOKENS.canvasContrast}
      borderRadius="md"
    >
      <BpkBox
        padding="base"
        bg={BPK_COLOR_TOKENS.surfaceHighlight}
        borderRadius="md"
        minWidth={0}
        overflow="hidden"
      >
        Left aligned
      </BpkBox>
      <BpkBox
        padding="base"
        bg={BPK_COLOR_TOKENS.surfaceDefault}
        borderRadius="md"
        minWidth={0}
        overflow="hidden"
      >
        Center aligned
      </BpkBox>
      <BpkBox
        padding="base"
        bg={BPK_COLOR_TOKENS.surfaceElevated}
        borderRadius="md"
        minWidth={0}
        overflow="hidden"
      >
        Right aligned
      </BpkBox>
    </BpkStack.HStack>
  </Wrapper>
);

export const WithDifferentSpacing = () => (
  <Wrapper>
    <BpkStack.HStack spacing="sm" padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md" marginBottom="base">
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        Small spacing
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        Small spacing
      </BpkBox>
    </BpkStack.HStack>
    <BpkStack.HStack spacing="lg" padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md">
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        Large spacing
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        Large spacing
      </BpkBox>
    </BpkStack.HStack>
  </Wrapper>
);

export const Responsive = () => (
  <Wrapper>
    <BpkStack.HStack
      spacing={{ smallMobile: 'sm', mobile: 'base', desktop: 'lg' }}
      padding="base"
      bg={BPK_COLOR_TOKENS.canvasContrast}
      borderRadius="md"
    >
      <BpkBox
        padding="base"
        bg={BPK_COLOR_TOKENS.surfaceHighlight}
        borderRadius="md"
        minWidth={0}
        overflow="hidden"
      >
        Responsive HStack item 1
      </BpkBox>
      <BpkBox
        padding="base"
        bg={BPK_COLOR_TOKENS.surfaceDefault}
        borderRadius="md"
        minWidth={0}
        overflow="hidden"
      >
        Responsive HStack item 2
      </BpkBox>
      <BpkBox
        padding="base"
        bg={BPK_COLOR_TOKENS.surfaceElevated}
        borderRadius="md"
        minWidth={0}
        overflow="hidden"
      >
        Responsive HStack item 3
      </BpkBox>
    </BpkStack.HStack>
  </Wrapper>
);

