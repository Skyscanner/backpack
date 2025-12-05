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
  BpkColor,
  BpkSpacing,
  BpkBorderWidth,
  BpkShadow,
} from '../../packages/bpk-component-layout';

export const Wrapper = ({ children }: { children: ReactNode }) => (
  <BpkProvider>{children}</BpkProvider>
);

/**
 * Core layout example – demonstrates basic spacing & background usage.
 *
 * @returns {JSX.Element} A box with padding and margin using Backpack spacing tokens.
 */
export const SpacingExample = () => (
  <Wrapper>
    <BpkBox
      padding={BpkSpacing.MD}
      margin={BpkSpacing.MD}
      backgroundColor={BpkColor.SurfaceHighlight}
    >
      Default box with padding and margin using Backpack spacing tokens.
    </BpkBox>
  </Wrapper>
);

/**
 * Color example – demonstrates background & border color tokens.
 *
 * @returns {JSX.Element} A box using Backpack surface and border color tokens.
 */
export const ColorExample = () => (
  <Wrapper>
    <BpkBox
      padding={BpkSpacing.MD}
      backgroundColor={BpkColor.CoreAccent}
      color={BpkColor.TextOnDark}
      borderWidth={BpkBorderWidth.SM}
      borderStyle="solid"
      borderColor={BpkColor.CorePrimary}
    >
      Box using Backpack surface and border color tokens.
    </BpkBox>
  </Wrapper>
);

/**
 * Border & shadow example – demonstrates border width tokens + shadow tokens.
 *
 * @returns {JSX.Element} A box with tokenised border radius, border width and shadow.
 */
export const BorderAndShadowExample = () => (
  <Wrapper>
    <BpkBox
      padding={BpkSpacing.MD}
      backgroundColor={BpkColor.SurfaceDefault}
      borderRadius={BpkSpacing.MD}
      borderWidth={BpkBorderWidth.SM}
      borderStyle="solid"
      borderColor={BpkColor.Line}
      boxShadow={BpkShadow.SM}
    >
      Box with tokenised border radius, border width and shadow.
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
        backgroundColor={BpkColor.SurfaceHighlight}
        borderWidth={BpkBorderWidth.SM}
        borderStyle="solid"
        borderColor={BpkColor.Line}
      >
        Box using marginInline & paddingInline in RTL context.
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
    <BpkBox
      width="50%"
      minHeight="6rem"
      backgroundColor={BpkColor.SurfaceHighlight}
      borderWidth={BpkBorderWidth.SM}
      borderStyle="solid"
      borderColor={BpkColor.Line}
    >
      Box with 50% width and 6rem minHeight.
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
    <ColorExample />
    <BorderAndShadowExample />
    <RtlSpacingExample />
    <SizeExample />
  </Wrapper>
);
