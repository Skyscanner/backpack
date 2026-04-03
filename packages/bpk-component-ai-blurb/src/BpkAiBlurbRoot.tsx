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

import { BpkCardV2, CARD_V2_VARIANTS } from '../../bpk-component-card';

import { AiBlurbStateProvider } from './BpkAiBlurbState';
import { AI_BLURB_STATES } from './common-types';

import type { AiBlurbState } from './common-types';

type BpkAiBlurbRootProps = {
  children: ReactNode;
  state?: AiBlurbState;
};

const BpkAiBlurbRoot = ({ children, state = AI_BLURB_STATES.default }: BpkAiBlurbRootProps) => (
  <AiBlurbStateProvider value={state}>
    <BpkCardV2.Root variant={CARD_V2_VARIANTS.noElevation}>
      {children}
    </BpkCardV2.Root>
  </AiBlurbStateProvider>
);

export default BpkAiBlurbRoot;
export type { BpkAiBlurbRootProps };
