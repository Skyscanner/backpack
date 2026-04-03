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
import BpkThumbButton from '../../bpk-component-thumb-button/src/BpkThumbButton';

import { useAiBlurbVariant } from './BpkAiBlurbVariant';
import { AI_BLURB_VARIANTS } from './common-types';

type BpkAiBlurbFooterProps = {
  children: ReactNode;
  onThumbsDown?: () => void;
  onThumbsUp?: () => void;
};

const BpkAiBlurbFooter = ({ children, onThumbsDown, onThumbsUp }: BpkAiBlurbFooterProps) => {
  const variant = useAiBlurbVariant();

  if (variant === AI_BLURB_VARIANTS.thinking) {
    return null;
  }

  return (
    <BpkCardV2.Footer padding={BpkSpacing.None} paddingTop={BpkSpacing.MD} inline direction="row" align="center" gap={BpkSpacing.SM}>
      <BpkText textStyle={TEXT_STYLES.bodyDefault} color={TEXT_COLORS.textPrimary}>
        {children}
      </BpkText>
      <BpkThumbButton type="up" accessibilityLabel="Helpful" onClick={() => onThumbsUp?.()} />
      <BpkThumbButton type="down" accessibilityLabel="Not helpful" onClick={() => onThumbsDown?.()} />
    </BpkCardV2.Footer>
  );
};

export default BpkAiBlurbFooter;
export type { BpkAiBlurbFooterProps };
