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

import { textSecondaryDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { BpkCardV2 } from '../../bpk-component-card';
import AiIcon from '../../bpk-component-icon/sm/ai';
import { BpkSpacing } from '../../bpk-component-layout/src/tokens';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../bpk-component-text/src/BpkText';

type BpkAiBlurbHeaderProps = { children: ReactNode; };

const BpkAiBlurbHeader = ({ children }: BpkAiBlurbHeaderProps) => (
  <BpkCardV2.Header padding={BpkSpacing.None} inline direction="row" align="center" gap={BpkSpacing.SM}>
    <AiIcon aria-hidden="true" fill={textSecondaryDay} />
    <BpkText textStyle={TEXT_STYLES.bodyDefault} color={TEXT_COLORS.textSecondary} tagName="span">
      {children}
    </BpkText>
  </BpkCardV2.Header>
);

export default BpkAiBlurbHeader;
export type { BpkAiBlurbHeaderProps };
