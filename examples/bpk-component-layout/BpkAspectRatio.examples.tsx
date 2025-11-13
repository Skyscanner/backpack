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

import { BpkBox, BpkAspectRatio } from '../../packages/bpk-component-layout';

import { Wrapper } from './Wrapper';

/**
 * BpkAspectRatio Examples
 *
 * BpkAspectRatio is a component that maintains a specific aspect ratio for its children.
 * Useful for images, videos, and other media that need consistent proportions.
 */

export const Default = () => (
  <Wrapper>
    <BpkAspectRatio ratio={16 / 9} padding="base" bg="canvas-contrast" borderRadius="md">
      <BpkBox
        width="100%"
        height="100%"
        bg="surface-highlight"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="text-primary"
      >
        16:9 Aspect Ratio
      </BpkBox>
    </BpkAspectRatio>
  </Wrapper>
);

export const Square = () => (
  <Wrapper>
    <BpkAspectRatio ratio={1} padding="base" bg="canvas-contrast" borderRadius="md">
      <BpkBox
        width="100%"
        height="100%"
        bg="surface-highlight"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="text-primary"
      >
        1:1 Square
      </BpkBox>
    </BpkAspectRatio>
  </Wrapper>
);

export const Responsive = () => (
  <Wrapper>
    <BpkAspectRatio
      ratio={{ base: 1, desktop: 16 / 9 }}
      padding="base"
      bg="canvas-contrast"
      borderRadius="md"
    >
      <BpkBox
        width="100%"
        height="100%"
        bg="surface-highlight"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="text-primary"
      >
        Responsive aspect ratio
      </BpkBox>
    </BpkAspectRatio>
  </Wrapper>
);

