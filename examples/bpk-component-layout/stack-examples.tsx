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
import BpkText, { TEXT_COLORS } from '../../packages/bpk-component-text';

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
