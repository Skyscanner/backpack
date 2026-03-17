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
  BACKGROUND_COLORS,
  BpkBox,
  BpkSpacing,
} from '../../packages/bpk-component-layout';
import { TEXT_COLORS } from '../../packages/bpk-component-text';

import Wrapper from './layout-wrapper';

import type { BpkBoxBackgroundColor } from '../../packages/bpk-component-layout';

import STYLES from './examples.module.scss';

/**
 * Core layout example – demonstrates basic spacing usage.
 *
 * @returns {JSX.Element} A box with padding and margin using Backpack spacing tokens.
 */
export const SpacingExample = () => (
  <Wrapper>
    <BpkBox padding={BpkSpacing.MD} margin={BpkSpacing.MD}>
      <span className={STYLES['bpk-layout-examples__outline']}>
        Default box with padding and margin using Backpack spacing tokens.
      </span>
    </BpkBox>
  </Wrapper>
);

/**
 * RTL-friendly spacing example – demonstrates margin/padding logical props.
 *
 * @returns {JSX.Element} Box using marginInline & paddingInline in RTL context.
 */
export const RtlSpacingExample = () => (
  <Wrapper>
    <div dir="rtl">
      <BpkBox
        paddingInline={BpkSpacing.MD}
        marginInline={BpkSpacing.MD}
        paddingTop={BpkSpacing.MD}
        paddingBottom={BpkSpacing.Base}
      >
        <span className={STYLES['bpk-layout-examples__outline']}>
          Box using marginInline &amp; paddingInline in RTL context.
        </span>
      </BpkBox>
    </div>
  </Wrapper>
);

/**
 * Size example – demonstrates width/height using semantic values.
 *
 * @returns {JSX.Element} Box with 50% width and 6rem minHeight.
 */
export const SizeExample = () => (
  <Wrapper>
    <BpkBox width="50%" minHeight="6rem">
      <span className={STYLES['bpk-layout-examples__outline']}>
        Box with 50% width and 6rem minHeight.
      </span>
    </BpkBox>
  </Wrapper>
);

/**
 * Responsive example – demonstrates breakpoint-based responsive layout props.
 *
 * @returns {JSX.Element} A box whose spacing changes across breakpoints.
 */
export const ResponsiveExample = () => (
  <Wrapper>
    <BpkBox
      display="flex"
      padding={{
        base: BpkSpacing.SM,
        mobile: BpkSpacing.Base,
        tablet: BpkSpacing.MD,
        desktop: BpkSpacing.LG,
      }}
      gap={{
        base: BpkSpacing.SM,
        mobile: BpkSpacing.Base,
        tablet: BpkSpacing.MD,
        desktop: BpkSpacing.LG,
      }}
    >
      <BpkBox>
        <span className={STYLES['bpk-layout-examples__outline']}>
          Responsive item 1
        </span>
      </BpkBox>
      <BpkBox>
        <span className={STYLES['bpk-layout-examples__outline']}>
          Responsive item 2
        </span>
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

/**
 * Position example – demonstrates top/left offsets using allowed values.
 *
 * @returns {JSX.Element} A relative box with an absolutely positioned child.
 */
export const PositionExample = () => (
  <Wrapper>
    <BpkBox padding={BpkSpacing.MD}>
      <BpkBox position="relative" width="10rem" minHeight="6rem">
        <span className={STYLES['bpk-layout-examples__outline']}>
          Relative box (10rem x 6rem)
        </span>
        <BpkBox position="absolute" top="12rem" left="6rem">
          <span className={STYLES['bpk-layout-examples__outline']}>
            Positioned child (top/left from 12rem, 6rem)
          </span>
        </BpkBox>
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

/**
 * Flexbox example – demonstrates using BpkBox as a flex container.
 *
 * @returns {JSX.Element} A flex row with evenly spaced items.
 */
export const FlexExample = () => (
  <Wrapper>
    <BpkBox
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      padding={BpkSpacing.MD}
    >
      {[1, 2, 3].map((i) => (
        <BpkBox key={i} padding={BpkSpacing.SM}>
          <span className={STYLES['bpk-layout-examples__outline']}>
            Flex item {i}
          </span>
        </BpkBox>
      ))}
    </BpkBox>
  </Wrapper>
);

/**
 * Grid example – demonstrates using BpkBox as a grid container.
 *
 * @returns {JSX.Element} A simple three-column grid.
 */
export const GridExample = () => (
  <Wrapper>
    <BpkBox
      display="grid"
      gridTemplateColumns="repeat(3, minmax(0, 1fr))"
      gap={BpkSpacing.MD}
      padding={BpkSpacing.MD}
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <BpkBox key={i} padding={BpkSpacing.SM}>
          <span className={STYLES['bpk-layout-examples__outline']}>
            Grid cell {i}
          </span>
        </BpkBox>
      ))}
    </BpkBox>
  </Wrapper>
);

