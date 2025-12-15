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
  BpkSpacing,
} from '../../packages/bpk-component-layout';

import { Wrapper } from './layout-wrapper';

import STYLES from './examples.module.scss';

/**
 * Core layout example – demonstrates basic spacing usage.
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
 */
export const RtlSpacingExample = () => (
  <Wrapper>
    <div dir="rtl">
      <BpkBox
        paddingInline={BpkSpacing.MD}
        marginInline={BpkSpacing.MD}
        paddingTop={BpkSpacing.MD}
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
 */
export const ResponsiveExample = () => (
  <Wrapper>
    <BpkBox
      display="flex"
      padding={{
        mobile: BpkSpacing.SM,
        tablet: BpkSpacing.MD,
        desktop: BpkSpacing.LG,
      }}
      gap={BpkSpacing.SM}
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

/**
 * Mixed visual regression example – used for Percy/visual tests.
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


