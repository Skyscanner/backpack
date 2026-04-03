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

import { BpkCardV2 } from '../../bpk-component-card';
import { BpkSpacing } from '../../bpk-component-layout/src/tokens';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../bpk-component-text/src/BpkText';

type BpkAiBlurbContentProps = { children: ReactNode; };

const BpkAiBlurbContent = ({ children }: BpkAiBlurbContentProps) => (
  <BpkCardV2.Body padding={BpkSpacing.None} paddingTop={BpkSpacing.MD}>
    <BpkText textStyle={TEXT_STYLES.bodyDefault} color={TEXT_COLORS.textPrimary}>
      {children}
    </BpkText>
  </BpkCardV2.Body>
);

export default BpkAiBlurbContent;
export type { BpkAiBlurbContentProps };
