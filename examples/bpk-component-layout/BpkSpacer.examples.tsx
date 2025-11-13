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

import { BpkBox, BpkFlex, BpkSpacer } from '../../packages/bpk-component-layout';

import { Wrapper } from './Wrapper';

/**
 * BpkSpacer Examples
 *
 * BpkSpacer is a component that creates flexible space between elements.
 * It automatically grows to fill available space in flex containers.
 */

export const Horizontal = () => (
  <Wrapper>
    <BpkFlex direction="row" padding="base" bg="canvas-contrast" borderRadius="md">
      <BpkBox padding="base" bg="surface-highlight" borderRadius="md">
        Item 1
      </BpkBox>
      <BpkSpacer />
      <BpkBox padding="base" bg="surface-default" borderRadius="md">
        Item 2 (pushed to the right by Spacer)
      </BpkBox>
    </BpkFlex>
  </Wrapper>
);

export const Vertical = () => (
  <Wrapper>
    <BpkFlex direction="column" padding="base" bg="canvas-contrast" borderRadius="md">
      <BpkBox padding="base" bg="surface-highlight" borderRadius="md">
        Item 1
      </BpkBox>
      <BpkSpacer />
      <BpkBox padding="base" bg="surface-default" borderRadius="md">
        Item 2 (pushed to the bottom by Spacer)
      </BpkBox>
    </BpkFlex>
  </Wrapper>
);

