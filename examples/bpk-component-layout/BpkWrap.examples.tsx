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

import { BpkBox, BpkWrap, BPK_COLOR_TOKENS } from '../../packages/bpk-component-layout';

import Wrapper from './Wrapper';

/**
 * BpkWrap Examples
 *
 * BpkWrap is a layout component that wraps its children to a new line when they don't fit.
 * It's useful for creating flexible layouts that adapt to container width.
 */

export const Default = () => (
  <Wrapper>
    <BpkWrap spacing="base" padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md">
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md" minWidth="200px">
        Wrap item 1
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md" minWidth="200px">
        Wrap item 2
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceElevated} borderRadius="md" minWidth="200px">
        Wrap item 3
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.statusSuccessFill} borderRadius="md" minWidth="200px">
        Wrap item 4
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.statusWarningFill} borderRadius="md" minWidth="200px">
        Wrap item 5
      </BpkBox>
    </BpkWrap>
  </Wrapper>
);

export const Responsive = () => (
  <Wrapper>
    <BpkWrap
      spacing={{ smallMobile: 'sm', desktop: 'lg' }}
      padding="base"
      bg={BPK_COLOR_TOKENS.canvasContrast}
      borderRadius="md"
    >
      <BpkBox
        padding="base"
        bg={BPK_COLOR_TOKENS.surfaceHighlight}
        borderRadius="md"
        minWidth="150px"
        maxWidth="100%"
        overflow="hidden"
      >
        Responsive wrap item 1
      </BpkBox>
      <BpkBox
        padding="base"
        bg={BPK_COLOR_TOKENS.surfaceDefault}
        borderRadius="md"
        minWidth="150px"
        maxWidth="100%"
        overflow="hidden"
      >
        Responsive wrap item 2
      </BpkBox>
      <BpkBox
        padding="base"
        bg={BPK_COLOR_TOKENS.surfaceElevated}
        borderRadius="md"
        minWidth="150px"
        maxWidth="100%"
        overflow="hidden"
      >
        Responsive wrap item 3
      </BpkBox>
    </BpkWrap>
  </Wrapper>
);

