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

import { BpkBox, BpkGrid, BPK_COLOR_TOKENS } from '../../packages/bpk-component-layout';

import Wrapper from './Wrapper';

/**
 * BpkGrid Examples
 *
 * BpkGrid is a layout component that provides a grid container.
 * It's a convenience component that sets display="grid" by default.
 */

export const Default = () => (
  <Wrapper>
    <BpkGrid
      gridTemplateColumns="repeat(3, 1fr)"
      gap="base"
      padding="base"
      bg={BPK_COLOR_TOKENS.canvasContrast}
      borderRadius="md"
    >
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        Grid item 1
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        Grid item 2
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceElevated} borderRadius="md">
        Grid item 3
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.statusSuccessFill} borderRadius="md">
        Grid item 4
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.statusWarningFill} borderRadius="md">
        Grid item 5
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.statusErrorFill} borderRadius="md">
        Grid item 6
      </BpkBox>
    </BpkGrid>
  </Wrapper>
);

export const Responsive = () => (
  <Wrapper>
    <BpkGrid
      gridTemplateColumns={{
        smallMobile: '1fr',
        mobile: 'repeat(2, 1fr)',
        desktop: 'repeat(3, 1fr)',
      }}
      gap={{ smallMobile: 'sm', desktop: 'lg' }}
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
        Responsive grid item 1
      </BpkBox>
      <BpkBox
        padding="base"
        bg={BPK_COLOR_TOKENS.surfaceDefault}
        borderRadius="md"
        minWidth={0}
        overflow="hidden"
      >
        Responsive grid item 2
      </BpkBox>
      <BpkBox
        padding="base"
        bg={BPK_COLOR_TOKENS.surfaceElevated}
        borderRadius="md"
        minWidth={0}
        overflow="hidden"
      >
        Responsive grid item 3
      </BpkBox>
    </BpkGrid>
  </Wrapper>
);

export const Auto = () => (
  <Wrapper>
    <BpkGrid
      gridAutoFlow="row"
      gridAutoRows="minmax(100px, auto)"
      gridAutoColumns="1fr"
      gap="base"
      padding="base"
      bg={BPK_COLOR_TOKENS.canvasContrast}
      borderRadius="md"
    >
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        Auto grid item 1
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        Auto grid item 2
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceElevated} borderRadius="md">
        Auto grid item 3
      </BpkBox>
    </BpkGrid>
  </Wrapper>
);

