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

import { Fragment } from 'react';

import { BpkBox } from '../../packages/bpk-component-layout/src/BpkBox';
import { BpkFlex } from '../../packages/bpk-component-layout/src/BpkFlex';
import { BpkGrid } from '../../packages/bpk-component-layout/src/BpkGrid';
import { BpkProvider } from '../../packages/bpk-component-layout/src/BpkProvider';
import { BpkStack, BpkHStack, BpkVStack } from '../../packages/bpk-component-layout/src/BpkStack';
import { BpkColor, BpkSpacing, BpkBreakpoint } from '../../packages/bpk-component-layout/src/tokens';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

// Helper component for demo items
// Note: We use Bpk tokens for default values
const DemoItem = ({
  bg = BpkColor.SurfaceHighlight,
  children,
  color = BpkColor.TextPrimary
}: {
  children: React.ReactNode;
  bg?: string;
  color?: string;
}) => (
  <BpkBox
    p={BpkSpacing.Md}
    bg={bg}
    color={color}
    borderRadius={BpkSpacing.Md}
    border="1px solid"
    borderColor={BpkColor.Line}
    textAlign="center"
  >
    {children}
  </BpkBox>
);

// BpkBox Examples
export const BpkBoxExample = () => (
  <BpkProvider>
    <BpkBox p={BpkSpacing.Base} bg={BpkColor.Canvas} borderRadius={BpkSpacing.Md}>
      <BpkText>This is a basic Box component with padding and background.</BpkText>
    </BpkBox>
  </BpkProvider>
);

export const BpkBoxWithPropsExample = () => (
  <BpkProvider>
    <BpkBox
      p={BpkSpacing.Lg}
      bg={BpkColor.CorePrimary}
      color={BpkColor.TextOnDark}
      borderRadius={BpkSpacing.Lg}
      mb={BpkSpacing.Base}
    >
      <BpkBox mb={BpkSpacing.Sm}>
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Box with various props
        </BpkText>
      </BpkBox>
      <BpkText>This Box demonstrates padding, background, color, border radius.</BpkText>
    </BpkBox>
  </BpkProvider>
);

