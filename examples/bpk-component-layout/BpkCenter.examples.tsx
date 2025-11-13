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

import { BpkBox, BpkCenter } from '../../packages/bpk-component-layout';

import { Wrapper } from './Wrapper';

/**
 * BpkCenter Examples
 *
 * BpkCenter is a layout component that centers its children both horizontally and vertically.
 * It uses flexbox with align-items and justify-content set to center.
 */

export const Default = () => (
  <Wrapper>
    <BpkCenter height="200px" bg="canvas-contrast" borderRadius="md">
      <BpkBox padding="base" bg="surface-highlight" borderRadius="md">
        Centered content
      </BpkBox>
    </BpkCenter>
  </Wrapper>
);

export const Responsive = () => (
  <Wrapper>
    <BpkCenter
      height={{ base: '150px', desktop: '200px' }}
      padding="base"
      bg="canvas-contrast"
      borderRadius="md"
    >
      <BpkBox padding="base" bg="surface-highlight" borderRadius="md">
        Responsive centered content
      </BpkBox>
    </BpkCenter>
  </Wrapper>
);

