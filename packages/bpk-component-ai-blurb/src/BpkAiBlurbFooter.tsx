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

import BpkAiBase from '../../bpk-component-ai-base/src/BpkAiBase';
import BpkButton from '../../bpk-component-button/src/BpkButton';
import { BUTTON_TYPES } from '../../bpk-component-button/src/common-types';
import ThumbsDownIcon from '../../bpk-component-icon/sm/thumbs-down';
import ThumbsUpIcon from '../../bpk-component-icon/sm/thumbs-up';
import { BpkFlex } from '../../bpk-component-layout/src/BpkFlex';
import { BpkSpacing } from '../../bpk-component-layout/src/tokens';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../bpk-component-text/src/BpkText';

type BpkAiBlurbFooterProps = {
  children: ReactNode;
  onThumbsDown?: () => void;
  onThumbsUp?: () => void;
};

const BpkAiBlurbFooter = ({ children, onThumbsDown, onThumbsUp }: BpkAiBlurbFooterProps) => (
  <BpkAiBase.Footer>
    <BpkFlex inline direction="row" align="center" gap={BpkSpacing.SM}>
      <BpkText textStyle={TEXT_STYLES.bodyDefault} color={TEXT_COLORS.textPrimary}>
        {children}
      </BpkText>
      <BpkButton type={BUTTON_TYPES.link} iconOnly onClick={onThumbsUp} aria-label="Helpful">
        <ThumbsUpIcon />
      </BpkButton>
      <BpkButton type={BUTTON_TYPES.link} iconOnly onClick={onThumbsDown} aria-label="Not helpful">
        <ThumbsDownIcon />
      </BpkButton>
    </BpkFlex>
  </BpkAiBase.Footer>
);

export default BpkAiBlurbFooter;
export type { BpkAiBlurbFooterProps };