// BpkBox Color Examples
export const BpkBoxTextColorsExample = () => (
  <BpkProvider>
    <BpkVStack spacing={BpkSpacing.Base}>
      <BpkBox mb={BpkSpacing.Base}>
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Text Colors with Backpack Tokens
        </BpkText>
      </BpkBox>

      <BpkBox p={BpkSpacing.Base} bg={BpkColor.Canvas} borderRadius={BpkSpacing.Md} border="1px solid" borderColor={BpkColor.Line}>
        <BpkBox color={BpkColor.TextPrimary} mb={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Primary Text Color
          </BpkText>
        </BpkBox>
        <BpkBox color={BpkColor.TextSecondary}>
          <BpkText textStyle={TEXT_STYLES.bodyDefault}>
            Secondary Text Color
          </BpkText>
        </BpkBox>
      </BpkBox>

      <BpkBox p={BpkSpacing.Base} bg={BpkColor.Canvas} borderRadius={BpkSpacing.Md} border="1px solid" borderColor={BpkColor.Line}>
        <BpkBox color={BpkColor.TextLink} mb={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Link Text Color
          </BpkText>
        </BpkBox>
        <BpkBox color={BpkColor.TextError} mb={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.bodyDefault}>
            Error Text Color
          </BpkText>
        </BpkBox>
        <BpkBox color={BpkColor.TextSuccess}>
          <BpkText textStyle={TEXT_STYLES.bodyDefault}>
            Success Text Color
          </BpkText>
        </BpkBox>
      </BpkBox>
    </BpkVStack>
  </BpkProvider>
);

export const BpkBoxBackgroundColorsExample = () => (
  <BpkProvider>
    <BpkVStack spacing={BpkSpacing.Base}>
      <BpkBox mb={BpkSpacing.Base}>
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Background Colors with Backpack Tokens
        </BpkText>
      </BpkBox>

      <BpkGrid templateColumns="repeat(2, 1fr)" gap={BpkSpacing.Base}>
        <BpkBox
          p={BpkSpacing.Base}
          bg={BpkColor.Canvas}
          color={BpkColor.TextPrimary}
          borderRadius={BpkSpacing.Md}
          border="1px solid"
          borderColor={BpkColor.Line}
        >
          <BpkText textStyle={TEXT_STYLES.label1}>
            Canvas Background
          </BpkText>
        </BpkBox>

        <BpkBox
          p={BpkSpacing.Base}
          bg={BpkColor.CanvasContrast}
          color={BpkColor.TextPrimary}
          borderRadius={BpkSpacing.Md}
          border="1px solid"
          borderColor={BpkColor.Line}
        >
          <BpkText textStyle={TEXT_STYLES.label1}>
            Canvas Contrast Background
          </BpkText>
        </BpkBox>

        <BpkBox
          p={BpkSpacing.Base}
          bg={BpkColor.SurfaceHighlight}
          color={BpkColor.TextPrimary}
          borderRadius={BpkSpacing.Md}
          border="1px solid"
          borderColor={BpkColor.Line}
        >
          <BpkText textStyle={TEXT_STYLES.label1}>
            Surface Highlight Background
          </BpkText>
        </BpkBox>

        <BpkBox
          p={BpkSpacing.Base}
          bg={BpkColor.SurfaceElevated}
          color={BpkColor.TextPrimary}
          borderRadius={BpkSpacing.Md}
          border="1px solid"
          borderColor={BpkColor.Line}
        >
          <BpkText textStyle={TEXT_STYLES.label1}>
            Surface Elevated Background
          </BpkText>
        </BpkBox>
      </BpkGrid>
    </BpkVStack>
  </BpkProvider>
);

export const BpkBoxBrandColorsExample = () => (
  <BpkProvider>
    <BpkVStack spacing={BpkSpacing.Base}>
      <BpkBox mb={BpkSpacing.Base}>
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Brand Colors with Backpack Tokens
        </BpkText>
      </BpkBox>

      <BpkHStack spacing={BpkSpacing.Base}>
        <BpkBox
          p={BpkSpacing.Lg}
          bg={BpkColor.CorePrimary}
          color={BpkColor.TextOnDark}
          borderRadius={BpkSpacing.Md}
          flex="1"
          textAlign="center"
        >
          <BpkText textStyle={TEXT_STYLES.heading5}>
            Core Primary
          </BpkText>
        </BpkBox>

        <BpkBox
          p={BpkSpacing.Lg}
          bg={BpkColor.CoreAccent}
          color={BpkColor.TextOnDark}
          borderRadius={BpkSpacing.Md}
          flex="1"
          textAlign="center"
        >
          <BpkText textStyle={TEXT_STYLES.heading5}>
            Core Accent
          </BpkText>
        </BpkBox>
      </BpkHStack>
    </BpkVStack>
  </BpkProvider>
);

export const BpkBoxBorderColorsExample = () => (
  <BpkProvider>
    <BpkVStack spacing={BpkSpacing.Base}>
      <BpkBox mb={BpkSpacing.Base}>
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Border Colors with Backpack Tokens
        </BpkText>
      </BpkBox>

      <BpkVStack spacing={BpkSpacing.Md}>
        <BpkBox
          p={BpkSpacing.Base}
          bg={BpkColor.Canvas}
          color={BpkColor.TextPrimary}
          borderRadius={BpkSpacing.Md}
          border="2px solid"
          borderColor={BpkColor.Line}
        >
          <BpkText textStyle={TEXT_STYLES.label1}>
            Standard Border (bpk-line-day)
          </BpkText>
        </BpkBox>

        <BpkBox
          p={BpkSpacing.Base}
          bg={BpkColor.Canvas}
          color={BpkColor.TextPrimary}
          borderRadius={BpkSpacing.Md}
          border="2px solid"
          borderColor={BpkColor.CorePrimary}
        >
          <BpkText textStyle={TEXT_STYLES.label1}>
            Primary Border (bpk-core-primary-day)
          </BpkText>
        </BpkBox>

        <BpkBox
          p={BpkSpacing.Base}
          bg={BpkColor.Canvas}
          color={BpkColor.TextPrimary}
          borderRadius={BpkSpacing.Md}
          borderTop="3px solid"
          borderTopColor={BpkColor.CorePrimary}
          borderRight="1px solid"
          borderRightColor={BpkColor.Line}
          borderBottom="1px solid"
          borderBottomColor={BpkColor.Line}
          borderLeft="1px solid"
          borderLeftColor={BpkColor.Line}
        >
          <BpkText textStyle={TEXT_STYLES.label1}>
            Custom Border Colors (top: primary, others: line)
          </BpkText>
        </BpkBox>
      </BpkVStack>
    </BpkVStack>
  </BpkProvider>
);

export const BpkBoxColorCombinationsExample = () => (
  <BpkProvider>
    <BpkVStack spacing={BpkSpacing.Lg}>
      <BpkBox mb={BpkSpacing.Base}>
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Color Combinations with Backpack Tokens
        </BpkText>
      </BpkBox>

      <BpkGrid templateColumns="repeat(2, 1fr)" gap={BpkSpacing.Base}>
        <BpkBox
          p={BpkSpacing.Lg}
          bg={BpkColor.SurfaceElevated}
          borderRadius={BpkSpacing.Md}
          border="1px solid"
          borderColor={BpkColor.Line}
        >
          <BpkBox color={BpkColor.TextPrimary} mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.heading5}>
              Card Title
            </BpkText>
          </BpkBox>
          <BpkBox color={BpkColor.TextSecondary} mb={BpkSpacing.Base}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
              Card description with secondary text color.
            </BpkText>
          </BpkBox>
          <BpkBox
            p={BpkSpacing.Base}
            bg={BpkColor.CorePrimary}
            color={BpkColor.TextOnDark}
            borderRadius={BpkSpacing.Md}
            mt={BpkSpacing.Base}
            textAlign="center"
          >
            <BpkText textStyle={TEXT_STYLES.label1}>
              Primary Action
            </BpkText>
          </BpkBox>
        </BpkBox>

        <BpkBox
          p={BpkSpacing.Lg}
          bg={BpkColor.SurfaceHighlight}
          borderRadius={BpkSpacing.Md}
          border="1px solid"
          borderColor={BpkColor.Line}
        >
          <BpkBox color={BpkColor.TextPrimary} mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.heading5}>
              Highlight Card
            </BpkText>
          </BpkBox>
          <BpkBox color={BpkColor.TextSecondary} mb={BpkSpacing.Base}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
              This card uses surface-highlight background.
            </BpkText>
          </BpkBox>
          <BpkBox
            p={BpkSpacing.Base}
            bg={BpkColor.CanvasContrast}
            color={BpkColor.TextLink}
            borderRadius={BpkSpacing.Md}
            border="1px solid"
            borderColor={BpkColor.Line}
            mt={BpkSpacing.Base}
            textAlign="center"
          >
            <BpkText textStyle={TEXT_STYLES.label1}>
              Secondary Action
            </BpkText>
          </BpkBox>
        </BpkBox>
      </BpkGrid>

      {/* Background Color Showcase */}
      <BpkBox mt={BpkSpacing.Lg} mb={BpkSpacing.Base}>
        <BpkBox mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.heading5}>
            Background Color Variations
            </BpkText>
        </BpkBox>
        <BpkBox color={BpkColor.TextSecondary}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
            Different background colors with appropriate text colors
            </BpkText>
        </BpkBox>
      </BpkBox>

      <BpkGrid templateColumns="repeat(2, 1fr)" gap={BpkSpacing.Base}>
        <BpkBox
          p={BpkSpacing.Lg}
          bg={BpkColor.Canvas}
          borderRadius={BpkSpacing.Md}
          border="1px solid"
          borderColor={BpkColor.Line}
        >
          <BpkBox color={BpkColor.TextPrimary} mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.heading5}>
                Canvas Background
            </BpkText>
          </BpkBox>
          <BpkBox color={BpkColor.TextSecondary}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
                Using bpk-canvas-day background with primary and secondary text colors.
            </BpkText>
          </BpkBox>
        </BpkBox>

        <BpkBox
          p={BpkSpacing.Lg}
          bg={BpkColor.CanvasContrast}
          borderRadius={BpkSpacing.Md}
          border="1px solid"
          borderColor={BpkColor.Line}
        >
          <BpkBox color={BpkColor.TextPrimary} mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.heading5}>
                Canvas Contrast
            </BpkText>
          </BpkBox>
          <BpkBox color={BpkColor.TextSecondary}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
                Using bpk-canvas-contrast-day for subtle contrast.
            </BpkText>
          </BpkBox>
        </BpkBox>

        <BpkBox
          p={BpkSpacing.Lg}
          bg={BpkColor.SurfaceDefault}
          borderRadius={BpkSpacing.Md}
          border="1px solid"
          borderColor={BpkColor.Line}
        >
          <BpkBox color={BpkColor.TextPrimary} mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.heading5}>
                Surface Default
            </BpkText>
          </BpkBox>
          <BpkBox color={BpkColor.TextSecondary}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
                Using bpk-surface-default-day background.
            </BpkText>
          </BpkBox>
        </BpkBox>

        <BpkBox
          p={BpkSpacing.Lg}
          bg={BpkColor.SurfaceElevated}
          borderRadius={BpkSpacing.Md}
          border="1px solid"
          borderColor={BpkColor.Line}
        >
          <BpkBox color={BpkColor.TextPrimary} mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.heading5}>
                Surface Elevated
            </BpkText>
          </BpkBox>
          <BpkBox color={BpkColor.TextSecondary}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
                Using bpk-surface-elevated-day for elevated surfaces.
            </BpkText>
          </BpkBox>
        </BpkBox>
      </BpkGrid>

      {/* Brand Background Colors */}
      <BpkBox mt={BpkSpacing.Lg} mb={BpkSpacing.Base}>
        <BpkBox mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.heading5}>
            Brand Background Colors
            </BpkText>
        </BpkBox>
        <BpkBox color={BpkColor.TextSecondary}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
            Brand colors with white text for contrast
            </BpkText>
        </BpkBox>
      </BpkBox>

      <BpkHStack spacing={BpkSpacing.Base}>
        <BpkBox
          p={BpkSpacing.Lg}
          bg={BpkColor.CorePrimary}
          color={BpkColor.TextOnDark}
          borderRadius={BpkSpacing.Md}
          flex="1"
          textAlign="center"
        >
          <BpkBox mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.heading5}>
                Core Primary
            </BpkText>
          </BpkBox>
          <BpkBox style={{ opacity: 0.9 }}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
                Primary brand color background
            </BpkText>
          </BpkBox>
        </BpkBox>

        <BpkBox
          p={BpkSpacing.Lg}
          bg={BpkColor.CoreAccent}
          color={BpkColor.TextOnDark}
          borderRadius={BpkSpacing.Md}
          flex="1"
          textAlign="center"
        >
          <BpkBox mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.heading5}>
                Core Accent
            </BpkText>
          </BpkBox>
          <BpkBox style={{ opacity: 0.9 }}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
                Accent brand color background
            </BpkText>
          </BpkBox>
        </BpkBox>
      </BpkHStack>

      {/* Nested Background Examples */}
      <BpkBox mt={BpkSpacing.Lg} mb={BpkSpacing.Base}>
        <BpkBox mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.heading5}>
            Nested Background Combinations
            </BpkText>
        </BpkBox>
        <BpkBox color={BpkColor.TextSecondary}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
            Multiple background layers with different colors
            </BpkText>
        </BpkBox>
      </BpkBox>

      <BpkBox
        p={BpkSpacing.Lg}
        bg={BpkColor.Canvas}
        borderRadius={BpkSpacing.Md}
        border="1px solid"
        borderColor={BpkColor.Line}
      >
        <BpkBox color={BpkColor.TextPrimary} mb={BpkSpacing.Base}>
            <BpkText textStyle={TEXT_STYLES.heading5}>
            Outer Container (Canvas)
            </BpkText>
        </BpkBox>

        <BpkHStack spacing={BpkSpacing.Base} mb={BpkSpacing.Base}>
          <BpkBox
            p={BpkSpacing.Base}
            bg={BpkColor.SurfaceHighlight}
            color={BpkColor.TextPrimary}
            borderRadius={BpkSpacing.Md}
            flex="1"
            textAlign="center"
          >
            <BpkText textStyle={TEXT_STYLES.label1}>
              Highlight
            </BpkText>
          </BpkBox>

          <BpkBox
            p={BpkSpacing.Base}
            bg={BpkColor.SurfaceElevated}
            color={BpkColor.TextPrimary}
            borderRadius={BpkSpacing.Md}
            flex="1"
            textAlign="center"
          >
            <BpkText textStyle={TEXT_STYLES.label1}>
              Elevated
            </BpkText>
          </BpkBox>
        </BpkHStack>

        <BpkBox
          p={BpkSpacing.Base}
          bg={BpkColor.CorePrimary}
          color={BpkColor.TextOnDark}
          borderRadius={BpkSpacing.Md}
          textAlign="center"
        >
          <BpkText textStyle={TEXT_STYLES.label1}>
            Brand Color Nested
          </BpkText>
        </BpkBox>
      </BpkBox>
    </BpkVStack>
  </BpkProvider>
);

