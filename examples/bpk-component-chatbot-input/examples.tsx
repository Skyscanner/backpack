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

import { useState } from 'react';
import type { ComponentProps } from 'react';

import BpkChatbotInput, {
  CHATBOT_INPUT_TYPES,
} from '../../packages/bpk-component-chatbot-input';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const LOADING_ARIA_LABEL = 'Loading';
const SEND_ARIA_LABEL = 'Send';
const PLACEHOLDER = 'Ask away';

const ChatbotInputWithState = ({
  initialValue = '',
  ...props
}: Partial<ComponentProps<typeof BpkChatbotInput>> & {
  initialValue?: string;
}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  return (
    <BpkChatbotInput
      inputValue={inputValue}
      loadingAriaLabel={LOADING_ARIA_LABEL}
      sendAriaLabel={SEND_ARIA_LABEL}
      placeholder={PLACEHOLDER}
      onInputChange={setInputValue}
      onInputFocus={() => {}}
      onInputBlur={() => {}}
      onSubmit={() => {}}
      {...props}
    />
  );
};

export const DefaultExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples')}>
    <ChatbotInputWithState inputType={CHATBOT_INPUT_TYPES.DEFAULT} />
  </div>
);

export const DefaultPollingExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.DEFAULT}
      isPolling
    />
  </div>
);

export const DefaultSendingExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.DEFAULT}
      isSending
      initialValue="Some message"
    />
  </div>
);

export const ComposerExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState inputType={CHATBOT_INPUT_TYPES.COMPOSER} />
  </div>
);

export const ComposerWithValueExample = () => (
  <div className={getClassName('bpk-chatbot-input-examples--on-canvas')}>
    <ChatbotInputWithState
      inputType={CHATBOT_INPUT_TYPES.COMPOSER}
      initialValue="I'd like to hire a car in Edinburgh for the weekend"
    />
  </div>
);