type ColorSwatch = { label: string; value: BpkBoxBackgroundColor };

const SURFACE_SWATCHES: ColorSwatch[] = [
  { label: 'surfaceDefault', value: BACKGROUND_COLORS.surfaceDefault },
  { label: 'surfaceElevated', value: BACKGROUND_COLORS.surfaceElevated },
  { label: 'surfaceLowContrast', value: BACKGROUND_COLORS.surfaceLowContrast },
  { label: 'surfaceSubtle', value: BACKGROUND_COLORS.surfaceSubtle },
  { label: 'surfaceTint', value: BACKGROUND_COLORS.surfaceTint },
  { label: 'surfaceHighlight', value: BACKGROUND_COLORS.surfaceHighlight },
  { label: 'surfaceHero', value: BACKGROUND_COLORS.surfaceHero },
  { label: 'surfaceContrast', value: BACKGROUND_COLORS.surfaceContrast },
];

const STATUS_FILL_SWATCHES: ColorSwatch[] = [
  { label: 'statusSuccessFill', value: BACKGROUND_COLORS.statusSuccessFill },
  { label: 'statusDangerFill', value: BACKGROUND_COLORS.statusDangerFill },
  { label: 'statusWarningFill', value: BACKGROUND_COLORS.statusWarningFill },
];

const CANVAS_SWATCHES: ColorSwatch[] = [
  { label: 'canvas', value: BACKGROUND_COLORS.canvas },
  { label: 'canvasContrast', value: BACKGROUND_COLORS.canvasContrast },
];

const SwatchGrid = ({ columns, swatches }: { columns: number; swatches: ColorSwatch[] }) => (
  <BpkBox padding={BpkSpacing.MD}>
    <BpkBox
      display="grid"
      gridTemplateColumns={`repeat(${columns}, minmax(0, 1fr))`}
      gap={BpkSpacing.SM}
    >
      {swatches.map(({ label, value }) => (
        <BpkBox
          key={label}
          backgroundColor={value}
          padding={BpkSpacing.MD}
          minHeight="5rem"
        >
          <span className={STYLES['bpk-layout-examples__outline']}>{label}</span>
        </BpkBox>
      ))}
    </BpkBox>
  </BpkBox>
);

/**
 * Surface background color swatches – shows all surface tokens available for backgroundColor.
 *
 * @returns {JSX.Element} A grid of surface color swatches.
 */
export const SurfaceBackgroundColorExample = () => (
  <Wrapper>
    <SwatchGrid columns={4} swatches={SURFACE_SWATCHES} />
  </Wrapper>
);

/**
 * Status fill background color swatches – shows status fill tokens for backgroundColor.
 *
 * @returns {JSX.Element} A grid of status fill color swatches.
 */
export const StatusFillBackgroundColorExample = () => (
  <Wrapper>
    <SwatchGrid columns={3} swatches={STATUS_FILL_SWATCHES} />
  </Wrapper>
);

/**
 * Canvas background color swatches – shows canvas tokens for backgroundColor.
 *
 * @returns {JSX.Element} A grid of canvas color swatches.
 */
export const CanvasBackgroundColorExample = () => (
  <Wrapper>
    <SwatchGrid columns={2} swatches={CANVAS_SWATCHES} />
  </Wrapper>
);

const TEXT_COLOR_SWATCHES = Object.entries(TEXT_COLORS).map(([label, value]) => ({
  label,
  value,
}));

/**
 * Text color example – shows all TEXT_COLORS tokens available for the color prop.
 *
 * @returns {JSX.Element} A grid of text color swatches.
 */
export const ColorExample = () => (
  <Wrapper>
    <BpkBox
      display="grid"
      gridTemplateColumns="repeat(3, minmax(0, 1fr))"
      gap={BpkSpacing.SM}
      padding={BpkSpacing.MD}
    >
      {TEXT_COLOR_SWATCHES.map(({ label, value }) => (
        <BpkBox key={label} color={value} padding={BpkSpacing.SM}>
          <span className={STYLES['bpk-layout-examples__outline']}>{label}</span>
        </BpkBox>
      ))}
    </BpkBox>
  </Wrapper>
);

/**
 * Mixed visual regression example – used for Percy/visual tests.
 *
 * @returns {JSX.Element} A wrapper containing all Box examples for visual regression.
 */
export const MixedExample = () => (
  <Wrapper>
    <SpacingExample />
    <RtlSpacingExample />
    <SizeExample />
    <ResponsiveExample />
    <PositionExample />
    <FlexExample />
    <GridExample />
  </Wrapper>
);


