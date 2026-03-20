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

import { useCallback } from 'react';
import type { KeyboardEvent } from 'react';

import { coreAccentDay, iconSizeSm } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { BpkCardV2, CARD_V2_SURFACE_COLORS, CARD_V2_VARIANTS } from '../../bpk-component-card';
import { withAlignment } from '../../bpk-component-icon';
import SearchIcon from '../../bpk-component-icon/sm/search';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../bpk-component-text';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkPromptRoot.module.scss';

const getClassName = cssModules(STYLES);

const AlignedSearch = withAlignment(SearchIcon, iconSizeSm, iconSizeSm);

export type BpkPromptRootProps = {
  promptText: string;
  onClick?: (promptText: string) => void;
};

const BpkPromptRoot = ({ onClick, promptText }: BpkPromptRootProps) => {
  const handleClick = useCallback(() => {
    onClick?.(promptText);
  }, [onClick, promptText]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.(promptText);
      }
    },
    [onClick, promptText],
  );

  return (
    <BpkCardV2.Root
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      bgColor={CARD_V2_SURFACE_COLORS.surfaceLowContrast}
      variant={CARD_V2_VARIANTS.carsPrompt}
      aria-label={promptText}
      {...getDataComponentAttribute('Prompt')}
      data-testid="bpk-prompt"
    >
      {/*
       * Plain divs are used here because the content wrapper requires CSS-only
       * properties (touch-action, user-select, text-align) and responsive
       * min-dimensions that cannot be expressed as BpkFlex/BpkBox props, and
       * the forbid-component-props ESLint rule forbids className on React
       * components.
       */}
      <div className={getClassName('bpk-prompt__content')}>
        <AlignedSearch fill={coreAccentDay} aria-hidden="true" />
        <div className={getClassName('bpk-prompt__text-wrapper')}>
          <BpkText
            textStyle={TEXT_STYLES.sm}
            tagName="span"
            color={TEXT_COLORS.textPrimary}
          >
            {promptText}
          </BpkText>
        </div>
      </div>
    </BpkCardV2.Root>
  );
};

BpkPromptRoot.displayName = 'BpkPrompt.Root';

export default BpkPromptRoot;
