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

import { BpkBox, BpkContainer } from '../../packages/bpk-component-layout';

import { Wrapper } from './Wrapper';

/**
 * BpkContainer Examples
 *
 * BpkContainer is a layout component that constrains content width and centers it.
 * Useful for creating readable content areas with maximum widths.
 */

export const Default = () => (
  <Wrapper>
    <BpkContainer maxW="800px" padding="base" bg="canvas-contrast" borderRadius="md">
      <BpkBox padding="base" bg="surface-highlight" borderRadius="md">
        Container with max width of 800px
      </BpkBox>
    </BpkContainer>
  </Wrapper>
);

export const CenterContent = () => (
  <Wrapper>
    <BpkContainer centerContent maxW="600px" padding="base" bg="canvas-contrast" borderRadius="md">
      <BpkBox padding="base" bg="surface-highlight" borderRadius="md" width="200px">
        Centered content in container
      </BpkBox>
    </BpkContainer>
  </Wrapper>
);

