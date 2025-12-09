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
  BpkStack,
  BpkVStack,
  BpkHStack,
} from '../../packages/bpk-component-layout';

// Shared wrapper to provide BpkProvider context
const Wrapper = ({ children }: { children: ReactNode }) => (
  <BpkProvider>{children}</BpkProvider>
);

// const Item = ({ label }: { label: string }) => (
//   <BpkBox padding={BpkSpacing.SM} minHeight="6rem">
//     {label}
//   </BpkBox>
// );
const Item = ({ height,label, width }: { width?: string, label: string; height?: string }) => (
  <div style={{ height: height || '3rem', background: 'blue', width: width || '100%' }}>{label}</div>
);

// 1) Default vertical stack
export const StackDefaultExample = () => (
  <Wrapper>
    <BpkStack spacing={BpkSpacing.LG}>
      <Item label="Item 1" width="5rem" />
      <Item label="Item 2" width="10rem" />
      <Item label="Item 3" width="15rem" />
    </BpkStack>
  </Wrapper>
);

// 2) Horizontal stack (row)
export const StackHorizontalExample = () => (
  <Wrapper>
    <BpkStack spacing={BpkSpacing.MD} direction="row">
      <Item label="Item 1" height="1rem" />
      <Item label="Item 2" height="2rem" />
      <Item label="Item 3" height="3rem" />
    </BpkStack>
  </Wrapper>
);

// 3) HStack (row with center align)
export const HStackExample = () => (
  <Wrapper>
    <BpkHStack spacing={BpkSpacing.SM}>
      <Item label="Item 1" height="1rem" />
      <Item label="Item 2" height="2rem" />
      <Item label="Item 3" height="3rem" />
    </BpkHStack>
  </Wrapper>
);

// 4) VStack (column)
export const VStackExample = () => (
  <Wrapper>
    <BpkVStack spacing={BpkSpacing.SM}>
      <Item label="Item 1" width="5rem" />
      <Item label="Item 2" width="10rem" />
      <Item label="Item 3" width="15rem" />
    </BpkVStack>
  </Wrapper>
);

// 5) Responsive direction
export const ResponsiveDirectionExample = () => (
  <Wrapper>
    <BpkStack
      wrap="i like to wrap"
      gap={{mobile:'bpk-spacing-base', tablet:'bpk-spacing-lg', desktop:'bpk-spacing-xl'}}
      width={{mobile:'100%', tablet:'50%', desktop:'25%'}}
      direction={{
        mobile: 'column',
        tablet: 'row',
        desktop: 'row',
      }}
    >
      <Item label="Item 1" height="1rem" width="5rem"/>
      <Item label="Item 2" height="2rem" width="10rem"/>
      <Item label="Item 3" height="3rem" width="15rem"/>
    </BpkStack>
  </Wrapper>
);
