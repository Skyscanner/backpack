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

import { BpkBox, BpkGroup, BPK_COLOR_TOKENS } from '../../packages/bpk-component-layout';

import Wrapper from './Wrapper';

/**
 * BpkGroup Examples
 *
 * BpkGroup is a layout component that groups related elements together.
 * It uses flexbox with a small gap by default, perfect for button groups, tags, etc.
 */

export const Default = () => (
  <Wrapper>
    <BpkGroup gap="sm" padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md">
      <BpkBox padding="sm" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        Group item 1
      </BpkBox>
      <BpkBox padding="sm" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        Group item 2
      </BpkBox>
      <BpkBox padding="sm" bg={BPK_COLOR_TOKENS.surfaceElevated} borderRadius="md">
        Group item 3
      </BpkBox>
    </BpkGroup>
  </Wrapper>
);

export const Responsive = () => (
  <Wrapper>
    <BpkGroup
      gap={{ base: 'sm', desktop: 'base' }}
      padding="base"
      bg={BPK_COLOR_TOKENS.canvasContrast}
      borderRadius="md"
    >
      <BpkBox padding="sm" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        Responsive group item 1
      </BpkBox>
      <BpkBox padding="sm" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        Responsive group item 2
      </BpkBox>
      <BpkBox padding="sm" bg={BPK_COLOR_TOKENS.surfaceElevated} borderRadius="md">
        Responsive group item 3
      </BpkBox>
    </BpkGroup>
  </Wrapper>
);

