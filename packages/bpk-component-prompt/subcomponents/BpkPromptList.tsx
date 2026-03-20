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

import { BpkFlex } from '../../bpk-component-layout';
import BpkMobileScrollContainer from '../../bpk-component-mobile-scroll-container';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import { BpkPromptContext } from './BpkPromptContext';

import STYLES from './BpkPromptList.module.scss';

const getClassName = cssModules(STYLES);

export type BpkPromptListProps = {
  children: ReactNode;
  onPromptClick?: (id: string, promptText: string) => void;
  showVisibleScrollbar?: boolean;
};

const BpkPromptList = ({
  children,
  onPromptClick,
  showVisibleScrollbar = false,
}: BpkPromptListProps) => (
  <BpkPromptContext.Provider value={{ onPromptClick }}>
    <BpkFlex
      direction="column"
      role="presentation"
      {...getDataComponentAttribute('Prompts')}
      data-testid="bpk-prompts"
    >
      {/*
       * A plain div is used here because the scroll wrapper requires a negative
       * margin for the tablet bleed effect, which BpkFlex/BpkBox do not support,
       * and the forbid-component-props ESLint rule forbids className on React
       * components.
       */}
      <div className={getClassName('bpk-prompt-list__scroll')}>
        <BpkMobileScrollContainer showScrollbar={showVisibleScrollbar}>
          <ul className={getClassName('bpk-prompt-list__list')} aria-label="Suggestions">
            {children}
          </ul>
        </BpkMobileScrollContainer>
      </div>
    </BpkFlex>
  </BpkPromptContext.Provider>
);

BpkPromptList.displayName = 'BpkPrompt.List';

export default BpkPromptList;
