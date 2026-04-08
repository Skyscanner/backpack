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
  BpkHStack,
  BpkSpacing,
  BpkStack,
  BpkVStack,
} from '../../packages/bpk-component-layout';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../packages/bpk-component-text';

import Wrapper from './layout-wrapper';

import STYLES from './examples.module.scss';

const outline = STYLES['bpk-layout-examples__outline'];

export const BpkStackExample = () => (
  <Wrapper>
    <BpkStack gap={BpkSpacing.SM}>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkStack>
  </Wrapper>
);

export const BpkStackDirectionExample = () => (
  <Wrapper>
    <BpkStack gap={BpkSpacing.SM} direction="row">
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkStack>
  </Wrapper>
);

export const BpkHStackExample = () => (
  <Wrapper>
    <BpkHStack gap={BpkSpacing.SM}>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkHStack>
  </Wrapper>
);

export const BpkVStackExample = () => (
  <Wrapper>
    <BpkVStack gap={BpkSpacing.SM}>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkVStack>
  </Wrapper>
);

export const BpkStackResponsiveExample = () => (
  <Wrapper>
    <BpkStack
      gap={BpkSpacing.SM}
      direction={{
        'small-mobile': 'column',
        mobile: 'column',
        tablet: 'row',
        desktop: 'row',
      }}
    >
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
      <BpkBox height="2rem" width="100%"><span className={outline} /></BpkBox>
    </BpkStack>
  </Wrapper>
);

/**
 * Layout utilities example – demonstrates position, overflow, zIndex, and aria-* on BpkStack.
 *
 * @returns {JSX.Element} A stack container that clips overflow and acts as an aria landmark.
 */
export const BpkStackLayoutPropsExample = () => (
  <Wrapper>
    <BpkBox padding={BpkSpacing.SM} marginBottom={BpkSpacing.MD}>
      <BpkText textStyle={TEXT_STYLES.label2}>overflow=&quot;hidden&quot; — clips stacked items beyond fixed height</BpkText>
      <BpkStack
        gap={BpkSpacing.SM}
        overflow="hidden"
        height="6rem"
        padding={BpkSpacing.SM}
        role="region"
        aria-label="Clipping stack container"
        marginTop={BpkSpacing.SM}
      >
        <BpkBox height="2rem" width="100%"><span className={outline}>Item 1</span></BpkBox>
        <BpkBox height="2rem" width="100%"><span className={outline}>Item 2</span></BpkBox>
        <BpkBox height="2rem" width="100%"><span className={outline}>Item 3 — clipped</span></BpkBox>
        <BpkBox height="2rem" width="100%"><span className={outline}>Item 4 — clipped</span></BpkBox>
      </BpkStack>
    </BpkBox>

    <BpkBox padding={BpkSpacing.SM}>
      <BpkText textStyle={TEXT_STYLES.label2}>position=&quot;relative&quot; + zIndex — layered stack containers</BpkText>
      <BpkStack position="relative" width="14rem" height="5rem" marginTop={BpkSpacing.SM} gap={BpkSpacing.SM}>
        <BpkStack
          position="absolute"
          top="0rem"
          left="0rem"
          width="10rem"
          height="3rem"
          padding={BpkSpacing.SM}
          zIndex={1}
          gap={BpkSpacing.SM}
          backgroundColor={BACKGROUND_COLORS.surfaceDefault}
        >
          <BpkText>z-index: 1</BpkText>
        </BpkStack>
        <BpkStack
          position="absolute"
          top="1rem"
          left="2rem"
          width="10rem"
          height="3rem"
          padding={BpkSpacing.SM}
          zIndex={2}
          gap={BpkSpacing.SM}
          backgroundColor={BACKGROUND_COLORS.surfaceElevated}
        >
          <BpkText>z-index: 2 (in front)</BpkText>
        </BpkStack>
      </BpkStack>
    </BpkBox>
  </Wrapper>
);

export const BpkStackColorExample = () => (
  <Wrapper>
    <BpkStack gap={BpkSpacing.SM}>
      <BpkStack padding={BpkSpacing.SM} color={TEXT_COLORS.textPrimary} backgroundColor={BACKGROUND_COLORS.surfaceElevated}>
        <BpkText>surfaceElevated + textPrimary</BpkText>
      </BpkStack>
      <BpkStack padding={BpkSpacing.SM} color={TEXT_COLORS.textPrimary} backgroundColor={BACKGROUND_COLORS.statusDangerFill}>
        <BpkText>statusDangerFill + textPrimary</BpkText>
      </BpkStack>
    </BpkStack>
  </Wrapper>
);
