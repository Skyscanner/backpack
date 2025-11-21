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

import { BpkBox, BPK_COLOR_TOKENS } from '../../packages/bpk-component-layout';

import Wrapper from './Wrapper';

/**
 * BpkBox Examples
 *
 * BpkBox is a versatile layout component that provides a flexible container.
 * It supports all common layout properties including spacing, colors, borders, shadows, and more.
 */

export const Default = () => (
  <Wrapper>
    <BpkBox>
      Default BpkBox with no props. This is a simple container.
    </BpkBox>
  </Wrapper>
);

export const WithPadding = () => (
  <Wrapper>
    <BpkBox padding="base" bg={BPK_COLOR_TOKENS.canvasContrast}>
      BpkBox with Backpack spacing token: padding=&quot;base&quot; (1rem / 16px)
    </BpkBox>
  </Wrapper>
);

export const WithMargin = () => (
  <Wrapper>
    <BpkBox
      margin="base"
      padding="base"
      bg={BPK_COLOR_TOKENS.surfaceHighlight}
      border="1px solid"
      borderColor={BPK_COLOR_TOKENS.line}
    >
      BpkBox with Backpack spacing tokens: margin=&quot;base&quot; and padding=&quot;base&quot;
    </BpkBox>
  </Wrapper>
);

export const Flexbox = () => (
  <Wrapper>
    <BpkBox display="flex" gap="base" padding="base" bg={BPK_COLOR_TOKENS.canvasContrast}>
      <BpkBox flex={1} padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        Flex item 1
      </BpkBox>
      <BpkBox flex={1} padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        Flex item 2
      </BpkBox>
      <BpkBox flex={1} padding="base" bg={BPK_COLOR_TOKENS.surfaceElevated} borderRadius="md">
        Flex item 3
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

export const FlexboxColumn = () => (
  <Wrapper>
    <BpkBox display="flex" flexDirection="column" gap="base" padding="base" bg={BPK_COLOR_TOKENS.canvasContrast}>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        Column item 1
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        Column item 2
      </BpkBox>
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceElevated} borderRadius="md">
        Column item 3
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

export const Grid = () => (
  <Wrapper>
    <BpkBox
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      gap="base"
      padding="base"
      bg={BPK_COLOR_TOKENS.canvasContrast}
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
    </BpkBox>
  </Wrapper>
);

export const WidthHeight = () => (
  <Wrapper>
    <BpkBox width="300px" height="200px" padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
      Fixed width (300px) and height (200px)
    </BpkBox>
  </Wrapper>
);

export const Responsive = () => (
  <Wrapper>
    <BpkBox
      width={{
        smallMobile: '100%',
        mobile: '50%',
        desktop: '33%',
      }}
      padding="base"
      bg={BPK_COLOR_TOKENS.surfaceHighlight}
      borderRadius="md"
      overflow="hidden"
    >
      Responsive width using Backpack breakpoint tokens: 100% smallMobile, 50% mobile, 33% desktop
    </BpkBox>
  </Wrapper>
);

export const ResponsiveSpacing = () => (
  <Wrapper>
    {/* Outer container to show margin (light gray background) */}
    <BpkBox
      margin={{
        smallMobile: 'sm',
        mobile: 'base',
        desktop: 'lg',
      }}
      bg={BPK_COLOR_TOKENS.canvasContrast}
      borderRadius="md"
      padding="base"
    >
      {/* Inner box to show padding (highlighted background) */}
      <BpkBox
        padding={{
          smallMobile: 'sm',
          mobile: 'base',
          desktop: 'lg',
        }}
        bg={BPK_COLOR_TOKENS.surfaceHighlight}
        borderRadius="md"
        overflow="hidden"
      >
        Responsive spacing using Backpack breakpoint tokens:
        <br />
        <br />
        <strong>Outer container (gray):</strong> margin: sm (smallMobile) → base (mobile) → lg (desktop)
        <br />
        <strong>Inner box (highlighted):</strong> padding: sm (smallMobile) → base (mobile) → lg (desktop)
        <br />
        <br />
        Resize the browser window to see the spacing change at different breakpoints.
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

export const ColorTokens = () => (
  <Wrapper>
    <BpkBox padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderColor={BPK_COLOR_TOKENS.line} borderWidth="1px" borderRadius="md" marginBottom="base">
      <BpkBox color={BPK_COLOR_TOKENS.textPrimary} marginBottom="sm">
        Using Backpack color token enums: bg={BPK_COLOR_TOKENS.canvasContrast}, color={BPK_COLOR_TOKENS.textPrimary}
      </BpkBox>
      <BpkBox color={BPK_COLOR_TOKENS.textSecondary} fontSize="sm">
        Secondary text color with Backpack token enum
      </BpkBox>
    </BpkBox>
    <BpkBox padding="base" bg={BPK_COLOR_TOKENS.corePrimary} color={BPK_COLOR_TOKENS.textOnDark} borderRadius="md" marginTop="base">
      Brand color example: bg={BPK_COLOR_TOKENS.corePrimary}, color={BPK_COLOR_TOKENS.textOnDark}
    </BpkBox>
  </Wrapper>
);

export const SemanticHTMLElement = () => (
  <Wrapper>
    <BpkBox as="section" padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md">
      <BpkBox as="h2" fontSize="xl" fontWeight="bold" marginBottom={2} color={BPK_COLOR_TOKENS.textPrimary}>
        Section Title
      </BpkBox>
      <BpkBox as="p" color={BPK_COLOR_TOKENS.textSecondary}>
        This BpkBox is rendered as a section element, and the title is an h2.
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

export const CenteredContent = () => (
  <Wrapper>
    <BpkBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="200px"
      bg={BPK_COLOR_TOKENS.canvasContrast}
      borderRadius="md"
    >
      Centered content
    </BpkBox>
  </Wrapper>
);

export const Shadow = () => (
  <Wrapper>
    <BpkBox
      padding="lg"
      bg={BPK_COLOR_TOKENS.canvas}
      borderRadius="md"
      boxShadow="lg"
      margin="base"
    >
      BpkBox with shadow and rounded corners
    </BpkBox>
  </Wrapper>
);

export const Border = () => (
  <Wrapper>
    <BpkBox
      padding="base"
      border="2px solid"
      borderColor={BPK_COLOR_TOKENS.corePrimary}
      borderRadius="lg"
      bg={BPK_COLOR_TOKENS.surfaceHighlight}
    >
      BpkBox with custom border
    </BpkBox>
  </Wrapper>
);

export const Mixed = () => (
  <Wrapper>
    <BpkBox marginBottom={4}>
      <BpkBox as="h2" fontSize="2xl" fontWeight="bold" marginBottom={4}>
        Mixed Layout Examples
      </BpkBox>

      <BpkBox display="flex" gap="base" marginBottom="base">
        <BpkBox flex={1} padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
          Flex item 1
        </BpkBox>
        <BpkBox flex={1} padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
          Flex item 2
        </BpkBox>
      </BpkBox>

      <BpkBox
        display="grid"
        gridTemplateColumns={{ smallMobile: '1fr', mobile: 'repeat(2, 1fr)' }}
        gap="base"
        marginBottom="base"
      >
        <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceElevated} borderRadius="md">
          Grid item 1
        </BpkBox>
        <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
          Grid item 2
        </BpkBox>
      </BpkBox>

      <BpkBox
        padding="base"
        bg={BPK_COLOR_TOKENS.canvasContrast}
        border="1px solid"
        borderColor={BPK_COLOR_TOKENS.line}
        borderRadius="md"
      >
        A box with padding, background, border, and rounded corners
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

