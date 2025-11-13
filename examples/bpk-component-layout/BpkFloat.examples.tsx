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

import { BpkBox, BpkFloat } from '../../packages/bpk-component-layout';

import { Wrapper } from './Wrapper';

/**
 * BpkFloat Examples
 *
 * BpkFloat is a component that uses CSS float to position elements.
 * Useful for creating magazine-style layouts where content wraps around floated elements.
 */

export const Left = () => (
  <Wrapper>
    <BpkBox padding="base" bg="canvas-contrast" borderRadius="md">
      <BpkFloat float="left" padding="base" bg="surface-highlight" borderRadius="md" marginRight="base" marginBottom="base">
        Float left
      </BpkFloat>
      <BpkBox>
        This text wraps around the floated element. The floated element is positioned to the left,
        and the text flows around it. This is useful for creating magazine-style layouts where
        images or other elements are positioned within flowing text content.
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

export const Right = () => (
  <Wrapper>
    <BpkBox padding="base" bg="canvas-contrast" borderRadius="md">
      <BpkFloat float="right" padding="base" bg="surface-highlight" borderRadius="md" marginLeft="base" marginBottom="base">
        Float right
      </BpkFloat>
      <BpkBox>
        This text wraps around the floated element. The floated element is positioned to the right,
        and the text flows around it. This demonstrates how float can be used to create
        interesting text layouts with embedded elements.
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

