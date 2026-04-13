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

import { useMemo } from 'react';
import type { MouseEvent, TouchEvent } from 'react';

import { BpkVStack, BpkSpacing } from '../../bpk-component-layout';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import { BpkChatbotInputContext } from './BpkChatbotInputContext';
import { CHATBOT_INPUT_TYPES } from './common-types';

import type { BpkChatbotInputRootProps } from './common-types';

import STYLES from './BpkChatbotInput.module.scss';

const getClassName = cssModules(STYLES);

const BpkChatbotInputRoot = ({
  align = 'flex-start',
  children,
  gap = BpkSpacing.Base,
  inputType = CHATBOT_INPUT_TYPES.COMPOSER,
  ...rest
}: BpkChatbotInputRootProps) => {
  const isCars = inputType === CHATBOT_INPUT_TYPES.CARS;
  const isComposer = inputType === CHATBOT_INPUT_TYPES.COMPOSER;

  const contextValue = useMemo(() => ({ inputType }), [inputType]);

  const containerClassName = getClassName(
    isCars ? 'bpk-chatbot-input--cars' : 'bpk-chatbot-input--composer',
    isComposer && 'bpk-chatbot-input--composer--with-shadow',
  );

  const paddingProps = isCars
    ? {
        paddingTop: BpkSpacing.MD,
        paddingBottom: BpkSpacing.MD,
        paddingEnd: BpkSpacing.MD,
        paddingStart: BpkSpacing.Base,
      }
    : {
        padding: BpkSpacing.Base,
      };

  const handleContainerEvent = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
  ) => {
    e.stopPropagation();
  };

  return (
    <BpkChatbotInputContext.Provider value={contextValue}>
      <div
        className={containerClassName}
        onClick={handleContainerEvent}
        onTouchStart={handleContainerEvent}
        role="presentation"
        data-testid="bpk-chatbot-input-container"
        {...getDataComponentAttribute('ChatbotInput')}
      >
        <BpkVStack
          align={align}
          gap={gap}
          width="100%"
          {...paddingProps}
          {...rest}
        >
          {children}
        </BpkVStack>
      </div>
    </BpkChatbotInputContext.Provider>
  );
};

export default BpkChatbotInputRoot;
