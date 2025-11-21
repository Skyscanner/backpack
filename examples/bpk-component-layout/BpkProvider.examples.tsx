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
  BpkProvider,
  BPK_COLOR_TOKENS,
} from '../../packages/bpk-component-layout';

/**
 * BpkProvider Examples
 *
 * BpkProvider is a no-op component that exists for backward compatibility.
 * With CSS Modules implementation, BpkProvider is no longer required.
 * Layout components now use static CSS classes compiled at build time.
 */

export const Default = () => (
  <BpkProvider>
    <BpkBox padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md">
      This content is wrapped in BpkProvider, enabling Backpack layout components
      to use Backpack design tokens and breakpoints.
    </BpkBox>
  </BpkProvider>
);

export const WithLayoutComponents = () => (
  <BpkProvider>
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
  </BpkProvider>
);

export const WithSpacingTokens = () => (
  <BpkProvider>
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
  </BpkProvider>
);

export const WithColorTokens = () => (
  <BpkProvider>
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
  </BpkProvider>
);

export const WithResponsiveLayout = () => (
  <BpkProvider>
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
  </BpkProvider>
);


