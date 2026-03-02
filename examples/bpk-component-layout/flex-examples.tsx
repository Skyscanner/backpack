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
  BpkFlex,
  BpkSpacing,
} from '../../packages/bpk-component-layout';

import Wrapper from './layout-wrapper';

import STYLES from './examples.module.scss';

export const BpkFlexExample = () => (
  <Wrapper>
    <BpkFlex
      direction="row"
      justify="space-between"
      align="center"
      padding={BpkSpacing.MD}
    >
      {[1, 2, 3].map((i) => (
        <BpkBox key={i} padding={BpkSpacing.SM}>
          <span className={STYLES['bpk-layout-examples__outline']}>
            Flex item {i}
          </span>
        </BpkBox>
      ))}
    </BpkFlex>
  </Wrapper>
);

export const BpkFlexDirectionExample = () => (
  <Wrapper>
    <BpkFlex direction="column" gap={BpkSpacing.MD} padding={BpkSpacing.MD}>
      <BpkBox padding={BpkSpacing.SM}>
        <span className={STYLES['bpk-layout-examples__outline']}>
          Column item 1
        </span>
      </BpkBox>
      <BpkBox padding={BpkSpacing.SM}>
        <span className={STYLES['bpk-layout-examples__outline']}>
          Column item 2
        </span>
      </BpkBox>
    </BpkFlex>
  </Wrapper>
);

export const BpkFlexWrapExample = () => (
  <Wrapper>
    <BpkFlex
      wrap="wrap"
      gap={BpkSpacing.MD}
      padding={BpkSpacing.MD}
      width="100%"
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <BpkBox key={i} padding={BpkSpacing.MD} width="10rem">
          <span className={STYLES['bpk-layout-examples__outline']}>
            Wrap Item {i}
          </span>
        </BpkBox>
      ))}
    </BpkFlex>
  </Wrapper>
);

export const BpkFlexResponsiveExample = () => (
  <Wrapper>
    <BpkFlex
      direction={{ mobile: 'column', tablet: 'row' }}
      justify={{ mobile: 'flex-start', desktop: 'space-between' }}
      gap={BpkSpacing.MD}
      padding={BpkSpacing.MD}
    >
      {[1, 2, 3].map((i) => (
        <BpkBox key={i} padding={BpkSpacing.SM}>
          <span className={STYLES['bpk-layout-examples__outline']}>
            Responsive Item {i}
          </span>
        </BpkBox>
      ))}
    </BpkFlex>
  </Wrapper>
);

export const BpkFlexItemExample = () => (
  <Wrapper>
    <BpkFlex gap={BpkSpacing.MD} padding={BpkSpacing.MD} width="100%">
      <BpkFlex
        grow={1}
        padding={BpkSpacing.MD}
        justify="center"
        align="center"
      >
        <BpkBox padding={BpkSpacing.SM} width="100%">
          <span className={STYLES['bpk-layout-examples__outline']}>
            Grow: 1
          </span>
        </BpkBox>
      </BpkFlex>
      <BpkFlex
        grow={2}
        padding={BpkSpacing.MD}
        justify="center"
        align="center"
      >
        <BpkBox padding={BpkSpacing.SM} width="100%">
          <span className={STYLES['bpk-layout-examples__outline']}>
            Grow: 2
          </span>
        </BpkBox>
      </BpkFlex>
      <BpkFlex
        basis="12.5rem"
        shrink={0}
        padding={BpkSpacing.MD}
        justify="center"
        align="center"
      >
        <BpkBox padding={BpkSpacing.SM} width="100%">
          <span className={STYLES['bpk-layout-examples__outline']}>
            Basis: 200px, Shrink: 0
          </span>
        </BpkBox>
      </BpkFlex>
    </BpkFlex>
  </Wrapper>
);

export const BpkFlexInlineExample = () => (
  <Wrapper>
    <BpkBox padding={BpkSpacing.MD}>
      <BpkFlex
        inline
        gap={BpkSpacing.SM}
        padding={BpkSpacing.SM}
      >
        <BpkBox padding={BpkSpacing.SM}>
          <span className={STYLES['bpk-layout-examples__outline']}>
            Inline Flex 1
          </span>
        </BpkBox>
        <BpkBox padding={BpkSpacing.SM}>
          <span className={STYLES['bpk-layout-examples__outline']}>
            Inline Flex 2
          </span>
        </BpkBox>
      </BpkFlex>
      {' '}
      <span>Text adjacent to inline flex</span>
    </BpkBox>
  </Wrapper>
);
