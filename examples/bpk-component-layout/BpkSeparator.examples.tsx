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

import { BpkBox, BpkFlex, BpkSeparator, BPK_COLOR_TOKENS } from '../../packages/bpk-component-layout';

import Wrapper from './Wrapper';

/**
 * BpkSeparator Examples
 *
 * BpkSeparator is a component that creates a visual divider between content sections.
 * It can be horizontal or vertical.
 */

export const Horizontal = () => (
  <Wrapper>
    <BpkBox padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md">
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md" marginBottom="base">
        Content above separator
      </BpkBox>
      <BpkSeparator />
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md" marginTop="base">
        Content below separator
      </BpkBox>
    </BpkBox>
  </Wrapper>
);

export const Vertical = () => (
  <Wrapper>
    <BpkFlex direction="row" padding="base" bg={BPK_COLOR_TOKENS.canvasContrast} borderRadius="md" gap="base">
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceHighlight} borderRadius="md">
        Content left
      </BpkBox>
      <BpkSeparator orientation="vertical" />
      <BpkBox padding="base" bg={BPK_COLOR_TOKENS.surfaceDefault} borderRadius="md">
        Content right
      </BpkBox>
    </BpkFlex>
  </Wrapper>
);

