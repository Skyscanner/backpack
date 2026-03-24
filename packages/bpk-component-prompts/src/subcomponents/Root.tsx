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

import { BpkFlex } from '../../../bpk-component-layout';
import BpkMobileScrollContainer from '../../../bpk-component-mobile-scroll-container';
import { cssModules, getDataComponentAttribute } from '../../../bpk-react-utils';

import { PromptContext } from './Context';

import STYLES from './Root.module.scss';

const getClassName = cssModules(STYLES);

export type RootProps = {
  children: ReactNode;
  ariaLabel: string;
  onPromptClick?: (id: string, promptText: string) => void;
  showVisibleScrollbar?: boolean;
};

const Root = ({
  ariaLabel,
  children,
  onPromptClick,
  showVisibleScrollbar = false,
}: RootProps) => (
  <PromptContext.Provider value={{ onPromptClick }}>
    <BpkFlex
      direction="column"
      role="presentation"
      {...getDataComponentAttribute('Prompts')}
      data-testid="bpk-prompts"
    >
      <BpkMobileScrollContainer showScrollbar={showVisibleScrollbar}>
        <ul className={getClassName('bpk-prompt__list')} aria-label={ariaLabel}>
          {children}
        </ul>
      </BpkMobileScrollContainer>
    </BpkFlex>
  </PromptContext.Provider>
);

Root.displayName = 'BpkPrompts.Root';

export default Root;
