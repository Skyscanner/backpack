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


import type { ReactNode } from 'react';

import {
  BpkBox,
  BpkProvider,
  BpkSpacing,
} from '../../packages/bpk-component-layout';

import STYLES from './examples.module.scss';

export const Wrapper = ({ children }: { children: ReactNode }) => (
  <BpkProvider>{children}</BpkProvider>
);

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
      >
        <span className={STYLES['bpk-layout-examples__outline']}>
          Box using marginInline & paddingInline in RTL context.
        </span>
      </BpkBox>
    </div>
  </Wrapper>
);

/**
 * Size example – demonstrates width/height using spacing tokens and semantic values.
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
 * Mixed visual regression example – used for Percy/visual tests.
 *
 * @returns {JSX.Element} A wrapper containing all layout examples for visual regression.
 */
export const MixedExample = () => (
  <Wrapper>
    <SpacingExample />
    <RtlSpacingExample />
    <SizeExample />
    <PositionExample />
    <FlexExample />
    <GridExample />
  </Wrapper>
);

/**
 * Position example – demonstrates top/left offsets using spacing tokens.
 *
 * @returns {JSX.Element} A relative box with an absolutely positioned child.
 */
export const PositionExample = () => (
  <Wrapper>
    <BpkBox padding={BpkSpacing.MD}>
      <BpkBox
        position="relative"
        width="10rem"
        minHeight="6rem"
      >
        <span className={STYLES['bpk-layout-examples__outline']}>
          Relative box (10rem x 6rem)
        </span>
        <BpkBox
          position="absolute"
          top="12rem"
          left="6rem"
        >
          <span className={STYLES['bpk-layout-examples__outline']}>
            Positioned child (top/left from 12rem,10rem)
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
      <BpkBox padding={BpkSpacing.SM}>
        <span className={STYLES['bpk-layout-examples__outline']}>
          Flex item 1
        </span>
      </BpkBox>
      <BpkBox padding={BpkSpacing.SM}>
        <span className={STYLES['bpk-layout-examples__outline']}>
          Flex item 2
        </span>
      </BpkBox>
      <BpkBox padding={BpkSpacing.SM}>
        <span className={STYLES['bpk-layout-examples__outline']}>
          Flex item 3
        </span>
      </BpkBox>
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
      <BpkBox padding={BpkSpacing.SM}>
        <span className={STYLES['bpk-layout-examples__outline']}>
          Grid cell 1
        </span>
      </BpkBox>
      <BpkBox padding={BpkSpacing.SM}>
        <span className={STYLES['bpk-layout-examples__outline']}>
          Grid cell 2
        </span>
      </BpkBox>
      <BpkBox padding={BpkSpacing.SM}>
        <span className={STYLES['bpk-layout-examples__outline']}>
          Grid cell 3
        </span>
      </BpkBox>
      <BpkBox padding={BpkSpacing.SM}>
        <span className={STYLES['bpk-layout-examples__outline']}>
          Grid cell 4
        </span>
      </BpkBox>
      <BpkBox padding={BpkSpacing.SM}>
        <span className={STYLES['bpk-layout-examples__outline']}>
          Grid cell 5
        </span>
      </BpkBox>
      <BpkBox padding={BpkSpacing.SM}>
        <span className={STYLES['bpk-layout-examples__outline']}>
          Grid cell 6
        </span>
      </BpkBox>
    </BpkBox>
  </Wrapper>
);