// BpkFlex Examples
export const BpkFlexExample = () => (
  <BpkProvider>
    <BpkFlex gap={BpkSpacing.Md}>
      <DemoItem>Item 1</DemoItem>
      <DemoItem>Item 2</DemoItem>
      <DemoItem>Item 3</DemoItem>
    </BpkFlex>
  </BpkProvider>
);

export const BpkFlexDirectionExample = () => (
  <BpkProvider>
    <BpkStack spacing={BpkSpacing.Md}>
      <div>
        <BpkBox mb={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Row (default)
          </BpkText>
        </BpkBox>
        <BpkFlex direction="row" gap={BpkSpacing.Md}>
          <DemoItem>Item 1</DemoItem>
          <DemoItem>Item 2</DemoItem>
          <DemoItem>Item 3</DemoItem>
        </BpkFlex>
      </div>
      <div>
        <BpkBox mb={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Column
          </BpkText>
        </BpkBox>
        <BpkFlex direction="column" gap={BpkSpacing.Md}>
          <DemoItem>Item 1</DemoItem>
          <DemoItem>Item 2</DemoItem>
          <DemoItem>Item 3</DemoItem>
        </BpkFlex>
      </div>
    </BpkStack>
  </BpkProvider>
);

export const BpkFlexAlignmentExample = () => (
  <BpkProvider>
    <BpkStack spacing={BpkSpacing.Lg}>
      <div>
        <BpkBox mb={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Center aligned
          </BpkText>
        </BpkBox>
        <BpkFlex align="center" justify="center" gap={BpkSpacing.Base} minH="100px" bg={BpkColor.CanvasContrast} p={BpkSpacing.Base} borderRadius={BpkSpacing.Md}>
          <DemoItem bg={BpkColor.CorePrimary} color={BpkColor.TextOnDark}>Centered</DemoItem>
        </BpkFlex>
      </div>
      <div>
        <BpkBox mb={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Space between
          </BpkText>
        </BpkBox>
        <BpkFlex justify="space-between" gap={BpkSpacing.Base} bg={BpkColor.CanvasContrast} p={BpkSpacing.Base} borderRadius={BpkSpacing.Md}>
          <DemoItem bg={BpkColor.SurfaceHighlight}>Start</DemoItem>
          <DemoItem bg={BpkColor.SurfaceHighlight}>End</DemoItem>
        </BpkFlex>
      </div>
      <div>
        <BpkBox mb={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Space around
          </BpkText>
        </BpkBox>
        <BpkFlex justify="space-around" gap={BpkSpacing.Base} bg={BpkColor.CanvasContrast} p={BpkSpacing.Base} borderRadius={BpkSpacing.Md}>
          <DemoItem bg={BpkColor.SurfaceElevated}>Item 1</DemoItem>
          <DemoItem bg={BpkColor.SurfaceElevated}>Item 2</DemoItem>
          <DemoItem bg={BpkColor.SurfaceElevated}>Item 3</DemoItem>
        </BpkFlex>
      </div>
    </BpkStack>
  </BpkProvider>
);

// BpkGrid Examples
export const BpkGridExample = () => (
  <BpkProvider>
    <BpkGrid templateColumns="repeat(3, 1fr)" gap={BpkSpacing.Md}>
      <DemoItem>Item 1</DemoItem>
      <DemoItem>Item 2</DemoItem>
      <DemoItem>Item 3</DemoItem>
      <DemoItem>Item 4</DemoItem>
      <DemoItem>Item 5</DemoItem>
      <DemoItem>Item 6</DemoItem>
    </BpkGrid>
  </BpkProvider>
);

export const BpkGridTemplateColumnsExample = () => (
  <BpkProvider>
    <BpkStack spacing={BpkSpacing.Lg}>
      <div>
        <BpkBox mb={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            3 equal columns
          </BpkText>
        </BpkBox>
        <BpkGrid templateColumns="repeat(3, 1fr)" gap={BpkSpacing.Md}>
          <DemoItem bg={BpkColor.CorePrimary} color={BpkColor.TextOnDark}>Column 1</DemoItem>
          <DemoItem bg={BpkColor.CorePrimary} color={BpkColor.TextOnDark}>Column 2</DemoItem>
          <DemoItem bg={BpkColor.CorePrimary} color={BpkColor.TextOnDark}>Column 3</DemoItem>
        </BpkGrid>
      </div>
      <div>
        <BpkBox mb={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Responsive columns (1fr 2fr 1fr)
          </BpkText>
        </BpkBox>
        <BpkGrid templateColumns="1fr 2fr 1fr" gap={BpkSpacing.Md}>
          <DemoItem bg={BpkColor.CoreAccent} color={BpkColor.TextOnDark}>Narrow</DemoItem>
          <DemoItem bg={BpkColor.CoreAccent} color={BpkColor.TextOnDark}>Wide</DemoItem>
          <DemoItem bg={BpkColor.CoreAccent} color={BpkColor.TextOnDark}>Narrow</DemoItem>
        </BpkGrid>
      </div>
      <div>
        <BpkBox mb={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Auto-fit columns
          </BpkText>
        </BpkBox>
        <BpkGrid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={BpkSpacing.Md}>
          <DemoItem>Auto</DemoItem>
          <DemoItem>Auto</DemoItem>
          <DemoItem>Auto</DemoItem>
          <DemoItem>Auto</DemoItem>
        </BpkGrid>
      </div>
    </BpkStack>
  </BpkProvider>
);

// BpkStack Examples
export const BpkStackExample = () => (
  <BpkProvider>
    <BpkStack spacing={BpkSpacing.Md}>
      <DemoItem>Stack Item 1</DemoItem>
      <DemoItem>Stack Item 2</DemoItem>
      <DemoItem>Stack Item 3</DemoItem>
    </BpkStack>
  </BpkProvider>
);

export const BpkHStackExample = () => (
  <BpkProvider>
    <BpkHStack spacing={BpkSpacing.Md}>
      <DemoItem bg={BpkColor.SurfaceHighlight}>Horizontal Item 1</DemoItem>
      <DemoItem bg={BpkColor.SurfaceHighlight}>Horizontal Item 2</DemoItem>
      <DemoItem bg={BpkColor.SurfaceHighlight}>Horizontal Item 3</DemoItem>
    </BpkHStack>
  </BpkProvider>
);

export const BpkVStackExample = () => (
  <BpkProvider>
    <BpkVStack spacing={BpkSpacing.Md}>
      <DemoItem bg={BpkColor.SurfaceElevated}>Vertical Item 1</DemoItem>
      <DemoItem bg={BpkColor.SurfaceElevated}>Vertical Item 2</DemoItem>
      <DemoItem bg={BpkColor.SurfaceElevated}>Vertical Item 3</DemoItem>
    </BpkVStack>
  </BpkProvider>
);

export const BpkStackSpacingExample = () => (
  <BpkProvider>
    <BpkStack spacing={BpkSpacing.Lg}>
      <div>
        <BpkBox mb={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Small spacing (Sm)
          </BpkText>
        </BpkBox>
        <BpkVStack spacing={BpkSpacing.Sm}>
          <DemoItem>Item 1</DemoItem>
          <DemoItem>Item 2</DemoItem>
          <DemoItem>Item 3</DemoItem>
        </BpkVStack>
      </div>
      <div>
        <BpkBox mb={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Medium spacing (Md)
          </BpkText>
        </BpkBox>
        <BpkVStack spacing={BpkSpacing.Md}>
          <DemoItem>Item 1</DemoItem>
          <DemoItem>Item 2</DemoItem>
          <DemoItem>Item 3</DemoItem>
        </BpkVStack>
      </div>
      <div>
        <BpkBox mb={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Large spacing (Lg)
          </BpkText>
        </BpkBox>
        <BpkVStack spacing={BpkSpacing.Lg}>
          <DemoItem>Item 1</DemoItem>
          <DemoItem>Item 2</DemoItem>
          <DemoItem>Item 3</DemoItem>
        </BpkVStack>
      </div>
    </BpkStack>
  </BpkProvider>
);

// Backpack Token Examples
export const BpkSpacingTokenExample = () => (
  <BpkProvider>
    <BpkStack spacing={BpkSpacing.Base}>
      <BpkBox mb={BpkSpacing.Base}>
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Backpack Spacing Tokens
        </BpkText>
      </BpkBox>

      <BpkVStack spacing={BpkSpacing.Sm}>
        <BpkBox p={BpkSpacing.Sm} bg={BpkColor.SurfaceHighlight} borderRadius={BpkSpacing.Md}>
          <BpkText>Small spacing (bpk-spacing-sm)</BpkText>
        </BpkBox>
        <BpkBox p={BpkSpacing.Base} bg={BpkColor.SurfaceHighlight} borderRadius={BpkSpacing.Md}>
          <BpkText>Base spacing (bpk-spacing-base)</BpkText>
        </BpkBox>
        <BpkBox p={BpkSpacing.Md} bg={BpkColor.SurfaceHighlight} borderRadius={BpkSpacing.Md}>
          <BpkText>Medium spacing (bpk-spacing-md)</BpkText>
        </BpkBox>
        <BpkBox p={BpkSpacing.Lg} bg={BpkColor.SurfaceHighlight} borderRadius={BpkSpacing.Md}>
          <BpkText>Large spacing (bpk-spacing-lg)</BpkText>
        </BpkBox>
        <BpkBox p={BpkSpacing.Xl} bg={BpkColor.SurfaceHighlight} borderRadius={BpkSpacing.Md}>
          <BpkText>Extra large spacing (bpk-spacing-xl)</BpkText>
        </BpkBox>
      </BpkVStack>

      <BpkBox mt={BpkSpacing.Base} p={BpkSpacing.Base} bg={BpkColor.CanvasContrast} borderRadius={BpkSpacing.Md}>
        <BpkBox mb={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Spacing with percentages (50% width):
          </BpkText>
        </BpkBox>
        <BpkBox width="50%" p={BpkSpacing.Base} bg={BpkColor.SurfaceHighlight} borderRadius={BpkSpacing.Md}>
          <BpkText>50% width container</BpkText>
        </BpkBox>
      </BpkBox>
    </BpkStack>
  </BpkProvider>
);

export const BpkColorTokenExample = () => (
  <BpkProvider>
    <BpkStack spacing={BpkSpacing.Base}>
      <BpkBox mb={BpkSpacing.Base}>
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Backpack Color Tokens
        </BpkText>
      </BpkBox>

      <BpkGrid templateColumns="repeat(2, 1fr)" gap={BpkSpacing.Base}>
        {/* Text Colors */}
        <BpkBox p={BpkSpacing.Base} bg={BpkColor.Canvas} borderRadius={BpkSpacing.Md} border="1px solid" borderColor={BpkColor.Line}>
          <BpkBox color={BpkColor.TextPrimary} mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.label1}>
              Text Primary
            </BpkText>
          </BpkBox>
          <BpkBox color={BpkColor.TextSecondary}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
              Text Secondary
            </BpkText>
          </BpkBox>
        </BpkBox>

        <BpkBox p={BpkSpacing.Base} bg={BpkColor.Canvas} borderRadius={BpkSpacing.Md} border="1px solid" borderColor={BpkColor.Line}>
          <BpkBox color={BpkColor.TextLink} mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.label1}>
              Text Link
            </BpkText>
          </BpkBox>
          <BpkBox color={BpkColor.TextError}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
              Text Error
            </BpkText>
          </BpkBox>
        </BpkBox>

        {/* Background Colors */}
        <BpkBox p={BpkSpacing.Base} bg={BpkColor.SurfaceHighlight} color={BpkColor.TextPrimary} borderRadius={BpkSpacing.Md} border="1px solid" borderColor={BpkColor.Line}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Surface Highlight
          </BpkText>
        </BpkBox>

        <BpkBox p={BpkSpacing.Base} bg={BpkColor.SurfaceElevated} color={BpkColor.TextPrimary} borderRadius={BpkSpacing.Md} border="1px solid" borderColor={BpkColor.Line}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Surface Elevated
          </BpkText>
        </BpkBox>

        {/* Brand Colors */}
        <BpkBox p={BpkSpacing.Base} bg={BpkColor.CorePrimary} color={BpkColor.TextOnDark} borderRadius={BpkSpacing.Md}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Core Primary
          </BpkText>
        </BpkBox>

        <BpkBox p={BpkSpacing.Base} bg={BpkColor.CoreAccent} color={BpkColor.TextOnDark} borderRadius={BpkSpacing.Md}>
          <BpkText textStyle={TEXT_STYLES.label1}>
            Core Accent
          </BpkText>
        </BpkBox>
      </BpkGrid>
    </BpkStack>
  </BpkProvider>
);

export const BpkTokenCombinedExample = () => (
  <BpkProvider>
    <BpkStack spacing={BpkSpacing.Lg}>
      <BpkBox mb={BpkSpacing.Base}>
        <BpkText textStyle={TEXT_STYLES.heading4}>
          Combined Backpack Tokens
        </BpkText>
        <BpkBox color={BpkColor.TextSecondary} mt={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.bodyDefault}>
            Using Backpack spacing and color tokens together
          </BpkText>
        </BpkBox>
      </BpkBox>

      <BpkBox
        p={BpkSpacing.Lg}
        bg={BpkColor.SurfaceElevated}
        borderRadius={BpkSpacing.Md}
        border="1px solid"
        borderColor={BpkColor.Line}
      >
        <BpkBox color={BpkColor.TextPrimary} mb={BpkSpacing.Base}>
          <BpkText textStyle={TEXT_STYLES.heading5}>
            Card with Backpack Tokens
          </BpkText>
        </BpkBox>
        <BpkBox color={BpkColor.TextSecondary} mb={BpkSpacing.Base}>
          <BpkText textStyle={TEXT_STYLES.bodyDefault}>
            This card uses Backpack spacing tokens for padding and margins, and Backpack color tokens for background and text colors.
          </BpkText>
        </BpkBox>
        <BpkFlex gap={BpkSpacing.Base} mt={BpkSpacing.Base}>
          <BpkBox
            p={BpkSpacing.Base}
            bg={BpkColor.CorePrimary}
            color={BpkColor.TextOnDark}
            borderRadius={BpkSpacing.Md}
            flex="1"
            textAlign="center"
          >
            <BpkText textStyle={TEXT_STYLES.label1}>
              Primary Action
            </BpkText>
          </BpkBox>
          <BpkBox
            p={BpkSpacing.Base}
            bg={BpkColor.CanvasContrast}
            color={BpkColor.TextPrimary}
            borderRadius={BpkSpacing.Md}
            border="1px solid"
            borderColor={BpkColor.Line}
            flex="1"
            textAlign="center"
          >
            <BpkText textStyle={TEXT_STYLES.label1}>
              Secondary Action
            </BpkText>
          </BpkBox>
        </BpkFlex>
      </BpkBox>

      <BpkGrid templateColumns="repeat(3, 1fr)" gap={BpkSpacing.Base}>
        <BpkBox
          p={BpkSpacing.Md}
          bg={BpkColor.SurfaceHighlight}
          borderRadius={BpkSpacing.Md}
          border="1px solid"
          borderColor={BpkColor.Line}
        >
          <BpkBox color={BpkColor.TextPrimary} mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.label1}>
              Item 1
            </BpkText>
          </BpkBox>
          <BpkBox color={BpkColor.TextSecondary}>
            <BpkText textStyle={TEXT_STYLES.caption}>
              Using bpk-spacing-md
            </BpkText>
          </BpkBox>
        </BpkBox>
        <BpkBox
          p={BpkSpacing.Md}
          bg={BpkColor.SurfaceHighlight}
          borderRadius={BpkSpacing.Md}
          border="1px solid"
          borderColor={BpkColor.Line}
        >
          <BpkBox color={BpkColor.TextPrimary} mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.label1}>
              Item 2
            </BpkText>
          </BpkBox>
          <BpkBox color={BpkColor.TextSecondary}>
            <BpkText textStyle={TEXT_STYLES.caption}>
              Using bpk-spacing-md
            </BpkText>
          </BpkBox>
        </BpkBox>
        <BpkBox
          p={BpkSpacing.Md}
          bg={BpkColor.SurfaceHighlight}
          borderRadius={BpkSpacing.Md}
          border="1px solid"
          borderColor={BpkColor.Line}
        >
          <BpkBox color={BpkColor.TextPrimary} mb={BpkSpacing.Sm}>
            <BpkText textStyle={TEXT_STYLES.label1}>
              Item 3
            </BpkText>
          </BpkBox>
          <BpkBox color={BpkColor.TextSecondary}>
            <BpkText textStyle={TEXT_STYLES.caption}>
              Using bpk-spacing-md
            </BpkText>
          </BpkBox>
        </BpkBox>
      </BpkGrid>
    </BpkStack>
  </BpkProvider>
);

// New example demonstrating responsive overrides
export const BpkResponsiveOverrideExample = () => (
  <BpkProvider>
    <BpkStack spacing={BpkSpacing.Lg}>
      <BpkBox mb={BpkSpacing.Base}>
        <BpkText textStyle={TEXT_STYLES.heading4}>
          Responsive Overrides
        </BpkText>
        <BpkBox color={BpkColor.TextSecondary} mt={BpkSpacing.Sm}>
          <BpkText textStyle={TEXT_STYLES.bodyDefault}>
            Resize the window to see changes. Background changes from Canvas (mobile) to SurfaceHighlight (tablet) to CorePrimary (desktop).
          </BpkText>
        </BpkBox>
      </BpkBox>

      <BpkBox
        p={BpkSpacing.Lg}
        bg={{
          base: BpkColor.Canvas,
          mobile: BpkColor.Canvas,
          tablet: BpkColor.SurfaceHighlight,
          desktop: BpkColor.CorePrimary,
        }}
        color={{
             base: BpkColor.TextPrimary,
             mobile: BpkColor.TextPrimary,
             desktop: BpkColor.TextOnDark,
        }}
        borderRadius={BpkSpacing.Md}
        border="1px solid"
        borderColor={BpkColor.Line}
      >
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Responsive Background & Text Color
        </BpkText>
      </BpkBox>
    </BpkStack>
  </BpkProvider>
);

// Mixed Example for Visual Test
export const MixedExample = () => (
  <BpkProvider>
    <BpkStack spacing={BpkSpacing.Lg} p={BpkSpacing.Lg}>
      <div>
        <BpkBox mb={BpkSpacing.Md}>
          <BpkText textStyle={TEXT_STYLES.heading4}>
            Layout Components Showcase
          </BpkText>
        </BpkBox>
      </div>

      <div>
        <BpkBox mb={BpkSpacing.Base}>
          <BpkText textStyle={TEXT_STYLES.heading5}>
            Box Component
          </BpkText>
        </BpkBox>
        <BpkBoxExample />
      </div>

      <div>
        <BpkBox mb={BpkSpacing.Base}>
          <BpkText textStyle={TEXT_STYLES.heading5}>
            Flex Component
          </BpkText>
        </BpkBox>
        <BpkFlexExample />
      </div>

      <div>
        <BpkBox mb={BpkSpacing.Base}>
          <BpkText textStyle={TEXT_STYLES.heading5}>
            Grid Component
          </BpkText>
        </BpkBox>
        <BpkGridExample />
      </div>

      <div>
        <BpkBox mb={BpkSpacing.Base}>
          <BpkText textStyle={TEXT_STYLES.heading5}>
            Stack Components
          </BpkText>
        </BpkBox>
        <BpkBox mb={BpkSpacing.Md}>
          <BpkHStack spacing={BpkSpacing.Md}>
            <BpkText textStyle={TEXT_STYLES.label1}>HStack:</BpkText>
            <BpkHStackExample />
          </BpkHStack>
        </BpkBox>
        <BpkVStackExample />
      </div>

      <div>
        <BpkBox mb={BpkSpacing.Base}>
          <BpkText textStyle={TEXT_STYLES.heading5}>
            Complex Layout
          </BpkText>
        </BpkBox>
        <BpkBox p={BpkSpacing.Md} bg={BpkColor.CanvasContrast} borderRadius={BpkSpacing.Md}>
          <BpkGrid templateColumns="repeat(2, 1fr)" gap={BpkSpacing.Md} mb={BpkSpacing.Md}>
            <BpkBox p={BpkSpacing.Md} bg={BpkColor.SurfaceHighlight} borderRadius={BpkSpacing.Md}>
              <BpkText textStyle={TEXT_STYLES.label1}>Grid Item 1</BpkText>
            </BpkBox>
            <BpkBox p={BpkSpacing.Md} bg={BpkColor.SurfaceHighlight} borderRadius={BpkSpacing.Md}>
              <BpkText textStyle={TEXT_STYLES.label1}>Grid Item 2</BpkText>
            </BpkBox>
          </BpkGrid>
          <BpkFlex justify="space-between" align="center" p={BpkSpacing.Md} bg={BpkColor.SurfaceElevated} borderRadius={BpkSpacing.Md}>
            <BpkText textStyle={TEXT_STYLES.label1}>Flex Item 1</BpkText>
            <BpkText textStyle={TEXT_STYLES.label1}>Flex Item 2</BpkText>
          </BpkFlex>
        </BpkBox>
      </div>

      <div>
        <BpkBox mb={BpkSpacing.Base}>
           <BpkText textStyle={TEXT_STYLES.heading5}>Responsive Override</BpkText>
        </BpkBox>
        <BpkResponsiveOverrideExample />
      </div>
    </BpkStack>
  </BpkProvider>
);
