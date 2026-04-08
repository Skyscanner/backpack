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
  BpkGrid,
  BpkGridItem,
  BpkSpacing,
} from '../../packages/bpk-component-layout';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../packages/bpk-component-text';

import Wrapper from './layout-wrapper';

import STYLES from './examples.module.scss';

const outline = STYLES['bpk-layout-examples__outline'];

export const BpkGridExample = () => (
  <Wrapper>
    <BpkGrid templateColumns="repeat(3, 1fr)" gap={BpkSpacing.MD}>
      <BpkBox height="6rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="6rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="6rem" width="100%"><span className={outline} /></BpkBox>
    </BpkGrid>
  </Wrapper>
);

export const BpkGridSpanExample = () => (
  <Wrapper>
    <BpkGrid templateColumns="repeat(4, 1fr)" gap={BpkSpacing.MD}>
      <BpkGridItem colSpan={2}>
        <BpkBox height="6rem">
          <span className={outline} />
        </BpkBox>
      </BpkGridItem>
      <BpkGridItem colSpan={1}>
        <BpkBox height="6rem">
          <span className={outline} />
        </BpkBox>
      </BpkGridItem>
      <BpkGridItem colSpan={1}>
        <BpkBox height="6rem">
          <span className={outline} />
        </BpkBox>
      </BpkGridItem>
    </BpkGrid>
  </Wrapper>
);

export const BpkGridBentoBoxExample = () => (
  <Wrapper>
    <BpkGrid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={BpkSpacing.MD}
    >
      <BpkGridItem rowSpan={2} colSpan={1}>
         <BpkBox width="100%" height="100%">
          <span className={outline}>rowSpan=2</span>
        </BpkBox>
      </BpkGridItem>
      <BpkGridItem colSpan={2}>
        <BpkBox width="100%" height="6rem">
          <span className={outline}>colSpan=2</span>
        </BpkBox>
      </BpkGridItem>
      <BpkGridItem colSpan={2}>
        <BpkBox width="100%" height="6rem">
          <span className={outline}>colSpan=2</span>
        </BpkBox>
      </BpkGridItem>

      <BpkGridItem colSpan={4}>
        <BpkBox width="100%" height="6rem">
          <span className={outline}>colSpan=4</span>
        </BpkBox>
      </BpkGridItem>
    </BpkGrid>
  </Wrapper>
);

/**
 * Layout utilities example – demonstrates position, overflow, zIndex, and aria-* on BpkGrid.
 *
 * @returns {JSX.Element} A grid container clipping overflowing rows, with aria-label.
 */
export const BpkGridLayoutPropsExample = () => (
  <Wrapper>
    <BpkBox padding={BpkSpacing.SM} marginBottom={BpkSpacing.MD}>
      <BpkText textStyle={TEXT_STYLES.label2}>overflow=&quot;hidden&quot; — clips rows that exceed the fixed height</BpkText>
      <BpkGrid
        templateColumns="repeat(3, 1fr)"
        gap={BpkSpacing.SM}
        overflow="hidden"
        height="8rem"
        role="region"
        aria-label="Clipping grid container"
        marginTop={BpkSpacing.SM}
      >
        <BpkBox height="3rem"><span className={outline}>Row 1</span></BpkBox>
        <BpkBox height="3rem"><span className={outline}>Row 1</span></BpkBox>
        <BpkBox height="3rem"><span className={outline}>Row 1</span></BpkBox>
        <BpkBox height="3rem"><span className={outline}>Row 2 — clipped</span></BpkBox>
        <BpkBox height="3rem"><span className={outline}>Row 2 — clipped</span></BpkBox>
        <BpkBox height="3rem"><span className={outline}>Row 2 — clipped</span></BpkBox>
      </BpkGrid>
    </BpkBox>

    <BpkBox padding={BpkSpacing.SM}>
      <BpkText textStyle={TEXT_STYLES.label2}>position=&quot;relative&quot; + zIndex — layered grid containers</BpkText>
      <BpkGrid position="relative" width="14rem" height="5rem" marginTop={BpkSpacing.SM} templateColumns="1fr">
        <BpkGridItem>
          <BpkBox
            position="absolute"
            top="0rem"
            left="0rem"
            width="10rem"
            height="3rem"
            padding={BpkSpacing.SM}
            zIndex={1}
            backgroundColor={BACKGROUND_COLORS.surfaceDefault}
          >
            <BpkText>z-index: 1</BpkText>
          </BpkBox>
          <BpkBox
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
          </BpkBox>
        </BpkGridItem>
      </BpkGrid>
    </BpkBox>
  </Wrapper>
);

export const BpkGridColorExample = () => (
  <Wrapper>
    <BpkGrid templateColumns="repeat(3, 1fr)" gap={BpkSpacing.SM}>
      <BpkGridItem backgroundColor={BACKGROUND_COLORS.surfaceDefault} padding={BpkSpacing.SM}>
        <BpkText color={TEXT_COLORS.textPrimary}>surfaceDefault</BpkText>
      </BpkGridItem>
      <BpkGridItem backgroundColor={BACKGROUND_COLORS.canvasContrast} padding={BpkSpacing.SM}>
        <BpkText color={TEXT_COLORS.textPrimary}>canvasContrast</BpkText>
      </BpkGridItem>
      <BpkGridItem backgroundColor={BACKGROUND_COLORS.statusWarningFill} padding={BpkSpacing.SM}>
        <BpkText color={TEXT_COLORS.textPrimary}>statusWarningFill</BpkText>
      </BpkGridItem>
    </BpkGrid>
  </Wrapper>
);
