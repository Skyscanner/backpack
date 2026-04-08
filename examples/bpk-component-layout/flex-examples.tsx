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
  BpkFlex,
  BpkSpacing,
} from '../../packages/bpk-component-layout';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../packages/bpk-component-text';

import Wrapper from './layout-wrapper';

import STYLES from './examples.module.scss';

const outline = STYLES['bpk-layout-examples__outline'];

export const BpkFlexExample = () => (
  <Wrapper>
    <BpkFlex gap={BpkSpacing.SM}>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkFlex>
  </Wrapper>
);

export const BpkFlexDirectionExample = () => (
  <Wrapper>
    <BpkFlex gap={BpkSpacing.SM} direction="column">
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkFlex>
  </Wrapper>
);

export const BpkFlexAlignExample = () => (
  <Wrapper>
    <BpkFlex gap={BpkSpacing.SM} align="center" height="10rem">
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="4rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkFlex>
  </Wrapper>
);

export const BpkFlexJustifyExample = () => (
  <Wrapper>
    <BpkFlex gap={BpkSpacing.SM} marginBottom={BpkSpacing.Base} justify="flex-start">
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
      <BpkBox width="8.5rem"><span className={outline}>flex-start</span></BpkBox>
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
    </BpkFlex>
    <BpkFlex gap={BpkSpacing.SM} marginBottom={BpkSpacing.Base} justify="center">
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
      <BpkBox width="8.5rem"><span className={outline}>center</span></BpkBox>
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
    </BpkFlex>
    <BpkFlex gap={BpkSpacing.SM} marginBottom={BpkSpacing.Base} justify="flex-end">
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
      <BpkBox width="8.5rem"><span className={outline}>flex-end</span></BpkBox>
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
    </BpkFlex>
    <BpkFlex gap={BpkSpacing.SM} marginBottom={BpkSpacing.Base} justify="space-between">
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
      <BpkBox width="8.5rem"><span className={outline}>space-between</span></BpkBox>
      <BpkBox width="8.5rem"><span className={outline} /></BpkBox>
    </BpkFlex>
  </Wrapper>
);

export const BpkFlexOrderExample = () => (
  <Wrapper>
    <BpkFlex gap={BpkSpacing.SM}>
      <BpkBox order={3} width="100%"><span className={outline}>1</span></BpkBox>
      <BpkBox order={1} width="100%"><span className={outline}>2</span></BpkBox>
      <BpkBox order={2} width="100%"><span className={outline}>3</span></BpkBox>
    </BpkFlex>
  </Wrapper>
);

export const BpkFlexWrapExample = () => (
  <Wrapper>
    <BpkFlex wrap="wrap" gap={BpkSpacing.SM} width="20rem">
      <BpkBox height="2rem" width="9rem"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="9rem"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="9rem"><span className={outline} /></BpkBox>
    </BpkFlex>
  </Wrapper>
);

/**
 * Layout utilities example – demonstrates position, overflow, zIndex, and aria-* on BpkFlex.
 *
 * @returns {JSX.Element} A flex container that clips overflowing content and uses aria-label.
 */
export const BpkFlexLayoutPropsExample = () => (
  <Wrapper>
    <BpkBox padding={BpkSpacing.SM} marginBottom={BpkSpacing.MD}>
      <BpkText textStyle={TEXT_STYLES.label2}>overflow=&quot;hidden&quot; — clips overflowing flex items</BpkText>
      <BpkFlex
        direction="column"
        gap={BpkSpacing.SM}
        overflow="hidden"
        width="12rem"
        height="6rem"
        padding={BpkSpacing.SM}
        role="region"
        aria-label="Clipping flex container"
        marginTop={BpkSpacing.SM}
      >
        <BpkText>Item 1</BpkText>
        <BpkText>Item 2</BpkText>
        <BpkText>Item 3 — clipped</BpkText>
        <BpkText>Item 4 — clipped</BpkText>
      </BpkFlex>
    </BpkBox>

    <BpkBox padding={BpkSpacing.SM}>
      <BpkText textStyle={TEXT_STYLES.label2}>position=&quot;relative&quot; + zIndex — layered flex containers</BpkText>
      <BpkFlex position="relative" width="14rem" height="5rem" marginTop={BpkSpacing.SM}>
        <BpkFlex
          position="absolute"
          top="0"
          left="0"
          width="10rem"
          height="3rem"
          padding={BpkSpacing.SM}
          zIndex={1}
          backgroundColor={BACKGROUND_COLORS.surfaceDefault}
        >
          <BpkText>z-index: 1</BpkText>
        </BpkFlex>
        <BpkFlex
          position="absolute"
          top="1rem"
          left="2rem"
          width="10rem"
          height="3rem"
          padding={BpkSpacing.SM}
          zIndex={2}
          backgroundColor={BACKGROUND_COLORS.surfaceElevated}
        >
          <BpkText>z-index: 2 (in front)</BpkText>
        </BpkFlex>
      </BpkFlex>
    </BpkBox>
  </Wrapper>
);

export const BpkFlexColorExample = () => (
  <Wrapper>
    <BpkFlex direction="column" gap={BpkSpacing.SM}>
      <BpkFlex padding={BpkSpacing.SM} color={TEXT_COLORS.textPrimary} backgroundColor={BACKGROUND_COLORS.surfaceDefault}>
        <BpkText>surfaceDefault + textPrimary</BpkText>
      </BpkFlex>
      <BpkFlex padding={BpkSpacing.SM} color={TEXT_COLORS.textOnDark} backgroundColor={BACKGROUND_COLORS.surfaceHero}>
        <BpkText>surfaceHero + textOnDark</BpkText>
      </BpkFlex>
      <BpkFlex padding={BpkSpacing.SM} color={TEXT_COLORS.textPrimary} backgroundColor={BACKGROUND_COLORS.canvas}>
        <BpkText>canvas + textPrimary</BpkText>
      </BpkFlex>
      <BpkFlex padding={BpkSpacing.SM} color={TEXT_COLORS.textPrimary} backgroundColor={BACKGROUND_COLORS.statusSuccessFill}>
        <BpkText>statusSuccessFill + textPrimary</BpkText>
      </BpkFlex>
    </BpkFlex>
  </Wrapper>
);
