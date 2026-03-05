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

import { BpkButtonV2, BUTTON_TYPES } from '../../packages/bpk-component-button';
import {
  BpkBox,
  BpkSpacing,
  BpkStack,
  BpkVStack,
  BpkHStack,
} from '../../packages/bpk-component-layout';

import Wrapper from './layout-wrapper';

import STYLES from './examples.module.scss';

const Item = ({ label }: { label: string }) => (
  <div className={STYLES['bpk-layout-examples__item']}>
    <BpkBox padding={BpkSpacing.SM} minHeight="3rem">
      <span className={STYLES['bpk-layout-examples__outline']}>{label}</span>
    </BpkBox>
  </div>
);
// Content block component using BpkBox
const ContentBlock = ({
  description,
  title,
}: {
  title: string;
  description: string;
}) => (
  <div className={STYLES['bpk-layout-examples__item']}>
    <BpkBox padding={BpkSpacing.MD} minHeight="6rem">
      <BpkVStack gap={BpkSpacing.SM}>
        <BpkBox fontWeight="bold">{title}</BpkBox>
        <BpkBox>{description}</BpkBox>
      </BpkVStack>
    </BpkBox>
  </div>
);

// 1) Vertical stack of content blocks
export const VerticalContentBlocksExample = () => (
  <Wrapper>
    <BpkVStack gap={BpkSpacing.LG}>
      <ContentBlock
        title="Content Block 1"
        description="Vertical stack with large gap"
      />
      <ContentBlock
        title="Content Block 2"
        description="Vertical stack with large gap"
      />
      <ContentBlock
        title="Content Block 3"
        description="Vertical stack with large gap"
      />
    </BpkVStack>
  </Wrapper>
);

// 2) Horizontal stack of buttons
export const HorizontalButtonsExample = () => (
  <Wrapper>
    <BpkHStack gap={BpkSpacing.MD}>
      <BpkButtonV2 type={BUTTON_TYPES.primary}>Primary</BpkButtonV2>
      <BpkButtonV2 type={BUTTON_TYPES.secondary}>Secondary</BpkButtonV2>
      <BpkButtonV2 type={BUTTON_TYPES.link}>Link</BpkButtonV2>
      <BpkButtonV2 type={BUTTON_TYPES.destructive}>Delete</BpkButtonV2>
    </BpkHStack>
  </Wrapper>
);

// 3) Nested Stack example
export const NestedStackExample = () => (
  <Wrapper>
    <BpkVStack gap={BpkSpacing.LG}>
      <ContentBlock
        title="Main Section"
        description="Vertical stack with large gap containing nested stacks"
      />
      <BpkHStack gap={BpkSpacing.MD} align="center">
        <BpkVStack gap={BpkSpacing.SM} justify="center">
          <ContentBlock
            title="Nested Column 1"
            description="Vertical stack with small gap and justify center"
          />
          <ContentBlock
            title="Nested Column 1 - Item 2"
            description="Vertical stack with small gap and justify center"
          />
        </BpkVStack>
        <BpkVStack gap={BpkSpacing.SM} justify="center">
          <ContentBlock
            title="Nested Column 2"
            description="Vertical stack with small gap and justify center"
          />
          <BpkHStack gap={BpkSpacing.SM}>
            <BpkButtonV2 type={BUTTON_TYPES.secondary}>Horizontal stack with small gap</BpkButtonV2>
            <BpkButtonV2 type={BUTTON_TYPES.secondary}>Horizontal stack with small gap</BpkButtonV2>
          </BpkHStack>
        </BpkVStack>
      </BpkHStack>
    </BpkVStack>
  </Wrapper>
);

// 4) Default vertical stack
export const StackDefaultExample = () => (
  <Wrapper>
    <BpkStack gap={BpkSpacing.LG}>
      <Item label="Default Stack Item 1" />
      <Item label="Default Stack Item 2" />
      <Item label="Default Stack Item 3" />
    </BpkStack>
  </Wrapper>
);

// 5) Horizontal stack (row)
export const StackHorizontalExample = () => (
  <Wrapper>
    <BpkStack gap={BpkSpacing.MD} direction="row">
      <Item label="Horizontal Item 1" />
      <Item label="Horizontal Item 2" />
      <Item label="Horizontal Item 3" />
    </BpkStack>
  </Wrapper>
);

// 6) HStack (row with center align)
export const HStackExample = () => (
  <Wrapper>
    <BpkHStack gap={BpkSpacing.SM}>
      <Item label="HStack Item 1" />
      <Item label="HStack Item 2" />
      <Item label="HStack Item 3" />
    </BpkHStack>
  </Wrapper>
);

// 7) VStack (column)
export const VStackExample = () => (
  <Wrapper>
    <BpkVStack gap={BpkSpacing.SM}>
      <Item label="VStack Item 1" />
      <Item label="VStack Item 2" />
      <Item label="VStack Item 3" />
    </BpkVStack>
  </Wrapper>
);

// 8) Responsive direction
export const ResponsiveDirectionExample = () => (
  <Wrapper>
    <BpkStack
      gap={{
        "small-mobile": BpkSpacing.SM,
        tablet: BpkSpacing.LG,
        desktop: BpkSpacing.XL,
      }}
      width={{
        "small-mobile": '100%',
        tablet: '50%',
        desktop: '25%',
      }}
      direction={{
        "small-mobile": 'column',
        mobile: 'column',
        tablet: 'row',
        desktop: 'row',
      }}
    >
      <Item label="Item 1 - vertically arranged in mobile, horizontally in tablet and above" />
      <Item label="Item 2 - total width 100% on mobile, 50% on tablet, 25% on desktop" />
      <Item label="Item 3 - small gap on mobile, large gap on tablet, xl on desktop" />
    </BpkStack>
  </Wrapper>
);
