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
  BpkGrid,
  BpkGridItem,
  BpkSpacing,
} from '../../packages/bpk-component-layout';

import Wrapper from './layout-wrapper';

export const BpkGridExample = () => (
  <Wrapper>
    <BpkGrid
      templateColumns="repeat(3, minmax(0, 1fr))"
      gap={BpkSpacing.MD}
      padding={BpkSpacing.MD}
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <BpkBox key={i} padding={BpkSpacing.SM}>
          Grid cell {i}
        </BpkBox>
      ))}
    </BpkGrid>
  </Wrapper>
);

export const BpkGridSpanExample = () => (
  <Wrapper>
    <BpkGrid
      templateColumns="repeat(3, 1fr)"
      gap={BpkSpacing.MD}
      padding={BpkSpacing.MD}
    >
      <BpkBox
        gridColumn="span 2"
        padding={BpkSpacing.MD}
      >
         <BpkBox width="100%" padding={BpkSpacing.SM}>
          Box: Span 2 Columns
        </BpkBox>
      </BpkBox>
      <BpkBox padding={BpkSpacing.MD}>
        Cell 2
      </BpkBox>
      <BpkBox
        gridRow="span 2"
        padding={BpkSpacing.MD}
      >
        <BpkBox width="100%" height="100%" padding={BpkSpacing.SM}>
          Box: Span 2 Rows
        </BpkBox>
      </BpkBox>
      <BpkBox padding={BpkSpacing.MD}>
        Cell 4
      </BpkBox>
      <BpkBox padding={BpkSpacing.MD}>
        Cell 5
      </BpkBox>
    </BpkGrid>
  </Wrapper>
);

export const BpkGridWithItemExample = () => (
  <Wrapper>
    <BpkGrid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={BpkSpacing.MD}
      padding={BpkSpacing.MD}
      minHeight="12.5rem"
    >
      <BpkGridItem
        rowSpan={2}
        colSpan={1}
        padding={BpkSpacing.SM}
      >
         <BpkBox width="100%" height="100%" padding={BpkSpacing.SM}>
          rowSpan=2
        </BpkBox>
      </BpkGridItem>
      <BpkGridItem
        colSpan={2}
        padding={BpkSpacing.SM}
      >
        <BpkBox width="100%" height="100%" padding={BpkSpacing.SM}>
          colSpan=2
        </BpkBox>
      </BpkGridItem>
      <BpkGridItem
        colSpan={2}
        padding={BpkSpacing.SM}
      >
        <BpkBox width="100%" height="100%" padding={BpkSpacing.SM}>
          colSpan=2
        </BpkBox>
      </BpkGridItem>

      <BpkGridItem
        colSpan={4}
        padding={BpkSpacing.SM}
      >
        <BpkBox width="100%" height="100%" padding={BpkSpacing.SM}>
          colSpan=4
        </BpkBox>
      </BpkGridItem>
    </BpkGrid>
  </Wrapper>
);

export const BpkGridResponsiveExample = () => (
  <Wrapper>
    <BpkGrid
      templateColumns={{
        mobile: 'repeat(1, 1fr)',
        tablet: 'repeat(2, 1fr)',
        desktop: 'repeat(4, 1fr)',
      }}
      gap={{
        mobile: BpkSpacing.SM,
        tablet: BpkSpacing.MD,
        desktop: BpkSpacing.LG,
      }}
      padding={BpkSpacing.MD}
    >
      {[1, 2, 3, 4].map((i) => (
        <BpkBox key={i} padding={BpkSpacing.SM}>
          <BpkBox width="100%" height="100%" padding={BpkSpacing.SM}>
            Responsive Col {i}
          </BpkBox>
        </BpkBox>
      ))}
    </BpkGrid>
  </Wrapper>
);
