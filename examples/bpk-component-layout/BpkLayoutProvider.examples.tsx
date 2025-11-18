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

import {
  BpkBox,
  BpkFlex,
  BpkLayoutProvider,
  BPK_COLOR_TOKENS,
} from '../../packages/bpk-component-layout';

/**
 * BpkLayoutProvider Examples
 *
 * BpkLayoutProvider is a required wrapper component that configures Chakra UI
 * with Backpack's design tokens and breakpoints. It must wrap your application
 * at the root level for all layout components to work correctly.
 */

export const Default = () => (
  <BpkLayoutProvider>
    <BpkBox padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md">
      This content is wrapped in BpkLayoutProvider, enabling Backpack layout components
      to use Backpack design tokens and breakpoints.
    </BpkBox>
  </BpkLayoutProvider>
);

export const WithLayoutComponents = () => (
  <BpkLayoutProvider>
    <BpkFlex gap="base" padding="base" direction="column">
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        Layout component 1
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        Layout component 2
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceElevated} borderRadius="md">
        Layout component 3
      </BpkBox>
    </BpkFlex>
  </BpkLayoutProvider>
);

export const WithSpacingTokens = () => (
  <BpkLayoutProvider>
    <BpkFlex gap="base" padding="lg" direction="column">
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md">
        Using Backpack spacing tokens: padding=&quot;lg&quot; (1.5rem / 24px)
      </BpkBox>
      <BpkBox padding="md" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md">
        Using Backpack spacing tokens: padding=&quot;md&quot; (0.5rem / 8px)
      </BpkBox>
      <BpkBox padding="xl" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md">
        Using Backpack spacing tokens: padding=&quot;xl&quot; (2rem / 32px)
      </BpkBox>
    </BpkFlex>
  </BpkLayoutProvider>
);

export const WithColorTokens = () => (
  <BpkLayoutProvider>
    <BpkFlex gap="base" padding="base" direction="column">
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md">
        Canvas Contrast background
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        Surface Highlight background
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        Surface Default background
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceElevated} borderRadius="md">
        Surface Elevated background
      </BpkBox>
    </BpkFlex>
  </BpkLayoutProvider>
);

export const WithResponsiveLayout = () => (
  <BpkLayoutProvider>
    <BpkFlex
      gap="base"
      padding="base"
      direction={{ smallMobile: 'column', mobile: 'row' }}
      bg={BPK_COLOR_TOKENS.canvasContrast}
      borderRadius="md"
    >
      <BpkBox
        flex={1}
        padding="base"
        bg={BPK_COLOR_TOKENS.surfaceHighlight}
        borderRadius="md"
        minWidth={0}
        overflow="hidden"
      >
        Responsive item 1
      </BpkBox>
      <BpkBox
        flex={1}
        padding="base"
        bg={BPK_COLOR_TOKENS.surfaceDefault}
        borderRadius="md"
        minWidth={0}
        overflow="hidden"
      >
        Responsive item 2
      </BpkBox>
      <BpkBox
        flex={1}
        padding="base"
        bg={BPK_COLOR_TOKENS.surfaceElevated}
        borderRadius="md"
        minWidth={0}
        overflow="hidden"
      >
        Responsive item 3
      </BpkBox>
    </BpkFlex>
  </BpkLayoutProvider>
);

